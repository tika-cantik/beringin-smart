-- MySQL dump 10.13  Distrib 8.4.3, for Win64 (x86_64)
--
-- Host: localhost    Database: beringin_smart_db
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`),
  KEY `failed_jobs_connection_queue_failed_at_index` (`connection`,`queue`,`failed_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` smallint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `laporans`
--

DROP TABLE IF EXISTS `laporans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `laporans` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lokasi` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kategori` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('Menunggu','Sedang Diproses','Selesai') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Menunggu',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `laporans_user_id_foreign` (`user_id`),
  CONSTRAINT `laporans_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laporans`
--

LOCK TABLES `laporans` WRITE;
/*!40000 ALTER TABLE `laporans` DISABLE KEYS */;
INSERT INTO `laporans` VALUES (1,2,'Rizky Alfianno (Siswa XI PPLG)','Lab Komputer 2','Laboratorium','AC ruangan tidak dingin dan komputer meja no. 5 mati total.','Selesai','2026-10-17 21:35:45','2026-10-18 20:24:25'),(2,2,'Rizky Alfianno (Siswa XI PPLG)','Ruang Kelas XI PPLG 1','Fasilitas Kelas','Proyektor infocus mati saat digunakan presentasi pelajaran.','Selesai','2026-10-17 21:35:45','2026-10-18 20:37:35'),(3,NULL,'Anonim','Ruang Praktik PPLG 1','Laboratorium','Konektor proyektor HDMI tidak menampilkan sinyal ke layar utama.','Selesai','2026-10-18 20:24:31','2026-10-18 20:30:57');
/*!40000 ALTER TABLE `laporans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2026_10_18_043159_create_personal_access_tokens_table',1),(5,'2026_10_18_043228_create_laporans_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',1,'beringin-token','1f027d3b9b63c7d2b0ec9db4415fe557b9c06e86bac9f89eb8233a69d848cf37','[\"*\"]',NULL,NULL,'2026-10-17 21:53:34','2026-10-17 21:53:34'),(2,'App\\Models\\User',1,'beringin-token','22630a035a440a813295fb39de0588a33deffb957a0340c088cb71d47de3ee49','[\"*\"]',NULL,NULL,'2026-10-17 21:53:44','2026-10-17 21:53:44'),(3,'App\\Models\\User',1,'beringin-token','e437c4758133ccfb0ac42063c3edc19ada118b210c442176ba40676bd018cd2b','[\"*\"]',NULL,NULL,'2026-10-17 21:54:47','2026-10-17 21:54:47'),(4,'App\\Models\\User',1,'beringin-token','5eeb7c9d52d868ec6545cb7430a68b4437ff210190ade1b304d449d42c95a894','[\"*\"]',NULL,NULL,'2026-10-17 22:48:29','2026-10-17 22:48:29'),(5,'App\\Models\\User',1,'beringin-token','b2c8b5ad4fca0473b2dfd3b724ed18e314eb75a348b0ad24e82fb26a6698d03d','[\"*\"]',NULL,NULL,'2026-10-17 22:51:17','2026-10-17 22:51:17'),(6,'App\\Models\\User',1,'beringin-token','0566897e4637c2f5f7ea2bf2e2ce9f7fdfda181a68325f5357700f15c2fc73ed','[\"*\"]',NULL,NULL,'2026-10-17 22:51:41','2026-10-17 22:51:41'),(7,'App\\Models\\User',1,'beringin-token','a6f563a73bc24c571f2281ade7f76cf7f712d0fcbf9e8e15fe87ed1683a7ffa9','[\"*\"]',NULL,NULL,'2026-10-17 22:52:01','2026-10-17 22:52:01'),(8,'App\\Models\\User',2,'beringin-token','2994e27e90e16652c065cb40e9e95c368b26096b1f43def5aec09e9396e50c30','[\"*\"]',NULL,NULL,'2026-10-17 22:52:36','2026-10-17 22:52:36'),(9,'App\\Models\\User',2,'beringin-token','a79ef87ba3bce5dc598713eba6b3f96816abdb01996b770a987387ee46ff0c61','[\"*\"]',NULL,NULL,'2026-10-17 22:53:35','2026-10-17 22:53:35'),(10,'App\\Models\\User',2,'beringin-token','d253e587568b60a1601dc3ce31c5056597d02fde1fef70988107779d835409ce','[\"*\"]',NULL,NULL,'2026-10-17 22:56:43','2026-10-17 22:56:43'),(11,'App\\Models\\User',1,'beringin-token','033904a8054d29d5eaf2f090d4479cb5e0399f882cc168cd03a6fd995621d468','[\"*\"]',NULL,NULL,'2026-10-17 23:09:25','2026-10-17 23:09:25'),(12,'App\\Models\\User',1,'beringin-token','272df7c4cb970f0c4485cc7e44db905ab143ea9c0440be3d55e4bcf8db885ead','[\"*\"]',NULL,NULL,'2026-10-17 23:10:35','2026-10-17 23:10:35'),(13,'App\\Models\\User',1,'beringin-token','60f5c147b1313b7c30949ba9a3f78aebeeb4507bd4d1d0daf5774b8a75357c16','[\"*\"]',NULL,NULL,'2026-10-18 01:13:05','2026-10-18 01:13:05'),(14,'App\\Models\\User',1,'beringin-token','4ac3502ff2600de93455f4e045349b8d00c2ca0e8790d063c58604226c0a6edf','[\"*\"]',NULL,NULL,'2026-10-18 01:25:51','2026-10-18 01:25:51'),(15,'App\\Models\\User',1,'beringin-token','695fcd13ef5bcffcb9053e550afab287b7007bd84967ed8e7fb87e19f3f251c6','[\"*\"]',NULL,NULL,'2026-10-18 01:35:27','2026-10-18 01:35:27'),(16,'App\\Models\\User',1,'beringin-token','dddf92fd7964873f7caa0baec6de942e59dc2eea40b6421a30aed75a1a5b4c63','[\"*\"]',NULL,NULL,'2026-10-18 01:39:38','2026-10-18 01:39:38'),(17,'App\\Models\\User',1,'beringin-token','b86ca40e98493a54722c5d3839b8d10b465bc446b5e1b88a13319074c8d2eb6f','[\"*\"]',NULL,NULL,'2026-10-18 01:45:46','2026-10-18 01:45:46'),(18,'App\\Models\\User',2,'beringin-token','4f1ef31185559f0c31f93967a32e6eae32b96e9235afc258d3cbaaedca18775a','[\"*\"]',NULL,NULL,'2026-10-18 01:53:42','2026-10-18 01:53:42'),(19,'App\\Models\\User',1,'beringin-token','640f21c58afecf044f183bec4f7ac385e5955d65d2bbe5cdfbb889deebc5674c','[\"*\"]',NULL,NULL,'2026-10-18 03:55:10','2026-10-18 03:55:10'),(20,'App\\Models\\User',1,'beringin-token','170a4a98e983e8d318e983c12138ff93abb48e97456cce221e2d8bcb9bb9c505','[\"*\"]',NULL,NULL,'2026-10-18 20:23:54','2026-10-18 20:23:54'),(21,'App\\Models\\User',2,'beringin-token','e9595d9b3bce731ae661e04d499f136ef5c592e6f53843627e5c363cae51aaa6','[\"*\"]',NULL,NULL,'2026-10-18 20:24:00','2026-10-18 20:24:00'),(22,'App\\Models\\User',2,'beringin-token','b0c3ff0b17780f3517c3e7cdd1fd85c0dae8fa97f50dff4fd2b27151a0192bbd','[\"*\"]','2026-10-18 20:24:18',NULL,'2026-10-18 20:24:17','2026-10-18 20:24:18'),(23,'App\\Models\\User',1,'beringin-token','2d196866588bf25a0f13ce259d2df6f8381a04425cd76091fa8c47fd15fc48d0','[\"*\"]','2026-10-18 20:24:25',NULL,'2026-10-18 20:24:24','2026-10-18 20:24:25'),(24,'App\\Models\\User',2,'beringin-token','e868ede6f9a4d8f6846a7c61fbf62153d798a3423585759e7e3d9824134e9d7e','[\"*\"]',NULL,NULL,'2026-10-18 20:25:15','2026-10-18 20:25:15'),(25,'App\\Models\\User',1,'beringin-token','b5a21f6e0a08e1b9df0999b9707e935a996caa36e9652fa9665cc4a6d0b35942','[\"*\"]',NULL,NULL,'2026-10-18 20:25:37','2026-10-18 20:25:37'),(26,'App\\Models\\User',2,'beringin-token','831b7e7ffa8ba0d2e20ad0740750914f6d7974af92ec5028380a1ea4280c0087','[\"*\"]',NULL,NULL,'2026-10-18 20:30:26','2026-10-18 20:30:26'),(27,'App\\Models\\User',1,'beringin-token','e3b0eb3253bef1df4fead9330d9e6ac6991c9f8a576d1ea56006099157106188','[\"*\"]','2026-10-18 20:30:56',NULL,'2026-10-18 20:30:48','2026-10-18 20:30:56'),(28,'App\\Models\\User',2,'beringin-token','91718ac734b8864c247b643b1392077997164aa99c3473c81f4d8419b313960a','[\"*\"]',NULL,NULL,'2026-10-18 20:34:31','2026-10-18 20:34:31'),(29,'App\\Models\\User',1,'beringin-token','eec1bc279a3b8d814eb791fb0d1ccc3d7e41bd45e4894ff8860332e24692d9cb','[\"*\"]',NULL,NULL,'2026-10-18 20:34:54','2026-10-18 20:34:54'),(30,'App\\Models\\User',3,'beringin-token','6032efcb5c4f4bb55dbf78c742b1504d2a2da7624e0b95005af1c554882acf7e','[\"*\"]',NULL,NULL,'2026-10-18 20:35:20','2026-10-18 20:35:20'),(31,'App\\Models\\User',4,'beringin-token','f32be7ac738a30142f8fd891eac0a7e94a6fc09a3fee242ac6967a0ac1b56961','[\"*\"]',NULL,NULL,'2026-10-18 20:35:45','2026-10-18 20:35:45'),(32,'App\\Models\\User',2,'beringin-token','5095b6f1576191bc5453177af35d7cdec6b1968bc27b9f57348375375411ad12','[\"*\"]',NULL,NULL,'2026-10-18 20:36:56','2026-10-18 20:36:56'),(33,'App\\Models\\User',1,'beringin-token','e6853f41eae89dadec9c1e409289572c59bd8a06ba1d697ccd4ae7fff6eb06b8','[\"*\"]','2026-10-18 20:37:35',NULL,'2026-10-18 20:37:24','2026-10-18 20:37:35'),(34,'App\\Models\\User',3,'beringin-token','59fd0e96979d9e18983b5868587cfbf4459ed0305a81b2a6078ddb7b2fac5217','[\"*\"]',NULL,NULL,'2026-10-18 20:37:59','2026-10-18 20:37:59'),(35,'App\\Models\\User',1,'beringin-token','cd93f297770cc4a0b831bc3358cf22a56df9eb94e391b38c54f479080fb567ef','[\"*\"]',NULL,NULL,'2026-10-18 20:38:21','2026-10-18 20:38:21'),(36,'App\\Models\\User',4,'beringin-token','d9f3c2c3b3e49612cad9a2eea14ff32c844f2e50f70557f3c7c0a7c26e04a989','[\"*\"]',NULL,NULL,'2026-10-18 20:38:50','2026-10-18 20:38:50'),(37,'App\\Models\\User',1,'beringin-token','cd4fefda262d3ad8d5f8bdc6be7241b4c293025c442aa270a012e53eb3b74096','[\"*\"]',NULL,NULL,'2026-10-18 20:39:13','2026-10-18 20:39:13'),(38,'App\\Models\\User',2,'beringin-token','2f6c4b0f5e4ef5d8c4b9f5927c204bde2fac78e460e6f7c76f31b91d5675acc5','[\"*\"]',NULL,NULL,'2026-10-19 00:10:52','2026-10-19 00:10:52'),(39,'App\\Models\\User',2,'beringin-token','8683bc1cba3e9541c59ec3b944a904c0c7fb10127d342a54cf07ee183903c177','[\"*\"]',NULL,NULL,'2026-10-19 00:22:53','2026-10-19 00:22:53');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('siswa','petugas') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'siswa',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Pak Budi (Petugas Sarpras)','petugas@beringin.sch.id',NULL,'$2y$12$4EcukCuQHZsZ1gDZNUf/FO6vizDOG3DckDdp2T47VQnT5KtFxdrgu','petugas',NULL,'2026-10-17 21:35:45','2026-10-18 20:27:38'),(2,'Rizky Alfianno (Siswa XI PPLG)','siswa@beringin.sch.id',NULL,'$2y$12$GvPfeQgrC3RdQacZSr.0KuFT/ln/W1jTP8M6gwVnDHenn32djPxKW','siswa',NULL,'2026-10-17 21:35:45','2026-10-18 20:27:39'),(3,'Indah Chintya (Siswa XI PPLG)','indah@beringin.sch.id',NULL,'$2y$12$4HnB184OpkJUzqnL8Kq6Du5H6Y0HckZzx9ubKb42aOR5xdZrkeCYO','siswa',NULL,'2026-10-18 20:27:39','2026-10-18 20:27:39'),(4,'Clara Savira (Siswa XI PPLG)','clara@beringin.sch.id',NULL,'$2y$12$Ckb477R6iIJm6bFwKGtQKugXa2w4d.bkYEdwGIRYuXXKcQyfA6oHO','siswa',NULL,'2026-10-18 20:27:40','2026-10-18 20:27:40');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-19 14:24:42
