const cart = JSON.parse(localStorage.getItem("cart"));

function addTOCartItems() {
  let cartItemsContainer = document.getElementById("cartItems");
  console.log(cartItemsContainer);

  let items = "";
  cart.forEach((item) => {
    console.log(item);


    items += `
        <tr>
        <td><img src="${item.image}" alt="${item.name}"></td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.id}</td>
        </tr>
    `;
    
  });
  
  cartItemsContainer.innerHTML = items;
}

function renderCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let items = "";
  let itemCount = 0;
  let totalAmount = 0;

  cart.forEach((item) => {
    const itemTotal = Number(item.price) * item.quantity;

    itemCount += item.quantity;
    totalAmount += itemTotal;

    items += `
      <tr>
        <td><img src="${item.image}" alt="${item.name}"></td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>
          <button class="decrement" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="increment" data-id="${item.id}">+</button>
        </td>
        <td>${itemTotal}</td>
      
        <td><i class="fas fa-trash-alt deleteItem" data-id="${item.id}"></i></td>

      </tr>
    `;
  });

  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = items;

  document.getElementById("itemCount").textContent = itemCount;
  document.getElementById("totalAmount").textContent = totalAmount.toFixed(2);

  const incrementButtons = document.querySelectorAll(".increment");
  const decrementButtons = document.querySelectorAll(".decrement");
  const deleteButtons = document.querySelectorAll(".deleteItem");

  incrementButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const cartItem = cart.find((item) => item.id === id);

      if (cartItem) {
        cartItem.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartItems();
      }
    });
  });

  decrementButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const cartItem = cart.find((item) => item.id === id);

      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartItems();
      }
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const newCart = cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      renderCartItems();
    });
  });
}

function emptyCart() {
  localStorage.removeItem("cart");
  renderCartItems();
}

document.getElementById("buyNowButton").addEventListener("click", () => {
  bootbox.alert({
    message: "Your order is placed! Congratulations, you have free delivery!",

    callback: function () {
      window.location.href = "e-commerce.html";
    },
  });
});

renderCartItems();
