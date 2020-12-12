const LOCAL = 'locacoes';

// LIST
const loadTableFromLocalStorage = () => {
  document.getElementById('tBody').innerHTML = '';
  localStorage.getItem(LOCAL) && (() => {
    [...JSON.parse(localStorage.getItem(LOCAL))].forEach(elem => {
      const item = [...JSON.parse(localStorage.getItem('items'))].find(item => item.id == elem.idItem);
      const cliente = [...JSON.parse(localStorage.getItem('clientes'))].find(cliente => cliente.id == elem.idCliente);

      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <th scope="row"> ${elem.id} </th>
        <td> ${cliente.nome} </td>
        <td> ${item.numSerie} </td>
        <td> ${elem.dataDevolucaoPrevista} </td>
        <td> ${elem.estado} </td>
      `;
      document.getElementById('tBody').appendChild(newRow);
    });
  })();
}
loadTableFromLocalStorage();

// FILL SELECTS
(() => {
  const selectTituloElement = document.getElementById('selectItem');
  selectTituloElement.innerHTML = '<option selected> Escolha... </option>';

  const local = 'items';
  localStorage.getItem(local) && (() => {
    [...JSON.parse(localStorage.getItem(local))].forEach(elem =>
      selectTituloElement.innerHTML += `<option value="${elem.id}"> ${elem.numSerie} </option>`
    );
  })();
})();

(() => {
  const selectTituloElement = document.getElementById('selectCliente');
  selectTituloElement.innerHTML = '<option selected> Escolha... </option>';

  const local = 'clientes';
  localStorage.getItem(local) && (() => {
    [...JSON.parse(localStorage.getItem(local))].forEach(elem =>
      selectTituloElement.innerHTML += `<option value="${elem.id}"> ${elem.nome} </option>`
    );
  })();
})();

const formatDate = date => {
  const dia = `${date.getDate()}`.padStart(2, '0');
  const mes = `${date.getMonth() + 1}`.padStart(2, '0');
  const ano = date.getFullYear();
  return `${ano}-${mes}-${dia}`;
}

// Setando data locação como padrão para hj
document.getElementById('inputDataLocacao').value = formatDate(new Date());

// Setando valor cobrado e prazo previsto de acordo com classe do item
(() => {
  
  document.getElementById('selectItem').addEventListener('change', ev => {
    const titulos = JSON.parse(localStorage.getItem('titulos'));
    const classes = JSON.parse(localStorage.getItem('classes'));
    const item = [...JSON.parse(localStorage.getItem('items'))].find(elem => elem.id == ev.target.value);

    const tituloBuscado = titulos.find(elem => elem.id === item.idTitulo);
    const classeBuscada = classes.find(elem => elem.id === tituloBuscado.idClasse)

    const dataDevolucaoPrevista = new Date().setDate(new Date().getDate() + +classeBuscada.prazoDevolucao);
    document.getElementById('inputDataDevolucaoPrevista').value = formatDate(new Date(dataDevolucaoPrevista));
    document.getElementById('inputValorCobrado').value = classeBuscada.valor;
  })
})();

// FIND
document.getElementById('btnFind').addEventListener('click', ev => {
  
  const elementoEncontrado = [...JSON.parse(localStorage.getItem(LOCAL))].find(elem => elem.id === document.getElementById('inputId').value);

  elementoEncontrado && (() => {
    document.getElementById('selectItem').value = elementoEncontrado.idItem;
    document.getElementById('selectCliente').value = elementoEncontrado.idCliente;
    document.getElementById('inputDataDevolucaoEfetiva').value = formatDate(new Date(elementoEncontrado.dataDevolucaoEfetiva));
    document.getElementById('inputDataDevolucaoPrevista').value = formatDate(new Date(elementoEncontrado.dataDevolucaoPrevista));
    document.getElementById('inputDataLocacao').value = formatDate(new Date(elementoEncontrado.dataLocacao));

    document.getElementById('inputValorCobrado').value = elementoEncontrado.valorCobrado;
    document.getElementById('inputMultaCobrada').value = elementoEncontrado.multaCobrada;
  })();
});

// Locar
document.getElementById('btnLocar').addEventListener('click', ev => {

  // Previnindo atualização da página
  ev.preventDefault();

  // Capturando conteúdo do form
  const formValue = {
    id: document.getElementById('inputId').value,
    dataLocacao: document.getElementById('inputDataLocacao').value,
    dataDevolucaoPrevista: document.getElementById('inputDataDevolucaoPrevista').value,
    dataDevolucaoEfetiva: undefined,
    valorCobrado: document.getElementById('inputValorCobrado').value,
    multaCobrada: 0,
    idItem: document.getElementById('selectItem').value,
    idCliente: document.getElementById('selectCliente').value,
    estado: 'LOCADO'
  };

  // Persistindo no LocalStorage
  localStorage.getItem(LOCAL)
    ? localStorage.setItem(LOCAL, JSON.stringify(
        [...JSON.parse(localStorage.getItem(LOCAL)), formValue]
      ))
    : localStorage.setItem(LOCAL, JSON.stringify([formValue]));
  
  // Atualizando tabela de dados
  loadTableFromLocalStorage();
});

// Devolver
document.getElementById('btnDevolver').addEventListener('click', ev => {

  // Capturando conteúdo do form
  const formValue = {
    id: document.getElementById('inputId').value,
    dataDevolucaoEfetiva: new Date(),
    multaCobrada: document.getElementById('inputMultaCobrada').value,
    estado: 'DEVOLVIDO'
  };

  const locacao = [...JSON.parse(localStorage.getItem('locacoes'))].find(elem => elem.id == formValue.id);

  if (locacao.estado !== 'LOCADO') {
    alert('Você só pode devolver um item que esteja locado.');
    return;
  }

  // Removendo repeticao do localStorage
  localStorage.getItem(LOCAL) &&
    localStorage.setItem(LOCAL, JSON.stringify(
      [...JSON.parse(localStorage.getItem(LOCAL))].filter(elem => elem.id != formValue.id)
    ));

  // Persistindo no LocalStorage
  localStorage.getItem(LOCAL)
  ? localStorage.setItem(LOCAL, JSON.stringify(
      [...JSON.parse(localStorage.getItem(LOCAL)), {...locacao, ...formValue}]
    ))
  : localStorage.setItem(LOCAL, JSON.stringify([formValue]));

  // Atualizando tabela de dados
  loadTableFromLocalStorage();
});

// Cancelar
document.getElementById('btnCancelar').addEventListener('click', ev => {
  
  const id = document.getElementById('inputId').value;
  const locacao = [...JSON.parse(localStorage.getItem(LOCAL))].find(elem => elem.id == id);

  if (locacao.estado !== 'LOCADO') {
    alert('Você só pode cancelar um item que esteja locado.');
    return;
  }

  // Removendo repeticao do localStorage
  localStorage.getItem(LOCAL) &&
    localStorage.setItem(LOCAL, JSON.stringify(
      [...JSON.parse(localStorage.getItem(LOCAL))].filter(elem => elem.id != id)
    ));

  // Persistindo no LocalStorage
  localStorage.getItem(LOCAL) && (() => {
    localStorage.setItem(LOCAL, JSON.stringify(
      [...JSON.parse(localStorage.getItem(LOCAL)), {...locacao, estado: 'CANCELADO'}]
    ));
  })();

  // Atualizando tabela de dados
  loadTableFromLocalStorage();
});