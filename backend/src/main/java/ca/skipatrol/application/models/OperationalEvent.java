package ca.skipatrol.application.models;

import jdk.dynalink.Operation;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.util.UUID;

@Entity
public class OperationalEvent {

    @Id
    @GeneratedValue
    @Getter
    @Setter
    @Column(columnDefinition = "binary(16)")
    private UUID OperationalEventID;

    @Getter
    @Setter
    @Column(nullable = false, columnDefinition = "varchar(255)")
    private String Description;

    public OperationalEvent() {}

    public OperationalEvent(UUID operationalEventID, String description) {
        OperationalEventID = operationalEventID;
        Description = description;
    }

    public OperationalEvent(String description) {
        Description = description;
    }
}
