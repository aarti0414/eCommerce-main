

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}
function ready(){
    var removecartItemButton = document.getElementsByClassName('btn-danger');
    for(var i=0;i<removecartItemButton.length;i++){
        var button = removecartItemButton[i];
        button.addEventListener('click',removecartItem);
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for(var i=0;i<quantityInputs.length;i++){
        var input = quantityInputs[i];
        input.addEventListener('change',quantityChanged)
    }
    var addT0CartButtons = document.getElementsByClassName('shop-item-btn');
    for(var i=0;i<addT0CartButtons.length;i++){
        var button = addT0CartButtons[i];
        button.addEventListener('click',addTocartClicked)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked);

}
function purchaseClicked(event){
    alert('Thankyou For purchasing')
}

function removecartItem(event){
    var buttonClicked =event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value)|| input.value<=0){
        input.value=1;
    }
    updateCartTotal();
}
function addTocartClicked(event){
    event.preventDefault();
    var button = event.target;
    var shopItem = button.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imgSrc = shopItem.getElementsByClassName('shop-item-img')[0].src;
    console.log(title,price,imgSrc);
    addItemToCart(title,price,imgSrc);
    updateCartTotal();
}
function addItemToCart(title,price,imgSrc){
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName ('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for(var i=0;i<cartItemNames.length;i++){
        if(cartItemNames[i].innerText==title){
            alert('This Item is already added to cart');
            return;
        }
    }
    var cartRowContents=`
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imgSrc}" alt="" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>

    <div class="cart-quantity">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`
    cartRow.innerHTML=cartRowContents    
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removecartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged);
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows =cartItemContainer.getElementsByClassName('cart-row');
    var total =0;
    for(var i=0;i<cartRows.length;i++){
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement =cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('₹',''));
        var quantity = quantityElement.value;
        console.log(price*quantity);
        total = total+(price*quantity);
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('cart-total-price')[0].innerText = 'Rs '+ total;
}