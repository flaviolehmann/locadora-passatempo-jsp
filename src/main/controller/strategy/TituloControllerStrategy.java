package main.controller.strategy;

import main.controller.ClasseController;
import main.model.application.AtorApplication;
import main.model.application.ClasseApplication;
import main.model.application.DiretorApplication;
import main.model.application.TituloApplication;
import main.model.domain.Ator;
import main.model.domain.Titulo;
import main.model.util.FuncoesUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public enum TituloControllerStrategy {

    INCLUIR {
        @Override
        public void tratarRequest(HttpServletRequest req, HttpServletResponse resp) throws IOException {
            Titulo titulo = getTituloFromReqParams(req);
            TituloApplication.salvar(titulo);
            String successMessage = "Titulo " + titulo.getNome() + " cadastrado com sucesso!";
            resp.sendRedirect("./pages/controleacervo/pages/titulos/index.jsp?msgSucesso=" + successMessage);
        }

        private Titulo getTituloFromReqParams(HttpServletRequest req) {
            Titulo titulo = new Titulo();
            titulo.setNome(req.getParameter("nomeTitulo"));
            titulo.setAno(Long.parseLong(req.getParameter("anoTitulo")));
            titulo.setCategoria(req.getParameter("categoriaTitulo"));
            titulo.setClasse(ClasseApplication.encontrar(Long.parseLong(req.getParameter("idClasseTitulo"))));
            titulo.setDiretor(DiretorApplication.encontrar(Long.parseLong(req.getParameter("idDiretorTitulo"))));
            titulo.setCategoria(req.getParameter("sinopseTitulo"));
            titulo.setAtores(AtorApplication.encontrarVarios(FuncoesUtil.getIdListFromStrArray(req.getParameterValues("idAtoresTitulo"))));

            return titulo;
        }
    },

    EXCLUIR {
        @Override
        public void tratarRequest(HttpServletRequest req, HttpServletResponse resp) throws IOException {
            Long idAtor = Long.parseLong(req.getParameter("idAtor"));
            try {
                AtorApplication.excluir(idAtor);
                String successMessage = "Ator com identificador " + idAtor + " excluido com sucesso!";
                resp.sendRedirect("./pages/controleacervo/pages/atores/index.jsp?msgSucesso=" + successMessage);
            }
            catch (Exception exception) {
                String errorMessage = "Erro ao excluir ator. Verifique o id inserido e tente novamente.";
                resp.sendRedirect("./pages/controleacervo/pages/atores/index.jsp?msgError=" + errorMessage);
            }
        }
    };

    public abstract void tratarRequest(HttpServletRequest req, HttpServletResponse resp) throws IOException;
}
