let filtroClasse = '';
let filtroAtores = '';

const atualizarListaDeTitulos = () => {
  const selectTituloElement = document.getElementById('selectNome');
  selectTituloElement.innerHTML = '<option selected> Escolha... </option>';
  
  const local = 'titulos';
  localStorage.getItem(local) && (() => {
    [...JSON.parse(localStorage.getItem(local))]
      .filter(elem => {
        if (filtroClasse.length === 0) return true;
        return elem.idClasse === filtroClasse;
      })
      .forEach(elem =>
        selectTituloElement.innerHTML += `<option value="${elem.id}"> ${elem.nome} </option>`
      );
  })();
};
atualizarListaDeTitulos();

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
  const selectTituloElement = document.getElementById('selectAtor');
  selectTituloElement.innerHTML = '<option selected> Escolha... </option>';
  
  const local = 'atores';
  localStorage.getItem(local) && (() => {
    [...JSON.parse(localStorage.getItem(local))].forEach(elem =>
      selectTituloElement.innerHTML += `<option value="${elem.id}"> ${elem.nome} </option>`
    );
  })();
})();

document.getElementById('selectClasse').onchange = ev => {
  filtroClasse = ev.target.value;
  atualizarListaDeTitulos();
}

document.getElementById('selectNome').onchange = ev => {
  const titulo = [...JSON.parse(localStorage.getItem('titulos'))].find(elem => elem.id === ev.target.value);
  alert(`
    Titulo Selecionado:
    Id:             ...${titulo.id}
    Nome:       ...${titulo.nome}
    Ano:          ...${titulo.ano}
    Categoria:  ...${titulo.categoria}

    Sinopse:
    ${titulo.sinopse}
  `);
}
