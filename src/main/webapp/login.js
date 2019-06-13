function onLoginButtonClicked() {
    const loginFormEl = document.forms['login-form'];

    const emailInputEl = loginFormEl.querySelector('input[name="email"]');
    const passwordInputEl = loginFormEl.querySelector('input[name="password"]');

    const email = emailInputEl.value;
    const password = passwordInputEl.value;

    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLoginResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('POST', 'login');
    xhr.send(params);
}

function onLoginResponse() {
    if (this.status === OK) {
        const user = JSON.parse(this.responseText);
        console.log(user.admin);
        if (user.admin) {
            let menuDivEl = document.getElementById("menu");
            let menuAEl = document.createElement("a");
            menuAEl.setAttribute("id", "admin");
            menuAEl.setAttribute("href", "#admin");
            menuAEl.textContent = "Admin";
            menuAEl.setAttribute("onclick", "onAdminButtonClicked()");
            menuDivEl.appendChild(menuAEl);
        }
        let logInOutButtonEl = document.getElementById("login-logout");
        logInOutButtonEl.setAttribute("onclick", "onLogoutButtonClicked()");
        let loginOutSpanEl = document.getElementById("login-logot-text");
        loginOutSpanEl.textContent = " logOut";

        setAuthorization(user);
        loadAllProducts();
        onProfileLoad(user);
    } else {
        onOtherResponse(loginContentDivEl, this);
    }
}

function openLoginForm() {
    showContents(['topnav', 'login-content']);
}