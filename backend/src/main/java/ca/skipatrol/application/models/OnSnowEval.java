package ca.skipatrol.application.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
public class OnSnowEval {

    @Id
    @GeneratedValue
    @Getter
    @Setter
    @Column(columnDefinition = "binary(16)")
    private UUID onSnowEvalID;

    @Getter
    @Setter
    @Column(nullable = false)
    private LocalDateTime evaluationDate;

    @Getter
    @Setter
    @JoinColumn(nullable = false)
    @ManyToOne
    private Discipline discipline;

    @Getter
    @Setter
    @JoinColumn(nullable = false)
    @ManyToOne
    private User user;

    public OnSnowEval() {
    }

    public OnSnowEval(LocalDateTime evaluationDate, Discipline discipline, User user) {
        this.evaluationDate = evaluationDate;
        this.discipline = discipline;
        this.user = user;
    }

    public OnSnowEval(UUID onSnowEvalID, LocalDateTime evaluationDate, Discipline discipline, User user) {
        this.onSnowEvalID = onSnowEvalID;
        this.evaluationDate = evaluationDate;
        this.discipline = discipline;
        this.user = user;
    }
}
