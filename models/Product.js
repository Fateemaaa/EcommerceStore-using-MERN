const mongoose = require('mongoose');

// Define your schema and model
const Product = mongoose.model('Product', new mongoose.Schema({
    name: String,
    brand: String,
    price: Number,
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Find and log all products
Product.find({}, (err, products) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('Products:', products);
    }
});
