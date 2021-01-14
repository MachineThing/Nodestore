// Real time search
// This script searches for things in the table

function updateTable() {
  const input = document.getElementById('search');

  // Make table elements show or hide if they are relevent or not
  var tableElement = document.getElementById('item_table');
  var tableLength = tableElement.rows.length;
  for (i=0; i<tableLength; i++) {
    var row = tableElement.rows.item(i);
    var cell = tableElement.rows.item(i).cells.item(0);
    // Check if the item's name contains the input
    if (cell.innerHTML.toLowerCase().includes(input.value.toLowerCase()) || input.value == '') {
      row.style.display = "table-row"; // Show
    } else {
      row.style.display = "none"; // Hide
    }
  }
}
