'use strict'

document.getElementById('mostrarCard').addEventListener('click', function () {
    document.getElementById('card').style.display = 'flex';
});

document.getElementById('fechar-card').addEventListener('click', function () {
    document.getElementById('card').style.display = 'none';
});


const button = document.getElementById('button')
const containerCards = document.getElementById('cards')


// Função para obter as tarefas da API
async function getTarefas() {


        // Verificar a URL certa !!!
        let url = 'http://localhost:5080/tarefas'

        // Função para fazer uma solicitação HTTP GET para url acima
        const responseTarefas = await fetch(url)

        // Convertida em JSON e atribuida a variavel (listTarefas)
        const listTarefas = await responseTarefas.json()

        listTarefas.forEach((tarefa) => {

            // Criando um novo elemento container para as informações da tarefa

            const container = document.createElement('div');
            container.className = 'cards';

            container.innerHTML = `
    
                <h2>${tarefa.descrição}</h2>
                <p>${tarefa.dataConclusão}</p>
                <button class="btn-comentar" id="btn-comentar-${tarefa.id}" onclick="verTarefa(${tarefa.id})">Ver Tarefa</button>
            
                
                
            `

            containerCards.appendChild(container)

        })    

}
function verTarefa (idTarefa){

    localStorage.setItem('idTarefa', idTarefa)
   
    window.location.href = './verTarefa.html';
}


function excluirTarefa (button){
    var li = button.parentNode;
    li.parentNode.removeChild(li)
}


async function addCard() {

    // Recebendo os dados digitados

    const data = document.getElementById('data').value
    const descricao = document.getElementById('titulo').value
    // const comentario = document.getElementById('comentario').value

    // Se as informações estiverem vazias, não iremos criar o card
    if(data === '', descricao === ''){

        // Criando uma caixa de alerta, avisando ao usuário para preencher todas as informações
        alert('Preencha todas as informações')

    } else {

        alert("Tarefa criada!!")

        // Criando um objeto card com os dados inseridos
        const novoCard = {
            dataConclusão: data,
            descrição: descricao
        }
        
        try {
            
            // Verificar a URL certa !!!
            const url = 'http://localhost:5080/tarefas/'
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoCard)
            })

        }
    
        catch (error) {
            console.error(error)
        }
    
        // containerCards.innerHTML = '';
        // await getTarefas();
        // window.onload = () => {
        //     getTarefas()
        //     getComentarios()
        // }

    }

}

// get nas informações 
// criar url para o get e para o post
// post dentro do fetch 

button.addEventListener('click', addCard);

window.onload = () => {
    getTarefas()
    // getComentarios()
}