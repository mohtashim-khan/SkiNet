package ca.skipatrol.application.models;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.util.UUID;

@Entity
public class Vest {

    @Id
    @GeneratedValue
    @Getter
    @Setter
    @Column(columnDefinition = "binary(16)")
    private UUID vestID;

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

    public Vest() {
    }

    public Vest(String number, Brand brand, Size size, Conditions condition, Uniform uniform) {
        this.number = number;
        this.brand = brand;
        this.size = size;
        this.condition = condition;
        this.uniform = uniform;
    }

    public Vest(UUID vestID, String number, Brand brand, Size size, Conditions condition, Uniform uniform) {
        this.vestID = vestID;
        this.number = number;
        this.brand = brand;
        this.size = size;
        this.condition = condition;
        this.uniform = uniform;
    }
}
