package main.controller;

import main.controller.strategy.AtorControllerStrategy;
import main.controller.strategy.ClasseControllerStrategy;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "classes", urlPatterns = { "/classes" })
public class ClasseController extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        ClasseControllerStrategy.valueOf(req.getParameter("operacao").toUpperCase()).tratarRequest(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        doGet(req, resp);
    }
}
