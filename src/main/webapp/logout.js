function onLogoutResponse() {
    if (this.status === OK) {
        setUnauthorized();
        clearMessages();
        let logInOutButtonEl = document.getElementById("login-logout");
        logInOutButtonEl.textContent = "logIn";
        logInOutButtonEl.setAttribute("onclick", "openLoginForm()");
        let adminAEL = document.getElementById("admin");
        if (adminAEL != undefined) {
            adminAEL.remove();
        }
        const userNameSpandEl = document.getElementById('user-name');
        userNameSpandEl.textContent = "Not logged in";
        loadAllProducts()
        showContents( 'topnav', 'profile-content', 'product-content');
    } else {
        onOtherResponse(productContentDivEL, this);
    }
}

function onLogoutButtonClicked(event) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLogoutResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('POST', 'protected/logout');
    xhr.send();
}
