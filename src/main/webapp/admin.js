function onAdminButtonClicked() {
    showContents(['topnav', 'admin-content']);
}

function showAllOrders() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', showAllOrdersResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('GET', 'protected/orders');
    xhr.send();

}

function showAllOrdersResponse() {
    if (this.status === OK) {
        showContents(['topnav', 'admin-content', 'orders']);
        onAllOrdersListLoad(JSON.parse(this.responseText));
    } else {
        onOtherResponse(ordersContentDivEl, this);
    }
}
