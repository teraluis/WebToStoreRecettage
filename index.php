<?php
$monture = $_GET['monture'];
?>
<html>
<head>
  <title>Store Locator</title>
  <meta charset="utf-8">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="test.css">

  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script type="text/javascript">
  	var monture = <?php echo "\"".$monture."\""; ?>;
  </script>
<head>
<body>
  <hr>
  <div class="container-fluid">
      <div class="modal-body" id="modal-body" >
        <br>
        <div style="text-align: center;">
        <img src="img/livraison_vinyl.jpg" width="150px">
        <br><br>
        <h4 style="width: 100%;max-width: 100%">NOUS VOUS ENVOYONS LES LUNETTES SANS ENGAGEMENT <br> POUR ESSAYAGE A LA BOUTIQUE DE VOTRE CHOIX</h4>
    
        <span class="lien">SÉLECTIONNEZ LA BOUTIQUE DANS LAQUELLE VOUS SOUHAITEZ RÉCUPÉRER LA MONTURE</span>
        </div>
        <form id="form" style="width: 50%;position: relative;">
          <div class="form-group" >
            <label for="recipient-name" class="col-form-label">Rechercher:</label>
            <input type="text" class="form-control" id="search" placeholder="Ville,Pays,CP" >
            <i class="fas fa-search"></i>
          </div>
        </form>
        <span id="magasin_selectione"></span>
        <div id="map" class="map"></div>
        <br>
        <div class="alert alert-danger" id="alert_error" role="alert" style="display: none">
       
        </div>
        <form id="inscription" method="POST" action="prisse_rdv.php"  style="display: none">
          <h4 style="width: 100%;max-width: 100%;text-align: center;text-transform: uppercase;">INDIQUEZ-NOUS VOS DONNées PERSONNElleS</h4>
          <div class="formulaire" >
          
          <div class="row">
            <div class="col">
              <label for="nom"  class="col-form-label">Nom</label>
              <input type="text" class="form-control" name="nom" placeholder="Nom"  required="true">
            </div>
            <div class="col">
              <label for="prenom"  class="col-form-label">Prénom</label>
              <input type="text" class="form-control" name="prenom" placeholder="Prénom"  required>
            </div>
          </div>
          </div>
          <br>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="ville">Ville</label>
            <input type="text" class="form-control" id="ville" name="ville" placeholder="ex : PARIS"  required>
          </div>
          <div class="form-group col-md-4">
            <label for="departement">Département</label>
            <select id="departement" class="form-control" name="departement">
            <!--   <option selected>Ain</option> -->
              <script type="text/javascript">
                $.get("departements.json", function(result){
                  //console.log(result.departements);
                    var departements = result.departements; //JSON.stringify(result.departements);
                   
                   for( var departement in departements){
                      let departement_name = departements[departement];
                      //console.log(departement);
                      let name_departement = departement_name.name;
                      if(name_departement=="Paris"){
                        $("#departement").append("<option selected>"+name_departement+" - "+departement+"</option>");
                      }else {
                        $("#departement").append("<option>"+name_departement+" - "+departement+"</option>");
                      }
                    }
                });
              </script>
            </select>
          </div>
          <div class="form-group col-md-2">
            <label for="postal">Code Postal</label>
            <input type="number" class="form-control" id="postal" name="postal" placeholder="ex : 75013"  min="1000" required>
          </div>
        </div>

          <div class="formulaire" >
            <label for="mail" class="col-form-label">Mail</label>
            <input type="mail" class="form-control" id="mail" name="mail"  required>
          </div>
          <div class="formulaire" >
            <label for="telephone" class="col-form-label" >Portable</label>
            
            <input type="tel" class="form-control" id="telephone" name="telephone" placeholder="ex : 0153803365"   required>
          </div>

          <br>

          <div class="form-group">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" name="newsletter" checked id="newsletter">
              <label class="form-check-label" for="newsletter">
                J'accepte de recevoir la newsletter et/ou  sms ainsi que les conditions de la RGPD <a href="https://www.vinylfactory.fr/politique-de-protection-des-donnees-personnelles-de-la-societe-angel-eyes/">ici</a>
              </label>
            </div>
          </div>

          <div class="formulaire" >
            <label for="date" class="col-form-label">A quel moment souhaitez-vous passer ?</label>
            <input type="date" class="form-control" id="date" name="date" min="2019-29-01" max="2019-12-31"  required> 
          </div>
          <br><br>
          <div class="formulaire" >
            <label>&nbsp;</label>
          <div  id="commander" class="button" style="text-transform: uppercase;margin-left: 20%;margin-right: 20%;width: auto;text-align: center" >je réserve</div>
         </div>
        </form>
      </div>
      <div class="modal-body" id="modal_body2" style="text-align: center;padding: 15%;display: none">
        <i class="fas fa-check-circle fa-10x"></i><br><br>
        <h4 style="text-transform: uppercase;">Nous vous remercions pour votre réservation.<br>Un mail de confirmation vient de vous être envoyé.  </h4><br>
        <div  id="recapitulatif"></div>
        <p>Pour toute question,
        veuillez nous contacter au +33 (0)1 56 83 03 85
        ou par mail à  <a href="mailto:contact@angeleyes-eyewear.com">contact@angeleyes-eyewear.com</a> </p>
      </div>
      <div class="modal-body" id="error" style="text-align: center;padding: 15%;display: none">
        <i class="fas fa-exclamation-triangle fa-10x"></i><br><br>
        <h4 style="text-transform: uppercase;">Il semblerait qu'il y ai une erreur dans votre adresse mail.  </h4><br>
        
        <p>Pour toute question,
        veuillez nous contacter au +33 (0)1 56 83 03 85
        ou par mail à  <a href="mailto:contact@angeleyes-eyewear.com">contact@angeleyes-eyewear.com</a> </p>
      </div>
      <div class="modal-body" id="chargement" style="text-align: center;padding: 15%;display: none">
        <img src="chargement2.gif">
      </div>
  </div>


<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="test.js"></script>
  <script 
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCw7IF5dgrLYfevSM2pHzENz0ungw0dt88&callback=initMap">
  google.maps.event.addDomListener(window,'load', initMap);
  </script>
</body>
</html>