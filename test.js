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
  //const entities = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
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
  //console.log(user_data);
  var x = document.getElementById("inscription");
  document.getElementById("magasin_selectione").innerHTML = "magasin selectione "+user_data[2];
  x.style.display = "block";
  
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
        url: `https://www.angeleyes-eyewear.com/wp-content/themes/angel-eyes-vitrine/assets/img/favicon.png`,
        scaledSize: new google.maps.Size(15, 15)
      }
    };
  });
    const apiKey = 'AIzaSyAjK0ZMfrYfOd0vAyXJJW3xf-cmuxRdAeI';
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
    user_data.push(position);
    user_data.push(phone);
    user_data.push(name);
    const content = sanitizeHTML`
      <div style="width:200px; margin-bottom:20px;">
        <p><b>Opticien:</b> ${opticien}</p>
        <p><b>Adresse:</b> ${adresse}<br/><b>Code Postal :</b> ${postal_code}</p><p><b>Ville:</b> ${ville} </p>
        <a href="#inscription" type="button" onclick='retourne_position()' class="btn btn-primary">Sélectionner</a>
      </div>
    `;

    infoWindow.setContent(content);
    infoWindow.setPosition(position);
    infoWindow.open(map);
  });
  }
$(document).ready(function(){
var today = new Date();
var dd = today.getDate()+3;
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
   var fromulaire = $('#inscription');
  function submitWebToStore() {
      var form = fromulaire.serialize();
      
      $.ajax({
          type: "POST",
          dataType: "json",
          url: "prisse_rdv.php",//url: $('#needs-validation').attr( 'action' ),
          data: form,
          reponseType:'json',
          beforeSend: function () {
            /* silence is golden */
          },
          success: function (data) {
              var obj=data;
              console.log(obj);
/*              var resultat = JSON.stringify(obj);
              resultat = eval(resultat);
              resultat =JSON.parse(resultat);*/
              
          },
          complete: function () {
            
          },
          error: function (jqXHR, textStatus, errorThrown) {
              console.log(jqXHR + " :: " + textStatus + " :: " + errorThrown);
          }
      });
  }
  $("#commander").click(function(e){
    e.preventDefault();
    if($("#nom").val()!="" 
      && $("#prenom").val()!=""
      && $("#ville").val()!=""
      && $("#mail").val()!="" 
      && $("#telephone").val()!=""
      && $("#date").val()!=""
      ){
    let modal = document.getElementById("modal-body");
    modal.style.display="none";
    let modal2 = document.getElementById("modal_body2");
    modal2.style.display="block";
    submitWebToStore();
    }else {
      alert("veuillez completer touts les champs  svp.");
    }

    });
});
