const addCartButton = document.querySelector('.addCart');


addCartButton.addEventListener('click', (e)=>{
    e.preventDefault();
    let cart = localStorage.getItem('cart');
    let products = localStorage.getItem('products');
    if(cart){
        cartArray = cart.split('-');
        if(cartArray.indexOf(e.target.value) !== -1){
            alert('El producto ya está en el carrito')   
        } else{ 
            cart += '-' + e.target.value;
            products += '-' + e.target.name;
            alert('Producto agregado al carrito')
        }
        console.log(cart);
        localStorage.setItem('cart', cart);
        localStorage.setItem('products', products);
    }
    else{
        localStorage.setItem('cart', e.target.value);
        localStorage.setItem('products', e.target.name);
        alert('Producto agregado al carrito')
    }
})