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

    public Uniform() {
    }

    public Uniform(Boolean leaseSigned, Boolean returned, User user) {
        this.leaseSigned = leaseSigned;
        this.returned = returned;
        this.user = user;
    }

    public Uniform(UUID uniformID, Boolean leaseSigned, Boolean returned, User user) {
        this.uniformID = uniformID;
        this.leaseSigned = leaseSigned;
        this.returned = returned;
        this.user = user;
    }

}
