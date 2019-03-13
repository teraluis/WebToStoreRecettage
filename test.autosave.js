 var geocoder;
  var map;
  const mapStyle = [
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]

function sanitizeHTML(strings) {
  const entities = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
  let result = strings[0];
  for (let i = 1; i < arguments.length; i++) {
    result += String(arguments[i]).replace(/[]/g, (char) => {
      return entities[char];
    });
    result += strings[i];
  }
  return result;
}
var user_data=[];
function retourne_position(){
  var x = document.getElementById("inscription");
  document.getElementById("magasin_selectione").innerHTML = "magasin selectione "+user_data[0];
  x.style.display = "block";
  window.scrollTo(0,document.querySelector("#inscription").scrollHeight);
  
}
function initMap(){
    codeAddress("37 ue Jean-Baptiste Charcot 92400 Courbevoie");
}
  function codeAddress(address) {
  const map = new google.maps.Map(document.getElementsByClassName('map')[0], {
    zoom: 15,
    center: {lat: 48.897880, lng: 2.266800},
    styles: mapStyle
  });
  map.data.setStyle(feature => {
    return {
      icon: {
        url: `img/vinyl_logo.png`,
        scaledSize: new google.maps.Size(30, 30)
      }
    };
  });
    //const apiKey = 'AIzaSyAjK0ZMfrYfOd0vAyXJJW3xf-cmuxRdAeI';
  const infoWindow = new google.maps.InfoWindow();
  infoWindow.setOptions({pixelOffset: new google.maps.Size(0, -30)});
   map.data.loadGeoJson('revendeurs.json');
   geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      
      } else {
        alert('Addresse incorecte: ' + status);
      }
    });
  map.data.addListener('click', event => {

    const opticien = event.feature.getProperty('title');
    const adresse = event.feature.getProperty('rue_revendeurs');
    const postal_code = event.feature.getProperty('code_postal');
    const ville = event.feature.getProperty('ville_revendeurs');
    const phone = event.feature.getProperty('telephone');
    const position = event.feature.getGeometry().get();
    user_data =[];
    user_data.push(opticien);
    user_data.push(adresse);
    user_data.push(ville);
    user_data.push(phone);
    const content = sanitizeHTML`
      <div style="width:300px; margin-bottom:20px;font-size:1em">
      <br>
        <p><b>Opticien:</b> ${opticien}</p>
        <p><b>Adresse:</b> ${adresse}<br/><b>Code Postal :</b> ${postal_code} <br> <b>Ville:</b> ${ville} <br>
        <b>téléphone :</b> ${phone}
        </p>
        
        <p><b>Horaires:</b> 10h00-19h00</p>
        <button onclick='retourne_position()' class="button" >Sélectionner</button>
      </div>
    `;

    infoWindow.setContent(content);
    infoWindow.setPosition(position);
    infoWindow.open(map);
  });
  }


$(document).ready(function(){
initMap();
var today = new Date();
var dd = today.getDate()+4;
var mm = today.getMonth() + 1; //January is 0!

var yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd;
} 
if (mm < 10) {
  mm = '0' + mm;
} 
var today = yyyy+"-"+mm+"-"+dd;
document.getElementById('date').setAttribute("min",today);
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
  let modal2 = document.getElementById("modal_body2");
  modal2.style.display="none";
  codeAddress("paris");
  var x = document.getElementById("inscription");
  x.style.display = "none";
  $("#search").blur(function(){
    var address = $( this ).val();
    
    var geocode = codeAddress(address);

  });

  function submitWebToStore(monture) {

      var fromulaire = $('#inscription');
      var champs = {};
      let tmp = user_data[0];
      tmp = escapeHtml(tmp);
      console.log(tmp);
      champs['opticien']=tmp;
      var tmp2 = escapeHtml(user_data[1]);
      champs['adresse']=tmp2;
      champs['ville']=user_data[2];
      champs['phone']=user_data[3];
      console.log(monture);
      var form = fromulaire.serialize();

      
      $.ajax({
          type: "POST",
          dataType: "json",
          url: "prisse_rdv.php",
          data: form+"&monture="+monture+"&opticien="+champs['opticien']+"&direcion="+champs['adresse']+"&ciudad="+champs['ville'],
          reponseType:'html',
          beforeSend: function () {
            $("#chargement").show();
          },
          success: function (data) {
              $("#chargement").hide();
              var obj=data;
              console.log(obj);
              $("#recapitulatif").text("vous serez attendu à "+obj['adresse']+" le "+obj['date']+" chez "+obj['opticien']);
              let modal = document.getElementById("modal-body");
              modal.style.display="none";
              let modal2 = document.getElementById("modal_body2");
              modal2.style.display="block";
          },
          complete: function (data) {
            var obj=data;
            $("#chargement").hide();
          },
          error: function (jqXHR, textStatus, errorThrown) {
              $("#chargement").hide();
              $("#error").show();
              console.log(jqXHR + " :: " + textStatus + " :: " + errorThrown);
          }
      });
  }

  var monture_final = monture;
  $("#commander").click(function(e){
    
    e.preventDefault();
    console.log(monture_final);
    if($("#nom").val()!="" 
      && $("#prenom").val()!=""
      && $("#ville").val()!=""
      && $("#mail").val()!="" 
      && $("#telephone").val()!=""
      && $("#date").val()!=""
      ){
      let date =$("#date").val();
      let mail =$("#mail").val();
      let nom = $("#nom").val();
      let prenom = $("#prenom").val();
      let newsletter = $("#newsletter").val();
      let ville = $("#ville").val();
      let telephone = $("#telephone").val();
      console.log(newsletter);
      if(newsletter=="on"){
        if(validation_jour(date)==true && validateEmail(mail)==true && validateString(nom)==true 
          && validateString(prenom)==true && validateString(ville)
          && validatePhone(telephone)
          ) {
          let modal = document.getElementById("modal-body");
          modal.style.display="none";
          $("#chargement").show();
          submitWebToStore(monture_final);
          return false;
        }else {
          alert("vous devez completer touts les champs correctement , avec un delai minimal de 4 jours");
        }
      }else {
        alert("vous devez acepter les conditions de la rgpd");
      }

    }else {
      alert("veuillez completer touts les champs  svp.");
    }
    });
});
function escapeHtml(text) {
  return text
      .replace(/&amp;/g, "")
      .replace(/&rsquo;/g, "")
      .replace(/&amp;/g, "")
      .replace(/#8211;/g, "")
      .replace(/&/g, "ET")
      .replace(/&#039;/g, "");
}
function validation_jour(date){
  var aujordhui_date = new Date();
  var aujordhui= aujordhui_date.getDate();
  var ce_mois = aujordhui_date.getMonth()+1;
  var cette_annee=aujordhui_date.getFullYear();
  var aujordhui_semaine = aujordhui_date.getDay();
  var date = new Date(date);
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  var day = date.getDay();

  let date_rdv=(mm*10)+dd;
  let date_courante=(ce_mois*10)+aujordhui;
  let ecart = Math.abs(parseInt(aujordhui_semaine+1)-parseInt(day+1));
  console.log(ecart);
  var validacion = parseInt(mm*10)+parseInt(date_rdv)>parseInt(ce_mois*10)+parseInt(date_courante+4);

  if(day == 0 || day == 1  ){//si c' est dimanche = 0 ou lundi = 1
    return false;
  }else {
    if(yyyy>cette_annee){ 
      return true;
    }else if(mm<ce_mois) {
      return false;
    }else if(mm==ce_mois || mm>ce_mois) {
      if(validacion==true){
        return true;
      }else {
        return false;
      }
    }
  }
}
function validateEmail(candidate){
  let emailRegex = new RegExp("^[0-9a-zA-Z._ éèàçù~^¨-]+@[0-9a-zA-Z_éàù-]{2,}\.[- a-z_]{2,6}$",'i');
  return emailRegex.test(candidate);
}
function validateString(candidate){
  let string = new RegExp("^([^0-9]*)$",'i');
  return string.test(candidate);
}
function validatePhone(candidate){
  let string = new RegExp("^(0)[1-9]([-. ]?[0-9]{2}){4}$",'ig');//regex qu acepte les numeros de elephone +33 et de 01 à 09
  return string.test(candidate);
}
$("input[name='telephone']").blur(function verifPhone(){
  if($(this).val().length<1){
        $(this).css("background-color","rgba(215, 44, 44, 0.4)");
        $(this).css("color","white");
        $("#alert_error").show();
        $("#alert_error").text("");
        $("#alert_error").text("le numero de telephone n'est pas valide ");
  }else {
      if(!validatePhone($(this).val())){
          
          $(this).css("background-color","rgba(215, 44, 44, 0.4)");//rgba(215, 44, 44, 0.4)
          $(this).css("color","white");
          $("#alert_error").show();
          $("#alert_error").text("");
          $("#alert_error").text("le numero de telephone doit comencer soit par 33 soit par 01 à 09");
      }else if(validatePhone($(this).val())){
          $(this).css("background-color","white");
          $(this).css("color","black");
          $("#alert_error").hide();
          $("#alert_error").text("");
      }
  }
});
$("input[name='ville']").blur(function verifPhone(){
  if($(this).val().length<1){
        $(this).css("background-color","rgba(215, 44, 44, 0.4)");
        $(this).css("color","white");
        $("#alert_error").show();
        $("#alert_error").text("");
        $("#alert_error").text("le numero de telephone n'est pas valide ");
  }else {
      if(!validateString($(this).val())){
          
          $(this).css("background-color","rgba(215, 44, 44, 0.4)");//rgba(215, 44, 44, 0.4)
          $(this).css("color","white");
          $("#alert_error").show();
          $("#alert_error").text("");
          $("#alert_error").text("le numero de telephone doit comencer soit par +33 soit par 01 à 09");
      }else if(validateString($(this).val())){
          $(this).css("background-color","white");
          $(this).css("color","black");
          $("#alert_error").hide();
          $("#alert_error").text("");
      }
  }
});
$("input[name='mail']").blur(function verifMail(){
  if($(this).val().length<1){
        $(this).css("background-color","rgba(215, 44, 44, 0.4)");
        $(this).css("color","white");
        $("#alert_error").show();
        $("#alert_error").text("");
        $("#alert_error").text("l'adresse mail ne doit pas être vide");
  }else {
      if(!validateEmail($(this).val())){
          
          $(this).css("background-color","rgba(215, 44, 44, 0.4)");//rgba(215, 44, 44, 0.4)
          $(this).css("color","white");
          $("#alert_error").show();
          $("#alert_error").text("");
          $("#alert_error").text("l'adresse mail n'est pas bonne");
      }else if(validateEmail($(this).val())){
          $(this).css("background-color","white");
          $(this).css("color","black");
          $("#alert_error").hide();
          $("#alert_error").text("");
      }
  }
});
$("input[name='nom']").blur(function verifNom(){
  if($(this).val().length<2){
        $(this).css("background-color","rgba(215, 44, 44, 0.4)");
        $(this).css("color","white");
        $("#alert_error").show();
        $("#alert_error").text("");
        $("#alert_error").text("le nom ne dois pas être vide");
  }else {
      if(!validateString($(this).val())){
          
          $(this).css("background-color","rgba(215, 44, 44, 0.4)");//rgba(215, 44, 44, 0.4)
          $(this).css("color","white");
          $("#alert_error").show();
          $("#alert_error").text("");
          $("#alert_error").text("le nom n est pas valable");
      }else if(validateString($(this).val())){
          $(this).css("background-color","white");
          $(this).css("color","black");
          $("#alert_error").hide();
          $("#alert_error").text("");
      }
  }
});
$("input[name='prenom']").blur(function verifPrenom(){
  if($(this).val().length<2){
        $(this).css("background-color","rgba(215, 44, 44, 0.4)");
        $(this).css("color","white");
        $("#alert_error").show();
        $("#alert_error").text("");
        $("#alert_error").text("le prenom ne dois pas être vide");
  }else {
      if(!validateString($(this).val())){
          $(this).css("background-color","rgba(215, 44, 44, 0.4)");//rgba(215, 44, 44, 0.4)
          $(this).css("color","white");
          $("#alert_error").show();
          $("#alert_error").text("");
          $("#alert_error").text("le prenom n'pas valable");
      }else if(validateString($(this).val())){
          $(this).css("background-color","white");
          $(this).css("color","black");
          $("#alert_error").hide();
          $("#alert_error").text("");
      }
  }
});