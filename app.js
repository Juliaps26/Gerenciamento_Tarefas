async function cadastrar(){


    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value; 

    console.log(email);
        
    if(nome === '' || senha === '' ||email ===''){
        alert('Por favor, preencha todos os campos!!')
        return false;
    }

    try {

        const users = await fetch('http://localhost:5080/usuario');

        const listUsers = await users.json();
        
        listUsers.forEach((user) => {
            if(email === user.email && senha === user.senha){
                alert('Usuário Cadastrado com Sucesso !!');
                window.location.href = '.'
                return true;
            }
        })
        alert('Usuário não encontrado!!')
        return false;

    } catch (error) {
        alert('Erro ao acessar a API!')
        console.error(error);
    }

}

validarLogin()
