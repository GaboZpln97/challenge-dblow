const handleDeposit = async (e) => {
    e.preventDefault();
    const amount = document.getElementById('amount').value;

    if (!amount) {
        alert('Please enter an amount');
        return;
    }

    const url = '/deposit';
    const data = { amount };
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
            alert('Deposit successful');
            window.location.reload();
        } else {
            alert(`Error: ${result.message}`);
        }

    }catch(err) {
        console.error(err);
        alert(`Error: ${err}`);
    }
}