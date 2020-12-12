const LOCAL = 'items';

// LIST
const loadTableFromLocalStorage = () => {
  document.getElementById('tBody').innerHTML = '';
  localStorage.getItem(LOCAL) &&
    [...JSON.parse(localStorage.getItem(LOCAL))].forEach(elem => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <th scope="row"> ${elem.id} </th>
      <td> ${elem.numSerie} </td>
      <td> ${elem.dtAquisicao} </td>
      <td> ${elem.tipoItem} </td>
    `;
    document.getElementById('tBody').appendChild(newRow);
  });
}
loadTableFromLocalStorage();

// FILL SELECTS
(() => {
  const selectTituloElement = document.getElementById('selectTitulo');
  selectTituloElement.innerHTML = '<option selected> Escolha... </option>';

  const local = 'titulos';
  localStorage.getItem(local) && (() => {
    [...JSON.parse(localStorage.getItem(local))].forEach(elem =>
      selectTituloElement.innerHTML += `<option value="${elem.id}"> ${elem.nome} </option>`
    );
  })();
})();

// FIND
document.getElementById('btnFind').addEventListener('click', ev => {

  const elementoEncontrado = [...JSON.parse(localStorage.getItem(LOCAL))].find(elem => elem.id === document.getElementById('inputId').value);

  elementoEncontrado && (() => {
    document.getElementById('inputNumSerie').value = elementoEncontrado.numSerie;
    document.getElementById('inputDtAquisicao').value = elementoEncontrado.dtAquisicao;
    document.getElementById('inputTipoItem').value = elementoEncontrado.tipoItem;
    document.getElementById('selectTitulo').value = elementoEncontrado.idTitulo;
  })();
})

// CREATE and UPDATE
document.getElementById('btnSalvar').addEventListener('click', ev => {

  // Previnindo atualização da página
  ev.preventDefault();

  // Capturando conteúdo do form
  const formValue = {
    id: document.getElementById('inputId').value,
    numSerie: document.getElementById('inputNumSerie').value,
    dtAquisicao: document.getElementById('inputDtAquisicao').value,
    tipoItem: document.getElementById('inputTipoItem').value,
    idTitulo: document.getElementById('selectTitulo').value
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

  // Removendo do registroa
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
