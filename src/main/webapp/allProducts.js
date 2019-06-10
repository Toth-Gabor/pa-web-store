function loadAllProducts() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', allProductsResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('GET', 'products?');
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
