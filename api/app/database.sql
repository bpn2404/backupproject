
--
-- PREPARE USERS
--

DROP TABLE IF EXISTS `t_users`;

CREATE TABLE `t_users` 
(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;


INSERT INTO `t_users` (`id`, `username`, `first_name`, `last_name`, `email`, `password`) VALUES
(1, 'krisG', 'Krzysztof', 'Gorak', 'kugarek@gmail.com', 'password'),
(2, 'chrisG', 'Chris', 'Gorak', 'chris@gorak.net', 'password'),
(3, 'peterG', 'Peter', 'Gatward', 'peter.gatward@drawtag.com', 'password');






--
-- MODEL PERSONS
--

DROP TABLE IF EXISTS `t_model_persons`;

CREATE TABLE `t_model_persons` 
(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model_Name` varchar(255) NOT NULL,
  `height` decimal(6,1) NOT NULL,
  `hair` varchar(100) NOT NULL,
  `eyes` varchar(100) NOT NULL,
  `bust` decimal(6,1) NOT NULL,
  `waist` decimal(6,1) NOT NULL,
  `hips` decimal(6,1) NOT NULL,
  `shoes` decimal(6,1) NOT NULL,
  `uploaded_front_img_name` varchar(255) NOT NULL,
  `uploaded_back_img_name` varchar(255) NOT NULL,
  `scale` decimal(6,2) NOT NULL,
  `scaleFactor` int(4) NOT NULL,
  `imageX` int(4) NOT NULL,
  `imageY` int(4) NOT NULL,
  `rotation` int(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;



INSERT INTO `t_model_persons` (`id`, `model_Name`, `height`, `hair`, `eyes`, `bust`, `waist`, `hips`, `shoes`, `uploaded_front_img_name`, `uploaded_back_img_name`, `scale`, `scaleFactor`, `imageX`, `imageY`, `rotation`) VALUES
(1, 'Heide Lingren', 3.6, 'Blonde', 'Blue', 41.3, 22.4, 89.6, 9.2, 'heide-lingren.jpg', 'heide-lingren.jpg', 3.96, 20, 45, 103, 0);


































--
-- EXAMPLES DO NOT COPY
--

DROP TABLE IF EXISTS `g_admins`;
DROP TABLE IF EXISTS `g_game_entrants`;
DROP TABLE IF EXISTS `g_entrants_points`;
DROP TABLE IF EXISTS `g_points`;
DROP TABLE IF EXISTS `g_games`;
DROP TABLE IF EXISTS `g_entrants`;
DROP TABLE IF EXISTS `g_register_game`;
DROP TABLE IF EXISTS `g_splash_state`;



CREATE TABLE `g_admins` 
(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;


INSERT INTO `g_admins` (`id`, `username`, `first_name`, `last_name`, `email`, `password`) VALUES
(1, 'krisg', 'Krzysztof', 'Gorak', 'krzysztof.gorak@spectrags.com', 'password'),
(2, 'stevec', 'Steve', 'Castle', 'steve.castle@spectrags.com', 'password'),
(3, 'kens', 'Ken', 'Stearn', 'ken.stearn@spectrags.com', 'password');


--
-- GAMES 
--


CREATE TABLE `g_games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `main_pic_url` varchar(255) NOT NULL,
  `ball_pic_url` varchar(100) NOT NULL,
  `ball_x` int(3) NOT NULL,
  `ball_y` int(3) NOT NULL,
  `g_date` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

INSERT INTO `g_games` (`id`, `main_pic_url`, `ball_pic_url`, `ball_x`, `ball_y`, `g_date`) VALUES
(1, 'http://localhost/spectra/angular/images/ballImages/pic1.png', 'http://localhost/spectra/angular/images/ballImages/ball1.png', 111, 111, 'Thu Jun 25 2015 16:59:00 GMT+0100'),
(2, 'http://localhost/spectra/angular/images/ballImages/pic2.png', 'http://localhost/spectra/angular/images/ballImages/ball2.png', 425, 365, 'Tue Jun 30 2015 23:59:00 GMT+0100'),
(3, 'http://localhost/spectra/angular/images/ballImages/pic1.png', 'http://localhost/spectra/angular/images/ballImages/ball1.png', 333, 333, 'Thu Jun 25 2015 18:47:00 GMT+0100'),
(4, 'http://localhost/spectra/angular/images/ballImages/pic1.png', 'http://localhost/spectra/angular/images/ballImages/ball1.png', 111, 111, 'Thu Jun 25 2015 16:59:00 GMT+0100'),
(5, 'http://localhost/spectra/angular/images/ballImages/pic2.png', 'http://localhost/spectra/angular/images/ballImages/ball2.png', 222, 222, 'Thu Jun 25 2015 16:47:00 GMT+0100'),
(6, 'http://localhost/spectra/angular/images/ballImages/pic1.png', 'http://localhost/spectra/angular/images/ballImages/ball1.png', 333, 333, 'Thu Jun 25 2015 17:47:00 GMT+0100');


--
-- REGISTER SCREEN GAME - this table stores a single game_id which is fetched on the register sceen 
--


CREATE TABLE `g_register_game` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `game_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

INSERT INTO `g_register_game` (`id`, `game_id`) VALUES
(1, 2);



CREATE TABLE `g_splash_state` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

INSERT INTO `g_splash_state` (`id`, `state`) VALUES
(1, 'normal');

--
-- ENTRANTS 
--


CREATE TABLE `g_entrants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `f_name` varchar(100) NOT NULL,
  `l_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `c_name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
    `x1` int(3) NOT NULL,
    `x2` int(3) NOT NULL,
    `x3` int(3) NOT NULL,
    `x4` int(3) NOT NULL,
    `x5` int(3) NOT NULL,
    `y1` int(3) NOT NULL,
    `y2` int(3) NOT NULL,
    `y3` int(3) NOT NULL,
    `y4` int(3) NOT NULL,
    `y5` int(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

INSERT INTO `g_entrants` (`id`, `f_name`, `l_name`, `email`, `c_name`, `phone`, `x1`, `x2`, `x3`, `x4`, `x5`, `y1`, `y2`, `y3`, `y4`, `y5`) VALUES
(1, 'Krzysztof', 'Gorak', 'krzysztof.gorak@spectrags.com', 'Spectra', '0792123354', '79', '379', '309', '279', '479', '379', '533', '400', '229', '579'),
(2, 'Steve', 'Castle', 'steve.castle@spectrags.com', 'Spectra','1891612132', '549', '312', '569', '109', '149', '609', '23', '90', '209', '459'),
(3, 'Ken', 'Stearn', 'ken.stearn@spectrags.com', 'Spectra','61498464', '579', '179', '209', '579', '179', '279', '503', '499', '529', '600'),
(4, 'Gaetan', 'Nandelec', 'gaetan.nandelec@spectrags.com', 'Spectra', '0792123354', '79', '309', '309', '209', '479', '23', '533', '400', '223', '509'),
(5, 'Jan', 'Urbanski', 'jan.urbanski@spectrags.com', 'Spectra','1891612132', '549', '342', '509', '109', '149', '619', '123', '90', '259', '439'),
(6, 'Jim', 'Mcloughlin', 'jim.mcloughlin@spectrags.com', 'Spectra','61498464', '79', '179', '09', '579', '79', '279', '503', '99', '529', '60'),
(7, 'Krzysztof', 'Gorak', 'krzysztof.gorak@spectrags.com', 'Spectra', '0792123354', '79', '379', '309', '279', '479', '379', '533', '400', '229', '579'),
(8, 'Steve', 'Castle', 'steve.castle@spectrags.com', 'Spectra','1891612132', '549', '312', '569', '109', '149', '609', '23', '90', '209', '459'),
(9, 'Ken', 'Stearn', 'ken.stearn@spectrags.com', 'Spectra','61498464', '579', '179', '209', '579', '179', '279', '503', '499', '529', '600'),
(10, 'Gaetan', 'Nandelec', 'gaetan.nandelec@spectrags.com', 'Spectra', '0792123354', '79', '309', '309', '45', '479', '379', '5', '400', '2', '545'),
(11, 'Jan', 'Urbanski', 'jan.urbanski@spectrags.com', 'Spectra','1891612132', '549', '342', '43', '109', '149', '89', '123', '90', '259', '439'),
(12, 'Jim', 'Mcloughlin', 'jim.mcloughlin@spectrags.com', 'Spectra','61498464', '79', '179', '09', '579', '79', '279', '35', '99', '529', '60'),
(13, 'Krzysztof', 'Gorak', 'krzysztof.gorak@spectrags.com', 'Spectra', '0792123354', '79', '379', '309', '279', '479', '379', '533', '400', '229', '579'),
(14, 'Steve', 'Castle', 'steve.castle@spectrags.com', 'Spectra','1891612132', '549', '312', '32', '109', '149', '609', '23', '90', '209', '459'),
(15, 'Ken', 'Stearn', 'ken.stearn@spectrags.com', 'Spectra','61498464', '579', '179', '209', '579', '179', '279', '356', '499', '529', '600'),
(16, 'Gaetan', 'Nandelec', 'gaetan.nandelec@spectrags.com', 'Spectra', '0792123354', '79', '309', '309', '209', '479', '379', '533', '400', '209', '509'),
(17, 'Jan', 'Urbanski', 'jan.urbanski@spectrags.com', 'Spectra','1891612132', '549', '342', '53', '109', '149', '619', '123', '90', '259', '439'),
(18, 'Jim', 'Mcloughlin', 'jim.mcloughlin@spectrags.com', 'Spectra','61498464', '79', '179', '09', '579', '79', '279', '35', '35', '35', '60'),
(19, 'Krzysztof', 'Gorak', 'krzysztof.gorak@spectrags.com', 'Spectra', '0792123354', '79', '379', '309', '279', '479', '23', '533', '400', '229', '579'),
(20, 'Steve', 'Castle', 'steve.castle@spectrags.com', 'Spectra','1891612132', '549', '312', '35', '32', '149', '609', '23', '90', '209', '459'),
(21, 'Ken', 'Stearn', 'ken.stearn@spectrags.com', 'Spectra','61498464', '579', '179', '209', '579', '179', '279', '503', '499', '529', '600'),
(22, 'Gaetan', 'Nandelec', 'gaetan.nandelec@spectrags.com', 'Spectra', '0792123354', '79', '309', '309', '209', '479', '379', '533', '400', '209', '509'),
(23, 'Jan', 'Urbanski', 'jan.urbanski@spectrags.com', 'Spectra','1891612132', '549', '342', '35', '34', '149', '619', '123', '90', '259', '439'),
(24, 'Jim', 'Mcloughlin', 'jim.mcloughlin@spectrags.com', 'Spectra','61498464', '79', '179', '09', '579', '79', '279', '503', '99', '529', '60'),
(25, 'Krzysztof', 'Gorak', 'krzysztof.gorak@spectrags.com', 'Spectra', '0792123354', '79', '379', '309', '279', '479', '379', '533', '400', '229', '579'),
(26, 'Steve', 'Castle', 'steve.castle@spectrags.com', 'Spectra','1891612132', '549', '312', '569', '109', '149', '34', '23', '90', '209', '459'),
(27, 'Ken', 'Stearn', 'ken.stearn@spectrags.com', 'Spectra','61498464', '579', '179', '209', '23', '179', '432', '503', '67', '529', '600'),
(28, 'Gaetan', 'Nandelec', 'gaetan.nandelec@spectrags.com', 'Spectra', '0792123354', '79', '309', '309', '209', '479', '379', '533', '400', '209', '509'),
(29, 'Jan', 'Urbanski', 'jan.urbanski@spectrags.com', 'Spectra','1891612132', '549', '342', '35', '109', '149', '619', '123', '90', '259', '439'),
(30, 'Jim', 'Mcloughlin', 'jim.mcloughlin@spectrags.com', 'Spectra','61498464', '79', '179', '09', '579', '79', '279', '78', '99', '529', '60'),
(31, 'Krzysztof', 'Gorak', 'krzysztof.gorak@spectrags.com', 'Spectra', '0792123354', '79', '379', '34', '456', '479', '379', '533', '400', '229', '579'),
(32, 'Steve', 'Castle', 'steve.castle@spectrags.com', 'Spectra','1891612132', '549', '312', '569', '109', '149', '609', '23', '90', '209', '459'),
(33, 'Ken', 'Stearn', 'ken.stearn@spectrags.com', 'Spectra','61498464', '579', '179', '209', '579', '179', '65', '78', '499', '529', '600'),
(34, 'Gaetan', 'Nandelec', 'gaetan.nandelec@spectrags.com', 'Spectra', '0792123354', '79', '309', '36', '209', '479', '379', '533', '400', '209', '509'),
(35, 'Jan', 'Urbanski', 'jan.urbanski@spectrags.com', 'Spectra','1891612132', '549', '342', '509', '109', '149', '619', '23', '231', '259', '439'),
(36, 'Jim', 'Mcloughlin', 'jim.mcloughlin@spectrags.com', 'Spectra','61498464', '79', '179', '09', '579', '79', '279', '45', '99', '529', '60');

--
-- GAME ENTRANTS - joint table
--


CREATE TABLE `g_game_entrants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entrant_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`entrant_id`) REFERENCES `g_entrants` (`id`),
  FOREIGN KEY (`game_id`) REFERENCES `g_games` (`id`)
  ON DELETE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;



INSERT INTO `g_game_entrants` (`id`, `entrant_id`, `game_id`) VALUES
(1, 1, 2),
(2, 2, 2),
(3, 3, 2),
(4, 4, 2),
(5, 5, 2),
(6, 6, 2),
(7, 7, 2),
(8, 8, 2),
(9, 9, 2),
(10, 10, 2),
(11, 11, 2),
(12, 12, 2),
(13, 13, 2),
(14, 14, 2),
(15, 15, 2),
(16, 16, 2),
(17, 17, 2),
(18, 18, 2),
(19, 19, 2),
(20, 20, 2),
(21, 21, 2),
(22, 22, 2),
(23, 23, 2),
(24, 24, 2),
(25, 25, 2),
(26, 26, 2),
(27, 27, 2),
(28, 28, 2),
(29, 29, 2),
(30, 30, 2),
(31, 31, 2),
(32, 32, 2),
(33, 33, 2),
(34, 34, 2),
(35, 34, 2),
(36, 35, 2);


