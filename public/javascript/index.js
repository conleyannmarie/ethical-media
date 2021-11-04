const searchBar = document.getElementById('searchBar');
let users = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value;
    const filteredUsers = users.filter(user => {
        return user.name.include(searchString)
    })
    console.log(filteredUsers)
});