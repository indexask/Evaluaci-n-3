import { BaseProducts } from "./BaseProducts.js";

const addToCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = BaseProducts.find(p => p.id === productId);
    if (product) {
        // Verificar si el producto ya está en el carrito
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1; // Aumentar la cantidad si ya está en el carrito
        } else {
            product.quantity = 1; // Establecer la cantidad a 1 si es la primera vez que se agrega
            cart.push(product);
        }
        
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart(); // Actualizar el carrito en la interfaz después de agregar un producto
        alert(`${product.nombre} se ha agregado al carrito.`);
    } else {
        console.error('Producto no encontrado');
    }
}

const decrementQuantity = (productId) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = cart.find(item => item.id === productId);
    if (product && product.quantity > 1) {
        product.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart(); // Actualizar el carrito en la interfaz después de cambiar la cantidad
    }
}

const incrementQuantity = (productId) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart(); // Actualizar el carrito en la interfaz después de cambiar la cantidad
    }
}
const delToCart = (productId) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  alert(`Producto con ID ${productId} ha sido eliminado del carrito.`);
};

const calculateTotal = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    cart.forEach((product) => {
        total += product.precio * product.quantity;
    });
    return total;
}




const render = () => {
  const products = BaseProducts;
  const producBody = document.querySelector(".productos");
  producBody.innerHTML = "";
  products.forEach((a) => {
    producBody.innerHTML += `
        <div class="col ">
        <div class="row gy-5">
        <div class="col-4">
        <div class="card" style="width: 18rem;">
        <img src=${a.urlImg} class="card-img-top" alt="...">
        <div class="card-body body-card">
        <h5 class="card-title">${a.nombre}</h5>
        <p class="card-text">${a.descripcion}</p>
        <p class="card-text">${a.precio}</p>
        <button class="btn btn-primary bg-dark" onclick="addToCart(${a.id})">Agregar al Carro</button>
        </div>
        </div>
        </div>
        </div>
        </div>
        `;
  });
};

const renderCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartBody = document.querySelector(".carroDeCompras");
    cartBody.innerHTML = "";

    cart.forEach((product) => {
        const cartItemHTML = `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${product.urlImg}" class="img-fluid rounded-start" alt="${product.nombre}">
                    </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                    <h5 class="card-title">${product.nombre}</h5>
                                    <p class="card-text">${product.descripcion}</p>
                                    <p>Cantidad: ${product.quantity}</p>
                                    <button class="btn btn-primary" onclick="incrementQuantity(${product.id})">+</button>
                                    <button class="btn btn-primary" onclick="decrementQuantity(${product.id})">-</button>
                                    <button class="btn btn-danger" onclick="delToCart(${product.id})">Eliminar</button>
                            </div>
                        </div>
                </div>
            </div>`;
        cartBody.innerHTML += cartItemHTML;
    });

    const totalElement = document.querySelector(".total");
    if (totalElement) {
        totalElement.textContent = `Total: $${calculateTotal()}`;
    }
}


    const checkout = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const receiptBody = document.querySelector("#receiptBody");
        receiptBody.innerHTML = "";
    
        let receiptHTML = "<h2>Boleta de Compra</h2>";
        receiptHTML += "<ul>";
        cart.forEach(product => {
            receiptHTML += `<li>${product.nombre} - ${product.quantity} x $${product.precio} = $${product.quantity * product.precio}</li>`;
        });
        receiptHTML += "</ul>";
        receiptHTML += `<p>Total: $${calculateTotal()}</p>`;
    
        receiptBody.innerHTML = receiptHTML;
        showModal();
    }

document.querySelector(".pay").addEventListener("click", checkout);


const showModal = () => {
    const modal = document.querySelector("#receiptModal");
    modal.style.display = "block";
}

const closeModal = () => {
    const modal = document.querySelector("#receiptModal");
    modal.style.display = "none";
}

// Para cerrar el modal cuando el usuario haga clic fuera del modal
window.onclick = (event) => {
    const modal = document.querySelector("#receiptModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

render();
renderCart();
window.addToCart = addToCart;
window.delToCart = delToCart;
window.incrementQuantity = incrementQuantity;
window.decrementQuantity = decrementQuantity;