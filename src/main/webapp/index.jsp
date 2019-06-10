<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <c:url value="/style.css" var="styleUrl"/>
    <c:url value="/index.js" var="indexScriptUrl"/>
    <c:url value="/allProducts.js" var="allProductsScriptUrl"/>
    <c:url value="/login.js" var="loginScriptUrl"/>
    <c:url value="/profile.js" var="profileScriptUrl"/>
    <c:url value="/registration.js" var="registrationScriptUrl"/>
    <c:url value="/back-to-profile.js" var="backToProfileScriptUrl"/>
    <c:url value="/logout.js" var="logoutScriptUrl"/>
    <link rel="stylesheet" type="text/css" href="${styleUrl}">
    <script src="${indexScriptUrl}"></script>
    <script src="${allProductsScriptUrl}"></script>
    <script src="${loginScriptUrl}"></script>
    <script src="${profileScriptUrl}"></script>
    <script src="${backToProfileScriptUrl}"></script>
    <script src="${registrationScriptUrl}"></script>
    <script src="${logoutScriptUrl}"></script>
    <title>Pa-Web-Store</title>
</head>
<body>
<div id="topnav" class="content">
    <div id="menu">
        <a class="active" href="#home">Home</a>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
        <a id="login-logout" href="#login" onclick="openLoginForm()">login</a>
    </div>

    <div id="cart">
        <a href="#cart">Cart</a>
    </div>
</div>

<div id="profile-content" class="content">
    <p><span id="user-name">Not logged in</span></p>
</div>


<div id="login-content" class="content hidden" >
    <img src="photos/avatar.png" class="avatar">
    <h1>Login Here</h1>
    <form id="login-form" onsubmit="return false;">
        <p>User e-mail</p>
        <input type="text" name="email" placeholder="Enter email">
        <p>Password</p>
        <input type="password" name="password" placeholder="Enter password">
        <div id="button">
            <button id="login-button" onclick="onLoginButtonClicked()">Login</button>
            <button id="register-button" onclick="openRegistration()">Register</button>
        </div>
    </form>
</div>

<div id="registration" class="content hidden">
    <h2>Registration</h2>
    <form id="reg-form" onsubmit="return false;">
        <input type="text" name="name" placeholder="Name" required>
        <br>
        <input type="text" name="email" placeholder="E-mail" required>
        <br>
        <input type="password" name="password" placeholder="Password" required>
        <br>
        <button id="registration-button" onclick="onRegistrationClicked()">Submit</button>
    </form>
</div>

<div id="back-to-profile-content" class="content hidden">
    <button onclick="onBackToProfileClicked();">Back to profile</button>
</div>

<div id="product-content" class="content"></div>

</body>
</html>
