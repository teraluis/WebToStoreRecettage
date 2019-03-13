<?php
header('Content-Type: application/json');
$nom = "MANRESA";
$prenom = "LUIS";

$ville = "Paris";
$departement = "departement";
$mail = "mail";
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
$portable = "0651486815";
$portable = tel($portable);
$newsletter = "oui";
$date = "2019-03-22";
$date = date("d/m/Y",strtotime($date));
$opticien = "opticien";
$direcion="121 av d'italie";
$ciudad = "Lyon";
$postal ="75013";

$data = array("nom" => $nom ,"prenom"=>$prenom,"ville" => $ville, "departement" => $departement , "mail" => $mail ,
	"portable" => $portable,
	"newsletter" => $newsletter,
	"date" => $date,
	"opticien" =>$opticien,
	"adresse" =>$direcion,
	"ciudad" =>$ciudad,
     "postal" => $postal
);
     // Plusieurs destinataires
     $to  = $mail; // notez la virgule

     // Sujet
     $subject = 'Prisse de RDV';

     // message
     $message = file_get_contents('resa.html');
     $message = str_replace("#PRENOM#", $data["prenom"], $message);
     $message = str_replace("#NOM#", $data["nom"], $message);
     $message = str_replace("#OPTICIEN#", $data["opticien"], $message);
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
     //mail($to, $subject, $message, implode("\r\n", $headers));
echo json_encode($data);


?>