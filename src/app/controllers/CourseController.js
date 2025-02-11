const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');
class CourseController {
    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /courses/store
    async store(req, res, next) {
        try {
            req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`;
            await Course.create(req.body);
            res.redirect('/me/stored/courses');
        } catch (error) {
            next(error);
        }
    }
    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                })
            )
            .catch(next);
    }
    // [PUT] /courses/:id
    async update(req, res, next) {
        try {
            const formData = req.body;
            formData.image = `https://i.ytimg.com/vi/${formData.videoId}/hqdefault.jpg`;
            await Course.updateOne({ _id: req.params.id }, formData);
            res.redirect('/me/stored/courses');
        } catch (error) {
            next(error);
        }
    }

    // [DELETE] /courses/:id
    async destroy(req, res, next) {
        try {
            await Course.delete({ _id: req.params.id });
            res.redirect('back');
        } catch (error) {
            next(error);
        }
    }

    // [DELETE] /courses/:id/force
    async forceDestroy(req, res, next) {
        try {
            await Course.deleteOne({ _id: req.params.id });
            res.redirect('back');
        } catch (error) {
            next(error);
        }
    }

    // [PATCH] /:id/restore
    async restore(req, res, next) {
        try {
            await Course.restore({ _id: req.params.id });
            res.redirect('back');
        } catch (error) {
            next(error);
        }
    }

    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => res.render('courses/show', { course: mongooseToObject(course) }))
            .catch(next);
    }

    // [POST] /courses/handle-form-actions
    async handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                try {
                    await Course.delete({ _id: { $in: req.body.courseIds } });
                    res.redirect('back');
                } catch (error) {
                    next(error);
                }

                break;
            default:
                res.json({ message: 'Action invalid' });
                break;
        }
    }

    async handleFormActionsDeleted(req, res, next) {
        switch (req.body.action) {
            case 'restore':
                try {
                    await Course.restore({ _id: { $in: req.body.courseIds } });
                    res.redirect('back');
                } catch (error) {
                    next(error);
                }
                break;
            case 'delete':
                try {
                    await Course.deleteMany({ _id: { $in: req.body.courseIds } });
                    res.redirect('back');
                } catch (error) {
                    next(error);
                }
                break;
            default:
                res.json({ message: 'Action invalid' });
                break;
        }
    }
}

module.exports = new CourseController();
