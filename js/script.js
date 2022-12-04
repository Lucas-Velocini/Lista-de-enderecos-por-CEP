const btnAdicionar = document.getElementById("btnAdicionar");
const edtCEP = document.getElementById("edtCEP");

btnAdicionar.addEventListener('click', () => consultarCEP(edtCEP.value));

let listaEnderecos = [
   /*{id: 1, cep: '11111111', rua: 'rua xxx ', bairro, 'xxxxx', cidade: 'Indaiatuba', estado: 'SP'}*/
];

function consultarCEP(CEP){
    if(isNaN(CEP)){
        alert('Digite apenas números. Exemplo: 00000000');
    }
    else if(CEP.length != 8){
        alert('Digite um CEP válido. Apenas 8 números, sem o -');
    }
    else{
        fetch(`https://viacep.com.br/ws/${CEP}/json/`)
        .then(resposta => resposta.json())
        .then(data => {
            console.table(data);
            addEndereco(data, CEP);
        });
    }
}

let novoId = listaEnderecos.length;
function addEndereco(dadosCEP, CEP){
    novoId++;
    console.log(dadosCEP.bairro);

    if(dadosCEP.erro == true){
        alert('CEP não encontrado!');
    }
    else{
        let novoEndereco = {id: novoId, 
                                cep: CEP, 
                                rua: dadosCEP.logradouro, 
                                bairro: dadosCEP.bairro, 
                                cidade: dadosCEP.localidade, 
                                estado: dadosCEP.uf,
                                num: -1};
        
        listaEnderecos.push(novoEndereco);
        renderizarEnderecos();
    }
}

function renderizarEnderecos(){
    let listaUl = document.getElementById("listaUl");
    listaUl.innerHTML = '';

    listaEnderecos.map(novoEndereco => {
        let li = document.createElement('li');
        li.classList.add('my-3');
        if (novoEndereco.num == -1)
            li.innerHTML = `${novoEndereco.rua} - ${novoEndereco.bairro}, ${novoEndereco.cidade}, ${novoEndereco.estado} - ${novoEndereco.cep} `;
        else
            li.innerHTML = `${novoEndereco.rua}, ${novoEndereco.num} - ${novoEndereco.bairro}, ${novoEndereco.cidade}, ${novoEndereco.estado} - ${novoEndereco.cep} `;
        li.innerHTML += `<button type="button" class="btn btn-info btn-sm me-2" onclick="adicionarNumero(${novoEndereco.id})">Adicionar Nº</button>`;
        li.innerHTML += `<button type="button" class="btn btn-outline-danger btn-sm" onclick="removerEndereco(${novoEndereco.id})">Remover</button>`;
        listaUl.appendChild(li);   
    });
}

function adicionarNumero(id){
    let endereco = listaEnderecos.filter(endereco => endereco.id == id);
    let numero = prompt('Digite o numero: ');

    let novoEndereco = endereco[0];
    novoEndereco['num'] = numero; 
    renderizarEnderecos();
}

function removerEndereco(id){
    listaEnderecos = listaEnderecos.filter(endereco => endereco.id != id);
    renderizarEnderecos();
}

renderizarEnderecos();