Nama : Muhamad Satrio
Kalbe Technical Test

Tech yang digunakan adalah NodeJS Express, PostgreSQL, dan Sequelize, Berikut adalah cara menjalankannya:

Dokumentasi API: https://documenter.getpostman.com/view/23486750/2sA2rCT1vL

Cara penggunaan API:
1.	Ekstrak file rar
2.	Buka dan masuk ke folder “kalbe-master”
3.	Jalankan di terminal “npm install” untuk instal dependencies yang ada
4.	silahkan ubah nama.env.example menjadi .env dan kemudian isi sesuai data connection database postgreSQL yang anda miliki.
5.	Jalankan kode berikut untuk membuat database “npx sequelize-cli db:create”
6.	Jalankan kode migration untuk migrate tabel “npx sequelize-cli db:migrate”
7.	Jalankan kode untuk memasukkan data seeders yang sudah ada “npx sequelize-cli db:seed:all” (berisi data produk dan akun dummy)
8.	Jalankan di terminal “npm run start”
9.	Buka Postman (Dokumentasi API link diatas) dan coba jalankan sesuai tes yang ada.

Hal yang perlu diperhatikan:
1.	Perlu register atau login menggunakan akun berikut email: customer@gmail.com dan password “customer123” terlebih dahulu untuk bisa mengakses setiap API yang ada.
2. Authorization type Bearer Token kemudian Token diisi token JWT yang dapat diambil saat login/register.
3. Bagian API yang terdapat params silahkan ikuti sesuai yang ada pada postman



