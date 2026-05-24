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

if ($method === 'GET') {
    $query = mysqli_query($con, "SELECT * FROM products ORDER BY id DESC");
    $products = [];
    if ($query) {
        while($row = mysqli_fetch_assoc($query)){
            $products[] = [
                "id" => $row['id'],
                "name" => $row['name'],
                "price" => $row['price'],
                "image" => $row['image'],
                "description" => $row['description']
            ];
        }
    }
    echo json_encode($products);
} 
elseif ($method === 'POST') {
    // Read JSON input or form post
    $input = json_decode(file_get_contents("php://input"), true);
    if (!$input) {
        $input = $_POST;
    }
    
    $name = isset($input['name']) ? trim($input['name']) : '';
    $price = isset($input['price']) ? trim($input['price']) : '';
    $image = isset($input['image']) ? trim($input['image']) : '';
    $description = isset($input['description']) ? trim($input['description']) : '';
    
    if (empty($name) || empty($price)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Name and Price are required"]);
        exit;
    }
    
    $name = mysqli_real_escape_string($con, $name);
    $price = mysqli_real_escape_string($con, $price);
    $image = mysqli_real_escape_string($con, $image);
    $description = mysqli_real_escape_string($con, $description);
    
    $query = "INSERT INTO products (name, price, image, description) VALUES ('$name', '$price', '$image', '$description')";
    
    if (mysqli_query($con, $query)) {
        $new_id = mysqli_insert_id($con);
        echo json_encode([
            "status" => "success", 
            "message" => "Product added successfully",
            "product" => [
                "id" => $new_id,
                "name" => $name,
                "price" => $price,
                "image" => $image,
                "description" => $description
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to add product: " . mysqli_error($con)]);
    }
} 
elseif ($method === 'DELETE') {
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid ID"]);
        exit;
    }
    
    $query = "DELETE FROM products WHERE id = $id";
    if (mysqli_query($con, $query)) {
        echo json_encode(["status" => "success", "message" => "Product deleted successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to delete product: " . mysqli_error($con)]);
    }
} 
else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
}

?>