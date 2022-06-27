const express = require('express');
const mongoose = require('mongoose');

const { Furniture } = require('./models/furniture-schema');
const { ContactForm } = require('./models/contact-schema');
const { User } = require('./models/user-schema');
const { Order } = require('./models/order-schema');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

app.get(`/users`, async (req, res) => {
    console.log('fetching users from mongoDB');
    const users = await User.find();
    for (const user of users) {
        delete user.password;
    }
    res.json(users);
});

app.put(`/users/:username`, async (req, res) => {
    console.log('Editing a user');
    const { username } = req.params;
    console.log(req.body);
    await User.findOneAndUpdate({ username }, req.body);

    res.status(200).send();
});

app.get(`/products`, async (req, res) => {
    console.log('fetching products from mongoDB');
    const products = await Furniture.find({});
    res.json(products);
});

app.get(`/orders/:username`, async (req, res) => {
    const username = req.params.username;
    console.log('fetching order of a user from mongoDB');
    if (username == 'admin') {
        const orders = await Order.find({});
        res.json(orders);
    } else {
        const orders = await Order.find({ username });
        res.json(orders);
    }
});

// DELETE domain/users/avi
app.delete('/users/:username', async (req, res) => {
    const username = req.params.username;
    console.log('deleting a user');
    await User.findOneAndDelete({ username });
    res.status(200).send();
});

app.post('/contact', async (req, res) => {
    console.log('sending contact form to mongoDB');
    // console.log('req.body', req.body);
    const contactForm = new ContactForm(req.body);
    await contactForm.save();

    res.json(contactForm);
});

app.post('/login', async (req, res) => {
    console.log('Trying to login');
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    });

    if (user) {
        res.json({ user: user.username, id: user._id });
    } else {
        res.status(403).json({
            error: 'Invalid username or password',
        });
    }
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

const connectUrl =
    'mongodb+srv://edenbote:admin@cluster0.uvs6dwo.mongodb.net/?retryWrites=true&w=majority';

mongoose.connection.once('open', function () {
    console.log(`MongoDB connected`);
});
(async () => {
    try {
        await mongoose.connect(connectUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (err) {
        console.log(`error connecting to mongodb: ${err}`);
    }
})();
