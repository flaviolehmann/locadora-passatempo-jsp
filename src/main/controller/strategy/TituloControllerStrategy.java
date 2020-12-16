package main.controller.strategy;

import main.model.application.AtorApplication;
import main.model.application.ClasseApplication;
import main.model.application.DiretorApplication;
import main.model.application.TituloApplication;
import main.model.domain.Titulo;
import main.model.util.FuncoesUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public enum TituloControllerStrategy {

    INCLUIR {
        @Override
        public void tratarRequest(HttpServletRequest req, HttpServletResponse resp) throws IOException {
            Titulo titulo = getTituloFromReqParams(req);
            TituloApplication.salvar(titulo);
            String successMessage = "Titulo " + titulo.getNome() + " salvo com sucesso!";
            resp.sendRedirect("./pages/controleacervo/pages/titulos/index.jsp?msgSucesso=" + successMessage);
        }

        private Titulo getTituloFromReqParams(HttpServletRequest req) {
            Titulo titulo = new Titulo();
            titulo.setId(FuncoesUtil.getLongFromRequestParam(req, "idTitulo"));
            titulo.setNome(req.getParameter("nomeTitulo"));
            titulo.setAno(FuncoesUtil.getLongFromRequestParam(req, "anoTitulo"));
            titulo.setCategoria(req.getParameter("categoriaTitulo"));
            titulo.setClasse(ClasseApplication.encontrar(FuncoesUtil.getLongFromRequestParam(req, "idClasseTitulo")));
            titulo.setDiretor(DiretorApplication.encontrar(FuncoesUtil.getLongFromRequestParam(req, "idDiretorTitulo")));
            titulo.setSinopse(req.getParameter("sinopseTitulo"));
            titulo.setAtores(AtorApplication.encontrarVarios(FuncoesUtil.getIdListFromStrArray(req.getParameterValues("idAtoresTitulo"))));

            return titulo;
        }
    },

    EXCLUIR {
        @Override
        public void tratarRequest(HttpServletRequest req, HttpServletResponse resp) throws IOException {
            Long idTitulo = FuncoesUtil.getLongFromRequestParam(req, "idTitulo");
            try {
                TituloApplication.excluir(idTitulo);
                String successMessage = "Titulo com identificador " + idTitulo + " excluido com sucesso!";
                resp.sendRedirect("./pages/controleacervo/pages/titulos/index.jsp?msgSucesso=" + successMessage);
            }
            catch (Exception exception) {
                String errorMessage = "Erro ao excluir titulo. Verifique o id inserido e tente novamente.";
                resp.sendRedirect("./pages/controleacervo/pages/titulos/index.jsp?msgError=" + errorMessage);
            }
        }
    };

    public abstract void tratarRequest(HttpServletRequest req, HttpServletResponse resp) throws IOException;
}
