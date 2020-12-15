package main.model.application;

import main.model.domain.Ator;
import main.model.domain.Diretor;
import main.model.util.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;
import java.util.stream.Collectors;

public class DiretorApplication {

    public static Diretor salvar(Diretor diretor) {
        SessionFactory sessions =  HibernateUtil.getSessionFactory();
        Session session = sessions.openSession();

        try {
            Transaction t = session.beginTransaction();
            session.save(diretor);
            t.commit();
        }
        catch (Exception he) {
            he.printStackTrace();
        }
        finally {
            session.close();
        }
        return diretor;
    }

    public static List<Diretor> listar() {
        SessionFactory sessions =  HibernateUtil.getSessionFactory();
        Session session = sessions.openSession();
        List<Diretor> diretores = (List<Diretor>) session.createQuery("from Diretor").stream().distinct().collect(Collectors.toList());
        session.close();
        return diretores;
    }
}
