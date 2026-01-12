DROP SCHEMA IF EXISTS `expensetrackerdb`; 
CREATE SCHEMA `expensetrackerdb`; 
USE `expensetrackerdb`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: expensetrackerdb
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `expense`
--

DROP TABLE IF EXISTS `expense`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expense` (
  `user_id` int NOT NULL,
  `expense_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` date NOT NULL,
  `category_type` enum('Food','Transportation','Housing','Utilities','Health','Entertainment','Personal','Financial','Other') NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`expense_id`),
  CONSTRAINT `fk_Expense_User` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense`
--

LOCK TABLES `expense` WRITE;
/*!40000 ALTER TABLE `expense` DISABLE KEYS */;
INSERT INTO `expense` VALUES (1,1,400.00,'2025-01-05','Housing','Rent Jan'),(1,2,80.00,'2025-01-10','Food','Groceries Jan'),(1,3,400.00,'2025-02-05','Housing','Rent Feb'),(1,4,90.00,'2025-02-12','Food','Groceries Feb'),(1,5,400.00,'2025-03-05','Housing','Rent Mar'),(1,6,85.00,'2025-03-15','Food','Groceries Mar'),(2,1,50.00,'2025-01-15','Transportation','Gas Station'),(2,2,50.00,'2025-02-15','Transportation','Gas Station'),(2,3,50.00,'2025-03-15','Transportation','Gas Station'),(2,4,25.00,'2025-01-18','Personal','Makeup'),(3,1,300.00,'2025-01-20','Food','Client Dinner Jan'),(3,2,1000.00,'2025-03-10','Financial','Bond Investment'),(3,3,40.00,'2025-02-21','Transportation','Luxury Ride'),(4,1,120.00,'2025-01-15','Utilities','Electric Bill'),(4,2,110.00,'2025-02-15','Utilities','Electric Bill'),(4,3,105.00,'2025-03-15','Utilities','Electric Bill'),(4,4,14.00,'2025-01-01','Entertainment','Monthly Sub'),(5,1,5.00,'2025-01-01','Food','Coffee'),(5,2,5.00,'2025-02-01','Food','Coffee'),(5,3,5.00,'2025-03-01','Food','Coffee'),(5,4,35.00,'2025-01-15','Transportation','Bus Pass'),(6,1,1200.00,'2025-01-05','Personal','New iPhone'),(6,2,25.00,'2025-02-12','Food','Office Lunch'),(6,3,30.00,'2025-03-12','Food','Office Lunch'),(7,1,350.00,'2025-01-01','Housing','Rent Jan'),(7,2,350.00,'2025-02-01','Housing','Rent Feb'),(7,3,350.00,'2025-03-01','Housing','Rent Mar'),(7,4,50.00,'2025-01-05','Health','Gym Membership'),(8,1,60.00,'2025-01-10','Health','Dentist'),(8,2,25.00,'2025-02-12','Health','Vitamins'),(8,3,30.00,'2025-03-10','Health','Checkup'),(9,1,70.00,'2025-01-12','Entertainment','New RPG'),(9,2,20.00,'2025-02-15','Entertainment','DLC Pack'),(9,3,60.00,'2025-03-05','Entertainment','Pre-order'),(10,1,200.00,'2025-01-05','Food','Shopping Jan'),(10,2,180.00,'2025-02-05','Food','Shopping Feb'),(10,3,210.00,'2025-03-05','Food','Shopping Mar'),(11,1,400.00,'2025-01-18','Transportation','Car Repair'),(11,2,15.00,'2025-02-19','Transportation','Attiki Odos'),(12,1,60.00,'2025-01-10','Other','Software Sub'),(12,2,60.00,'2025-02-10','Other','Software Sub'),(12,3,60.00,'2025-03-10','Other','Software Sub'),(13,1,10.00,'2025-01-01','Entertainment','Music Sub'),(13,2,10.00,'2025-02-01','Entertainment','Music Sub'),(13,3,10.00,'2025-03-01','Entertainment','Music Sub'),(14,1,120.00,'2025-01-14','Personal','Haircut'),(14,2,40.00,'2025-03-20','Personal','Manicure'),(15,1,45.00,'2025-01-20','Utilities','Phone Bill'),(15,2,45.00,'2025-02-20','Utilities','Phone Bill'),(15,3,45.00,'2025-03-20','Utilities','Phone Bill'),(16,1,30.00,'2025-01-11','Entertainment','Novel'),(16,2,20.00,'2025-03-10','Food','Coffee'),(17,1,50.00,'2025-01-26','Entertainment','Drinks'),(17,2,20.00,'2025-02-27','Entertainment','Entry Fee'),(18,1,60.00,'2025-01-05','Other','Dog Food'),(18,2,60.00,'2025-02-05','Other','Dog Food'),(18,3,60.00,'2025-03-05','Other','Dog Food'),(19,1,150.00,'2025-01-10','Entertainment','Tent'),(19,2,80.00,'2025-02-15','Transportation','Boat Ticket'),(20,1,15000.00,'2025-01-10','Transportation','New Car'),(20,2,600.00,'2025-01-11','Financial','Car Insurance'),(21,1,90.00,'2025-01-05','Food','Weekly Supplies'),(21,2,85.00,'2025-02-05','Food','Weekly Supplies'),(21,3,30.00,'2025-03-10','Food','Market'),(22,1,20.00,'2025-01-20','Other','Donation'),(22,2,20.00,'2025-02-20','Other','Donation'),(22,3,20.00,'2025-03-20','Other','Donation'),(23,1,150.00,'2025-01-12','Personal','Headphones'),(23,2,30.00,'2025-03-15','Personal','Cables'),(24,1,300.00,'2025-01-15','Other','English School'),(24,2,300.00,'2025-02-15','Other','English School'),(24,3,300.00,'2025-03-15','Other','English School'),(25,1,400.00,'2025-01-15','Transportation','Flight NYC'),(25,2,200.00,'2025-01-17','Personal','Gifts');
/*!40000 ALTER TABLE `expense` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expense_subcategory`
--

DROP TABLE IF EXISTS `expense_subcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expense_subcategory` (
  `user_id` int NOT NULL,
  `expense_id` int NOT NULL,
  `subcategory_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`expense_id`,`subcategory_id`),
  KEY `fk_ExpSub_Subcategory` (`user_id`,`subcategory_id`),
  CONSTRAINT `fk_ExpSub_Expense` FOREIGN KEY (`user_id`, `expense_id`) REFERENCES `expense` (`user_id`, `expense_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ExpSub_Subcategory` FOREIGN KEY (`user_id`, `subcategory_id`) REFERENCES `subcategory` (`user_id`, `subcategory_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expense_subcategory`
--

LOCK TABLES `expense_subcategory` WRITE;
/*!40000 ALTER TABLE `expense_subcategory` DISABLE KEYS */;
INSERT INTO `expense_subcategory` VALUES (1,2,1),(1,4,1),(1,6,1),(2,1,2),(2,2,3),(2,3,3),(5,1,1),(5,2,1),(5,3,1),(7,4,1),(10,1,1),(10,2,1),(10,3,1),(12,1,1),(12,2,1),(12,3,1),(13,1,1),(13,2,1),(13,3,1),(15,1,1),(15,2,1),(15,3,1),(18,1,1),(18,2,1),(18,3,1),(24,1,2),(24,2,2),(24,3,2);
/*!40000 ALTER TABLE `expense_subcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goal`
--

DROP TABLE IF EXISTS `goal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goal` (
  `user_id` int NOT NULL,
  `goal_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `target_amount` decimal(10,2) NOT NULL,
  PRIMARY KEY (`user_id`,`goal_id`),
  CONSTRAINT `fk_Goal_User` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goal`
--

LOCK TABLES `goal` WRITE;
/*!40000 ALTER TABLE `goal` DISABLE KEYS */;
INSERT INTO `goal` VALUES (1,1,'New Car',8000.00),(1,2,'New Phone',1200.00),(2,1,'Paris Trip',1500.00),(3,1,'House Downpayment',20000.00),(5,1,'Master Degree',4000.00),(6,1,'MacBook Pro',2500.00),(6,2,'External Monitor',500.00),(7,1,'OLED TV',1200.00),(7,2,'New bike',3200.00),(10,1,'Wedding',10000.00),(11,1,'Mountain Bike',800.00),(13,1,'Summer Vacation',600.00),(15,1,'Gaming PC',1500.00),(15,2,'Gaming Chair',500.00),(16,1,'Concert Tickets',200.00),(17,1,'Electric Guitar',600.00),(18,1,'Home Renovation',5000.00),(20,1,'Pay off Car Loan',5000.00),(21,1,'New Smartphone',1000.00),(21,2,'Smartwatch',300.00),(22,1,'Charity Fund',500.00),(23,1,'Drone',800.00),(24,1,'Kids Furniture',2000.00),(25,1,'World Tour',15000.00);
/*!40000 ALTER TABLE `goal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `income`
--

DROP TABLE IF EXISTS `income`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `income` (
  `user_id` int NOT NULL,
  `income_id` int NOT NULL,
  `income_source` enum('Salary','Gift','Rent','Investments','Other') NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` date NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`income_id`),
  CONSTRAINT `fk_Income_User` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `income`
--

LOCK TABLES `income` WRITE;
/*!40000 ALTER TABLE `income` DISABLE KEYS */;
INSERT INTO `income` VALUES (1,1,'Salary',1200.00,'2025-01-01','Salary Jan'),(1,2,'Salary',1200.00,'2025-02-01','Salary Feb'),(1,3,'Salary',1200.00,'2025-03-01','Salary Mar'),(2,1,'Salary',950.00,'2025-01-01','Salary Jan'),(2,2,'Salary',950.00,'2025-02-01','Salary Feb'),(2,3,'Salary',950.00,'2025-03-01','Salary Mar'),(3,1,'Investments',3000.00,'2025-01-10','Dividend Q1'),(3,2,'Rent',500.00,'2025-01-05','Airbnb Jan'),(3,3,'Rent',500.00,'2025-02-05','Airbnb Feb'),(3,4,'Rent',500.00,'2025-03-05','Airbnb Mar'),(4,1,'Salary',1500.00,'2025-01-01','Salary Jan'),(4,2,'Salary',1500.00,'2025-02-01','Salary Feb'),(4,3,'Salary',1500.00,'2025-03-01','Salary Mar'),(5,1,'Other',600.00,'2025-01-05','Allowance Jan'),(5,2,'Other',600.00,'2025-02-05','Allowance Feb'),(5,3,'Other',600.00,'2025-03-05','Allowance Mar'),(6,1,'Salary',2000.00,'2025-01-01','Salary Jan'),(6,2,'Salary',2000.00,'2025-02-01','Salary Feb'),(6,3,'Salary',2000.00,'2025-03-01','Salary Mar'),(7,1,'Rent',450.00,'2025-01-02','Rent Jan'),(7,2,'Rent',450.00,'2025-02-02','Rent Feb'),(7,3,'Rent',450.00,'2025-03-02','Rent Mar'),(8,1,'Salary',800.00,'2025-01-01','Part-time Jan'),(8,2,'Salary',800.00,'2025-02-01','Part-time Feb'),(8,3,'Salary',800.00,'2025-03-01','Part-time Mar'),(9,1,'Gift',100.00,'2025-01-20','Gift'),(9,2,'Salary',500.00,'2025-02-01','Salary Feb'),(9,3,'Salary',500.00,'2025-03-01','Salary Mar'),(10,1,'Salary',1100.00,'2025-01-01','Salary Jan'),(10,2,'Salary',1100.00,'2025-02-01','Salary Feb'),(10,3,'Salary',1100.00,'2025-03-01','Salary Mar'),(11,1,'Salary',1800.00,'2025-01-01','Salary Jan'),(11,2,'Salary',1800.00,'2025-02-01','Salary Feb'),(11,3,'Salary',1800.00,'2025-03-01','Salary Mar'),(12,1,'Other',1200.00,'2025-01-15','Freelance Jan'),(12,2,'Other',1200.00,'2025-02-15','Freelance Feb'),(12,3,'Other',800.00,'2025-03-15','Freelance Mar'),(13,1,'Salary',750.00,'2025-01-01','Salary Jan'),(13,2,'Salary',750.00,'2025-02-01','Salary Feb'),(13,3,'Salary',750.00,'2025-03-01','Salary Mar'),(14,1,'Salary',2500.00,'2025-01-01','Salary Jan'),(14,2,'Salary',2500.00,'2025-02-01','Salary Feb'),(14,3,'Salary',2500.00,'2025-03-01','Salary Mar'),(15,1,'Salary',1000.00,'2025-01-01','Salary Jan'),(15,2,'Salary',1000.00,'2025-02-01','Salary Feb'),(15,3,'Salary',1000.00,'2025-03-01','Salary Mar'),(16,1,'Gift',500.00,'2025-01-01','Pocket Money Jan'),(16,2,'Gift',500.00,'2025-02-01','Pocket Money Feb'),(16,3,'Gift',500.00,'2025-03-01','Pocket Money Mar'),(17,1,'Salary',1300.00,'2025-01-01','Salary Jan'),(17,2,'Salary',1300.00,'2025-02-01','Salary Feb'),(17,3,'Salary',1300.00,'2025-03-01','Salary Mar'),(18,1,'Rent',300.00,'2025-01-05','Rent Jan'),(18,2,'Rent',300.00,'2025-02-05','Rent Feb'),(18,3,'Rent',300.00,'2025-03-05','Rent Mar'),(19,1,'Salary',900.00,'2025-01-01','Salary Jan'),(19,2,'Salary',900.00,'2025-02-01','Salary Feb'),(19,3,'Salary',900.00,'2025-03-01','Salary Mar'),(20,1,'Other',2000.00,'2025-01-10','Car Sale'),(20,2,'Salary',1200.00,'2025-02-01','New Job Salary'),(20,3,'Salary',1200.00,'2025-03-01','Salary Mar'),(21,1,'Salary',1150.00,'2025-01-01','Salary Jan'),(21,2,'Salary',1150.00,'2025-02-01','Salary Feb'),(21,3,'Salary',1150.00,'2025-03-01','Salary Mar'),(22,1,'Investments',150.00,'2025-01-25','Crypto Jan'),(22,2,'Investments',200.00,'2025-02-25','Crypto Feb'),(22,3,'Investments',100.00,'2025-03-25','Crypto Mar'),(23,1,'Salary',1400.00,'2025-01-01','Salary Jan'),(23,2,'Salary',1400.00,'2025-02-01','Salary Feb'),(23,3,'Salary',1400.00,'2025-03-01','Salary Mar'),(24,1,'Salary',850.00,'2025-01-01','Salary Jan'),(24,2,'Salary',850.00,'2025-02-01','Salary Feb'),(24,3,'Salary',850.00,'2025-03-01','Salary Mar'),(25,1,'Salary',3500.00,'2025-01-01','Expat Salary Jan'),(25,2,'Salary',3500.00,'2025-02-01','Expat Salary Feb'),(25,3,'Salary',3500.00,'2025-03-01','Expat Salary Mar');
/*!40000 ALTER TABLE `income` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan`
--

DROP TABLE IF EXISTS `loan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loan` (
  `user_id` int NOT NULL,
  `loan_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `loan_date` date NOT NULL COMMENT 'Ημερομηνία χορήγησης',
  `payout_date` date DEFAULT NULL COMMENT 'Ημερομηνία επιστροφής',
  `debtor_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`loan_id`),
  CONSTRAINT `fk_Loan_User` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan`
--

LOCK TABLES `loan` WRITE;
/*!40000 ALTER TABLE `loan` DISABLE KEYS */;
INSERT INTO `loan` VALUES (3,1,500.00,'2025-01-05','2025-03-05','Friend'),(5,1,100.00,'2025-01-20','2025-02-20','Roommate'),(11,1,200.00,'2025-01-10','2025-02-10','Brother'),(20,1,1000.00,'2025-01-01','2025-12-31','Colleague'),(25,1,2000.00,'2025-01-10','2025-06-10','Cousin');
/*!40000 ALTER TABLE `loan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `one_time_expense`
--

DROP TABLE IF EXISTS `one_time_expense`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `one_time_expense` (
  `user_id` int NOT NULL,
  `expense_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`expense_id`),
  CONSTRAINT `fk_OneTime_Expense` FOREIGN KEY (`user_id`, `expense_id`) REFERENCES `expense` (`user_id`, `expense_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `one_time_expense`
--

LOCK TABLES `one_time_expense` WRITE;
/*!40000 ALTER TABLE `one_time_expense` DISABLE KEYS */;
INSERT INTO `one_time_expense` VALUES (1,2),(1,4),(1,6),(2,1),(2,2),(2,3),(2,4),(3,1),(3,2),(3,3),(4,1),(4,2),(4,3),(4,4),(5,1),(5,2),(5,3),(5,4),(6,1),(6,2),(6,3),(7,4),(8,1),(8,2),(8,3),(9,1),(9,2),(9,3),(10,1),(10,2),(10,3),(11,1),(11,2),(14,1),(14,2),(16,1),(16,2),(17,1),(17,2),(19,1),(19,2),(20,1),(20,2),(21,1),(21,2),(21,3),(22,1),(22,2),(22,3),(23,1),(23,2),(25,1),(25,2);
/*!40000 ALTER TABLE `one_time_expense` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recurring_expense`
--

DROP TABLE IF EXISTS `recurring_expense`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recurring_expense` (
  `user_id` int NOT NULL,
  `expense_id` int NOT NULL,
  `payout_date` int NOT NULL COMMENT 'Day of month (1-31)',
  `number_of_installments` int DEFAULT NULL,
  PRIMARY KEY (`user_id`,`expense_id`),
  CONSTRAINT `fk_Recurring_Expense` FOREIGN KEY (`user_id`, `expense_id`) REFERENCES `expense` (`user_id`, `expense_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recurring_expense`
--

LOCK TABLES `recurring_expense` WRITE;
/*!40000 ALTER TABLE `recurring_expense` DISABLE KEYS */;
INSERT INTO `recurring_expense` VALUES (1,1,5,12),(1,3,5,12),(1,5,5,12),(7,1,1,12),(7,2,1,12),(7,3,1,12),(12,1,10,NULL),(12,2,10,NULL),(12,3,10,NULL),(13,1,1,NULL),(13,2,1,NULL),(13,3,1,NULL),(15,1,20,NULL),(15,2,20,NULL),(15,3,20,NULL),(18,1,5,NULL),(18,2,5,NULL),(18,3,5,NULL),(24,1,15,9),(24,2,15,9),(24,3,15,9);
/*!40000 ALTER TABLE `recurring_expense` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `savings`
--

DROP TABLE IF EXISTS `savings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `savings` (
  `user_id` int NOT NULL,
  `savings_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`user_id`,`savings_id`),
  CONSTRAINT `fk_Savings_User` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `savings`
--

LOCK TABLES `savings` WRITE;
/*!40000 ALTER TABLE `savings` DISABLE KEYS */;
INSERT INTO `savings` VALUES (1,1,500.00,'2025-01-30'),(1,2,200.00,'2025-02-15'),(3,1,2000.00,'2025-01-30'),(3,2,1500.00,'2025-02-28'),(5,1,100.00,'2025-01-15'),(5,2,120.00,'2025-02-17'),(5,3,600.00,'2025-03-10'),(6,1,1200.00,'2025-01-20'),(6,2,800.00,'2025-02-20'),(7,1,200.00,'2025-01-25'),(10,1,1500.00,'2025-01-10'),(10,2,1000.00,'2025-02-10'),(11,1,100.00,'2025-01-12'),(13,1,50.00,'2025-01-28'),(15,1,300.00,'2025-01-28'),(16,1,200.00,'2025-01-15'),(17,1,50.00,'2025-01-22'),(18,1,1000.00,'2025-01-05'),(20,1,2000.00,'2025-01-15'),(20,2,1000.00,'2025-02-10'),(20,3,100.00,'2025-03-10'),(21,1,400.00,'2025-01-20'),(22,1,50.00,'2025-01-30'),(23,1,150.00,'2025-01-10'),(24,1,600.00,'2025-01-18'),(25,1,5000.00,'2025-01-10'),(25,2,3000.00,'2025-03-01');
/*!40000 ALTER TABLE `savings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategory`
--

DROP TABLE IF EXISTS `subcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategory` (
  `user_id` int NOT NULL,
  `subcategory_id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `category_type` enum('Food','Transportation','Housing','Utilities','Health','Entertainment','Personal','Financial','Other') NOT NULL,
  PRIMARY KEY (`user_id`,`subcategory_id`),
  CONSTRAINT `fk_Subcategory_User` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategory`
--

LOCK TABLES `subcategory` WRITE;
/*!40000 ALTER TABLE `subcategory` DISABLE KEYS */;
INSERT INTO `subcategory` VALUES (1,1,'Masoutis','Food'),(1,2,'Beat App','Transportation'),(1,3,'OASA Bus','Transportation'),(2,1,'Zara','Personal'),(2,2,'Hondos Center','Personal'),(2,3,'Shell Gas','Transportation'),(3,1,'Bloomberg Sub','Financial'),(3,2,'Business Lunch','Food'),(3,3,'Uber Black','Transportation'),(4,1,'IKEA','Housing'),(4,2,'Leroy Merlin','Housing'),(4,3,'Netflix','Entertainment'),(5,1,'Mikel Coffee','Food'),(5,2,'Everest','Food'),(5,3,'KTEL Bus','Transportation'),(6,1,'iStorm','Personal'),(6,2,'Skroutz','Personal'),(6,3,'Wolt','Food'),(7,1,'Gym','Health'),(7,2,'Supplements','Health'),(8,1,'Pharmacy','Health'),(8,2,'Doctors','Health'),(9,1,'Steam','Entertainment'),(9,2,'PS Store','Entertainment'),(10,1,'AB Vassilopoulos','Food'),(10,2,'Local Bakery','Food'),(11,1,'Car Service','Transportation'),(11,2,'Tolls','Transportation'),(12,1,'Adobe','Other'),(12,2,'Co-working Space','Other'),(13,1,'Spotify','Entertainment'),(13,2,'Cinema','Entertainment'),(14,1,'Hair Salon','Personal'),(14,2,'Nails','Personal'),(15,1,'Cosmote','Utilities'),(15,2,'DEH','Utilities'),(16,1,'Public Books','Entertainment'),(16,2,'Concert Tickets','Entertainment'),(17,1,'Bar','Entertainment'),(17,2,'Club Entrance','Entertainment'),(18,1,'Pet City','Other'),(18,2,'Vet','Other'),(19,1,'Camping Gear','Entertainment'),(19,2,'Ferry Tickets','Transportation'),(20,1,'Car Dealership','Transportation'),(20,2,'Insurance','Financial'),(21,1,'Lidl','Food'),(21,2,'Street Market','Food'),(22,1,'UNICEF','Other'),(22,2,'WWF','Other'),(23,1,'Plaisio','Personal'),(23,2,'Germanos','Personal'),(24,1,'Jumbo','Personal'),(24,2,'Tuition','Other'),(25,1,'Aegean','Transportation'),(25,2,'Booking.com','Entertainment'),(25,3,'Duty Free','Personal');
/*!40000 ALTER TABLE `subcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Alexandros','alex@mail.com','pass1'),(2,'Vasiliki','vaso@mail.com','pass2'),(3,'Giannis','giannis@mail.com','pass3'),(4,'Dimitra','dimitra@mail.com','pass4'),(5,'Manolis','manolis@mail.com','pass5'),(6,'Zoi','zoi@mail.com','pass6'),(7,'Thanos','thanos@mail.com','pass7'),(8,'Irene','irene@mail.com','pass8'),(9,'Petros','petros@mail.com','pass9'),(10,'Kalliopi','popi@mail.com','pass10'),(11,'Stavros','stavros@mail.com','pass11'),(12,'Fay','fay@mail.com','pass12'),(13,'Giorgos','giorgos@mail.com','pass13'),(14,'Anna','anna@mail.com','pass14'),(15,'Spyros','spyros@mail.com','pass15'),(16,'Lydia','lydia@mail.com','pass16'),(17,'Nikolas','nikolas@mail.com','pass17'),(18,'Maria','maria@mail.com','pass18'),(19,'Christos','chris@mail.com','pass19'),(20,'Eleni','eleni@mail.com','pass20'),(21,'Panagiotis','panos@mail.com','pass21'),(22,'Sofia','sofia@mail.com','pass22'),(23,'Aris','aris@mail.com','pass23'),(24,'Marina','marina@mail.com','pass24'),(25,'Kostas','kostas@mail.com','pass25');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `view_monthly_category_spending`
--

DROP TABLE IF EXISTS `view_monthly_category_spending`;
/*!50001 DROP VIEW IF EXISTS `view_monthly_category_spending`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_monthly_category_spending` AS SELECT 
 1 AS `user_id`,
 1 AS `category_type`,
 1 AS `year`,
 1 AS `month`,
 1 AS `total_spent`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_user_expense_details`
--

DROP TABLE IF EXISTS `view_user_expense_details`;
/*!50001 DROP VIEW IF EXISTS `view_user_expense_details`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_user_expense_details` AS SELECT 
 1 AS `username`,
 1 AS `expense_amount`,
 1 AS `expense_date`,
 1 AS `category_type`,
 1 AS `subcategory_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_user_goal_progress`
--

DROP TABLE IF EXISTS `view_user_goal_progress`;
/*!50001 DROP VIEW IF EXISTS `view_user_goal_progress`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_user_goal_progress` AS SELECT 
 1 AS `username`,
 1 AS `total_goals_amount`,
 1 AS `total_saved`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_user_monthly_balance`
--

DROP TABLE IF EXISTS `view_user_monthly_balance`;
/*!50001 DROP VIEW IF EXISTS `view_user_monthly_balance`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_user_monthly_balance` AS SELECT 
 1 AS `username`,
 1 AS `year`,
 1 AS `month`,
 1 AS `total_income`,
 1 AS `total_expenses`,
 1 AS `balance`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `view_monthly_category_spending`
--

/*!50001 DROP VIEW IF EXISTS `view_monthly_category_spending`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_monthly_category_spending` AS select `e`.`user_id` AS `user_id`,`e`.`category_type` AS `category_type`,year(`e`.`date`) AS `year`,month(`e`.`date`) AS `month`,sum(`e`.`amount`) AS `total_spent` from `expense` `e` group by `e`.`user_id`,`e`.`category_type`,year(`e`.`date`),month(`e`.`date`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_user_expense_details`
--

/*!50001 DROP VIEW IF EXISTS `view_user_expense_details`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_user_expense_details` AS select `u`.`username` AS `username`,`e`.`amount` AS `expense_amount`,`e`.`date` AS `expense_date`,`e`.`category_type` AS `category_type`,`s`.`name` AS `subcategory_name` from (((`user` `u` join `expense` `e` on((`u`.`user_id` = `e`.`user_id`))) left join `expense_subcategory` `es` on(((`e`.`user_id` = `es`.`user_id`) and (`e`.`expense_id` = `es`.`expense_id`)))) left join `subcategory` `s` on(((`es`.`user_id` = `s`.`user_id`) and (`es`.`subcategory_id` = `s`.`subcategory_id`)))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_user_goal_progress`
--

/*!50001 DROP VIEW IF EXISTS `view_user_goal_progress`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_user_goal_progress` AS select `u`.`username` AS `username`,coalesce(`g`.`total_goals`,0) AS `total_goals_amount`,coalesce(`s`.`total_saved`,0) AS `total_saved` from ((`user` `u` left join (select `goal`.`user_id` AS `user_id`,sum(`goal`.`target_amount`) AS `total_goals` from `goal` group by `goal`.`user_id`) `g` on((`u`.`user_id` = `g`.`user_id`))) left join (select `savings`.`user_id` AS `user_id`,sum(`savings`.`amount`) AS `total_saved` from `savings` group by `savings`.`user_id`) `s` on((`u`.`user_id` = `s`.`user_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_user_monthly_balance`
--

/*!50001 DROP VIEW IF EXISTS `view_user_monthly_balance`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_user_monthly_balance` AS select `u`.`username` AS `username`,coalesce(`inc`.`year`,`exp`.`year`) AS `year`,coalesce(`inc`.`month`,`exp`.`month`) AS `month`,coalesce(`inc`.`total_income`,0) AS `total_income`,coalesce(`exp`.`total_expenses`,0) AS `total_expenses`,(coalesce(`inc`.`total_income`,0) - coalesce(`exp`.`total_expenses`,0)) AS `balance` from ((`user` `u` left join (select `expense`.`user_id` AS `user_id`,year(`expense`.`date`) AS `year`,month(`expense`.`date`) AS `month`,sum(`expense`.`amount`) AS `total_expenses` from `expense` group by `expense`.`user_id`,year(`expense`.`date`),month(`expense`.`date`)) `exp` on((`u`.`user_id` = `exp`.`user_id`))) left join (select `income`.`user_id` AS `user_id`,year(`income`.`date`) AS `year`,month(`income`.`date`) AS `month`,sum(`income`.`amount`) AS `total_income` from `income` group by `income`.`user_id`,year(`income`.`date`),month(`income`.`date`)) `inc` on(((`u`.`user_id` = `inc`.`user_id`) and (`exp`.`year` = `inc`.`year`) and (`exp`.`month` = `inc`.`month`)))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-14 14:23:17
