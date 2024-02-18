document.addEventListener("DOMContentLoaded",() => { 
  const ERRORMESSAGE = "Cancel was pressed. The requested change won't be implemented";
  var rowCount = 0;

  document.getElementById("addButton").addEventListener("click", function () {
    addRow();
  });
  document.getElementById("addManualButton").addEventListener("click", function () {
    addRowManuale();
  });
  document.getElementById("table").addEventListener("click", function (event) {
    if (event.target && event.target.nodeName == "BUTTON" && event.target.textContent == "Modify") {
      modifyRow(event.target.parentNode.parentNode);
    }
  });
  document.getElementById("table").addEventListener("click", function (event) {
    if (event.target && event.target.nodeName == "BUTTON" && event.target.textContent == "Delete") {
      deleteRow(event.target.parentNode.parentNode);
    }
  });
  document.getElementById("deleteSelected").addEventListener("click", function () {
    deleteSelectedRows();
  });
  
  function addRow() {
    var table = document.getElementById("table").getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(-1);
    var rowId = "id_" + ++rowCount;
    newRow.id = rowId;
    for (var i = 0; i < 5; i++) {
      var newCell = newRow.insertCell(i);
      newCell.classList.add("cell");
      switch (i) {
        case 0:
          newCell.innerHTML = '<input type="checkbox" id="' + rowId + '_checkbox">';
          break;
        case 1:
          newCell.classList.add("col-xs-6", "col-sm-3", "align-middle")
          break;
        case 2:
          newCell.classList.add("col-xs-6", "col-sm-3", "align-middle")
          break;
        case 3:
          newCell.innerHTML = '<button id="' + rowId + '_modify" class="btn btn-primary align-middle">Modify</button>';
          break;
        case 4:
          newCell.innerHTML = '<button id="' + rowId + '_delete" class="btn btn-secondary align-middle">Delete</button>';
          break;
        default:
          newCell.innerHTML = "";
      }
    }
  }

  function addRowManuale() {
    var table = document.getElementById("table").getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(-1);
    var rowId = "id_" + ++rowCount;
    newRow.id = rowId;

    nameData = promptCheck("Insert name (max 10 characters):", 10);
    detailsData = promptCheck("Insert details (max 50 characters):", 50);
    if (nameData !== null && detailsData !== null) {
      for (var i = 0; i < 5; i++) {
        var newCell = newRow.insertCell(i);
        newCell.classList.add("cell");

        switch (i) {
          case 0:
            newCell.innerHTML = '<input type="checkbox" id="' + rowId + '_checkbox">';
            break;
          case 1:
            newCell.innerHTML = nameData;
            newCell.classList.add("col-xs-6", "col-sm-3", "align-middle")
            break;
          case 2:
            newCell.innerHTML = detailsData;
            newCell.classList.add("col-xs-6", "col-sm-3", "align-middle")
            break;
          case 3:
            newCell.innerHTML = '<button id="' + rowId + '_modify" class="btn btn-primary align-middle">Modify</button>';
            break;
          case 4:
            newCell.innerHTML = '<button id="' + rowId + '_delete" class="btn btn-secondary align-middle">Delete</button>';
            break;
          default:
            newCell.innerHTML = "";
        }
      }
    } else {
      alert(ERRORMESSAGE);
    }
  }

  function modifyRow(row) {
    var newName = promptCheck("Insert name (max 10 characters):", 10);
    var newDetails = promptCheck("Insert details (max 50 characters):", 50);
    if (newName !== null && newDetails !== null) {
      row.cells[1].textContent = newName;
      row.cells[2].textContent = newDetails;
    } else {
      alert(ERRORMESSAGE);
    }
  }

  function deleteRow(row) {
    var confirmDelete = confirm("Are you sure you want to delete this row?");
    if (confirmDelete) {
      row.parentNode.removeChild(row);
    }
  }

  function deleteSelectedRows() {
    var table = document.getElementById("table").getElementsByTagName("tbody")[0];
    var rowsToDelete = [];

    for (var i = 0; i < table.rows.length; i++) {
      var row = table.rows[i];
      var checkbox = row.querySelector('input[type="checkbox"]');

      if (checkbox.checked) {
        rowsToDelete.push(row);
      }
    }

    if (rowsToDelete.length > 0) {
      var confirmDelete = confirm("Are you sure you want to delete the selected rows?");
      if (confirmDelete) {
        rowsToDelete.forEach(function (row) {
          table.removeChild(row);
        });
      }
    } else {
      alert("No rows selected.");
    }
  }
  
  function promptCheck(message, characters) {
    var check = false;
    var data = null;
    while (!check) {
      data = prompt(message);
      if (data === null) {
        return null;
      }
      switch (true) {
        case data.length === 0:
          alert("The field cannot be empty.");
          break;
        case data.length > characters:
          alert("The field cannot exceed " + characters + " characters.");
          break;
        default:
          data = data.charAt(0).toUpperCase() + data.slice(1);
          check = true;
      }
    }
    return data;
  }

})