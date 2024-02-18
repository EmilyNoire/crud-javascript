document.addEventListener("DOMContentLoaded",() => {

  document.getElementById("saveButton").addEventListener("click", function () {
    saveData();
  });
  document.getElementById("loadDataButton").addEventListener("click", function () {
    loadData();
  });
  document.getElementById("clearCacheButton").addEventListener("click", function () {
    if (confirm("Are you sure?")) {
        clearCache();
    };
  });

  function saveData() {
    var tableData = getData();
    localStorage.setItem('dataStorageTable', JSON.stringify(tableData));
    alert('Data stored.');
  }

  function getData() {
    var tableRows = document.querySelectorAll('#table tbody tr');
    var tableData = [];
    tableRows.forEach(row => {
        var rowData = {
            name: row.cells[1].textContent,
            details: row.cells[2].textContent
        };
        tableData.push(rowData);
    });

    return tableData;
  }

  function clearCache() {
    localStorage.removeItem("dataStorageTable");
    alert("Cache cleared.");
  }

  function loadData() {
    var tableDataJSON = localStorage.getItem("dataStorageTable");
    if (tableDataJSON) {
        var tableData = JSON.parse(tableDataJSON);
        var table = document.getElementById("table").getElementsByTagName("tbody")[0];
        tableData.forEach(rowData => {
            var newRow = table.insertRow(-1);
            newRow.insertCell(0).innerHTML = '<input type="checkbox">';
            var nameCell = newRow.insertCell(1)
            nameCell.textContent = rowData.name;
            nameCell.classList.add("col-xs-6", "col-sm-3", "align-middle")
            var detailCell = newRow.insertCell(2)
            detailCell.textContent = rowData.details;
            detailCell.classList.add("col-xs-6", "col-sm-3", "align-middle")
            newRow.insertCell(3).innerHTML = '<button class="btn btn-primary">Modify</button>';
            newRow.insertCell(4).innerHTML = '<button class="btn btn-secondary">Delete</button>';
        });
        alert("Data loaded.");
    } else {
        alert("No data found.");
    }
  }
})