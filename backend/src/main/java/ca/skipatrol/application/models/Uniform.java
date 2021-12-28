package ca.skipatrol.application.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.UUID;

@Entity
public class Uniform {

    @Id
    @GeneratedValue
    @Getter
    @Setter
    @Column(columnDefinition = "binary(16)")
    private UUID uniformID;

    @Getter
    @Setter
    @Column(nullable = false)
    private Boolean leaseSigned;

    @Getter
    @Setter
    @Column(nullable = false)
    private Boolean returned;

    @Getter
    @Setter
    @ManyToOne
    private User user;


}
