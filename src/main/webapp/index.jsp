<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!doctype html>
<html lang="en">
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <c:url value="/style.css" var="styleUrl"/>
    <c:url value="/index.js" var="indexScriptUrl"/>
    <c:url value="/admin.js" var="adminScriptUrl"/>
    <c:url value="/allProducts.js" var="allProductsScriptUrl"/>
    <c:url value="/product.js" var="productScriptUrl"/>
    <c:url value="/login.js" var="loginScriptUrl"/>
    <c:url value="/profile.js" var="profileScriptUrl"/>
    <c:url value="/registration.js" var="registrationScriptUrl"/>
    <c:url value="/back-to-profile.js" var="backToProfileScriptUrl"/>
    <c:url value="/logout.js" var="logoutScriptUrl"/>
    <link rel="stylesheet" type="text/css" href="${styleUrl}">
    <script src="${indexScriptUrl}"></script>
    <script src="${adminScriptUrl}"></script>
    <script src="${allProductsScriptUrl}"></script>
    <script src="${productScriptUrl}"></script>
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
        <a class="active " href="#home" onclick="onHomeButtonClicked()"><i class="fa fa-home"></i> Home</a>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>

        <a id="login-logout" href="#login" onclick="openLoginForm()"><i class="fa fa-user"></i><span id="login-logot-text"> login</span></a>
    </div>

    <div id="cart">
        <a>User: <span id="user-name">Not logged in</span></a>
        <a href="#cart" ><i class="fa fa-cart-plus"></i><span id="items"> Empty</span></a>
    </div>
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
            <button id="login-button" onclick="onLoginButtonClicked()"><i class="fa fa-user"></i> Login</button>
            <button id="register-button" onclick="openRegistration()"><i class="fa fa-user-plus"></i> Register</button>
            <button id="back-button" onclick="onHomeButtonClicked()"><i class="fa fa-home"></i> Back</button>
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

<div id="product-content" class="content"></div>

</body>
</html>
