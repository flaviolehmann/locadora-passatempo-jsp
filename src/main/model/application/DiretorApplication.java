package main.model.application;

import main.model.domain.Ator;
import main.model.domain.Diretor;
import main.model.util.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

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
}
