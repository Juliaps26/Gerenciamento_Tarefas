async function validarLogin(){

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value; 

    console.log(email);
        
    if(email === '' || senha === ''){
        alert('Por favor, preencha todos os campos!!')
        return false;
    }

    try {

        const users = await fetch('http://localhost:5080/usuario');

        const listUsers = await users.json();
        
        listUsers.forEach((user) => {
            if(email === user.email && senha === user.senha){
                alert('Usuário Logado com Sucesso !!');
                window.location.href = './home.html'
                return true;
            }
        })



       

    } catch (error) {
        alert('Erro ao acessar a API!')
        console.error(error);
    }

}

validarLogin()
