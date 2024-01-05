// Variables to manage pagination
var currentPage = 0;
var entriesPerPage = 10;

// Function to display the table with pagination
function displayTable(start, end) {
  var table = '<table border="1"><tr><th>Breach ID</th>...'; // Your table headers
  for (var i = start; i < end; i++) {
    table += '<tr>';
    // Add table data here as you did before
    table += '</tr>';
  }
  table += '</table>';
  document.getElementById('tableContainer').innerHTML = table;
}

// Initial display of the table with pagination
displayTable(0, entriesPerPage);

// Button functionality for pagination
document.getElementById('prevBtn').addEventListener('click', function () {
  if (currentPage > 0) {
    currentPage--;
    var start = currentPage * entriesPerPage;
    var end = start + entriesPerPage;
    displayTable(start, end);
  }
});

document.getElementById('nextBtn').addEventListener('click', function () {
  if (currentPage < Math.ceil(data.length / entriesPerPage) - 1) {
    currentPage++;
    var start = currentPage * entriesPerPage;
    var end = Math.min(start + entriesPerPage, data.length);
    displayTable(start, end);
  }
});
