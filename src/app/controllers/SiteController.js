class SiteController {
  // [GET] /
  index(req, res) {
    res.render("home");
  }

  // [GET] /Site/:slug
  search(req, res) {
    res.send("site DETAIL!!!");
  }
}

module.exports = new SiteController();
