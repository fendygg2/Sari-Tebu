# Sari Tebu's Deployment

> [!IMPORTANT]
> Proyek ini dibuat untuk tujuan pembelajaran, walaupun disini kami berusaha untuk mengikuti industry standard, kami merekomendasikan anda untuk tidak menggunakan proyek ini sebagai basis untuk production atau membawakan ekspektasi berlebihan terhadap proyek ini.

| Git | Cloudflare | Caddy | Fedora | Docker |
|:---:|:----------:|:-----:|:------:|:------:|
| <a href="https://git-scm.com/"><img height="128" width="128" src="./assets/git.svg" alt="Git" style="padding: 5px; border-radius: 4px;" /></a> | <a href="https://cloudflare.com/"><img height="128" width="128" src="./assets/cloudflare.svg" alt="Cloudflare" style="padding: 5px; border-radius: 4px;" /></a> | <a href="https://caddyserver.com/"><img height="128" width="128" src="./assets/caddy.svg" alt="Caddy" style="padding: 5px; border-radius: 4px;" /></a> | <a href="https://fedoraproject.org/"><img height="128" width="128" src="./assets/fedora.svg" alt="Fedora" style="padding: 5px; border-radius: 4px;" /></a> | <a href="https://www.docker.com/"><img height="128" width="128" src="./assets/docker.svg" alt="Docker" style="padding: 5px; border-radius: 4px;" /></a> |

Server kami sekarang ini merupakan komputer pribadi di Medan, Sumatera utara dengan spesifikasi:
- OS: Fedora Linux 44 (Workstation Edition) x86_64
- Kernel: Linux 7.0.12-201.fc44.x86_64
- CPU: Intel(R) Core(TM) i7-2600 (8) @ 3.80 GHz
- Memory: 15.56 GiB
- Swap: 8.00 GiB
- Disk: 474.35 GiB - btrfs

> [!WARNING]
> Tiap kali mati lampu (cukup sering di pulau sumatera), maka server down namun akan restart dalam waktu secepatnya.

Dikarekan internet server ini berada pada ISP dibawah CGNAT, maka kami menggunakan cloudflare tunnel. dan Cloudflare sebagai reverse-proxy
yang mengaitkan container-container ke port yang dibutuhkan (:443, :80).

Dan dimana kami membuat cron job, yang akan mengeksekusikan script `./cd.sh` tiap menit, yang akan mengsinkron kan HEAD pada main remote branch
kepada production repo.

```sh
crontab -e
* * * * * /home/<user>/Sari-Tebu/deployment/cd.sh # mesti berupa absolute path
```

Dan dianjurkan untuk set konfigurasi ini pada docker daemon `/etc/docker/daemon.json` agar logs nya tidak bertambah terus menerus
memenuhi disk dan jalankan `sudo systemctl restart docker` untuk apply perubahan.

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "50m",
    "max-file": "5"
  }
}
```

Buat file ini `/etc/logrotate.d/sari-tebu` agar log yang dihasilkan tidak menumpuk
```sh
/home/<user>/Sari-Tebu/deployment.log {
    daily
    rotate 7
    compress
    missingok
    notifempty
    copytruncate
}
```