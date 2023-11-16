/*Libs*/
const cors = require('cors')                    // allow api requests/response
const express = require('express');             // api requests lib
const path = require('path');                   // for init static directory
const sqlite3 = require('sqlite3').verbose();   // lib data base sqlite
const app = express();                          // app iniy
app.use(express.json());                        // use json for requests
/*Mail depenpencies*/
require('dotenv').config();                 // work with .env file
const nodeMailer = require('nodemailer')    // mail lib
/*Varibles*/
const PORT_APP = 2005;                      // app port
const urlRequest = '/api/mail';             // url request api
app.use(cors());
// let sql

/*SQL*/
// const db = new sqlite3.Database('./DataBase.db', sqlite3.OPEN_READWRITE, (err) => {
//     if (err) return console.log(err);
// });

//create table
// sql = `CREATE TABLE users(id INTEGER PRIMARY KEY, first_name, last_name,username,password,email)`;

// db.run(sql);

// db.run(`CREATE TABLE rules(id INTEGER PRIMARY KEY, first_argument, boolean_simbol, second_argument, result)`)
//drop table
// db.run("DROP TABLE users");
// db.run("DROP TABLE countries");

// db.run(`CREATE TABLE countries (id INTEGER PRIMARY KEY, name_country)`)


//insert data 
// sql = `INSERT INTO users(first_name, last_name,username,password,email) VALUES (?,?,?,?,?)`;

// db.run(
//     sql,
//     ["sd", "sd", "sdq", "sd12", "fred@fcew.com"],
//     (error) => { if (error) { console.log(error); } }
// );

// sql = `INSERT INTO countries(name_country) VALUES (?)`;

// db.run(
//     sql,
//     ["Россия"],
//     (error) => { if (error) { console.log(error); } }
// );
// db.run(
//     sql,
//     ["Турция"],
//     (error) => { if (error) { console.log(error); } }
// );
// db.run(
//     sql,
//     ["Греция"],
//     (error) => { if (error) { console.log(error); } }
// );
// db.run(
//     sql,
//     ["Египет"],
//     (error) => { if (error) { console.log(error); } }
// );
// db.run(
//     sql,
//     ["Тайланд"],
//     (error) => { if (error) { console.log(error); } }
// );

// sql = `INSERT INTO rules(first_argument, boolean_simbol, second_argument, result) VALUES (?,?,?,?)`;

// db.run(
//     sql,
//     ["country = choosen_country", "-", "-", "hotel with choosen_country"],
//     (error) => { if (error) { console.log(error); } }
// );

// db.run(
//     sql,
//     ["amount_stars = choosen_amount_stars", "-", "-", "hotel with choosen_amount_stars"],
//     (error) => { if (error) { console.log(error); } }
// );

// db.run(
//     sql,
//     ["amount_nights = choosen_amount_nights", "-", "-", "price_for_hotel = price_for_night *  amount_nights"],
//     (error) => { if (error) { console.log(error); } }
// );

// db.run(
//     sql,
//     ["amount_adults = choosen_amount_adults", "-", "-", "price for hotel = choosen_amount_adults * price for night "],
//     (error) => { if (error) { console.log(error); } }
// );

// db.run(
//     sql,
//     ["amount_childs = choosen_amount_childs", "-", "-", "price for hotel  childs = (price for night * 0.5) choosen_amount_childs "],
//     (error) => { if (error) { console.log(error); } }
// );



//update data
// sql = `UPDATE users SET first_name = ? WHERE id = ?`;
// db.run(sql, ["Jake",1], (error)=>{
//     if(error) return console.log(error.message);
// });

// delete data
// sql = `DELETE FROM rules WHERE id = ?`;
// sql = `DELETE FROM countries WHERE id = ?`;
// db.run(sql,[7],(error)=>{
//     if(error) return console.log(error.message);
// });
// sql = `DELETE FROM rules WHERE id = ?`;
// db.run(sql,[1],(error)=>{
//     if(error) return console.log(error.message);
// });
// db.run(sql,[2],(error)=>{
//     if(error) return console.log(error.message);
// });
// db.run(sql,[3],(error)=>{
//     if(error) return console.log(error.message);
// });
// db.run(sql,[4],(error)=>{
//     if(error) return console.log(error.message);
// });
// db.run(sql,[5],(error)=>{
//     if(error) return console.log(error.message);
// });
// db.run(sql,[6],(error)=>{
//     if(error) return console.log(error.message);
// });
// db.run(sql,[7],(error)=>{
//     if(error) return console.log(error.message);
// });
// db.run(sql,[8],(error)=>{
//     if(error) return console.log(error.message);
// });
// db.run(sql,[9],(error)=>{
//     if(error) return console.log(error.message);
// });


//query the data
// sql = 'SELECT * FROM users';
// db.all(sql, [], (error, rows) => {
//     if (error) {
//         return console.log(err.message);
//     }

//     rows.forEach((row) => {
//         console.log(row);
//     })
// })

// let arrayRules = [];

// sql = 'SELECT * FROM rules';
// db.all(sql, [], (error, rows) => {
//     if (error) {
//         return console.log(err.message);
//     }

//     arrayRules = rows;

//     console.log(arrayRules);

    // rows.forEach((row) => {
    //     console.log(row);
    // })
// })

// let arrayCountries = [];

// sql = 'SELECT * FROM countries';
// db.all(sql, [], (error, rows) => {
//     if (error) {
//         return console.log(err.message);
//     }

//     arrayCountries = rows;

//     console.log(arrayCountries);

//     // rows.forEach((row) => {
//     //     console.log(row);
//     // })
// })

/*Requests*/
//GET
app.get(`${urlRequest}`, (request, response) => {
    response.status(200).json({ status: 200 });
});

app.get(`/api/desition-system/rules`,(request,response)=>{
    response.status(200).json({arrayRules});
});

app.get(`/api/desition-system/countries`,(request,response)=>{
    response.status(200).json({arrayCountries});
});

//POST
app.post(`${urlRequest}`, (request, response) => {
    console.log(request.body);
    /*Mail varible*/
    const serviseMail = 'gmail';                                // Servise mail
    const mailFromSent = process.env.EMAIL;                     // Sent mail
    const mailToSent = process.env.EMAIL_TO_SEND;               // Got mail
    const nameRequest = request.body.nameUser;                  // Deserelize object (name)
    const emailRequest = request.body.emailUser;                // Deserelize object (email)
    const shortMessageRequest = request.body.messageUser;       // Deserelize object (short message)
    // Send message
    const subjectLetter = `Письмо с сайта-визитки`;                                  // Subject letter
    const textLetter = `Приветствую, я ${nameRequest}. Адрес моей электронной почты: ${emailRequest}. ${shortMessageRequest}`;    // Text letter

    const transporter = nodeMailer.createTransport(
        {
            service: serviseMail,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }
        })

    const mailOptions = {
        from: mailFromSent,
        to: mailToSent,
        subject: subjectLetter,
        text: textLetter,
    }

    transporter.sendMail(
        mailOptions,
        (error) => {
            if (error !== null) {
                console.log(error);
            } else {
                console.log('Message has been sent');
                response.status(200).json({ body: request.body });
            }
        }
    );
});

//DELETE
app.delete(`${urlRequest}/:id`, (request, response) => {

});

//PUT
app.put(`${urlRequest}/:id`, (request, response) => {

});

/*Directory*/
// init statics
app.use(express.static(path.resolve(__dirname, './client')));
// app.use(express.static(path.resolve(__dirname, '.static')));

// lisening all get requests
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", 'index.html'))
});

// default massage
app.listen(PORT_APP, () => console.log(`Server has been started on port ${PORT_APP}`));

