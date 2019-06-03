function openRegistration() {
    showContents(['registration']);
}

function onRegistrationClicked() {
    const params = new URLSearchParams();
    const regFormEl = document.forms['reg-form'];
    const nameInputEl = regFormEl.querySelector('input[name="name"]');
    const emailInputEl = regFormEl.querySelector('input[name="email"]');
    const passwordInputEl = regFormEl.querySelector('input[name="password"]');
    const name = nameInputEl.value;
    const email = emailInputEl.value;
    const password = passwordInputEl.value;
    params.append("name", name);
    params.append("email", email);
    params.append("password", password);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onRegistrationResponse);
    xhr.addEventListener('error', onNetworkError);
    xhr.open('POST', 'user?' + params.toString());
    xhr.send();
}

function onRegistrationResponse() {
    if (this.status === OK) {
        showContents(['login-content']);
        let json = JSON.parse(this.responseText);
        alert(json.message);
    } else {
        onOtherResponse(errorContentDivEl, this);
    }
}
