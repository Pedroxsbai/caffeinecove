function addToCart(productName, price) {
  var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
  // Check if the product is already in the cart
  var existingProduct = cartItems.find(function(item) {
    return item.name === productName;
  });

  if (existingProduct) {
    // Product already exists, increase the quantity
    existingProduct.quantity++;
  } else {
    // Add the product to the cart
    cartItems.push({ name: productName, price: price, quantity: 1 });
  }
  
  // Save the updated cart items to local storage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
  // Refresh the cart display
  displayCart();
}

function removeFromCart(productName) {
  var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
  // Find the product in the cart
  var productIndex = cartItems.findIndex(function(item) {
    return item.name === productName;
  });

  if (productIndex !== -1) {
    // Remove the product from the cart
    cartItems.splice(productIndex, 1);
    
    // Save the updated cart items to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
  
  // Refresh the cart display
  displayCart();
}

function displayCart() {
  var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  var cartContainer = document.getElementById('cart-container');
  var totalContainer = document.getElementById('total-container');
  var total = 0;
  
  // Clear the previous cart display
  cartContainer.innerHTML = '';

  // Display each cart item
  cartItems.forEach(function(item) {
    var itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    var itemElement = document.createElement('div');
    itemElement.textContent = item.name + ' - Quantity: ' + item.quantity + ' - Total: $' + itemTotal.toFixed(2);
    
    cartContainer.appendChild(itemElement);
  });
  
  // Display the total price
  totalContainer.textContent = 'Total: $' + total.toFixed(2);
}

// Display the cart on page load
displayCart();
