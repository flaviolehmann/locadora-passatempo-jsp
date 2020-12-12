const LOCAL = 'diretores';

// LIST
const loadTableFromLocalStorage = () => {
  document.getElementById('tBody').innerHTML = '';
  localStorage.getItem(LOCAL) &&
    [...JSON.parse(localStorage.getItem(LOCAL))].forEach(elem => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `<th scope="row"> ${elem.id} </th><td> ${elem.nome} </td>`
    document.getElementById('tBody').appendChild(newRow);
  });
}
loadTableFromLocalStorage();

// FIND
document.getElementById('btnFind').addEventListener('click', ev => {
  
  const elementoEncontrado = [...JSON.parse(localStorage.getItem(LOCAL))].find(elem => elem.id === document.getElementById('inputId').value);

  elementoEncontrado && (() => {
    document.getElementById('inputNome').value = elementoEncontrado.nome;
  })();
})

// CREATE and UPDATE
document.getElementById('btnSalvar').addEventListener('click', ev => {

  // Previnindo atualização da página
  ev.preventDefault();

  // Capturando conteúdo do form
  const formValue = {
    id: document.getElementById('inputId').value,
    nome: document.getElementById('inputNome').value
  };

  // Atualizando o item no LocalStorage caso o form tenha ID.
  localStorage.getItem(LOCAL) &&
    localStorage.setItem(LOCAL, JSON.stringify(
      [...JSON.parse(localStorage.getItem(LOCAL))].filter(elem => elem.id != formValue.id)
    ));

  // Persistindo no LocalStorage
  localStorage.getItem(LOCAL)
    ? localStorage.setItem(LOCAL, JSON.stringify(
        [...JSON.parse(localStorage.getItem(LOCAL)), formValue]
      ))
    : localStorage.setItem(LOCAL, JSON.stringify([formValue]));
  
  // Atualizando tabela de dados
  loadTableFromLocalStorage();
});

// DELETE
document.getElementById('btnExcluir').addEventListener('click', () => {

  // Removendo do registro
  localStorage.getItem(LOCAL) &&
    localStorage.setItem(LOCAL, JSON.stringify(
      [...JSON.parse(localStorage.getItem(LOCAL))].filter(elem => elem.id != document.getElementById('inputId').value)
    ));

  // Apagando registro caso o array fique vazio
  (localStorage.getItem(LOCAL) && [...JSON.parse(localStorage.getItem(LOCAL))].length === 0) &&
    localStorage.removeItem(LOCAL);

  // Atualizando tabela de dados
  loadTableFromLocalStorage();
})