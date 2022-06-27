const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is missing'],
    },
    email: {
        type: String,
        required: [true, 'Email is missing'],
    },
    subject: {
        type: String,
        required: [true, 'Subject is missing'],
    },
    content: {
        type: String,
        required: [true, 'Form content is missing'],
    },
});
const ContactForm = mongoose.model('contactForms', contactSchema);
module.exports = { ContactForm };
