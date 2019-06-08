function onProfileLoad(user) {
    clearMessages();
    const userNameSpandEl = document.getElementById('user-name');
    showContents('topnav', 'profile-content', 'product-content', 'logout-content');
    if ("user" === typeof user){
        userNameSpandEl.textContent = user.name;
    } else {
        userNameSpandEl.textContent = "Not logged in";
    }
}