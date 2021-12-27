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

    // Members
    @Id
    @GeneratedValue
    @Getter
    private Long id;

    @Getter
    @Setter
    @Column(unique = true, nullable = false)
    private String description;

    // Constructors
    private Discipline() {
    }

    public Discipline(String description) {
        this.description = description;
    }

}