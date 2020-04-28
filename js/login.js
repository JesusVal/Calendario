

document.getElementById('btnLogin').addEventListener('click', function(e){
    e.preventDefault();

    let user = document.getElementById('Username').value;
    let pass = document.getElementById('Password').value;


    fetch(`http://localhost:3000/users?user=${user}&password=${pass}`, {
        method: 'GET',
    })
    .then(res => res.json())
    .then( data => {
        if(data.length > 0){
            console.log(data[0]);
            localStorage.token = data[0].token;
            window.location.href = './calendar.html';
        }else{
            alert('El usuario y contraseña no corresponden')
        }

        
    });

    // console.table({
    //     user,
    //     pass
    // });
});