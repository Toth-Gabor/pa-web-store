function onProductClicked() {
    const productId = this.dataset.productId;
    const params = new URLSearchParams();
    params.append("productId", productId);
    console.log(params.toString());
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onProductResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('GET', 'product?' + params);
    xhr.send();
}

function onProductResponse() {
    if (this.status === OK) {
        onProductLoad(JSON.parse(this.responseText));
    } else {
        onOtherResponse(productContentDivEL, this);
    }
}

function onProductLoad(productDto) {
    removeAllChildren(productContentDivEL);
    console.log(productDto)
    const product = productDto.product;
    localStorage.setItem("quantity-in-store", product.quantity);
    localStorage.setItem("product", JSON.stringify(product));
    const attributesList = productDto.attributeList;

    let productDetailsDiv = document.createElement("div"); // product div
    productDetailsDiv.setAttribute("id", "product-detail");

    let photoDivEL = document.createElement("div"); // photo
    photoDivEL.setAttribute("id", "image-big");
    let productPhotoImageEl = document.createElement("img");
    productPhotoImageEl.setAttribute("src", product.photoUrl);
    photoDivEL.appendChild(productPhotoImageEl);

    let sideWrapperDivEl = document.createElement("div"); // wrapper
    sideWrapperDivEl.setAttribute("id", "details-wrapper");

    let brandDivEL = document.createElement("div"); // brand
    let productBrandH2El = document.createElement("h2")
    productBrandH2El.textContent = product.brand;
    brandDivEL.appendChild(productBrandH2El);

    let nameDivEl = document.createElement("div"); // name
    let productNamePEl = document.createElement("p");
    productNamePEl.textContent = product.name;
    nameDivEl.appendChild(productNamePEl);

    let quantityDivEl = document.createElement("div"); // quantity
    let productQuantityPEl = document.createElement("p");
    productQuantityPEl.textContent = "In stock: " + product.quantity;
    quantityDivEl.appendChild(productQuantityPEl);

    let attributesDivEl = createAttributesElements(attributesList); // attributes

    let priceDivEl = document.createElement("div"); // price
    priceDivEl.setAttribute("id", "price-div");
    let productPricePEl = document.createElement("p");
    productPricePEl.textContent = "$ " + product.price + ".00";
    priceDivEl.appendChild(productPricePEl);

    let plusMinusQuantityDivEL = createPlusMinusQuantityDiv(product.quantity); // quantity

    let addToCartButtonEL = document.createElement("a");  // add to cart button
    addToCartButtonEL.setAttribute("id", "add-to-cart-button");
    addToCartButtonEL.textContent = "Add to Cart";
    addToCartButtonEL.setAttribute("onclick", "onAddToCartClicked()");
    let backButtonEl = document.createElement("a");
    backButtonEl.setAttribute("id", "back-to-landingpage");
    backButtonEl.textContent = "Back";
    backButtonEl.setAttribute("onclick", "onHomeButtonClicked()");
    plusMinusQuantityDivEL.append(addToCartButtonEL, backButtonEl);

    sideWrapperDivEl.append(brandDivEL, nameDivEl, quantityDivEl,
                    attributesDivEl, priceDivEl, plusMinusQuantityDivEL); // add detail dives

    let bottomWrapperDivEl = document.createElement("div");
    bottomWrapperDivEl.setAttribute("id", "desc-spec-wrapper");

    let descriptionDivEl = document.createElement("div"); // description
    let productDescrPEl = document.createElement("p");
    let descriptionH2El = document.createElement("h2");
    descriptionH2El.textContent = "Description:";
    productDescrPEl.textContent = product.description;
    descriptionDivEl.append(descriptionH2El, productDescrPEl);

    let specificationDivEl = document.createElement("div"); // specification
    let productSpecPEl = document.createElement("p");
    let specificationH2El = document.createElement("h2");
    specificationH2El.textContent = "Specification:";
    productSpecPEl.textContent = product.specification;

    specificationDivEl.append(specificationH2El, productSpecPEl);

    bottomWrapperDivEl.append(descriptionDivEl, specificationDivEl);
    productDetailsDiv.append(photoDivEL, sideWrapperDivEl);

    productContentDivEL.append(productDetailsDiv, bottomWrapperDivEl);
    showContents(['topnav', 'product-content']);
}

function createAttributesElements(attributesList) {
    let attributesDivEl = document.createElement("div");
    for (let i = 0; i < attributesList.length; i++) {
        let attrPEl = document.createElement("p");
        attrPEl.textContent = attributesList[i].name;
        let attrSpanEl = document.createElement("span");
        if (attributesList[i].text != null) {
            attrSpanEl.textContent = " :" + attributesList[i].text;
        } else if (attributesList[i].num != null) {
            attrSpanEl.textContent = " :" + attributesList[i].num;
        }
        attrPEl.appendChild(attrSpanEl);
        attributesDivEl.appendChild(attrPEl);
    }
    return attributesDivEl;
}

function createPlusMinusQuantityDiv(quantity) {
    let inputGroupDivEl = document.createElement("div");
    inputGroupDivEl.setAttribute("class", "input-group");

    let minusButtonInputEl = document.createElement("input"); // minus button
    minusButtonInputEl.setAttribute("type", "button");
    minusButtonInputEl.setAttribute("value", "-");
    minusButtonInputEl.setAttribute("class", "button-minus");
    minusButtonInputEl.setAttribute("data-field", "quantity");
    minusButtonInputEl.addEventListener("click", minus);


    let numberInputEl = document.createElement("input"); // quantity-field
    numberInputEl.setAttribute("type", "number");
    numberInputEl.setAttribute("step", "1");
    numberInputEl.max = quantity;
    numberInputEl.min = "1";
    numberInputEl.setAttribute("value", "1");
    numberInputEl.setAttribute("name", "quantity");
    numberInputEl.setAttribute("class", "quantity-field");
    numberInputEl.setAttribute("id", "quantity-input");


    let plusButtonInputEl = document.createElement("input"); // plus button
    plusButtonInputEl.setAttribute("type", "button");
    plusButtonInputEl.setAttribute("value", "+");
    plusButtonInputEl.setAttribute("class", "button-plus");
    plusButtonInputEl.setAttribute("data-field", "quantity");
    plusButtonInputEl.addEventListener("click", plus);

    inputGroupDivEl.append(minusButtonInputEl, numberInputEl, plusButtonInputEl);
    return inputGroupDivEl;
    /*<div class="input-group">
        <input type="button" value="-" class="button-minus" data-field="quantity">
        <input type="number" step="1" max="" value="1" name="quantity" class="quantity-field">
        <input type="button" value="+" class="button-plus" data-field="quantity">
    </div>*/

}

function createSelectQuantityFormDiv(quantity) {
    let quantityDivEl = document.createElement("div"); // div
    let quantityFormEl = document.createElement("form"); // form
    let onSubmit = document.createAttribute("onsubmit");
    onSubmit.value = "return false";
    quantityFormEl.setAttributeNode(onSubmit);

    let selectEl = document.createElement("select");// select
    selectEl.setAttribute("id", "selected-quantity");
    for (let i = 0; i < quantity; i++) {
        let tempQuantity = quantity - i;
        let optionEl = document.createElement("option");
        optionEl.value = tempQuantity.toString();
        optionEl.textContent = tempQuantity.toString();
        selectEl.appendChild(optionEl);
    }
    quantityDivEl.append(quantityFormEl, selectEl);
    return quantityDivEl;
}


function onAddToCartClicked() {
    let tempProduct = JSON.parse(localStorage.getItem("product"));
    let quantity = document.getElementById("quantity-input").value;
    let product = {};
    product.id = tempProduct.id;
    product.name = tempProduct.name;
    product.price = tempProduct.price;
    product.quantity = Number(quantity);

    if (checkProductAdded(product.id)) {
        increaseProductQuantity(product.id, product.quantity);
    } else {
        addToCart(product);
    }

    let cart = JSON.parse(localStorage.getItem("cart"));
    let itemsInCartSpanEL = document.getElementById("items");
    itemsInCartSpanEL.textContent = " " + getAllProductsQuantity(cart.products);
    popUpBar(product.id + " id " + quantity + " piece has been added to cart!");
}

function getAllProductsQuantity(products) {
    let count = 0;
    for (let i = 0; i < products.length; i++) {
        count += Number(products[i].quantity);
    }
    return count;
}

/* plus minus quantity script */

function plus() {
    document.getElementById("quantity-input").stepUp(1);

}

function minus() {
    document.getElementById("quantity-input").stepDown(1);
}



