const pool = require("../configs/database");

module.exports = {
    home: (req, res) => {
        const queryBibit = "SELECT * FROM bibit";
        const queryPupuk = "SELECT * FROM pupuk";
        
        pool.query(queryBibit, (errorBibit, resultsBibit) => {
            if (errorBibit) {
                console.error("Error executing query (bibit):", errorBibit);
                return res.status(500).send("Terjadi kesalahan saat mengambil data bibit.");
            }

            pool.query(queryPupuk, (errorPupuk, resultsPupuk) => {
                if (errorPupuk) {
                    console.error("Error executing query (pupuk):", errorPupuk);
                    return res.status(500).send("Terjadi kesalahan saat mengambil data pupuk.");
                }

                res.render("home", {
                    bibit: resultsBibit,
                    pupuk: resultsPupuk
                });
            });
        });
    },

    getAllData: (req, res) => {
        const queryBibit = "SELECT * FROM bibit";
        const queryPupuk = "SELECT * FROM pupuk";

        pool.query(queryBibit, (errorBibit, resultsBibit) => {
            if (errorBibit) {
                console.error("Error executing query (bibit):", errorBibit);
                return res.status(500).send("Terjadi kesalahan saat mengambil data bibit.");
            }

            pool.query(queryPupuk, (errorPupuk, resultsPupuk) => {
                if (errorPupuk) {
                    console.error("Error executing query (pupuk):", errorPupuk);
                    return res.status(500).send("Terjadi kesalahan saat mengambil data pupuk.");
                }
                
                res.render("home", {
                    bibit: resultsBibit,
                    pupuk: resultsPupuk
                });
            });
        });
    }
};
