
fetch('https://daswc.herokuapp.com/api/user',
{
    method: 'GET',
    headers: {
        'x-auth-user': 'token1'
    }
}).then( res => res.json())
.then( data => {
    console.log(data);
}).catch( err => console.log(err));