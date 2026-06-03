# Sari Tebu's Backend

> [!IMPORTANT]
> Proyek ini dibuat untuk tujuan pembelajaran, walaupun disini kami berusaha untuk mengikuti industry standard, kami merekomendasikan anda untuk tidak menggunakan proyek ini sebagai basis untuk production atau membawakan ekspektasi berlebihan terhadap proyek ini.

Sari Tebu merupakan aplikasi POS (*Point of Sale*) berbasis web. Frontend akan di render sisi klien (*Client-Side Rendering* / CSR) dikarenakan ini merupakan aplikasi *dashboard*, di mana SEO (*Search Engine Optimization*) tidak berperan penting.

Backend ini berjalan di atas runtime Node.js dengan framework Express, beserta prisma ORM (*Object Relational Mapper*). Authentikasi dengan JWT (*json web token*) dibantu oleh Bcrypt.

| Node | Express | MySQL | JWT | Bcrypt | Prisma | Docker |
|:----:|:-------:|:-----:|:---:|:------:|:------:|:------:|
| <a href="https://nodejs.org"><img height="128" width="128" src="./assets/node.js.svg" alt="Node.js" style="padding: 5px; border-radius: 4px;" /></a> | <a href="https://expressjs.com"><img height="128" width="128" src="./assets/express.svg" alt="Express" style="padding: 5px; border-radius: 4px;" /></a> | <a href="https://www.mysql.com"><img height="128" width="128" src="./assets/mysql.svg" alt="Mysql" style="padding: 5px; border-radius: 4px;" /></a> | <a href="https://www.jwt.io"><img height="128" width="128" src=https://cdn.simpleicons.org/jwt alt="JWT" style="padding: 5px; border-radius: 4px;" /></a> | <a href="https://www.npmjs.com/package/bcrypt"><img height="128" width="128" src=https://cdn.simpleicons.org/bcrypt alt="Bcrypt" style="padding: 5px; border-radius: 4px;" /></a> | <a href="https://www.prisma.io/"><img height="128" width="128" src="./assets/prisma.svg" alt="Prisma" style="padding: 5px; border-radius: 4px;" /></a> | <a href="https://www.docker.com/"><img height="128" width="128" src="./assets/docker.svg" alt="Docker" style="padding: 5px; border-radius: 4px;" /></a> |

## Installation

### Prerequisites

- **Node.js** v22.12.0 LTS (atau versi v22+ lainnya)
- **MySQL** v8.4+
- **Docker** 29+
- Pastikan telah copy file `.env.example` jadi `.env` dan `.env.prod`

### Local Development
1. **Install dependencies dan generate prisma client**
```sh
npm run setup
```

2. **Build docker container**
```sh
docker compose -f compose.dev.yaml up --build -d
```

3. **Jalankan server**
```sh
npm run dev
```

## Usage

| Command | Usage |
|:--------|:------|
| setup   | Menginstal dependencies dan generate Prisma Client |
| start | menjalankan aplikasi dalam prodcution stage |
| dev   | menjalankan aplikasi dalam development stage |
| test  | Menjalankan testing postman collection |
| db:deploy | Menerapkan migrasi yang belum dijalankan ke database dan generate Prisma Client |
| db:create | Membuat file migration berdasarkan perubahan pada schema.prisma |
| db:reset  | Menghapus semua tabel, membuat ulang database |
| lint     | memeriksa kualitas kode agar tidak broke kualitsas standar javascript |
| lint:fix | perbaiki kode yang dinyatakan bermasalah oleh linter |
| fmt       | format kode |
| fmt:check | periksa format kode |

> [!NOTE]  
> Usage `migrate:create` dikarenakan merupakan `prisma migrate dev --name` kamu perlu menambahkan `--` agar npm dapat menerima argumen tsb.

## Deployment

Untuk dokumentasi dan panduan mengenai langkah-langkah deployment, silakan ikuti instruksi pada [README DEPLOYMENT](../deployment/readme.md).

## Lisensi
Proyek ini dilisensikan di bawah Lisensi MIT - lihat [LICENSE](../LICENSE) untuk detailnya.