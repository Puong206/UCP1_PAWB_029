const db = require("../configs/database");

const getAllPupuk = (req, res) => {
    db.query("SELECT * FROM pupuk", (err, results) => {
        if (err) {
            res.status(500).send("Error fetching data");
            return;
        }
        res.render("pupuk", { pupuk: results });
    });
};

const addPupukForm = (req, res) => {
    res.render("add-pupuk");
};

const savePupuk = (req, res) => {
    const { nama, harga, stok } = req.body;
    const sql = "INSERT INTO pupuk (nama, harga, stok) VALUES (?, ?, ?)";
    db.query(sql, [nama, harga, stok], (err, result) => {
        if (err) {
            res.status(500).send("Error saving data");
            return;
        }
        res.redirect("/pupuk");
    });
};

const editPupukForm = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM pupuk WHERE id = ?", [id], (err, results) => {
        if (err || results.length === 0) {
            res.status(404).send("Pupuk not found");
            return;
        }
        res.render("edit-pupuk", { pupuk: results[0] });
    });
};

const updatePupuk = (req, res) => {
    const { id } = req.params;
    const { nama, harga, stok } = req.body;
    const sql = "UPDATE pupuk SET nama = ?, harga = ?, stok = ? WHERE id = ?";
    db.query(sql, [nama, harga, stok, id], (err, result) => {
        if (err) {
            res.status(500).send("Error updating data");
            return;
        }
        res.redirect("/pupuk");
    });
};

const deletePupuk = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM pupuk WHERE id = ?", [id], (err, result) => {
        if (err) {
            res.status(500).send("Error deleting data");
            return;
        }
        res.redirect("/pupuk");
    });
};

module.exports = {
    getAllPupuk,
    addPupukForm,
    savePupuk,
    editPupukForm,
    updatePupuk,
    deletePupuk,
};