const LOCAL = 'titulos';

// LIST
const loadTableFromLocalStorage = () => {
  document.getElementById('tBody').innerHTML = '';
  localStorage.getItem(LOCAL) &&
    [...JSON.parse(localStorage.getItem(LOCAL))].forEach(elem => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <th scope="row"> ${elem.id} </th>
      <td> ${elem.nome} </td>
      <td> ${elem.ano} </td>
      <td> ${elem.categoria} </td>
    `;
    document.getElementById('tBody').appendChild(newRow);
  });
}
loadTableFromLocalStorage();

// FILL SELECTS
(() => {
  const selectTituloElement = document.getElementById('selectDiretor');
  selectTituloElement.innerHTML = '<option selected> Escolha... </option>';

  const local = 'diretores';
  localStorage.getItem(local) && (() => {
    [...JSON.parse(localStorage.getItem(local))].forEach(elem =>
      selectTituloElement.innerHTML += `<option value="${elem.id}"> ${elem.nome} </option>`
    );
  })();
})();

(() => {
  const selectTituloElement = document.getElementById('selectClasse');
  selectTituloElement.innerHTML = '<option selected> Escolha... </option>';

  const local = 'classes';
  localStorage.getItem(local) && (() => {
    [...JSON.parse(localStorage.getItem(local))].forEach(elem =>
      selectTituloElement.innerHTML += `<option value="${elem.id}"> ${elem.nome} </option>`
    );
  })();
})();

(() => {
  const selectTituloElement = document.getElementById('selectAtores');
  selectTituloElement.innerHTML = '<option selected> Escolha... </option>';

  const local = 'atores';
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
    document.getElementById('inputNome').value = elementoEncontrado.nome;
    document.getElementById('inputAno').value = elementoEncontrado.ano;
    document.getElementById('inputCategoria').value = elementoEncontrado.categoria;
    document.getElementById('inputSinopse').value = elementoEncontrado.sinopse;
    document.getElementById('selectClasse').value = elementoEncontrado.idClasse;
    document.getElementById('selectDiretor').value = elementoEncontrado.idDiretor;
    [...document.getElementById('selectAtores').children].forEach(opt =>
      opt.selected = [...elementoEncontrado.idAtores].some(elem => elem === opt.value)
    );
  })();
})

// CREATE and UPDATE
document.getElementById('btnSalvar').addEventListener('click', ev => {

  // Previnindo atualização da página
  ev.preventDefault();

  // Capturando conteúdo do form
  const formValue = {
    id: document.getElementById('inputId').value,
    nome: document.getElementById('inputNome').value,
    ano: document.getElementById('inputAno').value,
    categoria: document.getElementById('inputCategoria').value,
    sinopse: document.getElementById('inputSinopse').value,
    idClasse: document.getElementById('selectClasse').value,
    idDiretor: document.getElementById('selectDiretor').value,
    idAtores: [...document.getElementById('selectAtores').children]
      .filter(elem => elem.selected)
      .map(elem => elem.value)
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
