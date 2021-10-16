package ca.skipatrol.application.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import java.util.Date;

@Entity(name = "event")
public class Event {

@Id
@GeneratedValue
@Getter
private Long event_id;


@Column(name = "event_name", nullable = false)
@Setter
private String event_name;

@Column(name = "start_date" , nullable = true)
@Temporal(TemporalType.TIMESTAMP)
@Getter
@Setter
private Date startDate;

@Column(name = "end_date", nullable = true)
@Temporal(TemporalType.TIMESTAMP)
@Getter
@Setter
private Date endDate;

@Column(name = "min_patrollers")
@Getter
@Setter
private int minPatrollers = -1;

@Column(name = "max_patrollers")
@Getter
@Setter
private int maxPatrollers = -1;

@Column(name = "max_trainees")
@Getter
@Setter
private int maxTrainees = -1;


@Column(name = "hl_user")
@Getter
@Setter
private String hlUser;

@Column(name = "all_day")
@Getter
@Setter
private String allDay;

//Potential Foreign Key?? For now left as is
@Column(name = "group_id")
@Getter
@Setter
private int groupID = -1;


public Event(String event_name, Date startDate, Date endDate, int minPatrollers, int maxPatrollers,
        String hlUser, String allDay, int groupID) {
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