package ca.skipatrol.application.models.cms;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.UUID;

@Entity
public class Topic {

    @Id
    @GeneratedValue
    @Getter
    @Setter
    @Column(columnDefinition = "binary(16)")
    private UUID topicID;

    @Getter
    @Setter
    @Column(unique = true, nullable = false)
    private String description;

    public Topic(){}

    public Topic(String description) { this.description = description; }

}
