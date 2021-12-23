package ca.skipatrol.application.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Brand {

    @Id
    @GeneratedValue
    @Getter
    @Setter
    @Column(nullable = false)
    private Long brand_id;

    @Getter
    @Setter
    @Column(unique = true, nullable = false)
    private String name;

    private Brand(){}

    public Brand(String name){
        this.name = name;
    }

}
