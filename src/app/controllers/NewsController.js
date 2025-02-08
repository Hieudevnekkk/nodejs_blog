class NewsController {
    // [GET] /news
    index(req, res) {
        res.render('news');
    }

    // [GET] /searchs
    show(req, res) {
        res.render('search');
    }
}

module.exports = new NewsController();
