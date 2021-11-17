package ca.skipatrol.application.repositories;

import ca.skipatrol.application.models.Event;
import ca.skipatrol.application.models.EventLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EventLogRepository extends JpaRepository<EventLog, Long> {

    EventLog save(EventLog eventLog);

    @Query("SELECT el FROM EventLog el WHERE event_id = ?1")
    List<EventLog> getEventLogInfo(int eventid);

//    List<EventLog> findbyEvent_Eventid(int event_id);

    List<EventLog> findByUsername(String username);
}
