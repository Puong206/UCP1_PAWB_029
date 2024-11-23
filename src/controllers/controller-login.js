const config = require('../configs/database');
let mysql = require('mysql');
let pool = mysql.createPool(config);

module.exports = {
    login(req, res) {
        res.render("login", {
            url: 'http://localhost:8000/',
            colorFlash: req.flash('color'),
            statusFlash: req.flash('status'),
            pesanFlash: req.flash('message'),
        });
    },
    loginAuth(req, res) {
        let email = req.body.email;
        let password = req.body.pass;
        
        if (email && password) {
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(
                    'SELECT * FROM users WHERE email = ? AND password = SHA2(?,512)', 
                    [email, password], 
                    function (error, results) {
                        connection.release(); 
                        if (error) throw error;

                        if (results.length > 0) {
                            req.session.loggedin = true;
                            req.session.userid = results[0].id;
                            req.session.username = results[0].nama;
                            res.redirect('/home'); 
                        } else {
                            req.flash('color', 'danger');
                            req.flash('status', 'Oops..');
                            req.flash('message', 'Akun tidak ditemukan');
                            console.log("Email atau password tidak ditemukan.");
                            res.redirect('/login'); 
                        }
                    }
                );
            });
        } else {
            res.redirect('/login');
        }
    },
    logout(req, res) {
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
            res.clearCookie('secretname');
            res.redirect('/login');
        });
    }
};