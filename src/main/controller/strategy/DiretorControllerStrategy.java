package main.controller.strategy;

import main.model.application.DiretorApplication;
import main.model.domain.Diretor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public enum DiretorControllerStrategy {

    INCLUIR {
        @Override
        public void tratarRequest(HttpServletRequest req, HttpServletResponse resp) throws  IOException {
            Diretor diretor = new Diretor(null, req.getParameter("nome"));
            DiretorApplication.salvar(diretor);
            String successMessage = "Diretor " + diretor.getNome() + " cadastrado com sucesso!";
            resp.sendRedirect("./pages/controleacervo/pages/diretores/index.jsp?msgSucesso=" + successMessage);
        }
    };

    public abstract void tratarRequest(HttpServletRequest req, HttpServletResponse resp) throws IOException;
}
