const pool = require("../configs/database");

module.exports = {
    login: (req, res) => {
        res.render("login");
    },

    loginAuth: (req, res) => {
        const { email, password } = req.body;

        const query = "SELECT * FROM users WHERE email = ? AND password = ?";
        
        pool.query(query, [email, password], (error, results) => {
            if (error) {
                console.error("Error executing query:", error);
                return res.status(500).send("Terjadi kesalahan saat memverifikasi akun.");
            }

            if (results.length > 0) {
                req.session.user = results[0]; // Menyimpan user di session
                return res.redirect("/home");
            }

            res.redirect("/login");
        });
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send("Terjadi kesalahan saat logout.");
            }
            res.redirect("/login");
        });
    }
};
