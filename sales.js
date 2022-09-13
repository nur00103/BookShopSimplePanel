loadData();
loadCustomerData();
loadBookData();
let allData;
let allDataBook;

function loadData() {
    $.ajax({
            url: "http://localhost:8080/sales",
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
 function loadCustomerData() {
    $.ajax({
            url: "http://localhost:8080/customer",
            type: "GET",
            dataType: 'json',
            success: function (data) {
                if (data.code == 200) {
                 $('#customerSelect').html("");
                    setDataToSelect(data)
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
 function setDataToSelect(data){
    let customerSelect = $('#customerSelect');
    data.result.forEach(element => {
        console.log(element);
        let html = "<option id='" + element.id + "'>"+element.name+" "+element.surname+"</option>\n";
        allData+=html;
        customerSelect.val(element.id);
        console.log(element);
    });
    customerSelect.append(allData);
    }


    function loadBookData() {
        $.ajax({
                url: "http://localhost:8080/book",
                type: "GET",
                dataType: 'json',
                success: function (data) {
                    if (data.code == 200) {
                     $('#bookSelect').html("");
                        setDataToSelectBook(data)
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
     function setDataToSelectBook(data){
        let bookSelect = $('#bookSelect');
        data.result.forEach(element => {
            console.log(element);
            let html = "<option id='" + element.id + "'>"+element.name+"</option>\n";
            allDataBook+=html;
            bookSelect.val(element.id);
            console.log(element);
        });
        bookSelect.append(allDataBook);
        
        }
 
loadData();
function setDataToTable(data){
    let tbody = $('#tbody');
    data.result.forEach(element => {
        let html = "<tr>\n" +
            "                    <th scope=\"row\">" + element.id + "</th>\n" +
            "                    <td>" + element.customer.name+" "+element.customer.surname + "</td>\n" +
            "                    <td>" + element.book.name + "</td>\n" +
            "                    <td>" + element.quantity + "</td>\n" +
            "                    <td>" + element.amount + "</td>\n" +
            "                    <td>" + element.salesDate+ "</td>\n" +
            "<td><button onclick='deleteData(this)' value='" + element.id + "' class='btn btn-danger'>Delete</button></td>"+
            "                </tr>"
            tbody.append(html);
    });
    }
    function deleteData(event){
        let buton = $(event);
        $.ajax({
            url:"http://localhost:8080/sales/" + buton.val(),
            type: "DELETE",
            dataType: 'json',
            success: function (data) {
                if(data.code == 200){
                    $('#tbody').html("");
                    loadData();
                }else{
                    console.log(data.status)
                }
            }
        })
     } 
     function saveData(){
        var options = customerSelect.options;
        var valueCustomer = options[options.selectedIndex].id;

        var optionsB = bookSelect.options;
        var valueBook = optionsB[options.selectedIndex].id;

        let savedData = {
            customer:valueCustomer,
            book:valueBook,
            quantity:$('#quantity').val(),
            amount:$('#amount').val(),
        
        }
        $.ajax({
            url:"http://localhost:8080/sales/save",
            type:"POST",
            dataType:"json",
            headers:{'Content-Type' : 'application/json'},
            data: JSON.stringify(savedData),
            success: function (response){
                if(response.code == 200){
                    $('#tbody').html("");
                    loadData();
                    alert("Sales successfully added ");
                }else{
                    alert("error");
                    console.log(response.code);
                }
            }
        })
    }   