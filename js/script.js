//1
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productdesc = document.getElementById("productdesc");
var productimage = document.getElementById("productimage");
var addbtn = document.getElementById("addbtn");
var updatebtn = document.getElementById("updatebtn");
var reg = {
    productName: /^[A-Z][a-z0-9]{2,8}$/,
    productPrice: /^[1-9][0-9]|100$/,
    productDesc: /.{10}/, 
    productCategory: /(Mobile|Screens|Laptops)/i,
}
//عشان لما اجي اسرش وامسح ممسحش من الlist بتاعة السيرش
// var currentId = 0;
//ده اللي هظبط بيه الupdate
var currentIndex;
var productlist = [];

//6
if (localStorage.getItem("productlist") != null) {
    productlist = JSON.parse(localStorage.getItem("productlist"));
    console.log("hi");
    DisplayProduct(productlist);
}


//2
function addproduct() {
    var reader = new FileReader(); 
    reader.onload = function (e) {
        var product = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            desc: productdesc.value,
            image: e.target.result,
            Id: productlist.length,
        };
        productlist.push(product);
        updateLocalStorage();
        DisplayProduct(productlist);
        updateInputValue();
    };
    reader.readAsDataURL(productimage.files[0]);
}
//4
/* cleeeean-code
function clear(){
    productName.value=null;
    productCategory.value=null;
    productPrice.value=null;
    productdesc.value=null;
}
*/

//3
function DisplayProduct(list) {
    var cartona = ``;
    for (var i = 0; i < list.length; i++) {
        cartona += `<div class="col-md-4">
                <div class="item text-white border border-white overflow-hidden">
                    <img width="100%" height="250px" src="${list[i].image}" alt="">
                    <div class="p-3">
                        <h2 class="h4">name : ${list[i].newName ? list[i].newName : list[i].name}</h2>
                        <p>desc : ${list[i].desc}</p>
                        <h3 class="h5">price : ${list[i].price}</h3>
                        <h3 class="h5">category : ${list[i].category}</h3>
                        <button onclick="getDataToUpdade(${i})" class=" btn btn-outline-warning w-100 mb-3">Update</button>
                        <button onclick="Delete(${i})" class=" btn btn-outline-danger w-100 mb-3">Delete</button>
                    </div>
                </div>
            </div>`;
    }
    document.getElementById("myData").innerHTML = cartona;
}

//5
function Delete(index) {
    productlist.splice(index, 1);
    updateLocalStorage();
    //localStorage.setItem("productlist",productlist); clean-code
    DisplayProduct(productlist);
}

//7
/*
function clear(){
    productName.value=null;
    productCategory.value=null;
    productPrice.value=null;
    productdesc.value=null;
}
*/


function updateInputValue(config) {
    productName.value = config ? config.name : null;
    productCategory.value = config ? config.category : null;
    productPrice.value = config ? config.price : null;
    productdesc.value = config ? config.desc : null;
    if (config && config.image) {
        var img = document.createElement('img');
        img.src = config.image;
        img.width = 100;
        img.height = 100;
        productimage.parentNode.appendChild(img);
    }
}


function getDataToUpdade(index) {
    console.log("hello");
    
    /*    مش محتاجينهم عشان هنستبدلهم بالفانكشن اللي فوق
    productName.value = productlist[index].name;
    productPrice.value = productlist[index].price;
    productCategory.value = productlist[index].category;
    productdesc.value = productlist[index].desc;
    */
    updateInputValue(productlist[index]);
    currentIndex = index;
    addbtn.classList.add('d-none');
    updatebtn.classList.remove('d-none');
}


//8
function UpdateProduct() {
    var reader = new FileReader();
    reader.onload = function (e) {
        productlist[currentIndex].name = productName.value;
        productlist[currentIndex].price = productPrice.value;
        productlist[currentIndex].desc = productdesc.value;
        productlist[currentIndex].category = productCategory.value;
        productlist[currentIndex].image = e.target.result;
        DisplayProduct(productlist);
        updateLocalStorage();
        updateInputValue();
        updatebtn.classList.add("d-none");
        addbtn.classList.remove("d-none");
    };
    if (productimage.files[0]) {
        reader.readAsDataURL(productimage.files[0]); 
    } else {
        // لو مفيش صورة جديدة، نحدث البيانات من غير ما نغير الصورة
        productlist[currentIndex].name = productName.value;
        productlist[currentIndex].price = productPrice.value;
        productlist[currentIndex].desc = productdesc.value;
        productlist[currentIndex].category = productCategory.value;
        DisplayProduct(productlist);
        updateLocalStorage();
        updateInputValue();
        updatebtn.classList.add("d-none");
        addbtn.classList.remove("d-none");
    }
}

//clean code
function updateLocalStorage() {
    localStorage.setItem('productlist', JSON.stringify(productlist))
}


function search(searchValue) {
    //performance wise
    /* انا كده وفرت looping
    if(searchValue == ""){
        display(productlist)
        return
    }
     */
    var searchItem = [];
    for (var i = 0; i < productlist.length; i++) {
        var item = productlist[i];
        if (productlist[i].name.toLowerCase().includes(searchValue.toLowerCase())) {
            item.newName = item.name.toLowerCase().replace(searchValue.toLowerCase(), `<span class=' text-bg-warning'>${searchValue}</span>`)
            searchItem.push(productlist[i]);
        }

    }
    console.log(searchItem);
    DisplayProduct(searchItem);
}

function validateProductInput(element) {
    if (reg[element.id]) {
        if (reg[element.id].test(element.value)) {
            element.nextElementSibling.classList.add("d-none")
            element.classList.add("is-valid")
            element.classList.remove("is-invalid")

        } else {
            element.nextElementSibling.classList.remove("d-none")
            element.classList.remove("is-valid")
            element.classList.add("is-invalid")

        }
}
}
