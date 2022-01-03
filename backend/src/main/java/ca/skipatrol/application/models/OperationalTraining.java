package ca.skipatrol.application.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
public class OperationalTraining {

    @Id
    @GeneratedValue
    @Getter
    @Setter
    @Column(columnDefinition = "binary(16)")
    private UUID operationalTrainingID;

    @Getter
    @Setter
    @Column(nullable = false)
    private LocalDateTime completedDate;

    @Getter
    @Setter
    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.EAGER)
    private OperationalEvent operationalEvent;

    @Getter
    @Setter
    @JsonBackReference
    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    public OperationalTraining() {
    }

    public OperationalTraining(LocalDateTime completedDate, OperationalEvent operationalEvent, User user) {
        this.completedDate = completedDate;
        this.operationalEvent = operationalEvent;
        this.user = user;
    }

    public OperationalTraining(UUID operationalTrainingID, LocalDateTime completedDate, OperationalEvent operationalEvent, User user) {
        this.operationalTrainingID = operationalTrainingID;
        this.completedDate = completedDate;
        this.operationalEvent = operationalEvent;
        this.user = user;
    }
}
