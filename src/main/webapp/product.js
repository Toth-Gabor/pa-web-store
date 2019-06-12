function onProductClicked() {
    const productId = this.dataset.productId;
    console.log(productId);
    localStorage.setItem("product-id", productId);

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
    let productPricePEl = document.createElement("p");
    productPricePEl.textContent = "$ " + product.price + ".00";
    priceDivEl.appendChild(productPricePEl);

    let buyProductButtonEL = document.createElement("button"); // buy button
    buyProductButtonEL.textContent = "Add to Cart";
    buyProductButtonEL.setAttribute("onclick", "onBuyProductClicked()");

    sideWrapperDivEl.append(brandDivEL, nameDivEl, quantityDivEl, attributesDivEl, priceDivEl, buyProductButtonEL); // add detail dives

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
    showContents(['topnav', 'profile-content', 'product-content']);
}

function createAttributesElements(attributesList) {
    let attributesDivEl = document.createElement("div");
    for (let i = 0; i <attributesList.length; i++) {
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

function onBuyProductClicked() {
    alert("added to cart!");
}

