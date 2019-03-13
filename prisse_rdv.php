<?php
header('Content-Type: application/json');
$nom = trim($_POST['nom']);
$prenom = trim($_POST['prenom']);
$monture =$_POST['monture'];
$ville = trim($_POST['ville']);
$departement = $_POST['departement'];
$mail = trim($_POST['mail']);
function tel($str) {
    if(strlen($str) >= 8) {
    $res = substr($str, 0, 2) .' ';
    $res .= substr($str, 2, 2) .' ';
    $res .= substr($str, 4, 2) .' ';
    $res .= substr($str, 6, 2) .' ';
    $res .= substr($str, 8, 2) .' ';
    return $res;
    }else {
     return $str;
    }
}
$portable = tel(trim($_POST['telephone']));
$newsletter = $_POST['newsletter'];
$date = trim($_POST['date']);
$date = date("d/m/Y",strtotime($date));
$opticien = trim($_POST['opticien']);
$direcion=trim($_POST['direcion']);
$ciudad = trim($_POST['ciudad']);
$postal = trim($_POST['postal']);

$data = array("nom" => $nom ,"prenom"=>$prenom,"ville" => $ville, "departement" => $departement , "mail" => $mail ,
	"portable" => $portable,
	"newsletter" => $newsletter,
	"date" => $date,
	"opticien" =>$opticien,
	"adresse" =>$direcion,
	"ciudad" =>$ciudad,
  "postal"  => $postal,
  "monture" => $monture
);
     // Plusieurs destinataires
     $to  = $mail; // notez la virgule

     // Sujet
     $subject = 'Prisse de RDV';

     // message
     $message = file_get_contents('resa.html');
     $message = str_replace("#PRENOM#", $data["prenom"], $message);
     $message = str_replace("#NOM#", $data["nom"], $message);
     $message = str_replace("#MODELE#", $data["monture"], $message);
     $message = str_replace("#OPTICIEN#", $data["opticien"], $message);
     $message = str_replace("#ADRESSE#", $data["adresse"], $message);
     $message = str_replace("#POSTAL#", $data["postal"], $message);
     $message = str_replace("#VILLE#", $data["ville"], $message);
     $message = str_replace("#DATE#", $data["date"], $message);
     $message = str_replace("#TELEPHONE#", $data["portable"], $message);
     // Pour envoyer un mail HTML, l'en-tête Content-type doit être défini
     $headers[] = 'MIME-Version: 1.0';
     $headers[] = 'Content-type: text/html; charset=UTF-8';

     // En-têtes additionnels
     //$headers[] = 'To: MR <mr@example.com>, Mr <mr@example.com>';
     $headers[] = 'From: vinylfactory <vinylfactory@vinylfactory.com>';
     //$headers[] = 'Cc: vinylfactory@vinylfactory.com';
     //$headers[] = 'Bcc: vinylfactory@vinylfactory.com';

     // Envoi
     mail($to, $subject, $message, implode("\r\n", $headers));
echo json_encode($data);


?>