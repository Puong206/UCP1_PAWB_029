const pool = require("../configs/database");

module.exports = {
    formRegister: (req, res) => {
        res.render("register");
    },

    saveRegister: (req, res) => {
        const { nama, email, password } = req.body;
        
        const query = "INSERT INTO users (nama, email, password) VALUES (?, ?, ?)";
        
        pool.query(query, [nama, email, password], (error, results) => {
            if (error) {
                console.error("Error executing query:", error);
                return res.status(500).send("Terjadi kesalahan saat menyimpan data.");
            }

            res.redirect("/login");
        });
    }
};
