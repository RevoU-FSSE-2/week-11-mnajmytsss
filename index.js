const mysql = require('mysql2/promise');

// Buat koneksi ke database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'username_db',
    password: 'password_db',
    database: 'nama_database'
});

// Data yang ingin dimasukkan
const newData = {
    id: 1, // Ganti dengan ID baris yang ingin diperbarui
    loker: 'loker3',
    isiLoker: 'buku'
};

(async () => {
    try {
        // Buka koneksi
        await connection.connect();

        // Query UPDATE untuk memasukkan data ke dalam kolom "isi loker"
        const updateQuery = `UPDATE nama_tabel SET \`isi loker\` = ? WHERE \`loker\` = ? AND \`status\` = 'available' AND \`id\` = ?`;

        // Eksekusi query UPDATE dengan parameter
        const [rows] = await connection.execute(updateQuery, [newData.isiLoker, newData.loker, newData.id]);

        console.log(`Berhasil memasukkan ${newData.isiLoker} ke dalam ${newData.loker} pada baris dengan ID ${newData.id}`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Tutup koneksi
        connection.end();
    }
})();
