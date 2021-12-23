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

    @Id
    @GeneratedValue
    @Getter
    private Long id;

    public String getSeasonname() {
        return seasonname;
    }

    @Getter
    @Setter
    @Column(unique = true, nullable = false)
    private String seasonname;

    @Getter
    @Setter
    @Column(nullable = false)
    private int sequence;

    private Season() {
    }

    public Season(String seasonname) {
        this.seasonname = seasonname;

    }


}