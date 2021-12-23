package ca.skipatrol.application.repositories;
import ca.skipatrol.application.models.ActionLog;
import ca.skipatrol.application.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ActionLogRepository extends JpaRepository<ActionLog, Long> {
    Optional<ActionLog> findByEvent(Event event);

    @Query("SELECT al FROM ActionLog al WHERE event_id = ?1")
    List<ActionLog> getEventInfo(int eventId);

    @Query("SELECT al FROM ActionLog al WHERE actionLog_id = ?1")
    Optional<ActionLog> getActionLogByID(Long actionLogID);


    ActionLog save(ActionLog actionLog);
}
