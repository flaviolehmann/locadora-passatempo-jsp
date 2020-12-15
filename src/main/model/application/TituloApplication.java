package main.model.application;

import main.model.domain.Ator;
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
            session.save(titulo);
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

    public static void excluir(Long idAtor) {
        SessionFactory sessions =  HibernateUtil.getSessionFactory();
        Session session = sessions.openSession();

        Transaction t = session.beginTransaction();
        Ator ator = session.get(Ator.class, idAtor);
        session.delete(ator);
        t.commit();

        session.close();
    }

    public static List<Ator> listar() {
        SessionFactory sessions =  HibernateUtil.getSessionFactory();
        Session session = sessions.openSession();
        List<Ator> atores = (List<Ator>) session.createQuery("from Ator").stream().distinct().collect(Collectors.toList());
        session.close();
        return atores;
    }

}
