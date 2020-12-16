package main.model.util;

import main.model.domain.Ator;
import main.model.domain.Classe;
import main.model.domain.Diretor;
import main.model.domain.Titulo;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.AvailableSettings;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;

import java.util.Properties;

public class HibernateUtil {

    private static SessionFactory sessionFactory;

    public static SessionFactory getSessionFactory() {
        if (sessionFactory == null) {
            try {
                Configuration configuration = new Configuration();

                Properties settings = new Properties();
                settings.put(AvailableSettings.DRIVER, "com.mysql.cj.jdbc.Driver");
                settings.put(AvailableSettings.URL, "jdbc:mysql://localhost:3306/banco?useSSL=false&allowPublicKeyRetrieval=true");
                settings.put(AvailableSettings.USER, "root");
                settings.put(AvailableSettings.PASS, "root");
                settings.put(AvailableSettings.DIALECT, "org.hibernate.dialect.MySQL5Dialect");

                settings.put(AvailableSettings.SHOW_SQL, "true");

                settings.put(AvailableSettings.CURRENT_SESSION_CONTEXT_CLASS, "thread");

                settings.put(AvailableSettings.HBM2DDL_AUTO, "update");

                configuration.setProperties(settings);

                configuration.addAnnotatedClass(Ator.class);
                configuration.addAnnotatedClass(Diretor.class);
                configuration.addAnnotatedClass(Classe.class);
                configuration.addAnnotatedClass(Titulo.class);

                ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder()
                        .applySettings(configuration.getProperties()).build();

                sessionFactory = configuration.buildSessionFactory(serviceRegistry);
            }
            catch (Exception e) {
                e.printStackTrace();
            }
        }
        return sessionFactory;
    }

    private HibernateUtil() {
    }
}
