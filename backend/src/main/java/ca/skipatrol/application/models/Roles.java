package ca.skipatrol.application.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.UUID;

@Entity
public class Roles {

    @Id
    @GeneratedValue
    @Getter
    @Setter
    @Column(columnDefinition = "binary(16)")
    private UUID roleID;

    @Getter
    @Setter
    @Column(nullable = false)
    private Boolean pl;

    @Getter
    @Setter
    @Column(nullable = false)
    private Boolean apl;

    @Getter
    @Setter
    @Column(nullable = false)
    private Boolean hl;

    @Getter
    @Setter
    @Column(nullable = false)
    private Boolean active;

    @Getter
    @Setter
    @Column(nullable = false)
    private Boolean newUser;

    @Getter
    @Setter
    @Column(nullable = false)
    private Boolean trainingEventLead;

    @Getter
    @Setter
    @Column(nullable = false)
    private Boolean onSnowEvaluator;

    @Getter
    @Setter
    @Column(nullable = false)
    private Boolean orienteerer;

    @Getter
    @Setter
    @Column(nullable = false)
    private Boolean recruitmentLead;

    @Getter
    @Setter
    @Column(nullable = false)
    private Boolean p0Lead;

    @Getter
    @Setter
    @JoinColumn(nullable = false)
    @ManyToOne
    private User user;

}
