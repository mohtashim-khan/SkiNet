package ca.skipatrol.application.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Award {

    @Id
    @GeneratedValue
    @Getter
    @Setter
    @Column(nullable = false)
    private Long award_id;

    @Getter
    @Setter
    @Column(unique = true, nullable = false)
    private String name;

    private Award(){}

    public Award(String name){
        this.name = name;
    }

}
