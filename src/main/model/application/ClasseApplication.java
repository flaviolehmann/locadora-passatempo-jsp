package main.model.application;

import main.model.domain.Ator;
import main.model.domain.Classe;
import main.model.util.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;
import java.util.stream.Collectors;

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

    public static List<Classe> listar() {
        SessionFactory sessions =  HibernateUtil.getSessionFactory();
        Session session = sessions.openSession();
        List<Classe> classes = (List<Classe>) session.createQuery("from Classe")
                .stream().distinct().collect(Collectors.toList());
        session.close();
        return classes;
    }

    public static Classe encontrar(Long id) {
        SessionFactory sessions =  HibernateUtil.getSessionFactory();
        Session session = sessions.openSession();
        List<Classe> classes = (List<Classe>) session.createQuery("from Classe where id = " + id)
                .stream().distinct().collect(Collectors.toList());
        session.close();
        return classes.stream().findFirst().orElse(null);
    }
}
