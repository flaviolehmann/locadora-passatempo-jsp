package main.controller.strategy;

import main.model.application.AtorApplication;
import main.model.domain.Ator;
import main.model.util.FuncoesUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public enum AtorControllerStrategy {

    INCLUIR {
        @Override
        public void tratarRequest(HttpServletRequest req, HttpServletResponse resp) throws IOException {
            Ator ator = new Ator(null, req.getParameter("nomeAtor"));
            AtorApplication.salvar(ator);
            String successMessage = "Ator " + ator.getNome() + " cadastrado com sucesso!";
            resp.sendRedirect("./pages/controleacervo/pages/atores/index.jsp?msgSucesso=" + successMessage);
        }
    },

    EXCLUIR {
        @Override
        public void tratarRequest(HttpServletRequest req, HttpServletResponse resp) throws IOException {
            Long idAtor = FuncoesUtil.getLongFromRequestParam(req, "idAtor");
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
