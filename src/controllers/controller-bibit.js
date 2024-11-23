const config = require('../configs/database');
let mysql = require('mysql');
const { updatePupuk } = require('./controller-pupuk');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

let bibitArray = [];

module.exports = {
    getAllBibit(req, res) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query('SELECT * FROM bibit', (error, results) => {
                if (error) throw error;
                bibitArray = results;
                res.render('bibit', { bibit: bibitArray });
            });
            connection.release();
        });
    },

    formAddBibit(req, res) {
        res.render('addBibit', {
            url: 'http://localhost:8000',
        });
    },

    saveBibit(req, res) {
        const {nama, stok} = req.body;
        if (nama && stok) {
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query(
                    'INSERT INTO bibit (nama, stok) VALUES (?, ?)', [nama, stok],
                    (error, results) => {
                        if (error) throw error;
                        bibitArray.push({ id: results.insertId, nama, stok});
                        res.redirect('/bibit');
                    }
                );
                connection.release();
            });
        } else {
            res.redirect('/bibit/add');
        }
    },

    formEditBibit(req, res) {
        const {id} = req.params;
        const bibit = bibitArray.find((item) => item.id == id);
        res.render('editBibit', {bibit});
    },

    updateBibit(req, res) {
        const {id} = req.params;
        const {nama, stok} = req.body;
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(
                'UPDATE bibit SET nama = ?, stok = ? WHERE id = ?', [nama, stok, id],
                (error) => {
                    if (error) throw error;
                    const index = bibitArray.findIndex((item) => item.id == id);
                    if (index !== -1) bibitArray[index] = {id, nama, stok};
                    res.redirect('/bibit');
                }
            );
            connection.release();
        });
    },

    deleteBibit(req, res) {
        const {id} = req.params;
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query('DELETE FROM bibit WHERE id = ?', [id], (error) => {
                if (error) throw error;
                bibitArray = bibitArray.filter((item) => item.id != id);
                res.redirect('/bibit');
            });
            connection.release();
        });
    },
};