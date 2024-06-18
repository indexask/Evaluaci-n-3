const dogs = [
    { id: 1, name: 'Simba', description: 'Muy sociable, cariñoso y jugueton.', image: './img/salchi1.jpg' },
    { id: 2, name: 'Villano', description: 'Muy sociable, cariñoso y jugueton.', image: './img/dog2.jpg' },
    { id: 3, name: 'Siberian', description: 'Muy sociable, cariñoso y jugueton.', image: './img/dog3.jpg' },
    { id: 4, name: 'Oliver', description: 'Muy sociable, cariñoso y jugueton.', image: './img/dog4.jpg' }
];

document.addEventListener("DOMContentLoaded", () => {
    renderDogs();
    checkAdmin();
});

// Función para renderizar las tarjetas de perros
const renderDogs = () => {
    const dogsContainer = document.getElementById('dogsContainer');
    dogsContainer.innerHTML = '';
    dogs.forEach(dog => {
        const dogCard = `
        <div class="col">
            <div class="row gy-5">
              <div class="col-4">
                    <div class="card" style="width: 18rem;">
                        <img src="${dog.image}" class="card-img-top" alt="${dog.name}">
                            <div class="card-body">
                                <h5 class="card-title">${dog.name}</h5>
                                <p class="card-text">${dog.description}</p>
                                <a href="./html/page1.html" class="btn btn-primary bg-dark">Llenar Formulario</a>
                                ${isAdmin() ? `
                                <button class="btn btn-primary" onclick="editDog(${dog.id})">Editar</button>
                                <button class="btn btn-danger" onclick="deleteDog(${dog.id})">Eliminar</button>
                                ` : ''}
                </div>
                  </div>
              </div>
            </div>
          </div>  `;
        dogsContainer.innerHTML += dogCard;
    });
};

// Función para agregar un nuevo perro
const addDog = (name, description, image) => {
    const newDog = {
        id: dogs.length ? dogs[dogs.length - 1].id + 1 : 1,
        name,
        description,
        image
    };
    dogs.push(newDog);
    renderDogs();
};

// Función para editar un perro
const editDog = (id) => {
    const dog = dogs.find(d => d.id === id);
    if (dog) {
        const newName = prompt('Nuevo nombre:', dog.name);
        const newDescription = prompt('Nueva descripción:', dog.description);
        const newImage = prompt('Nueva URL de imagen:', dog.image);
        dog.name = newName || dog.name;
        dog.description = newDescription || dog.description;
        dog.image = newImage || dog.image;
        renderDogs();
    }
};

// Función para eliminar un perro
const deleteDog = (id) => {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este perro?');
    if (confirmDelete) {
        const dogIndex = dogs.findIndex(d => d.id === id);
        if (dogIndex !== -1) {
            dogs.splice(dogIndex, 1);
            renderDogs();
        }
    }
};

// Función para manejar el agregado de un nuevo perro
const handleAddDog = () => {
    const name = document.getElementById('dogName').value;
    const description = document.getElementById('dogDescription').value;
    const image = document.getElementById('dogImage').value;
    addDog(name, description, image);
};

// Función para manejar el inicio de sesión
const login = (username, password) => {
    if (username === 'admin' && password === 'admin') {
        window.location.href = "../../index.html"
        localStorage.setItem("isAdmin", true);
        document.getElementById('adminControls').style.display = 'block';
        renderDogs();
    }else if (username== "matias" || password == "1602"){
        alert("Usuario registrado exitosamente")
        localStorage.setItem("isUser", true);
        window.location.href = "../../index.html"
    }else {
        alert('Credenciales incorrectas');
    }
};

const handleLogin = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
};

function isAdmin() {
    return localStorage.getItem("isAdmin") === "true";
}

function isUser() {
    return localStorage.getItem("isUser") === "true";
}
function checkAdmin() {
    if (isAdmin()) {
        document.getElementById("adminControls").style.display = "block";
        document.querySelector(".loginNav").style.display = "none";
        document.querySelector(".desLoginNav").style.display = "block";

    } else if (isUser()) {
        document.getElementById("adminControls").style.display = "none";
        document.querySelector(".loginNav").style.display = "none";
        document.querySelector(".desLoginNav").style.display = "block";    
    } else {
        document.getElementById("adminControls").style.display = "none";
        document.querySelector(".loginNav").style.display = "block";
        document.querySelector(".desLoginNav").style.display = "none";
    }
}

let desLog = document.querySelector(".desLoginNav").addEventListener('click',()=>{
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isUser");
    checkAdmin()
})

// Inicializar renderizado de perros
renderDogs();
