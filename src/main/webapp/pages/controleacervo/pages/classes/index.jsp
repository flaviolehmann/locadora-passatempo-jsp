<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="shortcut icon" href="../../../../assets/video-camera.svg" type="image/x-icon">
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
    crossorigin="anonymous"
  >
  <link rel="stylesheet" href="../../../../styles.css">
  <link rel="stylesheet" href="styles.css">

  
  <title> LP - Classes </title>
</head>
<body>

  <header class="shadow-sm">
    <div class="titles">
      <h3> <a href="../../../../index.jsp"> PÁGINA INICIAL </a> </h3>
      <h3> <a href="../atores/index.jsp"> ATORES </a> </h3>
      <h3> <a href="../classes/index.jsp"> CLASSES </a> </h3>
      <h3> <a href="../diretores/index.jsp"> DIRETORES </a> </h3>
      <h3> <a href="../items/index.html"> ITEMS </a> </h3>
      <h3> <a href="../titulos/index.html"> TITULOS </a> </h3>
    </div>
    <hr>
  </header>

  <div class="container">
    <h3> Classes </h3>
    <%
      String mensagemDeSucesso = request.getParameter("msgSucesso");
      if (mensagemDeSucesso != null) {
        out.print("<div class=\"alert alert-success\" role=\"alert\">" + mensagemDeSucesso + "</div>");
      }

      String mensagemDeError = request.getParameter("msgError");
      if (mensagemDeError != null) {
        out.print("<div class=\"alert alert-danger\" role=\"alert\">" + mensagemDeError + "</div>");
      }
    %>
    <hr>
    <form method="get" action="../../../../classes">
      <input type="hidden" name="operacao" value="incluir">

      <div class="container">
        <div class="row">
          <div class="col">
            <div class="input-group mb-3">
              <input
                id="inputId"
                type="text"
                class="form-control"
                placeholder="Id"
                aria-label="Id"
              >
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <input
                id="inputNome"
                name="nome"
                type="text"
                class="form-control"
                placeholder="Nome"
                aria-label="Nome"
              >
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">R$</span>
              </div>
              <input
                id="inputValor"
                type="number"
                name="valor"
                class="form-control"
                placeholder="Valor"
                aria-label="
                Valor"
              >
              <div class="input-group-append">
                <span class="input-group-text">.00</span>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <input
                id="inputPrazo"
                type="number"
                name="dias"
                class="form-control"
                placeholder="Prazo Devolução"
                aria-label="Prazo Devolucao"
              >
              <div class="input-group-append">
                <span class="input-group-text">dia(s)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container d-flex justify-content-between mt-4">
        <div>
          <button
            id="btnExcluir"
            class="btn btn-danger"
            type="button"
          >
            EXCLUIR
          </button>
          <button
            id="btnFind"
            class="btn btn-warning"
            type="button"
          >
            ENCONTRAR
          </button>
        </div>
        <div class="d-flex justify-content-end">
          <button
            class="btn btn-secondary"
            type="reset"
          >
            CANCELAR
          </button>
          <input type="submit" value="OK" class="btn btn-primary" style="margin-left: 12px;">
        </div>
      </div>
    </form>
    <hr>
    
    <div class="container mt-4">
      <table class="table table-bordered table-hover ">
        <thead class="thead-dark">
          <tr>
            <th scope="col"> # </th>
            <th scope="col"> Nome </th>
            <th scope="col"> Valor </th>
            <th scope="col"> Prazo Devolução </th>
          </tr>
        </thead>
        <tbody id="tBody"></tbody>
      </table>
    </div>
  </div>
  
  <script
    src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
    integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
    crossorigin="anonymous"
  ></script>
  <script
    src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
    crossorigin="anonymous"
  ></script>
  <script
    src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
    integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
    crossorigin="anonymous"
  ></script>
  <script src="scripts.js"></script>
</body>
</html>