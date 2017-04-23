-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema timesheet
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `timesheet` ;

-- -----------------------------------------------------
-- Schema timesheet
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `timesheet` DEFAULT CHARACTER SET utf8 ;
USE `timesheet` ;

-- -----------------------------------------------------
-- Table `timesheet`.`work_item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `timesheet`.`work_item` ;

CREATE TABLE IF NOT EXISTS `timesheet`.`work_item` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `period` INT(11) NOT NULL,
  `rate` DECIMAL(12,2) NOT NULL,
  `day` INT(2) NOT NULL,
  `month` INT(2) NOT NULL,
  `year` INT(4) NOT NULL,
  `notes` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8;

SET SQL_MODE = '';
GRANT USAGE ON *.* TO student;
 DROP USER student;
SET SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
CREATE USER 'student';

GRANT ALL ON `timesheet`.* TO 'student';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `timesheet`.`work_item`
-- -----------------------------------------------------
START TRANSACTION;
USE `timesheet`;
INSERT INTO `timesheet`.`work_item` (`id`, `period`, `rate`, `day`, `month`, `year`, `notes`) VALUES (1, 4, 60.00, 21, 4, 2017, 'IBM');
INSERT INTO `timesheet`.`work_item` (`id`, `period`, `rate`, `day`, `month`, `year`, `notes`) VALUES (2, 6, 70.00, 22, 4, 2017, 'Oracle');
INSERT INTO `timesheet`.`work_item` (`id`, `period`, `rate`, `day`, `month`, `year`, `notes`) VALUES (3, 5, 80, 23, 4, 2017, 'Light');
INSERT INTO `timesheet`.`work_item` (`id`, `period`, `rate`, `day`, `month`, `year`, `notes`) VALUES (4, 3, 100, 24, 4, 2017, 'Local Trading');
INSERT INTO `timesheet`.`work_item` (`id`, `period`, `rate`, `day`, `month`, `year`, `notes`) VALUES (5, 8, 90, 25, 4, 2017, 'PA Industries');

COMMIT;

