package ca.skipatrol.application.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import java.util.UUID;

import static javax.persistence.EnumType.STRING;

@Entity
public class User {

    @Id
    @GeneratedValue
    @Getter
    @Column(columnDefinition = "binary(16)")
    private UUID userID;

    @Column(unique = true, nullable = false)
    @Getter
    private String username;

    @Getter
    private String password;

    @Getter
    @Setter
    private String firstName;

    @Getter
    @Setter
    private String lastName;

    private User() {
    }

    public User(String username, String password, String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
    }

}