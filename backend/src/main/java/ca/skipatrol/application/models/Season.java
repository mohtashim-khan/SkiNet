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


public class Season {

    // Members
    @Id
    @GeneratedValue
    @Getter
    private Long id;

    @Getter
    @Setter
    @Column(unique = true, nullable = false)
    private String description;

    @Getter
    @Setter
    @Column(nullable = false)
    private int sequence;

    // Constructors
    private Season() {
    }

    public Season(String description, int sequence) {
        this.description = description;
        this.sequence = sequence;
    }

}