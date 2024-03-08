window.onload = function() {
    var addToCartButtons = document.querySelectorAll('.product button');

    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', addToCart);
    });
}

function addToCart() {
    var product = this.parentElement;
    var productName = product.querySelector('h2').innerHTML;
    var productPrice = product.querySelector('p').innerHTML;
    var cart = document.querySelector('.cart ul');
    var existingProduct = Array.from(cart.getElementsByTagName('li')).find(li => li.dataset.name === productName);

    if (existingProduct) {
        // If the product already exists in the cart, increment the quantity
        existingProduct.dataset.quantity = Number(existingProduct.dataset.quantity) + 1;
        existingProduct.querySelector('.quantity').innerHTML = 'Quantity: ' + existingProduct.dataset.quantity;
    } else {
        // If the product doesn't exist in the cart, add it with a quantity of 1
        var cartItem = document.createElement('li');
        cartItem.dataset.name = productName;
        cartItem.dataset.quantity = 1;
        cartItem.innerHTML = productName + ' - ' + productPrice + ' - <span class="quantity">Quantity: 1</span> <button>Remove</button>';
        cart.appendChild(cartItem);

        cartItem.querySelector('button').addEventListener('click', function() {
            cartItem.dataset.quantity = Number(cartItem.dataset.quantity) - 1;
            if (cartItem.dataset.quantity == 0) {
                cart.removeChild(cartItem);
            } else {
                cartItem.querySelector('.quantity').innerHTML = 'Quantity: ' + cartItem.dataset.quantity;
            }
            if (cart.getElementsByTagName('li').length == 0) {
                var empty = document.createElement('li');
                empty.id = 'emptyCartMessage';
                empty.innerHTML = 'Your cart is empty.';
                cart.appendChild(empty);
            }
        });
    }

    var emptyCartMessage = document.getElementById('emptyCartMessage');
    if (emptyCartMessage) {
        emptyCartMessage.remove();
    }

    alert('Added ' + productName + ' to your shopping cart!');
}
