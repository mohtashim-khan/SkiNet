package ca.skipatrol.application.models;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;

import javax.persistence.*;

import java.util.Arrays;

import static javax.persistence.EnumType.STRING;

@Entity


public class Discipline {

    @Id
    @GeneratedValue
    @Getter
    private Long id;

    public String getDisciplinename() {
        return disciplinename;
    }

    @Getter
    @Setter
    @Column(unique = true, nullable = false)
    private String disciplinename;

    private Discipline() {
    }

    public Discipline(String disciplinename) {
        this.disciplinename = disciplinename;
    }


}