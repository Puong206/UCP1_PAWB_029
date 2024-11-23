const express = require('express');
const pool = require('../configs/database');

module.exports = {
    home (req, res) {
        res.render('home', {
            url: 'http://localhost:8000/',
            title: 'Dashboard Pupuk & Bibit Tanaman'
        });
    },

    getAllData(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.error("Koneksi ke Database terganggu : ", err);
                res.status(500).send("Koneksi Database Error");
                return;
            }

            connection.query('SELECT * FROM pupuk', function (err, pupukResults) {
                if (err) {
                    console.error("Kesalahan saat mengambil data : ", err);
                    res.status(500).send("Kesalahan Pengambilan Data Pupuk");
                    connection.release();
                    return;
                }

                connection.query('SELECT * FROM bibit', function (err, bibitResults) {
                    if (err) {
                        console.error("Kesalahan saat mengambil data : ", err);
                        res.status(500).send("Kesalahan Pengambilan Data Bibit");
                        connection.release();
                        return;
                    }

                    res.render('home', {
                        url: 'http://localhost:8000/',
                        title: 'Dashboard Pupuk & Bibit Tanaman',
                        pupukData: pupukResults,
                        bibitData: bibitResults
                    });

                    connection.release();
                });
            });
        });
    }
};