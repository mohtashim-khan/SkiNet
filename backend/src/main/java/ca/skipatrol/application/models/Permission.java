package ca.skipatrol.application.models;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.util.UUID;

@Entity
public class Permission {
    // Members
    @Id
    @GeneratedValue
    @Getter
    @Setter
    @Column(columnDefinition = "binary(16)")
    private UUID permissionID;

    @Getter
    @Setter
    @Column(nullable = false, unique = true)
    private String description;

    @Getter
    @Setter
    @Column(nullable = false, unique = true)
    private Integer level;


    // Constructors
    public Permission() {
    }

    public Permission(String description, Integer level) {
        this.description = description;
        this.level = level;
    }

    public Permission(UUID permissionID, String description, Integer level) {
        this.permissionID = permissionID;
        this.description = description;
        this.level = level;
    }
}
