
document.getElementById('btnSignIn').addEventListener('click', function(e){
    e.preventDefault();

    let user = document.getElementById('Username').value;
    let mail = document.getElementById('Email').value;
    let pass1 = document.getElementById('Password').value;
    let pass2 = document.getElementById('PasswordVerification').value;


    console.table({
        user,
        mail,
        pass1,
        pass2
    });

    if( user.length < 6 )   {alert('El usuario debe contener al menos 6 caracteres'); return;}
    if( mail.length < 5 )   {alert('Falta un email válido'); return;}
    if( pass1.length < 6 )  {alert('Falta ingresar la contraseña'); return;}
    if( pass2.length < 6 )  {alert('Falta ingresar la  verificación de la contraseña'); return;}

    if(pass1.localeCompare(pass2) != 0){
        alert('Las constraseñas no coinciden')
        return;
    }

    

    fetch(`http://localhost:3000/users`, {
        method: 'GET',
    })
    .then(res => res.json())
    .then( data => {

        let newid = 1;
        let verification_flag = true;

        data.forEach(element => {
            newid = (element.userid >= newid) ? element.userid + 1 : newid;
            if( (element.user.localeCompare(user)!=0) && (element.email.localeCompare(mail)!=0) ){
                verification_flag = verification_flag && true;
            }else{
                verification_flag = verification_flag && false;
            }
        });

        let newuser = {
            userid: newid, 
            user: user, 
            email: mail,
            password: pass2,
            token: "token"+newid
        };

        if( !verification_flag ){
            alert('El usuario ya existe');
            return;
        }else{
            fetch(`http://localhost:3000/users?user`, {
                method: 'POST',
            })
            .then(res => res.json())
            .then( data => {

            });

        }

        // console.log( (verification_flag) ? 'nuevo usuario' : 'Ya existe' );

    });

    // fetch
    console.log('login');
});


// fetch(`http://localhost:3000/users?user=${user}&password=${pass}`, {
//         method: 'GET',
//     })
//     .then(res => res.json())
//     .then( data => {

// });