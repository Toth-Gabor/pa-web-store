function onAdminButtonClicked() {
    showContents(['topnav', 'admin-content']);
    showAllOrders();
}

function showAllOrders() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', showOrdersResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('GET', 'protected/orders');
    xhr.send();
}

function showOrdersResponse() {
    if (this.status === OK) {
        showContents(['topnav', 'admin-content', 'orders']);
        onOrdersListLoad(JSON.parse(this.responseText));
    } else {
        onOtherResponse(ordersContentDivEl, this);
    }
}

function onOrdersListLoad(orders) {
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

function showOrdersByUserIdClicked() {
    let userId = prompt("Please enter user id:", "1");
    if (userId == null || userId == "") {
        showAllOrders();
    } else {
        loadOrdersByUserId(userId);
    }
}

function loadOrdersByUserId(userId) {
    const fetch = "userId";
    const params = new URLSearchParams();
    params.append("param", userId);
    params.append("fetch", fetch);
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', showOrdersResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('OPTIONS', 'protected/orders?' + params);
    xhr.send();
}

function showOrdersByProductIdClicked() {
    let productId = prompt("Please enter product id:", "1");
    if (productId == null || productId == "") {
        showAllOrders();
    } else {
        loadOrdersByProductId(productId);
    }
}

function loadOrdersByProductId(productId) {
    const fetch = "productId";
    const params = new URLSearchParams();
    params.append("param", productId);
    params.append("fetch", fetch);
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', showOrdersResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('OPTIONS', 'protected/orders?' + params);
    xhr.send();
}

function onOrderClicked() {
    let orderId = this.dataset.orderId;
    let reply = prompt("If you want to delete enter 'YES'!:", "YES");
    if (reply.toUpperCase() == "YES") {
        onOrderDelete(orderId);
    } else {
        showAllOrders();
    }
    snackBar(this.dataset.orderId.toString() + " Under construction!");
}

function onOrderDelete(orderId) {
    const params = new URLSearchParams();
    params.append("orderId", orderId);
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onOrderDeleteResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('DELETE', 'protected/orders?' + params);
    xhr.send();
}

function onOrderDeleteResponse() {
    if (this.status === OK) {
        showContents(['topnav', 'admin-content', 'orders']);
        showAllOrders();
        let orderId = JSON.parse(this.responseText);
        snackBar(orderId.message + " id's order successfully deleted.");
    } else {
        onOtherResponse(ordersContentDivEl, this);
    }
}