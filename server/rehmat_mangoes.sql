-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2026 at 02:09 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rehmat_mangoes`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `image` text NOT NULL,
  `size` varchar(50) DEFAULT 'small'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `subtitle`, `tag`, `image`, `size`) VALUES
(1, 'Sindhri', 'Sweet Mango', 'Fresh', 'https://images.unsplash.com/photo-1553279768-865429fa0078', 'large'),
(2, 'Chaunsa', 'Juicy Mango', 'Popular', 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716', 'small'),
(3, 'Anwar Ratol', 'Premium Taste', 'Best Seller', 'https://images.unsplash.com/photo-1591073113125-e46713c829ed', 'small'),
(5, 'Anwar ratool', 'Aromatic', 'Fresh', 'https://www.mangonation.pk/wp-content/uploads/2019/08/Mangonation.pk-%E2%80%93-Export-Quality-Mango-Delivery-Service-Pakistan-anwar-ratol-no-12-600x600.jpg', 'small'),
(6, 'Anwar ratol', 'Aromatic', 'Fresh', 'data:image/jpeg;base64,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', 'small');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `image`, `description`, `category_id`) VALUES
(1, 'Sindhri Mango Box', 2500.00, 'https://i.pinimg.com/736x/9f/d3/56/9fd35600b18adf1af1231484f4fefc34.jpg', 'Fresh Sindhri Mangoes', 1),
(2, 'Chaunsa Mango Box', 3000.00, 'https://i.pinimg.com/736x/39/e4/fe/39e4fe1aba1f894fd3e69dd9665cab00.jpg', 'Fresh Chaunsa Mangoes', 2),
(3, 'Anwar Ratol Box', 2800.00, 'https://i.pinimg.com/1200x/45/b0/56/45b0569d684f414fe94156bd02e42681.jpg', 'Sweet Anwar Ratol', 3),
(4, 'Langra Mango Box', 2600.00, 'https://i.pinimg.com/736x/bd/80/ed/bd80ed6e3c12eb654d2fc197edfd63ad.jpg', 'Fresh Langra Mangoes', 4),
(5, 'Sindhri', 250.00, 'https://i.ibb.co/gbBgLqz7/Mango-Sindhri.jpg', 'King of Mangoes', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
