const LOCAL = 'clientes';

// LIST
const loadTableFromLocalStorage = () => {
  document.getElementById('tBody').innerHTML = '';
  localStorage.getItem(LOCAL) &&
    [...JSON.parse(localStorage.getItem(LOCAL))].forEach(elem => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <th scope="row"> ${elem.id} </th>
      <td> ${elem.nome} </td>
      <td> ${elem.sexo === 'M' ? 'Masculino' : 'Feminino'} </td>
      <td> ${Math.floor(Math.ceil(Math.abs(new Date(elem.dtNascimento).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) / 365.25)} </td>
      <td> ${elem.isSocio ? 'Sócio' : 'Dependente'} </td>
      <td> ${elem.ativo ? 'ATIVO' : 'INATIVO'} </td>
    `;
    document.getElementById('tBody').appendChild(newRow);
  });
}
loadTableFromLocalStorage();

// FILL SELECTS
(() => {
  const selectTituloElement = document.getElementById('selectDependentes');
  selectTituloElement.innerHTML = '<option selected> Escolha... </option>';

  const local = 'clientes';
  localStorage.getItem(local) && (() => {
    [...JSON.parse(localStorage.getItem(local))]
    .filter(elem => elem.ativo && !elem.isSocio)
    .forEach(elem =>
      selectTituloElement.innerHTML += `<option value="${elem.id}"> ${elem.nome} </option>`
    );
  })();
})();

// FIND
document.getElementById('btnFind').addEventListener('click', ev => {
  
  const elementoEncontrado = [...JSON.parse(localStorage.getItem(LOCAL))].find(elem => elem.id === document.getElementById('inputId').value);

  elementoEncontrado && (() => {
    document.getElementById('inputNome').value = elementoEncontrado.nome;
    document.getElementById('checkSocio').checked = elementoEncontrado.isSocio;
    document.getElementById('inputDataNascimento').value = elementoEncontrado.dtNascimento;
    document.getElementById('selectSexo').value = elementoEncontrado.sexo;
    document.getElementById('inputCPF').value = elementoEncontrado.cpf || '';
    document.getElementById('inputTelefone').value = elementoEncontrado.telefone || '';
    document.getElementById('inputEndereco').value = elementoEncontrado.endereco || '';
    [...document.getElementById('selectDependentes').children].forEach(opt =>
      opt.selected = [...elementoEncontrado.idDependentes].some(elem => elem === opt.value)
    );
  })();
});

// CREATE and UPDATE
document.getElementById('btnSalvar').addEventListener('click', ev => {

  // Previnindo atualização da página
  ev.preventDefault();

  const isSocio = document.getElementById('checkSocio').checked;

  // Capturando conteúdo do form
  const formValue = {
    id: document.getElementById('inputId').value,
    nome: document.getElementById('inputNome').value,
    isSocio,
    dtNascimento: document.getElementById('inputDataNascimento').value,
    sexo: document.getElementById('selectSexo').value,
    cpf: isSocio ? document.getElementById('inputCPF').value : undefined,
    telefone: isSocio ? document.getElementById('inputTelefone').value : undefined,
    endereco: isSocio ? document.getElementById('inputEndereco').value : undefined,
    ativo: true,
    idDependentes: [...document.getElementById('selectDependentes').children]
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
