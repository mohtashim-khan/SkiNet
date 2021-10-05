package ca.skipatrol.application.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import static javax.persistence.EnumType.STRING;

@Entity
public class User {

    @Id
    @GeneratedValue
    @Getter
    private Long id;

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

    @Column(nullable = false)
    @Enumerated(STRING)
    @Getter
    private Role role;

    private User() {
    }

    public User(String username, String password, String firstName, String lastName, Role role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.role = role;
    }

}