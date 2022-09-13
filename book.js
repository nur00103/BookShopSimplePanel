loadData();
function getDataById (event){
    let buton=$(event);
    $.ajax({
        url: "http://localhost:8080/book/" + buton.val(),
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
        author:$('#upAuthor').val(),
        type:$('#upType').val(),
        language:$('#upLanguage').val(),
        pubHouse:$('#upPubHouse').val(),
        page:$('#upPage').val(),
        price:$('#upPrice').val(),
        stock:$('#upStock').val(),
        discount:$('#upDiscount').val(),
    }
    $.ajax({
        url:"http://localhost:8080/book/" + $('#idUpdate').val(),
        type:"PUT",
        dataType:"json",
        headers:{'Content-Type' : 'application/json'},
        data: JSON.stringify(updateData),
        success: function (response){
            if(response.code == 200){
                $('#tbody').html("");
                loadData();
                alert(response.result.name + " successfully updated id = " + response.result.id);
            }else{
                console.log(response.code);
            }
        }
    })
}
function setDataToModal(data){
    $('#upName').val(data.result.name),
    $('#upAuthor').val(data.result.authorResponse.author),
    $('#upType').val(data.result.typeResponse.type),
    $('#upLanguage').val(data.result.languageResponse.language),
    $('#upPubHouse').val(data.result.publishingHouseResponse.pubHouse),
    $('#upPage').val(data.result.page),
    $('#upPrice').val(data.result.price),
    $('#upStock').val(data.result.stock),
    $('#upDiscount').val(data.result.discount),
    $('#idUpdate').val(data.result.id);
}

function saveData(){
    let data = {
        name:$('#name').val(),
        author:$('#author').val(),
        type:$('#type').val(),
        language:$('#language').val(),
        pubHouse:$('#pubHouse').val(),
        page:$('#page').val(),
        price:$('#price').val(),
        stock:$('#stock').val(),
        phone:$('#discount').val(),
    }
    $.ajax({
        url:"http://localhost:8080/book/save",
        type:"POST",
        dataType:"json",
        headers:{'Content-Type' : 'application/json'},
        data: JSON.stringify(data),
        success: function (response){
            if(response.code == 200){
                $('#tbody').html("");
                loadData();
                alert(response.result.name + " successfully added id = " + response.result.id);
            }else{
                alert("error");
                console.log(response.code);
            }
        }
    })
}

function loadData() {
   $.ajax({
           url: "http://localhost:8080/book",
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
            "                    <td>" + element.authorResponse.author + "</td>\n" +
            "                    <td>" + element.typeResponse.type + "</td>\n" +
            "                    <td>" + element.languageResponse.language + "</td>\n" +
            "                    <td>" + element.publishingHouseResponse.pubHouse+ "</td>\n" +
            "                    <td>" + element.page+ "</td>\n" +
            "                    <td>" + element.price+ "</td>\n" +
            "                    <td>" + element.stock+ "</td>\n" +
            "                    <td>" + element.discount+ "</td>\n" +
            "<td><button onclick='deleteData(this)' value='" + element.id + "' class='btn btn-danger'>Delete</button></td>"+
            "<td><button onclick='getDataById(this)' value='" + element.id + "' class='btn btn-primary' type='submit' value='update' data-toggle='modal' data-target='#exampleModalUpdate' >Update</button></td>"
            "                </tr>"
            tbody.append(html);
    });
    }

function deleteData(event){
   let buton = $(event);
   $.ajax({
       url:"http://localhost:8080/book/" + buton.val(),
       type: "DELETE",
       dataType: 'json',
       success: function (data) {
           if(data.code == 200){
               $('#tbody').html("");
               loadData();
               alert(data.result.name + " successfully deleted id = " + response.result.id);
           }else{
               console.log(data.status)
           }
       }
   })
}