let isAdmin = false;

const loginn= (email,contraseña)=>{
    if (email== "" || contraseña == ""){
        alert("Unos de los campos estan vacios")
    }else if (email== "admin" || contraseña == "admin"){
        alert("Admin registrado exitosamente")
        isAdmin = true;
        document.getElementById('adminControls').style.display = 'block';
        renderDogs();
        window.location.href = "../../index.html"
    }else if (email== "matias" || contraseña == "1602"){
        alert("Usuario registrado exitosamente")
        window.location.href = "../../index.html"
    }else{
        alert("Algunos de los campos son invalidos")
    }
    
}

const buttonLogin = ()=>{
        const email = document.getElementById("email").value
        const contraseña = document.getElementById("contraseña").value
        console.log(email,contraseña)
        login(email,contraseña) 
    }



