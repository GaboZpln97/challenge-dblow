const handleSubmit = async (e) =>{
    e.preventDefault();

    if (document.getElementById('email').value === '' || document.getElementById('password').value === '') {
        alert('Por favor, rellene todos los campos');
        return;
        
    }

    const url = 'http://localhost:9091/getInfoUser'
    const data = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    }
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    try {
        const response = await fetch(url, params);
        const data = await response.json();
        if (data.redirect) {
            window.location = data.redirect;
            
        }else {
            alert('Usuario o contraseña incorrectos');
        }
    } catch (error) {
        console.log(error);
    }
    
}