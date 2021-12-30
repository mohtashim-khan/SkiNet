package ca.skipatrol.application.models;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.UUID;

@Entity
public class EmergencyContact {

    @Id
    @GeneratedValue
    @Getter
    @Setter
    @Column(columnDefinition = "binary(16)")
    private UUID emergencyContactID;

    @Getter
    @Setter
    private String relationship;

    @Getter
    @Setter
    @Column(nullable = false)
    private String phone;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;

    public EmergencyContact() {
    }

    public EmergencyContact(String relationship, String phone, User user) {
        this.relationship = relationship;
        this.phone = phone;
        this.user = user;
    }

    public EmergencyContact(UUID emergencyContactID, String relationship, String phone, User user) {
        this.emergencyContactID = emergencyContactID;
        this.relationship = relationship;
        this.phone = phone;
        this.user = user;
    }
}
