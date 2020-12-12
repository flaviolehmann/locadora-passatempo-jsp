package main.model.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "TITULO")
public class Titulo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID", nullable = false)
    private Long id;

    @Column(name = "NOME", length = 200, nullable = false)
    private String nome;

    @Column(name = "ANO")
    private Long ano;

    @Column(name = "CATEGORIA", length = 200)
    private String categoria;

    @Column(name = "SINOPSE", length = 8000)
    private String sinopse;

    @ManyToOne
    @JoinColumn(name = "ID_DIRETOR", referencedColumnName = "ID")
    private Diretor diretor;

    @ManyToOne
    @JoinColumn(name = "ID_CLASSE", referencedColumnName = "ID")
    private Classe classe;

    @ManyToMany
    @JoinTable(
            name = "TITULO_ATOR",
            joinColumns = { @JoinColumn(name="ID_TITULO") },
            inverseJoinColumns = { @JoinColumn(name="ID_ATOR") })
    private List<Ator> atores = new ArrayList<>();
}
