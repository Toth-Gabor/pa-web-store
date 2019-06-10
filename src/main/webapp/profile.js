function onProfileLoad(user) {
    clearMessages();
    const userNameSpandEl = document.getElementById('user-name');
    userNameSpandEl.textContent = user.name
}