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
    <c:url value="/cart.js" var="cartScriptUrl"/>
    <c:url value="/logout.js" var="logoutScriptUrl"/>
    <link rel="stylesheet" type="text/css" href="${styleUrl}">
    <script src="${indexScriptUrl}"></script>
    <script src="${adminScriptUrl}"></script>
    <script src="${allProductsScriptUrl}"></script>
    <script src="${productScriptUrl}"></script>
    <script src="${loginScriptUrl}"></script>
    <script src="${profileScriptUrl}"></script>
    <script src="${cartScriptUrl}"></script>
    <script src="${registrationScriptUrl}"></script>
    <script src="${logoutScriptUrl}"></script>
    <title>Pa-Web-Store</title>
</head>
<body>
<div id="topnav" class="content">
    <div id="menu">
        <a class="active " href="#home" onclick="onHomeButtonClicked()"><i class="fa fa-home"></i> Home</a>
        <a id="login-logout" href="#login" onclick="openLoginForm()"><i class="fa fa-user"></i>
            <span id="login-logot-text"> login</span>
        </a>
    </div>

    <div id="cart">
        <a>User: <span id="user-name">Not logged in</span></a>
        <a href="#cart" onclick="onCartClicked()"><i class="fa fa-cart-plus"></i><span id="items"> Empty</span></a>
    </div>
</div>

<div id="login-content" class="content hidden">
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
    <img src="photos/avatar.png" class="avatar">
    <h1>Registration here</h1>
    <form id="reg-form" onsubmit="return false;">
        <p>Name</p>
        <input type="text" name="name" placeholder="Enter name" required>
        <p>E-mail</p>
        <input type="text" name="email" placeholder="Enter email" required>
        <p>Password</p>
        <input type="password" name="password" placeholder="Enter password" required>
        <button id="registration-button" onclick="onRegistrationClicked()">Submit</button>
        <button id="back-button-register" onclick="onHomeButtonClicked()"><i class="fa fa-home"></i> Back</button>
    </form>
</div>

<div id="admin-content" class="hidden content">
    <h2>Admin menu</h2>
    <h3>Click on buttons below to see orders</h3>
    <div id="admin-menu">
        <a id="product-list-button" onclick="onAdminProductListClicked()">Product list</a>
        <a id="add-product-button" onclick="showAddProductFields()">Add product</a>
        <a id="orders-userId" onclick="showOrdersByUserIdClicked()">Orders by user id</a>
        <a id="orders-productId" onclick="showOrdersByProductIdClicked()">Orders by product id</a>
        <a id="orders-former" onclick="showFormerOrdersThan()">Orders former than</a>
        <a id="orders-later" onclick="showLaterOrdersThan()">Orders later than</a>
    </div>
    <div id="orders" class="hidden content">
        <h3>Click on order to delete</h3>
        <table>
            <tr>
                <th>Order id</th>
                <th>User id</th>
                <th>Product id</th>
                <th>Quantity</th>
                <th>Order Date</th>
            </tr>
            <tbody id="orders-content"></tbody>
        </table>
    </div>
    <div id="admin-product" class="hidden content">
        <h3>Click on product to edit</h3>
        <table>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Specification</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Photo url</th>
            </tr>
            <tbody id="admin-product-content"></tbody>
        </table>
    </div>
    <div id="edit-product" class="hidden content">
        <h2>Edit fields below and click update!</h2>
        <h3>Name</h3>
        <input id="edit-name" type="text">
        <h3>Brand</h3>
        <input id="edit-brand" type="text">
        <h3>Specification</h3>
        <input id="edit-spec" type="text">
        <h3>Description</h3>
        <input id="edit-desc" type="text">
        <h3>Price</h3>
        <input id="edit-price" type="number">
        <h3>Quantity</h3>
        <input id="edit-quantity" type="number">
        <h3>Photo url</h3>
        <input id="edit-photoUrl" type="text">
        <br><br>
        <a id="edit-submit-button" onclick="onUpdateProductFieldClicked()">Click to update</a>
        <br><br>
    </div>
    <div id="add-product" class="hidden content">
        <h2>Fill all fields below and click add button!</h2>
        <h3>Name</h3>
        <input id="add-name" type="text">
        <h3>Brand</h3>
        <input id="add-brand" type="text">
        <h3>Specification</h3>
        <input id="add-spec" type="text">
        <h3>Description</h3>
        <input id="add-desc" type="text">
        <h3>Price</h3>
        <input id="add-price" type="number">
        <h3>Quantity</h3>
        <input id="add-quantity" type="number">
        <h3>Photo url</h3>
        <input id="add-photoUrl" type="text">
        <br><br>
        <a id="add-submit-button" onclick="onAddProductClicked()">Click to add</a>
        <br><br>
    </div>
</div>

<div id="product-content" class="content"></div>

<div id="cart-content" class="hidden content">
    <h1>Cart</h1>
    <table>
        <thead>
        <th>Id</th>
        <th>Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Update</th>
        </thead>
        <tbody id="cart-tbody"></tbody>
    </table>
    <div id="buy-products">
        <h2>Total price: <span id="total-price"></span></h2>
        <a id="checkOut-button" onclick="onCheckOutButtonClicked()">Check Out</a>
    </div>
</div>
<div id="snackbar"></div>
</body>
</html>
