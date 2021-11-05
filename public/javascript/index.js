const searchBar = document.getElementById('searchBar');
let users = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value;
    const filteredUsers = users.filter((username) => {
        return (
            username.name.contains(searchString)
        );
    })
    console.log(filteredUsers)
});