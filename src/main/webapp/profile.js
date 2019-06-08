function onProfileLoad(user) {
    clearMessages();
    const userNameSpandEl = document.getElementById('user-name');
    if ("user" === typeof user){
        userNameSpandEl.textContent = user.name;
    } else {
        userNameSpandEl.textContent = "Not logged in";
    }
}