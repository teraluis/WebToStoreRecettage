<?php
header('Content-Type: application/json');
$nom = trim($_POST['nom']);
$prenom = trim($_POST['prenom']);

$ville = trim($_POST['ville']);
$departement = $_POST['departement'];
$mail = trim($_POST['mail']);
$portable = trim($_POST['telephone']);
$newsletter = $_POST['newsletter'];
$date = $_POST['date'];

$data = array('nom' => $nom ,"prenom"=>$prenom,"ville" => $ville, "departement" => $departement , "mail" => $mail ,
	 "portable" => $portable,
	"newsletter" => $newsletter,
	"date" => $date
 );

echo json_encode($data);
?>