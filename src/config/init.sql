create database db_sekolah;
use db_sekolah;


-- data_siswa
create TABLE IF NOT EXISTS data_siswa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama_siswa VARCHAR(255),
  alamat_siswa VARCHAR(255),
  tanggal_siswa VARCHAR(255), 
  jurusan_siswa VARCHAR(255),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);