function onHomeButtonClicked() {
    loadAllProducts();
}

function loadAllProducts() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', allProductsResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('GET', 'products');
    xhr.send();
}

function allProductsResponse() {
    if (this.status === OK) {
        showContents(['topnav', 'profile-content', 'product-content']);
        onProductListLoad(JSON.parse(this.responseText));
    } else {
        onOtherResponse(productContentDivEL, this);
    }
}

function onProductListLoad(productsList) {
    removeAllChildren(productContentDivEL);
    for (let i = 0; i < productsList.length; i++) {
        let product = productsList[i];
        appendProducts(product);
    }
}

function appendProducts(product) {
    let productDivEL = document.createElement("div"); // product
    productDivEL.id = "product-div";
    productDivEL.addEventListener('click', onProductClicked);
    productDivEL.dataset.productId = product.id;

    let photoDivEL = document.createElement("div"); // photo
    photoDivEL.id =  "photo";
    let productPhotoImageEl = document.createElement("img");
    let brandDivEL = document.createElement("div"); // brand
    let productBrandPEl = document.createElement("p")
    let nameDivEl = document.createElement("div"); // name
    let productNamePEl = document.createElement("p");
    let priceDivEl = document.createElement("div"); // price
    let productPricePEl = document.createElement("p");
    let quantityDivEl = document.createElement("div"); // quantity
    let productQuantityPEl = document.createElement("p");


    productPhotoImageEl.src = product.photoUrl;
    photoDivEL.appendChild(productPhotoImageEl);

    productBrandPEl.textContent = product.brand;
    brandDivEL.appendChild(productBrandPEl);

    productNamePEl.textContent = product.name;
    nameDivEl.appendChild(productNamePEl);

    productPricePEl.textContent = "$ " + product.price + ".00";
    priceDivEl.appendChild(productPricePEl);

    productQuantityPEl.textContent = "In store: " + product.quantity;
    quantityDivEl.appendChild(productQuantityPEl);

    productDivEL.append(photoDivEL, brandDivEL, nameDivEl, quantityDivEl, priceDivEl)

    productContentDivEL.appendChild(productDivEL);

}
