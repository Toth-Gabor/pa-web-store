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

function onAllOrdersListLoad(orders) {
    let ordersContentTbodyEl = document.getElementById("orders-content");
    removeAllChildren(ordersContentTbodyEl);
    for (let i = 0; i < orders.length; i++) {
        let trEl = document.createElement("tr");
        trEl.dataset.orderId = orders[i].id;
        trEl.addEventListener("click", onOrderClicked);
        let orderIdTdEl = document.createElement("td"); // order id
        orderIdTdEl.textContent = orders[i].id;
        let userIdTdEl = document.createElement("td"); // user id
        userIdTdEl.textContent = orders[i].userId;
        let productIdTdEl = document.createElement("td"); // product id
        productIdTdEl.textContent = orders[i].productId;
        let quantityTdEl = document.createElement("td"); // quantity
        quantityTdEl.textContent = orders[i].quantity;
        let orderDateTdEl = document.createElement("td"); // order date
        orderDateTdEl.textContent = new Date(orders[i].timestamp).toDateString();

        trEl.append(orderIdTdEl, userIdTdEl, productIdTdEl, quantityTdEl, orderDateTdEl);
        ordersContentTbodyEl.appendChild(trEl);
    }
}

function onOrderClicked() {
    snackBar(this.dataset.orderId.toString() + " Under construction!");
}