package main.model.application;

import main.model.domain.Classe;
import main.model.util.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

public class ClasseApplication {

    public static Classe salvar(Classe classe) {
        SessionFactory sessions =  HibernateUtil.getSessionFactory();
        Session session = sessions.openSession();

        Transaction t = session.beginTransaction();
        session.save(classe);
        t.commit();
        session.close();

        return classe;
    }
}
