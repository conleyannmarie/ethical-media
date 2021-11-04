async function profile() {
    const response = await fetch('/profile-routes', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#profile').addEventListener('click', profile);
