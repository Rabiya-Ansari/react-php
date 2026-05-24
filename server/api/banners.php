<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$banners = [

    [
        "title" => "Fresh Pakistani Mangoes",
        "image" => "banner1.jpg"
    ]

];

echo json_encode($banners);

?>