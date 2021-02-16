var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");


var productsContainer;

if (localStorage.getItem("myProducts") == null) {
    productsContainer = [];
} else {
    productsContainer = JSON.parse(localStorage.getItem("myProducts"));
    displayProducts();
}

function addProduct() {
    var product = {
        productName: productNameInput.value,
        productPrice: productPriceInput.value,
        productCategory: productCategoryInput.value,
        productDescription: productDescInput.value
    }

    productsContainer.push(product);
    localStorage.setItem("myProducts", JSON.stringify(productsContainer));
    displayProducts();
    clearForm();

}

function clearForm() {
    productNameInput.value = "",
        productPriceInput.value = "",
        productCategoryInput.value = "",
        productDescInput.value = ""
}

function displayProducts() {
    var cartoona = ``;

    for (var i = 0; i < productsContainer.length; i++) {
        cartoona += `<tr>
        <td>${i+1}</td>
        <td>${productsContainer[i].productName}</td>
        <td>${productsContainer[i].productPrice}</td>
        <td>${productsContainer[i].productCategory}</td>
        <td>${productsContainer[i].productDescription}</td>
        <td><button onClick="retrieveProduct(${i})" class="btn btn-warning">Update</button></td>
        <td><button onClick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
        </tr>`
    }

    document.getElementById("tableData").innerHTML = cartoona;
}

function searchProduct(searchTerm) {
    var cartoona = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].productName.toLowerCase().includes(searchTerm.toLowerCase()) == true ||
            productsContainer[i].productCategory.toLowerCase().includes(searchTerm.toLowerCase()) == true) {
            cartoona += `<tr>
            <td>${i+1}</td>
            <td>${productsContainer[i].productName}</td>
            <td>${productsContainer[i].productPrice}</td>
            <td>${productsContainer[i].productCategory}</td>
            <td>${productsContainer[i].productDescription}</td>
            <td><button onClick="retrieveProduct(${i})" class="btn btn-warning">Update</button></td>
            <td><button onClick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
            </tr>`
        }
        else {
            console.log("m4 mowgod");
        }

    }

    document.getElementById("tableData").innerHTML = cartoona;

}

function deleteProduct(productIndex) {
    productsContainer.splice(productIndex, 1);
    localStorage.setItem("myProducts", JSON.stringify(productsContainer));
    displayProducts();
}

function retrieveProduct(productIndex) {
    productNameInput.value = productsContainer[productIndex].productName;
    productPriceInput.value = productsContainer[productIndex].productPrice;
    productCategoryInput.value = productsContainer[productIndex].productCategory;
    productDescInput.value = productsContainer[productIndex].productDescription;

    document.getElementById("newButton").innerHTML = `<button onclick="updateProduct(${productIndex});" class="btn btn-outline-success">Update</button>`;
    document.getElementById("add").style.display = "none";

}

function updateProduct(productIndex) {
    productsContainer[productIndex].productName = productNameInput.value;
    productsContainer[productIndex].productPrice = productPriceInput.value;
    productsContainer[productIndex].productCategory = productCategoryInput.value;
    productsContainer[productIndex].productDescription = productDescInput.value;

    localStorage.setItem("myProducts", JSON.stringify(productsContainer));
    document.getElementById("add").style.display = "block";
    document.getElementById("newButton").style.display = "none";
    displayProducts();
    clearForm();
}