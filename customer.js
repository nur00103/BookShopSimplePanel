loadData();
function getDataById (event){
    let buton=$(event);
    $.ajax({
        url: "http://localhost:8080/customer/" + buton.val(),
        type: "GET",
        dataType: 'json',
        success: function (data) {
            if (data.code == 200) {
                setDataToModal(data);
            } else {
                console.log(data.status);
            }
        },
        error: function (err) {
            alert("Error");
        }
    }
)
}

function updateData(event){
    let buton = $(event);
    let updateData = {
        name:$('#upName').val(),
        surname:$('#upSurname').val(),
        username:$('#upUsername').val(),
        password:$('#upPassword').val(),
        address:$('#upAddress').val(),
        email:$('#upEmail').val(),
        phone:$('#upPhone').val(),
    }
    $.ajax({
        url:"http://localhost:8080/customer/" + $('#idUpdate').val(),
        type:"PUT",
        dataType:"json",
        headers:{'Content-Type' : 'application/json'},
        data: JSON.stringify(updateData),
        success: function (response){
            if(response.code == 200){
                $('#tbody').html("");
                loadData();
                alert(response.result.name + " " + response.result.surname + " successfully updated id = " + response.result.id);
            }else{
                console.log(response.code);
            }
        }
    })
}
function setDataToModal(data){
    $('#upName').val(data.result.name),
    $('#upSurname').val(data.result.surname),
    $('#upUsername').val(data.result.username),
    $('#upEmail').val(data.result.email),
    $('#upPassword').val(data.result.password),
    $('#upAddress').val(data.result.address),
    $('#upPhone').val(data.result.phone),
    $('#idUpdate').val(data.result.id);
}

function saveData(){
    let data = {
        name:$('#name').val(),
        surname:$('#surname').val(),
        username:$('#username').val(),
        password:$('#password').val(),
        address:$('#address').val(),
        email:$('#email').val(),
        phone:$('#phone').val(),
    }
    $.ajax({
        url:"http://localhost:8080/customer/add",
        type:"POST",
        dataType:"json",
        headers:{'Content-Type' : 'application/json'},
        data: JSON.stringify(data),
        success: function (response){
            if(response.code == 200){
                $('#tbody').html("");
                loadData();
                alert(response.result.name + " " + response.result.surname + " successfully added id = " + response.result.id);
            }else{
                console.log(response.code);
            }
        }
    })
}

function loadData() {
   $.ajax({
           url: "http://localhost:8080/customer",
           type: "GET",
           dataType: 'json',
           success: function (data) {
               if (data.code == 200) {
                $('#tbody').html("");
                   setDataToTable(data)
               } else {
                   console.log(data.status);
               }
           },
           error: function (err) {
               alert("Error");
           }
       }
   )
}

loadData();
function setDataToTable(data){
    let tbody = $('#tbody');
    data.result.forEach(element => {
        let html = "<tr>\n" +
            "                    <th scope=\"row\">" + element.id + "</th>\n" +
            "                    <td>" + element.name + "</td>\n" +
            "                    <td>" + element.surname + "</td>\n" +
            "                    <td>" + element.username + "</td>\n" +
            "                    <td>" + element.email + "</td>\n" +
            "                    <td>" + element.password+ "</td>\n" +
            "                    <td>" + element.address+ "</td>\n" +
            "                    <td>" + element.phone+ "</td>\n" +
            "<td><button onclick='deleteData(this)' value='" + element.id + "' class='btn btn-danger'>Delete</button></td>"+
            "<td><button onclick='getDataById(this)' value='" + element.id + "' class='btn btn-primary' type='submit' value='update' data-toggle='modal' data-target='#exampleModalUpdate' >Update</button></td>"
            "                </tr>"
            tbody.append(html);
    });
    }

function deleteData(event){
   let buton = $(event);
   $.ajax({
       url:"http://localhost:8080/customer/" + buton.val(),
       type: "DELETE",
       dataType: 'json',
       success: function (data) {
           if(data.code == 200){
               $('#tbody').html("");
               loadData();
               alert(data.result.name + " " + data.result.surname + " successfully deleted!");
           }else{
               console.log(data.status)
           }
       }
   })
}