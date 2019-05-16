
exports.error404 = (req, res, next) => {
    res.status(404).render('404', {
        pageTitle: `Page "${req.path.replace('/','')}" Not Found`,
        path: req.path
    });
}