const handleEdit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('user').value;

    if (!email || !password || !username) {
        alert('Por favor, rellene todos los campos');
        return;
    }

    const url = '/edit';
    const data = { email, password, username };
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(url, params);
        const result = await response.json();
        if (result.status === 'success') {
            alert('Edit successful');
            window.location.reload();
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (err) {
        console.error(err);
        alert(`Error: ${err}`);
    }

};