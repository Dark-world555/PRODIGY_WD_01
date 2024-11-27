const cartContainer = document.getElementById('cart-container');
const subtotalDisplay = document.getElementById('subtotal-display');
const buyNowButton = document.getElementById('buy-now');

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const renderCart = () => {
  cartContainer.innerHTML = ''; // Clear existing cart items

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p>Your cart is empty.</p>`;
    subtotalDisplay.textContent = '$0.00';
    return;
  }

  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price * item.quantity;

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
        <div class="quantity-selector">
          <button class="decrease-btn" data-index="${index}">-</button>
          <span>${item.quantity}</span>
          <button class="increase-btn" data-index="${index}">+</button>
        </div>
        <button class="remove-btn" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;

    cartContainer.appendChild(cartItem);
  });

  subtotalDisplay.textContent = `$${subtotal.toFixed(2)}`;
};

// Handle quantity changes and item removal
cartContainer.addEventListener('click', (e) => {
  const index = e.target.getAttribute('data-index');

  if (e.target.classList.contains('decrease-btn') && index !== null) {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      alert("Quantity can't be less than 1.");
    }
  }

  if (e.target.classList.contains('increase-btn') && index !== null) {
    cart[index].quantity++;
  }

  if (e.target.classList.contains('remove-btn') && index !== null) {
    cart.splice(index, 1); // Remove item from cart
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart(); // Re-render the cart
});

// Handle Buy Now
buyNowButton.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  alert('Thank you for your purchase!');
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
});

// Initial render
renderCart();
