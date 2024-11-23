const pool = require('../configs/database');

// Menampilkan semua bibit
const getAllBibit = (req, res) => {
    pool.query('SELECT * FROM bibit', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database Error");
        }
        res.render('bibit', { bibit: results });
    });
};

// Menampilkan form untuk menambah bibit
const formAddBibit = (req, res) => {
    res.render('addBibit');
};

// Menyimpan bibit baru
const saveBibit = (req, res) => {
    const { nama, jenis, harga } = req.body;
    const query = 'INSERT INTO bibit (nama, jenis, harga) VALUES (?, ?, ?)';
    pool.query(query, [nama, jenis, harga], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error saving bibit");
        }
        res.redirect('/bibit');
    });
};

// Menampilkan form untuk mengedit bibit
const formEditBibit = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM bibit WHERE id = ?';
    pool.query(query, [id], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).send("Bibit not found");
        }
        res.render('editBibit', { bibit: results[0] });
    });
};

// Memperbarui bibit
const updateBibit = (req, res) => {
    const { id } = req.params;
    const { nama, jenis, harga } = req.body;
    const query = 'UPDATE bibit SET nama = ?, jenis = ?, harga = ? WHERE id = ?';
    pool.query(query, [nama, jenis, harga, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error updating bibit");
        }
        res.redirect('/bibit');
    });
};

// Menghapus bibit
const deleteBibit = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM bibit WHERE id = ?';
    pool.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error deleting bibit");
        }
        res.redirect('/bibit');
    });
};

module.exports = {
    getAllBibit,
    formAddBibit,
    saveBibit,
    formEditBibit,
    updateBibit,
    deleteBibit,
};
