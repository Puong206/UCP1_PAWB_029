CREATE TABLE pupuk (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    harga DECIMAL(10, 2) NOT NULL,
    stok INT NOT NULL
);

CREATE TABLE IF NOT EXISTS bibit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    jenis VARCHAR(255) NOT NULL,
    harga DECIMAL(10, 2) NOT NULL,
    stok INT NOT NULL
);

INSERT INTO pupuk (nama, harga, stok) VALUES
('Pupuk Organik', 50000.00, 100),
('Pupuk Kimia', 75000.00, 200),
('Pupuk Kompos', 30000.00, 150);

INSERT INTO bibit (nama, jenis, harga, stok) VALUES
('Bibit Tomat', 'Sayuran', 15000.00, 100),
('Bibit Bunga Mawar', 'Bunga', 25000.00, 50),
('Bibit Cabe', 'Sayuran', 12000.00, 200);
