'use strict'

document.getElementById('mostrarCard').addEventListener('click', function () {
    document.getElementById('card').style.display = 'flex';
});

document.getElementById('fechar-card').addEventListener('click', function () {
    document.getElementById('card').style.display = 'none';
});

const button = document.getElementById('button')
const containerCards = document.getElementById('cards')



// Array de tarefas para teste (o array certo virá da api)
let tarefas = [

    // JSON com uma tarefa
    {
        titulo: 'Teste',
        descricao: 'Tarefa teste',

        // Formato de data certo  'ano-mes-dia' 
        dataConclusao: '2024-02-15'
    }

]

// Função para obter as tarefas da API
async function getTarefas() {

    try {

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
                <h2>${tarefa.titulo}</h2>
                <span>${tarefa.descrição}</span>
                <p>${tarefa.dataConclusão}</p>
                <input type="checkbox" id="checkbox-${tarefa.id}">
    <label for="checkbox-${tarefa.id}">Concluído</label>
                
            `

            containerCards.appendChild(container)

        })    

    } catch (error) {
        
    }
    
}

async function addCard() {

    // Recebendo os dados digitados
    const titulo = document.getElementById('titulo').value
    const data = document.getElementById('data').value
    const descricao = document.getElementById('desc').value

    // Se as informações estiverem vazias, não iremos criar o card
    if(titulo == '' || data == '', descricao == ''){

        // Criando uma caixa de alerta, avisando ao usuário para preencher todas as informações
        alert('Preencha todas as informações')

    } else {

        // Criando um objeto card com os dados inseridos
        const novoCard = {
            titulo: titulo,
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
    
        containerCards.innerHTML = '';
        await getTarefas();
        window.onload = () => {
            getTarefas()
        }

    }

}

// get nas informações 
// criar url para o get e para o post
// post dentro do fetch 

button.addEventListener('click', addCard);

window.onload = () => {
    getTarefas()
}