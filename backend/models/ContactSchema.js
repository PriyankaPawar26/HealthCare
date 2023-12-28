const mongoose = require('mongoose');

// Define the Contact schema
const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

// Create a Contact model using the schema
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
