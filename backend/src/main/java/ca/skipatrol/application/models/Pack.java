package ca.skipatrol.application.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.UUID;

@Entity
public class Pack {

    @Id
    @Getter
    @Setter
    @GeneratedValue
    @Column(columnDefinition = "binary(16)")
    private UUID packID;

    @Getter
    @Setter
    @Column(nullable = false, unique = true)
    private String number;

    @Getter
    @Setter
    @ManyToOne
    private Brand brand;

    @Getter
    @Setter
    @ManyToOne
    private Conditions condition;

    @Getter
    @Setter
    @ManyToOne
    private Uniform uniform;

    public Pack() {
    }
}
