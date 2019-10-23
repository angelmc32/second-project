var hosp1 = { lat: 19.238866,  lng: -99.124751 };
var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          //center: {lat: -33.86, lng: 151.209},
          //19.238866,-99.124751
          zoom: 16,
          mapTypeControl: false
        
        });
        

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            const user_location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log(user_location);
            // Centrar Mapa en mi ubicaciòn
            map.setCenter(user_location);
      
            // Agregar Marcador de mi ubicación
            const MiUbicacion = new google.maps.Marker({
              position: {
                lat: user_location.lat,
                lng: user_location.lng
              },
              map: map,
              title: "Mi Ubicación"
            });
            
           
          }, function () {
            console.log('Error in the geolocation service.');
          });
        } else {
          console.log('Browser does not support geolocation.');
        }
        //Marcador de Hospitales
        var image = {
          url: 'image/hosp11.png', //ruta de la imagen
          size: new google.maps.Size(40, 60), //tamaño de la imagen
          origin: new google.maps.Point(0,0), //origen de la iamgen
          //el ancla de la imagen, el punto donde esta marcando, en nuestro caso el centro inferior.
          anchor: new google.maps.Point(20, 60) 
         };  

        new google.maps.Marker({
          position: {
            lat: 19.238866,  
            lng: -99.124751
          },
          map:map,
          title: "Hospital 1",
          draggable: true,
		      icon : image
        });

        // Add controls to the map, allowing users to hide/show features.
        var styleControl = document.getElementById('style-selector-control');
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(styleControl);

        // Apply new JSON when the user chooses to hide/show features.
        document.getElementById('hide-poi').addEventListener('click', function() {
          map.setOptions({styles: styles['hide']});
        });
        document.getElementById('show-poi').addEventListener('click', function() {
          map.setOptions({styles: styles['default']});
        });
      }

      var styles = {
        default: null,
        hide: [
          {
            featureType: 'poi.business',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [{visibility: 'off'}]
          }
        ]
      };
/*
function startMap() {

  // Coordenadas IronHack BArcelona
  const ironhackBCN = { lat: 41.3977381,  lng: 2.190471916 };

  // Inicializa Mapa
  const map = new google.maps.Map(document.getElementById('map'), 
    {
      zoom: 5,
      center: ironhackBCN
    }
  );

  // Agregando un marcador for Ironhack Barcelona
  const IronhackBCNMarker = new google.maps.Marker({
    position: {
      lat: ironhackBCN.lat,
      lng: ironhackBCN.lng
    },
    map: map,
    title: "Barcelona Ironhack",
    mapTypeControl: false
  });


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const user_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log(user_location);
      // Centrar Mapa en mi ubicaciòn
      map.setCenter(user_location);

      // Agregar Marcador de mi ubicación
      const ironhackBCNMarker = new google.maps.Marker({
        position: {
          lat: user_location.lat,
          lng: user_location.lng
        },
        map: map,
        title: "Mi Ubicación"
      });

    }, function () {
      console.log('Error in the geolocation service.');
    });
  } else {
    console.log('Browser does not support geolocation.');
  }
}
*/

initMap();

