<?php

$host = "localhost";
$user = "root";
$password = "";
$database = "rehmat_mangoes";

// Connect to MySQL server without database first
$con = mysqli_connect($host, $user, $password);

if(!$con){
    die("Database Connection Failed: " . mysqli_connect_error());
}

// Create database if not exists
$db_query = "CREATE DATABASE IF NOT EXISTS `$database` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
if (!mysqli_query($con, $db_query)) {
    die("Database Creation Failed: " . mysqli_error($con));
}

// Select database
if (!mysqli_select_db($con, $database)) {
    die("Database Selection Failed: " . mysqli_error($con));
}

// Create Categories Table if not exists
$create_categories = "
CREATE TABLE IF NOT EXISTS `categories` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `subtitle` VARCHAR(255) NULL,
    `tag` VARCHAR(255) NULL,
    `image` TEXT NULL,
    `size` VARCHAR(50) DEFAULT 'small',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
";
mysqli_query($con, $create_categories);

// Create Products Table if not exists
$create_products = "
CREATE TABLE IF NOT EXISTS `products` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `price` VARCHAR(100) NOT NULL,
    `image` TEXT NULL,
    `description` TEXT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
";
mysqli_query($con, $create_products);

// Seed default categories if table is empty
$cat_check = mysqli_query($con, "SELECT COUNT(*) as count FROM `categories`");
$cat_count = 0;
if ($cat_check) {
    $cat_count = mysqli_fetch_assoc($cat_check)['count'] ?? 0;
}
if ($cat_count == 0) {
    $seed_categories = [
        ["Sindhri", "The King of Mangoes", "Most Popular", "https://3.imimg.com/data3/TJ/DX/MY-452003/sindhri-mango-500x500.png", "large"],
        ["Chaunsa", "Melt-in-mouth sweetness", "Premium", "https://scontent.fkhi21-1.fna.fbcdn.net/v/t1.6435-9/103642424_3047498425365187_2397606973855136723_n.jpg?stp=dst-jpg_p180x540_tt6&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=sqPrGEgmGlsQ7kNvwHsQuj5&_nc_oc=Adq1hjeCyl7dnPHePBC2erFI1zQMAOqTja_B2qQxFFXwjtORYy4-pDSVMpnJZik2TGDIaH3y6C2sysoyJrWPKB-j&_nc_zt=23&_nc_ht=scontent.fkhi21-1.fna&_nc_gid=h6i8LGGlrXqMIOaR4Ufuug&_nc_ss=7b289&oh=00_Af7hc8Wd1dt0AIbAXQ4XwUkTiTxViWDtFZjsYDxSaumIQQ&oe=6A397CFF", "small"],
        ["Anwar Ratol", "Small, aromatic & rare", "Limited Season", "https://mirchu.pk/cdn/shop/files/anwar-ratol-mango-anwar-ratol-anor-rol-1kg-50g-mirchu-6568707.png?v=1777275547", "small"],
        ["Langra", "Rich & fibre-free", "Farm Fresh", "https://m.media-amazon.com/images/I/51HuJw9NBUL._AC_UF350,350_QL80_.jpg", "large"]
    ];
    
    foreach ($seed_categories as $cat) {
        $name = mysqli_real_escape_string($con, $cat[0]);
        $sub = mysqli_real_escape_string($con, $cat[1]);
        $tag = mysqli_real_escape_string($con, $cat[2]);
        $img = mysqli_real_escape_string($con, $cat[3]);
        $size = mysqli_real_escape_string($con, $cat[4]);
        
        mysqli_query($con, "INSERT INTO `categories` (`name`, `subtitle`, `tag`, `image`, `size`) VALUES ('$name', '$sub', '$tag', '$img', '$size')");
    }
}

// Seed default products if table is empty
$prod_check = mysqli_query($con, "SELECT COUNT(*) as count FROM `products`");
$prod_count = 0;
if ($prod_check) {
    $prod_count = mysqli_fetch_assoc($prod_check)['count'] ?? 0;
}
if ($prod_count == 0) {
    $seed_products = [
        ["Sindhri Premium Box", "$25.00", "https://3.imimg.com/data3/TJ/DX/MY-452003/sindhri-mango-500x500.png", "Handpicked A-grade Sindhri mangoes, known for their bright yellow color, oval shape, and honey-sweet taste. Direct from our orchards."],
        ["Chaunsa Export Quality", "$32.00", "https://scontent.fkhi21-1.fna.fbcdn.net/v/t1.6435-9/103642424_3047498425365187_2397606973855136723_n.jpg?stp=dst-jpg_p180x540_tt6&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=sqPrGEgmGlsQ7kNvwHsQuj5&_nc_oc=Adq1hjeCyl7dnPHePBC2erFI1zQMAOqTja_B2qQxFFXwjtORYy4-pDSVMpnJZik2TGDIaH3y6C2sysoyJrWPKB-j&_nc_zt=23&_nc_ht=scontent.fkhi21-1.fna&_nc_gid=h6i8LGGlrXqMIOaR4Ufuug&_nc_ss=7b289&oh=00_Af7hc8Wd1dt0AIbAXQ4XwUkTiTxViWDtFZjsYDxSaumIQQ&oe=6A397CFF", "Premium selected Chaunsa mangoes. Features an exceptionally sweet, juicy flesh with a rich aroma that fills the room."],
        ["Anwar Ratol Selected", "$28.00", "https://mirchu.pk/cdn/shop/files/anwar-ratol-mango-anwar-ratol-anor-rol-1kg-50g-mirchu-6568707.png?v=1777275547", "Highly aromatic and sweet Anwar Ratol mangoes. A rare delicacy available only for a very short season."],
        ["Langra Honey-Sweet", "$22.00", "https://m.media-amazon.com/images/I/51HuJw9NBUL._AC_UF350,350_QL80_.jpg", "Rich, fibre-free Langra mangoes. Maintains a greenish hue even when fully ripe, with a unique delicious flavor."]
    ];

    foreach ($seed_products as $prod) {
        $name = mysqli_real_escape_string($con, $prod[0]);
        $price = mysqli_real_escape_string($con, $prod[1]);
        $img = mysqli_real_escape_string($con, $prod[2]);
        $desc = mysqli_real_escape_string($con, $prod[3]);

        mysqli_query($con, "INSERT INTO `products` (`name`, `price`, `image`, `description`) VALUES ('$name', '$price', '$img', '$desc')");
    }
}

?>