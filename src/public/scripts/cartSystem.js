const cartTable = document.getElementById('cartTable');
console.log(cartTable);
let products = this.localStorage.getItem('products').split('-');
let ids = this.localStorage.getItem('cart').split('-');

window.addEventListener("load", function(event) {
    // Coloca aquí el código que deseas ejecutar cuando la ventana se ha cargado por completo
    console.log("La ventana se ha cargado por completo.");
    // ...otros códigos
    products.forEach((e)=>{
      let id = products.indexOf(e);
      cartTable.innerHTML += 
      `<tr>
        <td><p name = 'title' value = ${e} >${e}</p></td>
        <td><p name = 'idProduct' value = ${ids[id]}>${ids[id]}</p></td>
        <td><input type = 'number' class= 'quantity' value='1'></td>
        <td><button id='deleteFromCart'>Eliminar</button></td>
      </tr>`
    })
  });

  const sendCartBtn = document.getElementById('sendCartBtn');
 
  sendCartBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    let quantities = document.getElementsByClassName('quantity');
    let values = [];
    for (let i = 0; i < quantities.length; i++) {
      values.push(quantities[i].value);
    }
    fetch('http://localhost:3000/carts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ids, products, values})
    })
    .then(response => response.json())
    .then(data => console.log('Respuesta recibida:', data))
    .catch(error => console.error('Error:', error));
    alert('Petición enviada con éxito.')
    window.location.href = 'http://localhost:3000/'
  })