$(document).ready(function () {
    $('#onlyMalesFilter').click(function () {
        console.log('onlyMalesFilter Filter executed');
        employeesRef.where("gender", "==", "Male")
            .onSnapshot(function (querySnapshot) {
                debugger;
                LoadTableData(querySnapshot);
            });
    });

    $('#fullTimeFilter').click(function () {
        console.log('fullTimeFilter Filter executed');
    });

    $('#olderThenFilter').click(function () {
        console.log('olderThenFilter Filter executed');
    });

    $('#ageBetweenFilter').click(function () {
        console.log('ageBetweenFilter Filter executed');
        employeesRef.where("age", ">=", 35).where("age", "<=", 50)
            .onSnapshot(function (querySnapshot) {
                LoadTableData(querySnapshot);
            });
    });

    $('#yearsOfExperienceFilter').click(function () {
        console.log('yearsOfExperienceFilter Filter executed');
        employeesRef.where("gender", "==", "Female")
            .where("yearsOfExperience", ">=", 5)
            .where("yearsOfExperience", "<=", 10)
            .onSnapshot(function (querySnapshot) {
                LoadTableData(querySnapshot);
            });
    });

    $('#clearFilter').click(function () {
        console.log('clearFilter Filter executed');
        employeesRef.orderBy("age", "asc").limit(3).get().then(function (querySnapshot) {
            LoadTableData(querySnapshot);
        });
    });

    $("#searchEmployee").change(function () {
        console.log('You entered: ', $(this).val());
        var searchValue = $(this).val();
        if (searchValue == "") {
            employeesRef.get().then(function (querySnapshot) {
                LoadTableData(querySnapshot);
            });
        } else {
            employeesRef.where("fName", "==", searchValue)
                .onSnapshot(function (querySnapshot) {
                    LoadTableData(querySnapshot);
                });
        }

    });

});

db.collection("employees").onSnapshot(function (snapshot) {
    console.log("Someting changed");
    LoadTableData(snapshot);
})
// function LoadData() {
//     employeesRef.get().then(function (querySnapshot) {
//         LoadTableData(querySnapshot);
//     });
// }

function LoadTableData(querySnapshot) {
    var tableRow = '';
    querySnapshot.forEach(function (doc) {
        var document = doc.data();
        tableRow += '<tr>';
        tableRow += '<td class="avatar"><img style="width:100px;height:100px;" src='+ document.avatarURL +' alt='+ document.fName+'></td>';
        tableRow += '<td class="fname">' + document.fName + '</td>';
        tableRow += '<td class="lname">' + document.lName + '</td>';
        tableRow += '<td class="email">' + document.email + '</td>';
        tableRow += '<td class="age">' + document.age + '</td>';
        tableRow += '<td class="gender">' + document.gender + '</td>';
        tableRow += '<td class="yearsofexperience">' + document.yearsOfExperience + '</td>';
        tableRow += '<td class="isfulltime">' + document.isFullTime + '</td>';
        tableRow += '<td class="editEmployee"><i class="fa fa-pencil" aria-hidden="true" style="color:green"></i></td>'
        tableRow += '<td class="deleteEmployee"><i class="fa fa-trash" aria-hidden="true" style="color:red"></i></td>'
        tableRow += '</tr>';
    });
    $('tbody.tbodyData').html(tableRow);
}