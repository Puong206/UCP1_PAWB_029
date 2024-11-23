const config = require('../configs/database');
let mysql = require('mysql');
const { connect } = require('../routes/router-login');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

let pupukArray = [];

module.exports = {
    getAllPupuk(req, res) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query('SELECT * FROM pupuk', (error, results) => {
                if (error) throw error;
                pupukArray = results;
                res.render('pupuk', {pupuk: pupukArray});
            });
            connection.release();
        });
    },

    formAddPupuk(req, res) {
        res.render('addPupuk', {
            url: 'http://localhost:8000',
        });
    },

    savePupuk(req, res) {
        const {nama, stok} = req.body;
        if (nama && stok) {
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query(
                    'INSERT INTO pupuk (nama, stok) VALUES (?, ?)', [nama, stok],
                    (error, results) => {
                        if (error) throw error;
                        pupukArray.push({ id: results.insertId, nama, stok});
                        res.redirect('/pupuk');
                    }
                );
                connection.release();
            });
        } else {
            res.redirect('/pupuk/add');
        }
    },

    formEditPupuk (req, res) {
        const {id} = req.params;
        const pupuk = pupukArray.find((item) => item.id == id);
        res.render('editPupuk', { pupuk });
    },

    updatePupuk(req, res) {
        const { id } = req.params;
        const { nama, stok } = req.body;
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(
                'UPDATE pupuk SET nama = ?, stok = ?, WHERE id = ?', [nama, stok, id],
                (error) => {
                    if (error) throw error;
                    const index = pupukArray.findIndex((item) => item.id == id);
                    if (index !== -1) pupukArray[index] = { id, nama, stok };
                    res.redirect('/pupuk');
                }
            );
            connection.release();
        });
    },

    deletePupuk(req, res) {
        const { id } = req.params;
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query('DELETE FROM pupuk WHERE id = ?', [id], (error) => {
                if (error) throw error;
                pupukArray = pupukArray.filter((item) => item.id != id);
                res.redirect('/pupuk');
            });
            connection.release();
        });
    },
};