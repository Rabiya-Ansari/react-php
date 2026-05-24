<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

// Handle OPTIONS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include("../config/db.php");

$method = $_SERVER['REQUEST_METHOD'];

// Helper to check table schema columns
$columns_res = mysqli_query($con, "SHOW COLUMNS FROM categories");
$has_img_column = false;
$has_image_column = false;
if ($columns_res) {
    while ($col = mysqli_fetch_assoc($columns_res)) {
        if ($col['Field'] === 'img') {
            $has_img_column = true;
        }
        if ($col['Field'] === 'image') {
            $has_image_column = true;
        }
    }
}

if ($method === 'GET') {
    $query = mysqli_query($con, "SELECT * FROM categories ORDER BY id ASC");
    $categories = [];
    if ($query) {
        while($row = mysqli_fetch_assoc($query)){
            // Ensure compatibility with both img and image properties
            if (isset($row['img']) && !isset($row['image'])) {
                $row['image'] = $row['img'];
            }
            if (isset($row['image']) && !isset($row['img'])) {
                $row['img'] = $row['image'];
            }
            $categories[] = $row;
        }
    }
    echo json_encode($categories);
} 
elseif ($method === 'POST') {
    // Read JSON input or form post
    $input = json_decode(file_get_contents("php://input"), true);
    if (!$input) {
        $input = $_POST;
    }
    
    $name = isset($input['name']) ? trim($input['name']) : '';
    $subtitle = isset($input['subtitle']) ? trim($input['subtitle']) : '';
    $tag = isset($input['tag']) ? trim($input['tag']) : '';
    $image = isset($input['image']) ? trim($input['image']) : '';
    $size = isset($input['size']) ? trim($input['size']) : 'small';
    
    if (empty($name)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Name is required"]);
        exit;
    }

    if (empty($image)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Category image is required"]);
        exit;
    }

    // Validate image format - accept http/https URLs, data URLs, relative paths, and Google image addresses
    $is_valid_image = false;
    if (preg_match('/^(http|https):\/\//i', $image)) {
        $is_valid_image = true;
    } elseif (preg_match('/^data:image\/(jpeg|png|gif|webp|svg\+xml);base64,/i', $image)) {
        $is_valid_image = true;
    } elseif (preg_match('/^\/?(assets|images|public)\//i', $image) || preg_match('/\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i', $image)) {
        $is_valid_image = true;
    }

    if (!$is_valid_image) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid image address. Must be a valid web URL, relative path, or Google image address."]);
        exit;
    }
    
    $name = mysqli_real_escape_string($con, $name);
    $subtitle = mysqli_real_escape_string($con, $subtitle);
    $tag = mysqli_real_escape_string($con, $tag);
    $image = mysqli_real_escape_string($con, $image);
    $size = mysqli_real_escape_string($con, $size);
    
    // Dynamically insert into the correct column
    if ($has_img_column) {
        $query = "INSERT INTO categories (name, subtitle, tag, img, size) VALUES ('$name', '$subtitle', '$tag', '$image', '$size')";
    } else {
        $query = "INSERT INTO categories (name, subtitle, tag, image, size) VALUES ('$name', '$subtitle', '$tag', '$image', '$size')";
    }
    
    if (mysqli_query($con, $query)) {
        $new_id = mysqli_insert_id($con);
        echo json_encode([
            "status" => "success", 
            "message" => "Category added successfully",
            "category" => [
                "id" => $new_id,
                "name" => $name,
                "subtitle" => $subtitle,
                "tag" => $tag,
                "image" => $image,
                "img" => $image,
                "size" => $size
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to add category: " . mysqli_error($con)]);
    }
} 
elseif ($method === 'DELETE') {
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid ID"]);
        exit;
    }
    
    $query = "DELETE FROM categories WHERE id = $id";
    if (mysqli_query($con, $query)) {
        echo json_encode(["status" => "success", "message" => "Category deleted successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to delete category: " . mysqli_error($con)]);
    }
} 
else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
}

?>