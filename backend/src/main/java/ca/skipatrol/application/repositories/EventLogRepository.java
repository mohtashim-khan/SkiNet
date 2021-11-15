package ca.skipatrol.application.repositories;

import ca.skipatrol.application.models.Event;
import ca.skipatrol.application.models.EventLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventLogRepository extends JpaRepository<EventLog, Long> {

    EventLog save(EventLog eventLog);

//    List<EventLog> findByEvent_id(int event_id);

    List<EventLog> findByUsername(String username);
}
