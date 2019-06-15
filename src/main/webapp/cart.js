function onCartClicked() {

    let cart = JSON.parse(localStorage.getItem("cart"));
    let products = cart.products;
    if (products.length == 0) {
        snackBar("The Cart is Empty!");
        onHomeButtonClicked();
    } else {
        let totalPrice = 0;
        let tbodyEL = document.getElementById("cart-tbody");
        removeAllChildren(tbodyEL);
        for (let i = 0; i < products.length; i++) {
            let trEl = document.createElement("tr");
            let tdIdEl = document.createElement("td");
            tdIdEl.innerHTML = products[i].id;
            let tdNameEl = document.createElement("td");
            tdNameEl.innerHTML = products[i].name;
            let tdPriceEl = document.createElement("td");
            tdPriceEl.innerHTML = "$" + products[i].price + ".00";
            let tdQuantityEl = document.createElement("td");
            tdQuantityEl.innerHTML = products[i].quantity + " pc";
            let updateQuantityEl = document.createElement("td");
            let selectEl = createPlusMinusQuantityDiv(localStorage.getItem("quantity-in-store"));

            selectEl.dataset.productId = products[i].id;
            updateQuantityEl.appendChild(selectEl);

            trEl.append(tdIdEl, tdNameEl, tdPriceEl, tdQuantityEl, updateQuantityEl);
            tbodyEL.appendChild(trEl);
            totalPrice += (products[i].price) * (products[i].quantity);

        }
        let totalPriceSpanEl = document.getElementById("total-price");
        totalPriceSpanEl.textContent = "$" + totalPrice.toString() + ".00";

        showContents(['topnav', 'cart-content']);
    }
}

function createQuantitySelectElement(product) {
    let selectEl = document.createElement("select");// select
    selectEl.setAttribute("id", "selected-quantity");
    selectEl.setAttribute("onchange", "onSelectionMade()");

    let poductQuantity = Number(product.quantity);
    for (let j = 0; j < poductQuantity; j++) {
        let tempQuantity = poductQuantity - j;
        let optionEl = document.createElement("option");
        optionEl.value = tempQuantity.toString();
        optionEl.textContent = tempQuantity.toString();
        selectEl.appendChild(optionEl);
    }
    return selectEl;
}

function onCheckOutButtonClicked() {
    snackBar("Items has been paid!");
    clearCart();
    onHomeButtonClicked();
}

function onSelectionMade() {
    let selectEl = document.getElementById("selected-quantity");
    let quantity = selectEl.value;
    console.log("select " + quantity);
    let productId = selectEl.dataset.productId;
    console.log("productId " + productId);
    updateProductQuantityInCart(productId, quantity);
    onCartClicked();
}

function addCartToLocalStorage() {
    let cart = {};
    cart.products = [];
    localStorage.setItem('cart', JSON.stringify(cart));

}

function addToCart(product) {
    if (localStorage && localStorage.getItem('cart')) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart.products.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

function clearCart() {
    localStorage.removeItem("cart");
    addCartToLocalStorage();
    removeAllChildren(document.getElementById("cart-tbody"));
    document.getElementById("items").innerText = " Empty";
}

function updateProductQuantityInCart(productId, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    for (let i = 0; i < cart.products.length; i++) {
        if (productId == cart.products[i].id) {
            cart.products[i].quantity = quantity;
        }
    }
    localStorage.removeItem("cart");
    localStorage.setItem('cart', JSON.stringify(cart));
}

function increaseProductQuantity(productId, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    for (let i = 0; i < cart.products.length; i++) {
        if (productId == cart.products[i].id) {
            cart.products[i].quantity += quantity;
        }
    }
    localStorage.removeItem("cart");
    localStorage.setItem('cart', JSON.stringify(cart));
}

function reducedProductQuantity(productId, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    for (let i = 0; i < cart.products.length; i++) {
        if (productId == cart.products[i].id) {
            if (cart.products[i].quantity >= quantity) {
                cart.products[i].quantity -= quantity;
            } else {
                snackBar("quantiy can't go below 0!");
            }
        }
    }
    localStorage.removeItem("cart");
    localStorage.setItem('cart', JSON.stringify(cart));
}

function checkProductAdded(productId) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let bool = false;
    for (let i = 0; i < cart.products.length; i++) {
        if (productId == cart.products[i].id) {
            bool = true;
            return bool;
        }
    }
}
