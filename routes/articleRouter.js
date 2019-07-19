const express = require('express');
const bodyParser = require('body-parser');
const auth = require('../auth/auth');
const Article = require('../models/article');

const router = express.Router();
router.use(bodyParser.json());

router.route('/')
    //This request is allowed for everyone.
    .get((req, res, next) => {
        Article.find({})
            .then((articles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(articles);
            })
            .catch((err) => next(err));
    })
    //Only Admins can add new articles.
    //The uniqueness of an article will be checked through a custom function
    .post(auth.verifyUser, auth.verifyAdmin, isAnUniqueArticle, (req, res, next) => {
        Article.create(req.body)
            .then((newArticle) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: true, status: 'Added the following article successfully: ' + req.body.name })
            })
            .catch((err) => next(err));
    })
    .put(auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
        res.statusCode = 405;
        res.end('PUT method not supported by /articles');
    })
    //Dangerous delete method that deletes ALL articles
    .delete(auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
        Article.deleteMany({})
            .then((successMessage) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(successMessage);
            })
            .catch((err) => next(err));
    });

router.route('/:articleId')
    .get((req, res, next) => {
        Article.find({ _id: req.params.articleId })
        .then((article) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(article);
        })
        .catch((err) => next(err));
    })
    .post(auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
        res.statusCode = 405;
        res.end('PUT method not supported by /articles/' + req.params.articleId);
    })
    .put(auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
        Article.findByIdAndUpdate(req.params.articleId, {$set: req.body}, {new: true})
        .then((updatedArticle) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(updatedArticle);
        })
        .catch((err) => next(err));
    })
    .delete(auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
        Article.findByIdAndDelete(req.params.articleId)
        .then((successMessage) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(successMessage);
        })
        .catch((err) => next(err));
    })


// helper function
function isAnUniqueArticle(req, res, next) {
    Article.find({ name: req.body.name })
        .then((article) => {
            console.log(article);
            if (article.length === 0 || !article) {
                return next();
            }
            else {
                err = new Error('An article with the name ' + req.body.name + ' already exists');
                err.status = 404;
                return next(err);

            }
        })
        .catch((err) => next(err));
}

module.exports = router;