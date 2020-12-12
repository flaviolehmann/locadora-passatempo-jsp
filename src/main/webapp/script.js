[...document.getElementsByTagName('a')].forEach(elem => elem.addEventListener('click', ev => {
  const innerText = ev.target.innerText;
  
  (innerText === 'ATENDIMENTO CLIENTE' || innerText === 'CONTROLE ACERVO')
    && prompt('Insira a senha de administrador:') !== 'admin' && (() => {
      ev.preventDefault();
    })();
}));