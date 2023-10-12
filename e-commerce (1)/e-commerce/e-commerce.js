
var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
    },
});

    


const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        const name = button.getAttribute('data-name');
        const price = button.getAttribute('data-price');
        const image = button.getAttribute('data-image');
       
    console.log(price);
     
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
        
            bootbox.alert({
                message: "You have already added this item to your CART!",
              
                callback: function() {
                  bootbox.alert("please! select another product");
                }
              })
        } else {
          
            const cartItem = {
                id,
                name,
                price,
                image,
                quantity: 1
            };
            cart.push(cartItem);

        
            localStorage.setItem('cart', JSON.stringify(cart));
            
            bootbox.alert({
                message: "Your Item is added to your CART!",
              
                callback: function() {
                  bootbox.alert("please! check the Cart");
                }
              })
        }
    });
});

function addTOCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let items = '';

    cart.forEach(item => {
        items += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name}</p>
                <p>${item.price}</p>
            
            </div>
        `;
    });

    document.querySelector(".cartItems").innerHTML = items;
}
addTOCartItems();





 
