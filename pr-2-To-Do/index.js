const express = require("express");

const port = 8080 ;

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

let users = [];

app.get('/', (req, res) => {
    return res.render('index', {
        all: users
    });
});

app.get('/deleteusers', (req, res) => {
    let id = req.query.deleteId;
    users = users.filter(val => val.id != id);
    return res.redirect('/');
});

app.get('/editusers', (req, res) => {
    let single = users.find(val => val.id == req.query.editId);
    return res.render('edit', {
        single
    });
});

app.post('/insertRecord', (req, res) => {
    const { name, phone, date } = req.body;
    let obj = {
        id: Math.floor(Math.random() * 1000),
        name: name,
        phone: phone,
        date: date,
    };
    users.push(obj);
    console.log("Record inserted successfully");
    res.redirect('/');
});

app.post('/updateusers', (req, res) => {
    const { editId, name, phone, date } = req.body;

    users = users.map((val) => {
        if (val.id == editId) {
            val.name = name;
            val.phone = phone;
            val.date = date;
        }
        return val;
    });
    return res.redirect('/');
});

app.listen(port, (err) => {
    if (err) {
        console.log("Error occurred:", err);
    }
    console.log(`Server is running on port ${port}`);
});
    