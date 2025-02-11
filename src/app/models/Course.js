const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
mongoose.set('strictQuery', true);
const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, require: true, maxLength: 255 },
        slug: { type: String, slug: 'name', unique: true },
        description: { type: String, maxLength: 600 },
        image: { type: String, maxLength: 255 },
        videoId: { type: String, required: true, maxLength: 255 },
        level: { type: String, maxLength: 255 },
    },
    {
        timestamps: true,
    }
);

mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
module.exports = mongoose.model('Course', Course);
