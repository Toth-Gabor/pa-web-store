function onProductClicked() {
    const productId = this.dataset.ScheduleId;
    localStorage.setItem("product-id", productId);

    const params = new URLSearchParams();
    params.append("productId", productId);
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onProductResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('GET', 'product?');
    xhr.send(params);
}

function onProductResponse() {
    if (this.status === OK) {
        onProductLoad(JSON.parse(this.responseText));
    } else {
        onOtherResponse(productContentDivEL, this);
    }
}

function onProductLoad(product) {
    console.log(product)
    //showContents(['topnav', 'profile-content', 'product-content']);


}