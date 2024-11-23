const db = require("../configs/database");

const getAllBibit = (req, res) => {
    db.query("SELECT * FROM bibit", (err, results) => {
        if (err) {
            res.status(500).send("Error fetching data");
            return;
        }
        res.render("bibit", { bibit: results });
    });
};

const addBibitForm = (req, res) => {
    res.render("add-bibit");
};

const saveBibit = (req, res) => {
    const { nama, jenis, harga } = req.body;
    const sql = "INSERT INTO bibit (nama, jenis, harga) VALUES (?, ?, ?)";
    db.query(sql, [nama, jenis, harga], (err, result) => {
        if (err) {
            res.status(500).send("Error saving data");
            return;
        }
        res.redirect("/bibit");
    });
};

const editBibitForm = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM bibit WHERE id = ?", [id], (err, results) => {
        if (err || results.length === 0) {
            res.status(404).send("Bibit not found");
            return;
        }
        res.render("edit-bibit", { bibit: results[0] });
    });
};

const updateBibit = (req, res) => {
    const { id } = req.params;
    const { nama, jenis, harga } = req.body;
    const sql = "UPDATE bibit SET nama = ?, jenis = ?, harga = ? WHERE id = ?";
    db.query(sql, [nama, jenis, harga, id], (err, result) => {
        if (err) {
            res.status(500).send("Error updating data");
            return;
        }
        res.redirect("/bibit");
    });
};

const deleteBibit = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM bibit WHERE id = ?", [id], (err, result) => {
        if (err) {
            res.status(500).send("Error deleting data");
            return;
        }
        res.redirect("/bibit");
    });
};

module.exports = {
    getAllBibit,
    addBibitForm,
    saveBibit,
    editBibitForm,
    updateBibit,
    deleteBibit,
};