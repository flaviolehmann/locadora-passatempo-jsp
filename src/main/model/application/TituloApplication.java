package main.model.application;

import main.model.domain.Titulo;
import main.model.util.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;
import java.util.stream.Collectors;

public class TituloApplication {

    public static Titulo salvar(Titulo titulo) {
        Session session = HibernateUtil.getSessionFactory().openSession();

        try {
            Transaction t = session.beginTransaction();

            Titulo tituloNoBanco = encontrar(titulo.getId());
            if (tituloNoBanco != null) {
                tituloNoBanco.setSinopse(titulo.getSinopse());
                tituloNoBanco.setDiretor(titulo.getDiretor());
                tituloNoBanco.setNome(titulo.getNome());
                tituloNoBanco.setAno(titulo.getAno());
                tituloNoBanco.setClasse(titulo.getClasse());
                tituloNoBanco.setCategoria(titulo.getCategoria());
                tituloNoBanco.setAtores(titulo.getAtores());
                session.merge(tituloNoBanco);
            }
            else {
                session.save(titulo);
            }
            t.commit();
        }
        catch (Exception he) {
            he.printStackTrace();
        }
        finally {
            session.close();
        }
        return titulo;
    }

    public static void excluir(Long idTitulo) {
        SessionFactory sessions =  HibernateUtil.getSessionFactory();
        Session session = sessions.openSession();

        Transaction t = session.beginTransaction();
        Titulo titulo = session.get(Titulo.class, idTitulo);
        titulo.getAtores().clear();
        session.save(titulo);
        session.delete(titulo);
        t.commit();

        session.close();
    }

    public static List<Titulo> listar() {
        SessionFactory sessions =  HibernateUtil.getSessionFactory();
        Session session = sessions.openSession();
        List<Titulo> titulos = (List<Titulo>) session.createQuery("from Titulo").stream().distinct().collect(Collectors.toList());
        session.close();
        return titulos;
    }

    public static Titulo encontrar(Long idTitulo) {
        SessionFactory sessions =  HibernateUtil.getSessionFactory();
        Session session = sessions.openSession();
        List<Titulo> titulos = (List<Titulo>) session.createQuery("from Titulo where id = " + idTitulo).stream().distinct().collect(Collectors.toList());
        session.close();
        return titulos.stream().findAny().orElse(null);
    }

}
