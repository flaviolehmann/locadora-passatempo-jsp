<%@ page import="main.model.domain.Diretor" %>
<%@ page import="main.model.application.DiretorApplication" %>
<%@ page import="main.model.domain.Classe" %>
<%@ page import="main.model.application.ClasseApplication" %>
<%@ page import="main.model.application.AtorApplication" %>
<%@ page import="main.model.domain.Ator" %>
<%@ page import="main.model.domain.Titulo" %>
<%@ page import="main.model.application.TituloApplication" %>
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

  
  <title> LP - Títulos </title>
</head>
<body>

  <header class="shadow-sm">
    <div class="titles">
      <h3> <a href="../../../../index.jsp"> PÁGINA INICIAL </a> </h3>
      <h3> <a href="../atores/index.jsp"> ATORES </a> </h3>
      <h3> <a href="../classes/index.jsp"> CLASSES </a> </h3>
      <h3> <a href="../diretores/index.jsp"> DIRETORES </a> </h3>
      <h3> <a href="../items/index.html"> ITEMS </a> </h3>
      <h3> <a href="../titulos/index.jsp"> TITULOS </a> </h3>
    </div>
    <hr>
  </header>

  <div class="container">
    <h3> Títulos </h3>
    <%
      Titulo tituloBanco = null;
      String idTitulo = request.getParameter("idTitulo");
      if (idTitulo != null) {
        tituloBanco = TituloApplication.encontrar(Long.parseLong(idTitulo));
      }

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
    <form method="get" action="../../../../titulos">
      <input type="hidden" name="operacao" value="incluir">

      <div class="container">
        <div class="row">
          <div class="col">
            <div class="input-group mb-3">
              <input
                id="inputId"
                name="idTitulo"
                disabled
                value="<%= tituloBanco != null ? tituloBanco.getId() : "" %>"
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
                value="<%= tituloBanco != null ? tituloBanco.getNome() : "" %>"
                name="nomeTitulo"
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
              <input
                id="inputAno"
                name="anoTitulo"
                value="<%= tituloBanco != null ? tituloBanco.getAno() : "" %>"
                class="form-control"
                placeholder="Ano"
                aria-label="Ano"
                type="number"
              >
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <input
                id="inputCategoria"
                name="categoriaTitulo"
                value="<%= tituloBanco != null ? tituloBanco.getCategoria() : "" %>"
                class="form-control"
                placeholder="Categoria"
                aria-label="Categoria"
              >
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="idDiretorTitulo"> Diretor </label>
              </div>
              <select class="custom-select" name="idDiretorTitulo" id="idDiretorTitulo">
                <%
                  for (Diretor diretor : DiretorApplication.listar()) {
                    if (diretor != null) {
                      boolean isEqual = false;
                      if (tituloBanco != null) {
                        isEqual = diretor.getId().equals(tituloBanco.getDiretor().getId());
                      }
                      out.print("<option " + (isEqual ? "selected" : "") + " value=\"" + diretor.getId() + "\">" + diretor.getNome() + "</option>");
                    }
                  }
                %>
              </select>
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="idClasseTitulo"> Classe </label>
              </div>
              <select class="custom-select" name="idClasseTitulo" id="idClasseTitulo">
                <%
                  for (Classe classe : ClasseApplication.listar()) {
                    if (classe != null) {
                      boolean isEqual = false;
                      if (tituloBanco != null) {
                        isEqual = classe.getId().equals(tituloBanco.getClasse().getId());
                      }
                      out.print("<option " + (isEqual ? "selected" : "") + " value=\"" + classe.getId() + "\">" + classe.getNome() + "</option>");
                    }
                  }
                %>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="input-group mb-3">
              <textarea
                id="inputSinopse"
                class="form-control"
                name="sinopseTitulo"
                aria-label="Sinopse"
                placeholder="Sinopse"
              ><%= tituloBanco != null ? tituloBanco.getSinopse() : "" %></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-7">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="selectAtores"> Atores </label>
              </div>
              <select
                id="selectAtores"
                name="idAtoresTitulo"
                class="custom-select"
                multiple
              >
                <%
                  for (Ator ator : AtorApplication.listar()) {
                    if (ator != null) {
                      boolean isEqual = false;
                      if (tituloBanco != null) {
                        for (Ator atorDoTitulo : tituloBanco.getAtores()) {
                          if (ator.getId().equals(atorDoTitulo.getId())) {
                            isEqual = true;
                            break;
                          }
                        }
                      }
                      out.print("<option " + (isEqual ? "selected" : "") + " value=\"" + ator.getId() + "\">" + ator.getNome() + "</option>");
                    }
                  }
                %>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="container d-flex justify-content-between mt-4">
        <div></div>
        <div class="d-flex justify-content-end">
          <button
            class="btn btn-secondary"
            type="reset"
          >
            CANCELAR
          </button>
          <button
            id="btnSalvar"
            class="btn btn-primary"
            style="margin-left: 12px;"
          >
            SALVAR
          </button>
        </div>
      </div>
    </form>
    <hr>
    <div class="container">
      <form method="get" action="." class="justify-content-end d-flex">
        <input type="hidden" name="operacao" value="encontrar">
        <div class="input-group mb-3" style="max-width: 300px">
          <input type="number" name="idTitulo" required class="form-control"
                 placeholder="001" value="<%= tituloBanco != null ? tituloBanco.getId() : "" %>">
          <button type="submit" class="btn btn-warning"> ENCONTRAR </button>
        </div>
      </form>
    </div>
    <hr/>

    <div class="container">
      <form method="get" action="../../../../titulos" class="justify-content-end d-flex">
        <input type="hidden" name="operacao" value="excluir">
        <div class="input-group mb-3" style="max-width: 300px">
          <input type="number" name="idTitulo" required class="form-control" placeholder="001">
          <button type="submit" class="btn btn-danger"> EXCLUIR </button>
        </div>
      </form>
    </div>
    <hr/>
    
    <div class="container mt-4">
      <table class="table table-bordered table-hover ">
        <thead class="thead-dark">
          <tr>
            <th scope="col"> # </th>
            <th scope="col"> Nome </th>
            <th scope="col"> Ano </th>
            <th scope="col"> Categoria </th>
          </tr>
        </thead>
        <tbody>
          <%
            for (Titulo titulo : TituloApplication.listar()) {
              if (titulo != null) {
                out.print("<tr scope=\"row\">");
                out.print("<th>" + titulo.getId() + "</th>");
                out.print("<td>" + titulo.getNome() + "</td>");
                out.print("<td>" + titulo.getAno() + "</td>");
                out.print("<td>" + titulo.getCategoria() + "</td>");
                out.print("</tr>");
              }
            }
          %>
        </tbody>
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