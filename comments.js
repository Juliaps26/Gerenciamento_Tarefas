const idUserLogado = localStorage.getItem('idUser')
const idTarefa = localStorage.getItem('idTarefa')

window.onload = async function getComentario(){


    // const objUser = await fetch(`http://localhost:5080/usuarios/${idUserLogado}`)
    // const user = await objUser.json()

    // const helloUser = document.getElementById('user')
    // const nome = document.createElement('p')

    // nome.textContent = `Olá, ${user.nome}`
    // nome.className = 'hello'
    // helloUser.appendChild(nome)


    const containerTitulo = document.getElementById('titulo');
    const objTarefa = await fetch(`http://localhost:5080/tarefas/${idTarefa}`)
    const tarefa = await objTarefa.json()
    const titulo = document.createElement('h1')

    titulo.textContent = tarefa.descricao

    containerTitulo.appendChild(titulo)

    const url = 'http://localhost:5080/comentarios'

    const objComentarios = await fetch(url)

    const listComentarios = await objComentarios.json()

    const container = document.getElementById('container')

    listComentarios.forEach(comentario => {
        if(comentario.idTarefa === idTarefa){

            const containerComentario = document.createElement('div')
            const descricao = document.createElement('p')
            
            containerComentario.className = 'comentarios'   

            descricao.textContent = `${comentario.descricao}`
            containerComentario.appendChild(descricao)            

            container.appendChild(containerComentario)

        }
    });

}


async function newComentario() { 
    const descricao = document.getElementById('comentario').value

    const id = ''
    const idUsuario = idUserLogado

    const newComentario = {
        id,
        descricao,
        idUsuario,
        idTarefa        
    }

    const url = 'http://localhost:5080/comentarios'

    const options = {
        method: 'Post', 
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(newComentario)
    }

    await fetch(url, options)
    alert('Comentário realizado com sucesso!!')
   

    window.location.reload()

}