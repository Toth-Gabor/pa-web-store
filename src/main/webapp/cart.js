function onCartClicked() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let products = cart.products;
    if (products.length == 0){
        alert("The Cart is Empty!");
        onHomeButtonClicked();
    } else {
        let totalPrice = 0;
        let tbodyEL = document.getElementById("cart-tbody");
        for (let i = 0; i < products.length; i++){
            let trEl = document.createElement("tr");
            let tdIdEl = document.createElement("td");
            tdIdEl.innerHTML = products[i].id;
            let tdNameEl = document.createElement("td");
            tdNameEl.innerHTML = products[i].name;
            let tdPriceEl = document.createElement("td");
            tdPriceEl.innerHTML = "$" + products[i].price + ".00";
            let tdQuantityEl = document.createElement("td");
            tdQuantityEl.innerHTML = products[i].quantity;
            trEl.append(tdIdEl, tdNameEl, tdPriceEl, tdQuantityEl);
            tbodyEL.appendChild(trEl);
            totalPrice += (products[i].price) * (products[i].quantity);
        }
        let totalPriceSpanEl = document.getElementById("total-price");
        totalPriceSpanEl.innerHTML = "$" + totalPrice + ".00";
        showContents('cart-content');
    }
}