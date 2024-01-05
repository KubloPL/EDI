fetch('https://my.api.mockaroo.com/swieczki.json?key=e8c704d0')
  .then(res => res.json())
  .then(data => {
    const attacksByCountry = {};

    // Count the number of attacks per country
    data.forEach(item => {
      if (item.breach_country in attacksByCountry) {
        attacksByCountry[item.breach_country]++;
      } else {
        attacksByCountry[item.breach_country] = 1;
      }
    });

    // Assuming you have a map container with id 'map'
    const map = L.map('map').setView([0, 0], 2);

    // You'll need a GeoJSON file containing country boundaries
    // Replace 'path_to_countries.geojson' with the actual path to your GeoJSON file
    fetch('world.geojson')
      .then(res => res.json())
      .then(countriesData => {
        L.geoJSON(countriesData, {
          style: function (feature) {
            const countryName = feature.properties.name;

            // Check if the country has attack data
            if (countryName in attacksByCountry) {
              return {
                fillColor: 'red', // Change the fill color to indicate attacks
                color: 'white',
                weight: 1,
              };
            } else {
              return {
                fillColor: 'gray', // Gray for countries with no attack data
                color: 'white',
                weight: 1,
              };
            }
          },
          onEachFeature: function (feature, layer) {
            const countryName = feature.properties.name;

            // Display number of attacks as a label on the country
            if (countryName in attacksByCountry) {
              layer.bindPopup(`<strong>${countryName}</strong><br>Attacks: ${attacksByCountry[countryName]}`);
            }
          },
        }).addTo(map);
      })
      .catch(error => {
        console.error('Error fetching or parsing country data:', error);
      });
  })
  .catch(error => {
    console.error('Error fetching or parsing attack data:', error);
  });
