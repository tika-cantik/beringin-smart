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

        // 2. Akun Siswa Utama
        $siswa = User::create([
            'name' => 'Tika Pratama (XI PPLG 1)',
            'email' => 'tika@beringin.sch.id',
            'password' => Hash::make('password123'),
            'role' => 'siswa',
        ]);

        // 3. Akun Siswa Pendukung
        $teman = User::create([
            'name' => 'Dimas Prasetyo (XI PPLG 2)',
            'email' => 'siswa@beringin.sch.id',
            'password' => Hash::make('password123'),
            'role' => 'siswa',
        ]);

        // 4. Data Awal Laporan Pengaduan Sarpras (Edisi Tika)
        Laporan::create([
            'user_id' => $siswa->id,
            'nama' => 'Gagang Pintu Toilet Siswa Lantai 2 Patah',
            'lokasi' => 'Toilet Siswa Putra Lantai 2 Gedung Utama',
            'kategori' => 'Lingkungan/Taman',
            'deskripsi' => 'Gagang pintu toilet siswa putra di lantai 2 patah sehingga sering terkunci dari dalam dan membahayakan siswa saat jam istirahat.',
            'status' => 'Sedang Diproses',
        ]);

        Laporan::create([
            'user_id' => $teman->id,
            'nama' => 'Kabel LAN & Switch Hub Lab Jaringan Sering Disconnect',
            'lokasi' => 'Lab Komputer & Jaringan Gedung C Lt. 2',
            'kategori' => 'Laboratorium',
            'deskripsi' => 'Switch hub rack 2 di Lab Jaringan sering mati mendadak saat praktikum Cisco, beberapa kabel patch cord RJ-45 juga sudah getas.',
            'status' => 'Selesai',
        ]);

        Laporan::create([
            'user_id' => $siswa->id,
            'nama' => 'Kipas Angin Dinding Ruang Teori 3 Bergetar Kencang & Bau Gosong',
            'lokasi' => 'Ruang Teori 3 (Kelas XI PPLG 1)',
            'kategori' => 'Fasilitas Kelas',
            'deskripsi' => 'Kipas angin dinding bagian belakang berbunyi mendengung keras dan mengeluarkan aroma panas/gosong saat dinyalakan.',
            'status' => 'Menunggu',
        ]);
    }
}
