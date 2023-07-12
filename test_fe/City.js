function findAll() {
    $.ajax({
        url: "http://localhost:8080/api/city",
        type: "GET",
        success: function (data) {
            displayTable(data)
        }
    })
}

function displayTable(value) {
    let content=`<h1>List City</h1>
    <div style="">
    <span>Danh sách thành phố</span>
    <button onclick="displayFormCreate();getAllSelectClassesCreate()">Thêm thành phố</button>
    </div>
    <table border="1">
    <tr>
        <th>#</th>
        <th>Thành phố</th>
        <th>Quốc gia</th>
        <th colspan="3"></th>
    </tr>`
    for (let i = 0; i < value.length; i++) {
        content +=`<tr class="item">
                   <td>${value[i].id}</td>
                   <td>${value[i].name}</td>
                   <td>${value[i].nation.name}</td>
                   <td><button onclick="views(${value[i].id})">Views</button></td>
                   <td><button onclick="displayFormUpdate(${value[i].id});getAllSelectClassesUpdate()">Update</button></td>
                   <td><button onclick="deleteStudent(${value[i].id})">Delete</button></td>
                   </tr>`
    }
    content += `</table>`
    document.getElementById("list").style.display = "block"
    document.getElementById("list").innerHTML =content
    document.getElementById("create").style.display = "none"
    document.getElementById("update").style.display = "none"
    document.getElementById("views").style.display = "none"
}





function views(id) {
    $.ajax({
        url: `http://localhost:8080/api/city/${id}`,
        type: "GET",
        success: function (city) {
            let content = `
            <div>Tên: ${city.name}</div>
            <div>Quốc gia: ${city.nation.name}</div>
            <div>Diện tính: ${city.area}</div>
            <div>Dân số: ${city.population}</div>
            <div>GDP: ${city.GDP}</div>
            <div>Giới thiệu: 
                    <div>${city.describes} </div></div>
            <button onclick="findAll()">Back to list</button>`
            document.getElementById("list").style.display = "none"
            document.getElementById("views").style.display = "block"
            document.getElementById("views").innerHTML = content
        }
    })
}


function displayFormCreate() {
    document.getElementById("create").style.display = "block"
    document.getElementById("list").style.display = "none"
    document.getElementById("page").style.display = "none"

}

function create(){
    let name = $("#name").val()
    let nationId = $("#classIdCreate").val()
    let area = $("#area").val()
    let people = $("#people").val()
    let gdp = $("#gdp").val()
    let introduce = $("#introduce").val()


    let nation = {
        name: name,
        area: area,
        population: people,
        GDP: gdp,
        describes: introduce,
        nation: {
            id: nationId
        }
    }


    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/api/city",
        type: "POST",
        data: JSON.stringify(nation),
        success: function (){
            findAll()
            document.getElementById("create").style.display="none"
        }
    })

}



function deleteStudent(id){
    if(confirm("are you sure ?")){
        $.ajax({
            url: `http://localhost:8080/api/city/${id}`,
            type: "DELETE",
            success: findAll
        })
    }
}




let idUpdate;
function displayFormUpdate(id) {
    $.ajax({
        url: `http://localhost:8080/api/city/${id}`,
        type: "GET",
        success: function (city) {
            idUpdate = city.id
            document.getElementById("name-u").value = city.name
            document.getElementById("area-u").value = city.area
            document.getElementById("people-u").value = city.population
            document.getElementById("gdp-u").value = city.GDP
            document.getElementById("introduce-u").value = city.describes
        }
    })
    document.getElementById("update").style.display = "block"
    document.getElementById("list").style.display = "none"
    document.getElementById("page").style.display = "none"
}

function update(){

    let name = $("#name-u").val()
    let area = $("#area-u").val()
    let people = $("#people-u").val()
    let gdp = $("#gdp-u").val()
    let introduce = $("#introduce-u").val()
    let nationId = $("#classIdUpdate").val()


    let nation = {
        name: name,
        area: area,
        population: people,
        GDP: gdp,
        describes: introduce,
        nation: {
            id: nationId
        }
    }

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: `http://localhost:8080/api/city/${idUpdate}`,
        type: "PUT",
        data: JSON.stringify(nation),
        success: function (){
            findAll()
            document.getElementById("update").style.display = "none"
        },
        error: function () {
            alert("Student not exists!")
        }
    })
}







function getClassOption(aClass) {
    return `<option value="${aClass.id}">${aClass.name}</option>`
}
function getAllSelectClassesCreate() {
    $.ajax({
        url: "http://localhost:8080/api/nation",
        type: "GET",
        success: function (data){
            let content = `<select id="classIdCreate">`
            for (let i = 0; i < data.length; i++) {
                content += getClassOption(data[i]);
            }
            content += `</select>`;
            document.getElementById("selectClasses").innerHTML = content;
        }
    })
}
function getAllSelectClassesUpdate() {
    $.ajax({
        url: "http://localhost:8080/api/nation",
        type: "GET",
        success: function (data){
            let content = `<select id="classIdUpdate">`
            for (let i = 0; i < data.length; i++) {

                content += getClassOption(data[i]);
            }
            content += `</select>`;
            document.getElementById("selectClassesUpdate").innerHTML = content;
        }
    })
}