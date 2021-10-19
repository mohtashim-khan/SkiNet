package ca.skipatrol.application.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import java.util.Date;

@Entity(name = "event")
public class Event {

    @Id
    @GeneratedValue
    @Column(name = "event_id", nullable = false, columnDefinition = "int(11)")
    @Getter
    private int event_id;

    @Column(name = "event_name", nullable = false, columnDefinition = "varchar(255)")
    @Setter
    private String event_name;

    @Column(name = "start_date", nullable = true, columnDefinition = "datetime")
    @Temporal(TemporalType.TIMESTAMP)
    @Getter
    @Setter
    private Date startDate;

    @Column(name = "end_date", nullable = true, columnDefinition = "datetime")
    @Temporal(TemporalType.TIMESTAMP)
    @Getter
    @Setter
    private Date endDate;

    @Column(name = "min_patrollers", nullable = false, columnDefinition = "int(11)")
    @Getter
    @Setter
    private int minPatrollers = -1;

    @Column(name = "max_patrollers", nullable = false, columnDefinition = "int(11)")
    @Getter
    @Setter
    private int maxPatrollers = -1;

    @Column(name = "max_trainees", nullable = false, columnDefinition = "int(11)")
    @Getter
    @Setter
    private int maxTrainees = -1;

    @Column(name = "hl_user", nullable = false, columnDefinition = "varchar(255)")
    @Getter
    @Setter
    private String hlUser;

    @Column(name = "all_day", nullable = false, columnDefinition = "varchar(255)")
    @Getter
    @Setter
    private String allDay;

    // Potential Foreign Key?? For now left as is
    @Column(name = "group_id", nullable = false, columnDefinition = "int(11)")
    @Getter
    @Setter
    private int groupID = -1;

    public Event(String event_name, Date startDate, Date endDate, int minPatrollers, int maxPatrollers, String hlUser,
            String allDay, int groupID) {
        this.event_name = event_name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.minPatrollers = minPatrollers;
        this.maxPatrollers = maxPatrollers;
        this.hlUser = hlUser;
        this.allDay = allDay;
        this.groupID = groupID;
    }

}