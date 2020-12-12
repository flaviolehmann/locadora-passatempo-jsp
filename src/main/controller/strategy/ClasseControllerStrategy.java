package main.controller.strategy;

import main.model.application.ClasseApplication;
import main.model.domain.Classe;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public enum ClasseControllerStrategy {

    INCLUIR {
        @Override
        public void tratarRequest(HttpServletRequest req, HttpServletResponse resp) throws IOException {
            try {
                Classe classe = new Classe(null, req.getParameter("nome"),
                        Long.parseLong(req.getParameter("valor")), Long.parseLong(req.getParameter("dias")));
                ClasseApplication.salvar(classe);
                String successMessage = "Classe " + classe.getNome() + " cadastrada com sucesso!";
                resp.sendRedirect("./pages/controleacervo/pages/classes/index.jsp?msgSucesso=" + successMessage);
            }
            catch (Exception exception) {
                String errorMessage = "Erro ao inserir classe. Verifique os dados inseridos e tente novamente.";
                resp.sendRedirect("./pages/controleacervo/pages/classes/index.jsp?msgError=" + errorMessage);
            }
        }
    };

    public abstract void tratarRequest(HttpServletRequest req, HttpServletResponse resp) throws IOException;
}
