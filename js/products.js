const productDetails = document.getElementById('product-details');

if (!productDetails) {
  console.error("Error: Element with ID 'product-details' not found!");
}

// Get the product ID from the URL query string
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');

// console.log("Product ID from URL:", productId);

if (!productId) {
  productDetails.innerHTML = `<p>No product ID specified in the URL.</p>`;
}

// Fetch product data and display the selected product
fetch('./data/data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("Fetched data:", data);

    if (!Array.isArray(data)) {
      console.error("Error: Expected data to be an array.");
    }

    const product = data.find(p => p.id === Number(productId));
    // console.log("Selected product:", product);

    if (product) {
      let quantity = 1;
      const pricePerUnit = parseFloat(product.price.replace('$', ''));

      const updatePrice = () => {
        const totalPrice = (pricePerUnit * quantity).toFixed(2);
        document.getElementById('total-price').textContent = `$${totalPrice}`;
      };

      productDetails.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="details">
          <h2>${product.name}</h2>
          <p>${product.description || 'No description available.'}
Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis exercitationem pariatur similique distinctio numquam officia dicta, non veniam in incidunt.
          </p>
          <p><strong>Price:</strong> <span id="total-price">$${pricePerUnit.toFixed(2)}</span></p>
          <div class="quantity-selector">
            <button id="decrease-btn" class="quantity-btn">-</button>
            <span id="quantity-display">${quantity}</span>
            <button id="increase-btn" class="quantity-btn">+</button>
          </div>
          <button id="add-to-cart" class="add-to-cart-btn">Add to Cart</button>
          <button id="buy-btn" class="buy-btn">Buy now</button>
        </div>
      `;

      const decreaseBtn = document.getElementById('decrease-btn');
      const increaseBtn = document.getElementById('increase-btn');
      const quantityDisplay = document.getElementById('quantity-display');

      decreaseBtn.addEventListener('click', () => {
        if (quantity > 1) {
          quantity--;
          quantityDisplay.textContent = quantity;
          updatePrice();
        }
      });

      increaseBtn.addEventListener('click', () => {
        quantity++;
        quantityDisplay.textContent = quantity;
        updatePrice();
      });

      const addToCartBtn = document.getElementById('add-to-cart');
      addToCartBtn.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          cart.push({
            id: product.id,
            name: product.name,
            price: pricePerUnit,
            quantity: quantity,
            image: product.image,
          });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
        window.location.href = 'cart.html'; // Redirect to cart page
      });
    } else {
      productDetails.innerHTML = `<p>Product not found!</p>`;
    }
  })
  .catch(error => console.error('Error loading product:', error));
