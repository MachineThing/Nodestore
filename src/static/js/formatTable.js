// Format Table
// This script formats table elements

function formatTable() {
  var tableElement = document.getElementById('item_table');
  var tableLength = tableElement.rows.length;
  for (i=0; i<tableLength; i++) {
    var cell = tableElement.rows.item(i).cells.item(1);
    if (cell.innerHTML == 0) {
      cell.innerHTML = "FREE";
    } else {
      cell.innerHTML = '$'+parseFloat(cell.innerHTML).toFixed(2);
    }
  }
}
