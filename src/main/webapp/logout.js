function onLogoutResponse() {
    if (this.status === OK) {
        setUnauthorized();
        clearMessages();
        console.log("Logged out!");
        let logInOutButtonEl = document.getElementById("login-logout");
        logInOutButtonEl.textContent = "logIn";
        logInOutButtonEl.setAttribute("onclick", "openLoginForm()");
        showContents( 'topnav', 'product-content');
    } else {
        onOtherResponse(logoutContentDivEl, this);
    }
}

function onLogoutButtonClicked(event) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLogoutResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('POST', 'protected/logout');
    xhr.send();
}
