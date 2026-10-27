<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Laporan;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Akun Petugas Sarpras
        $petugas = User::create([
            'name' => 'Pak Hendra (Petugas Sarpras)',
            'email' => 'petugas@beringin.sch.id',
            'password' => Hash::make('password123'),
            'role' => 'petugas',
        ]);

        // 2. Akun Siswa Utama (Tika Pratama)
        $tika = User::create([
            'name' => 'Tika Pratama (XI PPLG 1)',
            'email' => 'tika@beringin.sch.id',
            'password' => Hash::make('password123'),
            'role' => 'siswa',
        ]);

        // 3. Akun Siswa Pendukung
        $dimas = User::create([
            'name' => 'Dimas Prasetyo (XI PPLG 2)',
            'email' => 'siswa@beringin.sch.id',
            'password' => Hash::make('password123'),
            'role' => 'siswa',
        ]);

        // 4. Data Awal Laporan Pengaduan Sarpras SMKN 1 Beringin (Edisi Tika Pratama)
        Laporan::create([
            'user_id' => $tika->id,
            'judul' => 'Gagang Pintu Toilet Siswa Lantai 2 Patah',
            'deskripsi' => 'Gagang pintu toilet siswa putra di lantai 2 patah sehingga sering terkunci dari dalam dan membahayakan siswa saat jam istirahat.',
            'lokasi' => 'Toilet Siswa Putra Lantai 2 Gedung Utama',
            'kategori' => 'Fasilitas Umum',
            'foto' => null,
            'status' => 'diproses',
        ]);

        Laporan::create([
            'user_id' => $dimas->id,
            'judul' => 'Kabel LAN & Switch Hub Lab Jaringan Sering Disconnect',
            'deskripsi' => 'Switch hub rack 2 di Lab Jaringan sering mati mendadak saat praktikum Cisco, beberapa kabel patch cord RJ-45 juga sudah getas.',
            'lokasi' => 'Lab Komputer & Jaringan Gedung C Lt. 2',
            'kategori' => 'Lab & Bengkel',
            'foto' => null,
            'status' => 'selesai',
        ]);

        Laporan::create([
            'user_id' => $tika->id,
            'judul' => 'Kipas Angin Dinding Ruang Teori 3 Bergetar Kencang & Bau Gosong',
            'deskripsi' => 'Kipas angin dinding bagian belakang berbunyi mendengung keras dan mengeluarkan aroma panas/gosong saat dinyalakan.',
            'lokasi' => 'Ruang Teori 3 (Kelas XI PPLG 1)',
            'kategori' => 'Ruang Belajar',
            'foto' => null,
            'status' => 'menunggu',
        ]);
    }
}
