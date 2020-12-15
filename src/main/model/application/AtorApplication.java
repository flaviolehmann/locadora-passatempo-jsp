package main.model.application;

import main.model.domain.Ator;
import main.model.util.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;
import java.util.stream.Collectors;

public class AtorApplication {

    public static Ator salvar(Ator ator) {
        SessionFactory sessions =  HibernateUtil.getSessionFactory();
        Session session = sessions.openSession();

        try {
            Transaction t = session.beginTransaction();
            session.save(ator);
            t.commit();
        }
        catch (Exception he) {
            he.printStackTrace();
        }
        finally {
            session.close();
        }
        return ator;
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

        Transaction t = session.beginTransaction();
        List<Ator> atores = (List<Ator>) session.createQuery("from Ator").stream().distinct().collect(Collectors.toList());
        t.commit();

        session.close();
        return atores;
    }

}
