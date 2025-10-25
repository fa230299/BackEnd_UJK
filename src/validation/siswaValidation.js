module.exports = {
  validateCustomerCreate: (req, res, next) => {
    const { nama_siswa  } = req.body;
    const errors = [];
    if (!nama_siswa || typeof nama_siswa !== 'string' || nama_siswa.trim().length < 2) {
      errors.push('name wajib (minimal 2 karakter)');
    }
    if (errors.length) return res.status(400).json({ errors });
    next();
  },

  validateCustomerUpdate: (req, res, next) => {
    const { nama_siswa } = req.body;
    const errors = [];
    if (nama_siswa !== undefined && (typeof nama_siswa !== 'string' || nama_siswa.trim().length < 2)) {
      errors.push('Jika disertakan, name minimal 2 karakter');
    }
    if (errors.length) return res.status(400).json({ errors });
    next();
  }
};
