<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$reviews = [

    [
        "name" => "Ahmed Ali",
        "review" => "Amazing quality mangoes."
    ],

    [
        "name" => "Sara Khan",
        "review" => "Fast delivery and fresh mangoes."
    ],

    [
        "name" => "Bilal Ahmed",
        "review" => "Best mango store in Pakistan."
    ]

];

echo json_encode($reviews);

?>