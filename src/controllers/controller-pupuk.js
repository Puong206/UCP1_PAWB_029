const pool = require('../configs/database');

const getAllPupuk = (req, res) => {
    pool.query('SELECT * FROM pupuk', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database Error");
        }
        res.render('pupuk', { pupuk: results });
    });
};

const formAddPupuk = (req, res) => {
    res.render('addPupuk');
};

const savePupuk = (req, res) => {
    const { nama, jenis, harga } = req.body;
    const query = 'INSERT INTO pupuk (nama, jenis, harga) VALUES (?, ?, ?)';
    pool.query(query, [nama, jenis, harga], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error saving pupuk");
        }
        res.redirect('/pupuk');
    });
};

const formEditPupuk = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM pupuk WHERE id = ?';
    pool.query(query, [id], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).send("Pupuk not found");
        }
        res.render('editPupuk', { pupuk: results[0] });
    });
};

const updatePupuk = (req, res) => {
    const { id } = req.params;
    const { nama, jenis, harga } = req.body;
    const query = 'UPDATE pupuk SET nama = ?, jenis = ?, harga = ? WHERE id = ?';
    pool.query(query, [nama, jenis, harga, id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error updating pupuk");
        }
        res.redirect('/pupuk');
    });
};

const deletePupuk = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM pupuk WHERE id = ?';
    pool.query(query, [id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error deleting pupuk");
        }
        res.redirect('/pupuk');
    });
};

module.exports = {
    getAllPupuk,
    formAddPupuk,
    savePupuk,
    formEditPupuk,
    updatePupuk,
    deletePupuk,
};