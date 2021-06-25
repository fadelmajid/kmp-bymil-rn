const { Article } = require('../models');
const { Op } = require("sequelize");
const Redis = require("ioredis");
const redis = new Redis();
const __ = require('lodash')

class AricleController {
    static postArticle(req, res, next) {
        let data = {
            UserId : req.loggedUser.id,
            author : req.loggedUser.username,
            title : req.body.title,
            body : req.body.body
        }
        Article.create(data)
        .then((data) => {
            res.status(201).json({ id : data.id, author : data.author, title: data.title })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    static getArticle(req, res, next) {
        let keyword = '';
        if (req.query.keyword) {
            keyword = req.query.keyword
        }
        let condition = {
            [Op.or]: [
                {
                    body : {[Op.iLike]: `%${keyword}%`}
                },
                {
                    title : {[Op.iLike]: `%${keyword}%`}
                }  
            ]
        }
        if (req.query.author) {
            condition.author = req.query.author;
        }
        redis.get("allArticles")
        .then(result => {
            if (!result) {
                //check query.
                Article.findAll({
                    where : condition,
                    order : [
                        ['createdAt', 'DESC']
                    ]
                })
                .then((data) => {
                    if (keyword === '' && !req.query.author) {
                        redis.set("allArticles", JSON.stringify(data))
                        console.log("set redis")
                        // data.forEach(el => {
                        //     redis
                        //     .multi()
                        //     .hmset(`id:${el.id}`, "UserId", el.UserId, "author", el.author, "title", el.title, "body", el.body, "createdAt", el.createdAt, "updatedAt", el.updatedAt)
                        //     .zadd("author_list", el.author, `id:${el.id}`)
                        //     .zadd("created_list", el.createdAt, `id:${el.id}`)
                        //     .zadd("body_list", el.body, `id:${el.id}`)
                        //     .exec((err, results) => {
                        //         // results === [[null, 'OK'], [null, 'bar']]
                        //         console.log(err, ">>>>> error multi redis")
                        //         console.log(result, ">>>>> error result multi redis")
                        //     });
                        // });
                    }
                    res.status(200).json(data)
                })
                .catch((err) => {
                    console.log(err)
                })
            } else {
                //data redis allArticle is exist
                const data = JSON.parse(result)
                if (keyword === '' && !req.query.author) {
                    res.status(200).json(data)
                } else {
                    let matches = []
                    console.log("redis is exist, search with qs")
                    // Run thorugh object
                    let regex = `/.*${req.query.author}.*/`
                    console.log("author>>", req.query.author)
                    console.log("keyword>>", req.query.keyword)
                    // let getValue = __.filter(JSON.parse(result), {'author' : req.query.author})
                    // console.log(getValue)

                    // let search = req.query.keyword;
                    // let author = req.query.author;
                    
                    // const res = JSON.parse(result).filter(obj => Object.values(obj).some(val => val.includes(search)));
                    // console.log(res);
                    console.log(JSON.parse(result), ">>>>>>>>&&&&&")
                    const arr = [
                        {a:'abc', b:'efg', c:'hij'},
                        {a:'abc', b:'efg', c:'hij'},
                        {a:'123', b:'456', c:'789'},
                      ];
                    // const arr = JSON.parse(result)
                      
                      const search = 'a';
                      
                      const res = arr.filter(obj => Object.values(obj).some(val => 
                            val.includes(search)
                        ));
                      
                      console.log(res);

                    // data.forEach(obj => {
                    //     Object.keys(obj).forEach(kv => {
                    //         if (/.*author2.*/.test(obj[kv])) { // ... LIKE '%iba%'
                    //             matches.push(obj);
                    //         }
                    //         });
                    // });
                    // console.log(matches);
                    // res.status(200).json(matches)
                }
            }
        })
        .catch(err => {
            console.log(err)
        })
        
        // Article.findAll({
        //     where : condition,
        //     order : [
        //         ['createdAt', 'DESC']
        //     ]
        // })
        // .then((data) => {
        //     res.status(200).json(data)
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
    }
}

module.exports = AricleController;