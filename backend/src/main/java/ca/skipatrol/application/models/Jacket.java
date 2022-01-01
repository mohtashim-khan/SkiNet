package ca.skipatrol.application.models;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.UUID;

@Entity
public class Jacket {

    @Id
    @GeneratedValue
    @Getter
    @Setter
    @Column(columnDefinition = "binary(16)")
    private UUID jacketID;

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
    private Size size;

    @Getter
    @Setter
    @ManyToOne
    private Conditions condition;

    @Getter
    @Setter
    @ManyToOne
    private Uniform uniform;

    public Jacket() {
    }

    public Jacket(String number, Brand brand, Size size, Conditions condition, Uniform uniform) {
        this.number = number;
        this.brand = brand;
        this.size = size;
        this.condition = condition;
        this.uniform = uniform;
    }

    public Jacket(UUID jacketID, String number, Brand brand, Size size, Conditions condition, Uniform uniform) {
        this.jacketID = jacketID;
        this.number = number;
        this.brand = brand;
        this.size = size;
        this.condition = condition;
        this.uniform = uniform;
    }

}
