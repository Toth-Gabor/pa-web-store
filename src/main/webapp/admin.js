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


function onOrderClicked() {
    snackBar(this.dataset.orderId.toString() + " Under construction!");
}