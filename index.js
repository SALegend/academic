var currentSNo = 1;
let data = []

function addRow() {
    tab = document.getElementById("studentInfo")
    tableLength = tab.rows.length
    for (var i = 1; i < tableLength; i++) {
        if (tab.rows[i].cells[1].children[0].value == "" ||
            tab.rows[i].cells[2].children[0].value == "" ||
            tab.rows[i].cells[3].children[0].value == "" ||
            tab.rows[i].cells[4].children[0].value == "" ||
            tab.rows[i].cells[5].children[0].value == "") {
            document.getElementById("msg").innerHTML = "Error : First fill last row data."
            setTimeout(function () { document.getElementById("msg").innerHTML = "" }, 8000);
            return;
        }
    }
    let currentRow = tab.insertRow(tableLength)
    //1
    sNo = document.createElement("input")
    sNo.setAttribute("type", "text")
    sNo.setAttribute("value", currentSNo++)
    currentCell = currentRow.insertCell(0)
    currentCell.appendChild(sNo)
    //2
    studentName = document.createElement("input")
    studentName.setAttribute("type", "text")
    currentCell = currentRow.insertCell(1)
    currentCell.appendChild(studentName)
    //3
    rollNo = document.createElement("input")
    rollNo.setAttribute("type", "text")
    currentCell = currentRow.insertCell(2)
    currentCell.appendChild(rollNo)
    //4
    month = document.createElement("input")
    month.setAttribute("type", "text")
    currentCell = currentRow.insertCell(3)
    currentCell.appendChild(month)
    //5
    messCharges = document.createElement("input")
    messCharges.setAttribute("type", "text")
    currentCell = currentRow.insertCell(4)
    currentCell.appendChild(messCharges)
    //6
    roomCharges = document.createElement("input")
    roomCharges.setAttribute("type", "text")
    currentCell = currentRow.insertCell(5)
    currentCell.appendChild(roomCharges)
    //7
    remBtn = document.createElement("input")
    remBtn.setAttribute("type", "button")
    remBtn.setAttribute("value", " - ")
    remBtn.setAttribute("onClick", "removeRow(" + tableLength + ")")
    remBtn.setAttribute("class", "btn btn-danger") //class="btn btn-danger"
    currentCell = currentRow.insertCell(6)
    currentCell.appendChild(remBtn)
}

function removeRow(tableLength) {
    td = event.target.parentNode
    tr = td.parentNode
    tr.parentNode.removeChild(tr)
    currentSNo--

    // update the serial number
    const rows = tab.rows;
    for (let i = 1; i < rows.length; i++) {
        rows[i].cells[0].firstChild.value = i;
    }
}

function downloadExcel() {
    tab = document.getElementById("studentInfo")
    tableLength = tab.rows.length
    for (var i = 1; i < tableLength; i++) {
        if (tab.rows[i].cells[1].children[0].value == "" ||
            tab.rows[i].cells[2].children[0].value == "" ||
            tab.rows[i].cells[3].children[0].value == "" ||
            tab.rows[i].cells[4].children[0].value == "" ||
            tab.rows[i].cells[5].children[0].value == "") {
            document.getElementById("msg").innerHTML = "Error : First fill last row data."
            setTimeout(function () { document.getElementById("msg").innerHTML = "" }, 8000);
            return;
            }}
    document.getElementById("msg").innerHTML = "The Download Started"
    exportData();
    document.getElementById("msg").innerHTML = "The Download Ended"
    setTimeout(function() { document.getElementById("msg").innerHTML = "" }, 5000);
}

function exportData() {
    var table = document.getElementById("studentInfo");
    var rows = [["S.No.", "Student Name", "Roll No", "Month", "Room Charge", "Mess Charges"]];
    for (var i = 1, row; row = table.rows[i]; i++) {
        //rows would be accessed using the "row" variable assigned in the for loop
        //Get each cell value/column from the row
        column1 = row.cells[0].firstChild.value;
        column2 = row.cells[1].firstChild.value;
        column3 = row.cells[2].firstChild.value;
        column4 = row.cells[3].firstChild.value;
        column5 = row.cells[4].firstChild.value;
        column6 = row.cells[5].firstChild.value;

        /* add a new records in the array */
        rows.push(
            [
                column1,
                column2,
                column3,
                column4,
                column5,
                column6
            ]
        );
    }
    csvContent = "data:text/csv;charset=utf-8,";
    /* add the column delimiter as comma(,) and each row splitted by new line character (\n) */
    rows.forEach(function (rowArray) {
        row = rowArray.join(",");
        csvContent += row + "\r\n";
    });

    /* create a hidden <a> DOM node and set its download attribute */
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "studentInfo.csv");
    document.body.appendChild(link);
    /* download the data file named "Stock_Price_Report.csv" */
    link.click();
}

function sortTable() {
    var table = document.getElementById("studentInfo");
    var rows, x, y, shouldSwitch;
    while (true) {
        rows = table.rows;
        for (var i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[3];
            y = rows[i + 1].getElementsByTagName("TD")[3];
            if (x.firstChild.value > y.firstChild.value) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        } else {
            break;
        }
    }
    for (let i = 1; i < rows.length; i++) {
        rows[i].cells[0].firstChild.value = i;
    }
}

function checkForDuplicates() {
    var table = document.getElementById("studentInfo");
    rows = table.rows;
    var al = "Duplicate Exists : \n";
    var dexist = false;
    for (var i = 0; i < rows.length; i++) {
        for (var j = i + 1; j < rows.length; j++) {
            if (
                rows[j].cells[1].firstChild.value === rows[i].cells[1].firstChild.value &&
                rows[j].cells[2].firstChild.value === rows[i].cells[2].firstChild.value &&
                rows[j].cells[3].firstChild.value === rows[i].cells[3].firstChild.value
            ) {
                dexist = true;
                al += +j + "th row duplicate of " + i + "th row\n"
            }
        }
    }
    if (dexist) {
        document.getElementById("msg").innerHTML = al
        setTimeout(function() { document.getElementById("msg").innerHTML = "" }, 5000);
    }
}

function searchByName() {
    var name1 = prompt("Enter name :")
    var table = document.getElementById("studentInfo");
    var h = ""
    h += '<table class="table table-striped table-bordered">';
    h += "<tr>";
    h += "<td>S.No.</td>";
    h += "<td>Student Name</td>";
    h += "<td>Roll No</td>";
    h += "<td>Month</td>";
    h += "<td>Room Charge</td>";
    h += "<td>Mess Charges</td>";
    h += "</tr>";
    for (var i = 1, row; row = table.rows[i]; i++) {
        if (row.cells[1].firstChild.value == name1) {
            h += "<tr>";
            h += "<td>" + row.cells[0].firstChild.value + "</td>";
            h += "<td>" + row.cells[1].firstChild.value + "</td>";
            h += "<td>" + row.cells[2].firstChild.value + "</td>";
            h += "<td>" + row.cells[3].firstChild.value + "</td>";
            h += "<td>" + row.cells[4].firstChild.value + "</td>";
            h += "<td>" + row.cells[5].firstChild.value + "</td>";
            h += "</tr>";
        }
    }
    h += "</table>";
    document.getElementById("box").innerHTML = h;
}

function searchByRollNumber() {
    var roll1 = prompt("Enter roll number :")
    var table = document.getElementById("studentInfo");
    var h = ""
    h += '<table class="table table-striped table-bordered">';
    h += "<tr>";
    h += "<td>S.No.</td>";
    h += "<td>Student Name</td>";
    h += "<td>Roll No</td>";
    h += "<td>Month</td>";
    h += "<td>Room Charge</td>";
    h += "<td>Mess Charges</td>";
    h += "</tr>";
    for (var i = 1, row; row = table.rows[i]; i++) {
        if (row.cells[2].firstChild.value == roll1) {
            h += "<tr>";
            h += "<td>" + row.cells[0].firstChild.value + "</td>";
            h += "<td>" + row.cells[1].firstChild.value + "</td>";
            h += "<td>" + row.cells[2].firstChild.value + "</td>";
            h += "<td>" + row.cells[3].firstChild.value + "</td>";
            h += "<td>" + row.cells[4].firstChild.value + "</td>";
            h += "<td>" + row.cells[5].firstChild.value + "</td>";
            h += "</tr>";
        }
    }
    h += "</table>";
    document.getElementById("box").innerHTML = h;
}

function clearArray() {
    document.getElementById("box").innerHTML = "";
}

function uploadData() {
    var table = document.getElementById("studentInfo");
    var h = ""
    h += '<table class="table table-striped table-bordered table-primary table-hover">';
    h += "<tr>";
    h += "<td>S.No.</td>";
    h += "<td>Student Name</td>";
    h += "<td>Roll No</td>";
    h += "<td>Month</td>";
    h += "<td>Room Charge</td>";
    h += "<td>Mess Charges</td>";
    h += "</tr>";
    for (var i = 1, row; row = table.rows[i]; i++) {
            h += "<tr>";
            h += "<td>" + row.cells[0].firstChild.value + "</td>";
            h += "<td>" + row.cells[1].firstChild.value + "</td>";
            h += "<td>" + row.cells[2].firstChild.value + "</td>";
            h += "<td>" + row.cells[3].firstChild.value + "</td>";
            h += "<td>" + row.cells[4].firstChild.value + "</td>";
            h += "<td>" + row.cells[5].firstChild.value + "</td>";
            h += "</tr>";
    }
    h += "</table>";
    sessionStorage.setItem("transfer1", h);
    window.location.href="table.html"
}

// let arr1 = [["S.No.", "Student Name", "Roll No", "Month", "Room Charge", "Mess Charges"], ["1", "q", "w", "e", "r"], ["2", "a", "s", "d", "f"], ["3", "z", "x", "c", "v"]]

// function displayArray() {
//     var h = ""
//     h += '<table class="table table-striped table-bordered">';
//     for (var i = 0; i < arr1.length; i++) {
//         h += "<tr>";
//         h += "<td>" + arr1[i][0] + "</td>";
//         h += "<td>" + arr1[i][1] + "</td>";
//         h += "<td>" + arr1[i][2] + "</td>";
//         h += "<td>" + arr1[i][3] + "</td>";
//         h += "<td>" + arr1[i][4] + "</td>";
//         h += "<td>" + arr1[i][5] + "</td>";
//         h += "</tr>";
//     }
//     h += "</table>";
//     document.getElementById("box").innerHTML = h;
// }