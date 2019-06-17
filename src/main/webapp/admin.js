function onAdminButtonClicked() {
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
    if (confirm('If you want to delete press "OK" button!')) {
        onOrderDelete(orderId);
    } else {
        showAllOrders();
    }
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
        popUpBar(orderId.message + " id's order successfully deleted.");
    } else {
        onOtherResponse(ordersContentDivEl, this);
    }
}

function onAdminProductListClicked() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onAdminProductListResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('GET', 'products');
    xhr.send();
}

function onAdminProductListResponse() {
    if (this.status === OK) {
        showContents(['topnav', 'admin-content', 'admin-product']);
        onAdminProductListLoad(JSON.parse(this.responseText));
    } else {
        onOtherResponse(ordersContentDivEl, this);
    }
}

function onAdminProductListLoad(productList) {
    removeAllChildren(document.getElementById("admin-product-content"));
    for (let i = 0; i < productList.length; i++) {
        appendAdminProducts(productList[i]);
    }
}

function appendAdminProducts(product) {
    let adminProductsTbodyEl = document.getElementById("admin-product-content");
    let trEl = document.createElement("tr");
    trEl.dataset.product = JSON.stringify(product);
    trEl.addEventListener("click", onEditProductClicked)
    let idTdEl = document.createElement("td");
    idTdEl.textContent = product.id;
    let nameTdEL = document.createElement("td");
    nameTdEL.textContent = product.name;
    let brandTdEl = document.createElement("td");
    brandTdEl.textContent = product.brand;
    let specTdEl = document.createElement("td");
    specTdEl.textContent = product.specification;
    let descTdEl = document.createElement("td");
    descTdEl.textContent = product.description;
    let priceTdEl = document.createElement("td");
    priceTdEl.textContent = product.price;
    let quantityTdEl = document.createElement("td");
    quantityTdEl.textContent = product.quantity;
    let photoTdEl = document.createElement("td");
    photoTdEl.textContent = product.photoUrl;


    trEl.append(idTdEl, nameTdEL, brandTdEl, specTdEl, descTdEl, priceTdEl, quantityTdEl, photoTdEl);
    adminProductsTbodyEl.appendChild(trEl);
}

function onEditProductClicked() {
    showContents(['topnav', 'admin-content', 'edit-product']);
    let editProductDivEl = document.getElementById("edit-product");
    let product = JSON.parse(this.dataset.product);
    localStorage.setItem("edited-productId", product.id);
    let nameEl = document.getElementById("edit-name");
    nameEl.value = product.name;
    let brandEl = document.getElementById("edit-brand");
    brandEl.value = product.brand;
    let specEl = document.getElementById("edit-spec");
    specEl.value = product.specification;
    let descEl = document.getElementById("edit-desc");
    descEl.value = product.description;
    let priceEl = document.getElementById("edit-price");
    priceEl.value = product.price;
    let quantityEl = document.getElementById("edit-quantity");
    quantityEl.value = product.quantity;
    let photoUrlEl = document.getElementById("edit-photoUrl");
    photoUrlEl.value = product.photoUrl;
}