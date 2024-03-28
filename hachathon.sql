-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 28, 2024 at 08:34 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hachathon`
--

-- --------------------------------------------------------

--
-- Table structure for table `blocks`
--

CREATE TABLE `blocks` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `resources` varchar(255) NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  `text_color` varchar(255) DEFAULT NULL,
  `road_map_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `block_images`
--

CREATE TABLE `block_images` (
  `id` int(11) NOT NULL,
  `file_name` varchar(250) NOT NULL,
  `originalname` varchar(255) NOT NULL,
  `block_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `createdAt`) VALUES
(1, 'Mobile Development', 'Creating applications for mobile devices.', '2024-03-28 19:27:30'),
(2, 'Data Science', 'Analyzing and interpreting complex data to aid in decision-making.', '2024-03-28 19:27:30'),
(3, 'Machine Learning', 'Field of artificial intelligence that uses statistical techniques to give computer systems the ability to learn.', '2024-03-28 19:27:30'),
(4, 'Cybersecurity', 'Protecting computer systems and networks from theft or damage to their hardware, software, or electronic data.', '2024-03-28 19:27:30'),
(5, 'Cloud Computing', 'Using a network of remote servers hosted on the Internet to store, manage, and process data.', '2024-03-28 19:27:30'),
(6, 'DevOps', 'Combines software development and IT operations with the goal of shortening the systems development life cycle.', '2024-03-28 19:27:30'),
(7, 'Internet of Things (IoT)', 'Interconnected devices that collect and share data for improved efficiency.', '2024-03-28 19:27:30'),
(8, 'Augmented Reality', 'Enhances the real world with computer-generated information.', '2024-03-28 19:27:30'),
(9, 'Virtual Reality', 'Immerses the user in a fully artificial digital environment.', '2024-03-28 19:27:30'),
(10, 'Blockchain', 'Decentralized and distributed digital ledger technology.', '2024-03-28 19:27:30'),
(11, 'UI/UX Design', 'Enhancing user satisfaction by improving usability and accessibility.', '2024-03-28 19:27:30'),
(12, 'Product Management', 'Overseeing the development and marketing of a product.', '2024-03-28 19:27:30'),
(13, 'Big Data', 'Refers to the large volume of structured and unstructured data that inundates a business on a day-to-day basis.', '2024-03-28 19:27:30'),
(14, 'Digital Marketing', 'Promoting products or brands using electronic devices or the internet.', '2024-03-28 19:27:30'),
(15, 'Artificial Intelligence', 'Simulating human intelligence processes by machines.', '2024-03-28 19:27:30'),
(16, 'E-commerce', 'Buying and selling goods and services over the internet.', '2024-03-28 19:27:30'),
(17, 'Robotics', 'Design, construction, operation, and use of robots.', '2024-03-28 19:27:30'),
(18, 'Game Development', 'Creating video games for various platforms.', '2024-03-28 19:27:30'),
(19, 'UI Test Automation', 'Automating user interface tests to improve software quality.', '2024-03-28 19:27:30'),
(20, 'AR/VR Development', 'Creating applications using augmented reality or virtual reality technologies.', '2024-03-28 19:27:30');

-- --------------------------------------------------------

--
-- Table structure for table `refresh_token`
--

CREATE TABLE `refresh_token` (
  `id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `refresh_token` varchar(1000) DEFAULT NULL,
  `deviceId` varchar(255) NOT NULL,
  `ip` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `road_maps`
--

CREATE TABLE `road_maps` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `sharedBy` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `user_name`, `password`, `avatar`, `createdAt`, `updatedAt`) VALUES
(1, 'user1', 'user1', '$2a$12$szEbmG0zK1/bD6J8TvYGn.mJc/zv7YG/jYqiCiSvLzd8w3MsOjMty', NULL, '2024-03-28 19:27:30', '2024-03-28 19:27:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blocks`
--
ALTER TABLE `blocks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `road_map_id` (`road_map_id`);

--
-- Indexes for table `block_images`
--
ALTER TABLE `block_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `block_id` (`block_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `refresh_token`
--
ALTER TABLE `refresh_token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `u_id` (`u_id`);

--
-- Indexes for table `road_maps`
--
ALTER TABLE `road_maps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sharedBy` (`sharedBy`),
  ADD KEY `category` (`category`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_user_name_unique` (`user_name`),
  ADD UNIQUE KEY `username_index` (`user_name`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blocks`
--
ALTER TABLE `blocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `block_images`
--
ALTER TABLE `block_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `refresh_token`
--
ALTER TABLE `refresh_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `road_maps`
--
ALTER TABLE `road_maps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blocks`
--
ALTER TABLE `blocks`
  ADD CONSTRAINT `blocks_ibfk_1` FOREIGN KEY (`road_map_id`) REFERENCES `road_maps` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `block_images`
--
ALTER TABLE `block_images`
  ADD CONSTRAINT `block_images_ibfk_1` FOREIGN KEY (`block_id`) REFERENCES `blocks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `refresh_token`
--
ALTER TABLE `refresh_token`
  ADD CONSTRAINT `refresh_token_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `road_maps`
--
ALTER TABLE `road_maps`
  ADD CONSTRAINT `road_maps_ibfk_1` FOREIGN KEY (`sharedBy`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `road_maps_ibfk_2` FOREIGN KEY (`category`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
