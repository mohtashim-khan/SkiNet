package ca.skipatrol.application.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import java.time.*;
import java.lang.Object;
import java.util.Set;

@Entity(name = "event")
public class Event {

    @Id
    @GeneratedValue
    @Getter
    private Long event_id;

    @Column(name = "event_name", nullable = false, columnDefinition = "varchar(255)")
    @Setter
    private String event_name;

    @Column(name = "start_date", nullable = true, columnDefinition = "datetime")
    @Getter
    @Setter
    private LocalDateTime startDate;

    @Column(name = "end_date", nullable = true, columnDefinition = "datetime")
    @Getter
    @Setter
    private LocalDateTime endDate;

    @Column(name = "min_patrollers", nullable = false, columnDefinition = "int(11) default -1")
    @Getter
    @Setter
    private int minPatrollers = -1;

    @Column(name = "max_patrollers", nullable = false, columnDefinition = "int(11) default -1")
    @Getter
    @Setter
    private int maxPatrollers = -1;

    @Column(name = "max_trainees", nullable = false, columnDefinition = "int(11) default -1")
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
    @Column(name = "group_id", nullable = false, columnDefinition = "int(11) default -1")
    @Getter
    @Setter
    private int groupID = -1;

    @Getter
    @OneToMany(mappedBy = "event", fetch = FetchType.EAGER)
    private Set<EventLog> eventLog;

    public Event(String event_name, LocalDateTime startDate, LocalDateTime endDate, int minPatrollers,
            int maxPatrollers, String hlUser, String allDay, int groupID) {
        this.event_name = event_name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.minPatrollers = minPatrollers;
        this.maxPatrollers = maxPatrollers;
        this.hlUser = hlUser;
        this.allDay = allDay;
        this.groupID = groupID;
    }

    private Event() {
    }

    /*
     * Overrides for hashcode and equals
     */

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((allDay == null) ? 0 : allDay.hashCode());
        result = prime * result + ((endDate == null) ? 0 : endDate.hashCode());
        result = (int) (prime * result + event_id);
        result = prime * result + ((event_name == null) ? 0 : event_name.hashCode());
        result = prime * result + groupID;
        result = prime * result + ((hlUser == null) ? 0 : hlUser.hashCode());
        result = prime * result + maxPatrollers;
        result = prime * result + maxTrainees;
        result = prime * result + minPatrollers;
        result = prime * result + ((startDate == null) ? 0 : startDate.hashCode());
        return result;
    }

   

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Event other = (Event) obj;
        if (allDay == null) {
            if (other.allDay != null)
                return false;
        } else if (!allDay.equals(other.allDay))
            return false;
        if (endDate == null) {
            if (other.endDate != null)
                return false;
        } else if (!endDate.equals(other.endDate))
            return false;
        if (event_name == null) {
            if (other.event_name != null)
                return false;
        } else if (!event_name.equals(other.event_name))
            return false;
        if (groupID != other.groupID)
            return false;
        if (hlUser == null) {
            if (other.hlUser != null)
                return false;
        } else if (!hlUser.equals(other.hlUser))
            return false;
        if (maxPatrollers != other.maxPatrollers)
            return false;
        if (maxTrainees != other.maxTrainees)
            return false;
        if (minPatrollers != other.minPatrollers)
            return false;
        if (startDate == null) {
            if (other.startDate != null)
                return false;
        } else if (!startDate.equals(other.startDate))
            return false;
        return true;
    }

}