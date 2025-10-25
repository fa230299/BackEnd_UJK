const pool = require('../config/db')

module.exports = {
    getAll: async (req, res, next) => {
    try {
      const [rows] = await pool.execute('SELECT * FROM data_siswa ORDER BY id DESC');
      res.json(rows);
    } catch (err) { next(err); }
  },

  // GET /api/siswa/:id
  getById: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const [rows] = await pool.execute('SELECT * FROM data_siswa WHERE id = ?', [id]);
      if (rows.length === 0) return res.status(404).json({ message: 'siswa tidak ditemukan' });
      res.json(rows[0]);
    } catch (err) { next(err); }
  },

  // POST /api/siswa 
  create: async (req, res, next) => {
    try {
      const { nama_siswa, alamat_siswa, tanggal_siswa, jurusan_siswa } = req.body;
    
      const [result] = await pool.execute(
        'INSERT INTO data_siswa (nama_siswa, alamat_siswa, tanggal_siswa, jurusan_siswa) VALUES (?, ?, ?, ?)',
        [nama_siswa, alamat_siswa, tanggal_siswa, jurusan_siswa ]
      );
      res.status(201).json({ id: result.insertId, nama_siswa:nama_siswa, alamat_siswa:alamat_siswa, tanggal_siswa:tanggal_siswa, jurusan_siswa:jurusan_siswa || null });
    } catch (err) { next(err); }
  },

  // PUT /api/siswa/:id (protected)
  update: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const { nama_siswa, alamat_siswa, tanggal_siswa, jurusan_siswa } = req.body;

      // build dynamic update (simple)
      const fields = [];
      const values = [];
      if (nama_siswa !== undefined) { fields.push('nama_siswa = ?'); values.push(nama_siswa); }
      if (alamat_siswa !== undefined) { fields.push('alamat_siswa = ?'); values.push(alamat_siswa); }
      if (tanggal_siswa !== undefined) { fields.push('tanggal_siswa = ?'); values.push(tanggal_siswa); }
      if (jurusan_siswa !== undefined) { fields.push('jurusan_siswa = ?'); values.push(jurusan_siswa); }

      if (fields.length === 0) return res.status(400).json({ message: 'Tidak terupdate' });

      values.push(id);
      const sql = `UPDATE data_siswa SET ${fields.join(', ')} WHERE id = ?`;
      const [result] = await pool.execute(sql, values);

      if (result.affectedRows === 0) return res.status(404).json({ message: 'Siswa tidak ditemukan' });
      res.json({ message: 'Data siswa diperbarui' });
    } catch (err) { next(err); }
  },

  // DELETE /api/customers:id (protected)
  remove: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const [result] = await pool.execute('DELETE FROM data_siswa WHERE id = ?', [id]);
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Siswa tidak ditemukan' });
      res.json({ message: 'Data siswa berhasil dihapus' });
    } catch (err) { next(err); }
  }
};
