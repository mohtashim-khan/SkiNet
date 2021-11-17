package ca.skipatrol.application.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class EventLog {

    @Id
    @GeneratedValue
    @Getter
    @Setter
    private int eventlog_id;

    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL, optional = false)
    private Event event;

    @Getter
    @Setter
    @Column(nullable = false, columnDefinition = "varchar(255)")
    private String event_name;

    @Getter
    @Setter
    @Column(nullable = false, columnDefinition = "varchar(255)")
    private String username;

    @Getter
    @Setter
    @Column(nullable = false, columnDefinition = "varchar(255)")
    private String name;

    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL, optional = false)
    private Area area;

    @Getter
    @Setter
    @Column(nullable = false, columnDefinition = "varchar(255)")
    private String role;

    @Getter
    @Setter
    @Column(nullable = false, columnDefinition = "varchar(255)")
    private String user_type;

    @Getter
    @Setter
    @Column(nullable = false, columnDefinition = "varchar(255)")
    private String shadowing;

    @Getter
    @Setter
    @Column(nullable = false, columnDefinition = "varchar(255)")
    private String attendance;

    @Getter
    @Setter
    @Column(nullable = false, columnDefinition = "timestamp default CURRENT_TIMESTAMP")
    private LocalDateTime timestamp_rostered;

    @Getter
    @Setter
    @Column(nullable = false, columnDefinition = "timestamp default '0000-00-00 00:00:00'")
    private LocalDateTime timestamp_subrequest;

    @Getter
    @Setter
    @Column(nullable = false, columnDefinition = "varchar(1000)")
    private String comment;

    @Getter
    @Setter
    @Column(nullable = false, columnDefinition = "varchar(255)")
    private String email;

    @Getter
    @Setter
    @Column(nullable = false, columnDefinition = "varchar(255)")
    private String phone_number;

    @Getter
    @Setter
    @Column(nullable = false, columnDefinition = "tinyint(1) default 0")
    private byte trainer;

    private EventLog(){}

    public EventLog(
                    Event event,
                    String event_name,
                    String username,
                    String name,
                    Area area,
                    String role,
                    String user_type,
                    String shadowing,
                    String attendance,
                    LocalDateTime timestamp_rostered,
                    LocalDateTime timestamp_subrequest,
                    String comment,
                    String email,
                    String phone_number,
                    byte trainer) {
        this.event = event;
        this.event_name = event_name;
        this.username = username;
        this.name = name;
        this.area = area;
        this.role = role;
        this.user_type = user_type;
        this.shadowing = shadowing;
        this.attendance = attendance;
        this.timestamp_rostered = timestamp_rostered;
        this.timestamp_subrequest = timestamp_subrequest;
        this.comment = comment;
        this.email = email;
        this.phone_number = phone_number;
        this.trainer = trainer;
    }

}
