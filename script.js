//cart
let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')

cartIcon.onclick=()=>{
    cart.classList.add("active");
}

closeCart.onclick=()=>{
    cart.classList.remove("active");
}

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
} else{
    ready();
}

function ready(){
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for(var i=0; i<removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity')
      for(var i=0; i<quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    var addCart = document.getElementsByClassName("add-cart")
    for(var i=0; i<addCart.length; i++){
         var button = addCart[i];
         button.addEventListener("click", addCartClicked);
    }
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

function buyButtonClicked(){
   // alert("Your order is placed")
     var cartContent =  document.getElementsByClassName("cart-content")[0];
     while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
     }
     updatetotal();
}

function removeCartItem(event){
    var buttonClicked =event.target
    buttonClicked.parentElement.remove()
    updatetotal();
}
 function quantityChanged(event){
    var input = event.target;
  if(isNaN(input.value)|| input.value <= 0){
    input.value=1;
  }
  updatetotal();
}

function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText
    var price = shopProducts.getElementsByClassName("price")[0].innerText
    var ProductImg = shopProducts.getElementsByClassName("product-img")[0].src
    addProductToCart(title, price, ProductImg);
    updatetotal()
}
    
function addProductToCart(title, price, ProductImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        var cartItemTitle = cartItemsNames[i].innerText;
        if (cartItemTitle === title) {
            alert('You have already added this item to cart');
            return; 
        }
    }
    var cartBoxContent = `
        <img src="${ProductImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash-alt  cart-remove'></i>
    `;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener('change', quantityChanged);
}

function updatetotal(){
    var cartContent =  document.getElementsByClassName("cart-content")[0];
     var cartBoxes = cartContent.getElementsByClassName("cart-box");
     var total = 0;
     for(var i=0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity =  quantityElement.value;
    total = total + price * quantity;
     }

    total = Math.round(total * 100)/100;



    document.getElementsByClassName("total-price")[0].innerText = "$"+total;
    
     
}



var modal = document.getElementById("myModal");
var buyButton = document.getElementById("buy-now");
var closeButton = document.getElementsByClassName("close")[0];

buyButton.onclick = function() {
    modal.style.display = "block";
}

closeButton.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById("billing-form-content").addEventListener("submit", function(event) {
    event.preventDefault(); 
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    
    
    alert("Your order is placed");
    
    
    modal.style.display = "none"; 
});



let favoriteProducts = [];


document.querySelectorAll('.add-to-favorites').forEach(item => {
    item.addEventListener('click', event => {
        const heartIcon = event.target;
        const productBox = heartIcon.closest('.product-box');
        const productId = productBox.dataset.productId; // You can add a data attribute to each product box to store its unique ID
        
        if (heartIcon.classList.contains('bxs-heart')) {
          
            heartIcon.classList.remove('bxs-heart');
            heartIcon.classList.add('bxs-heart-fill');
           
            favoriteProducts.push(productId);
        } else {
          
            heartIcon.classList.remove('bxs-heart-fill');
            heartIcon.classList.add('bxs-heart');
           
            favoriteProducts = favoriteProducts.filter(id => id !== productId);
        }
    });
});






document.querySelectorAll('.product-img').forEach(img => {
    img.addEventListener('click', event => {
        const productBox = event.target.closest('.product-box');
        const title = productBox.querySelector('.product-title').innerText;
        const price = productBox.querySelector('.price').innerText;
        const imgSrc = productBox.querySelector('.product-img').src;
        const description = "This is a detailed description of the product. It includes all the information a customer needs to know about this item."; // You can replace this with dynamic content if available

       
        const modal = document.getElementById('productModal');
        modal.querySelector('.modal-product-img').src = imgSrc;
        modal.querySelector('.modal-product-title').innerText = title;
        modal.querySelector('.modal-product-description').innerText = description;
        modal.querySelector('.modal-product-price').innerText = price;

       
        modal.style.display = "block";
    });
});


const productModal = document.getElementById('productModal');
productModal.querySelector('.close').onclick = function() {
    productModal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == productModal) {
        productModal.style.display = "none";
    }
}


