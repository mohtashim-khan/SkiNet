package ca.skipatrol.application.repositories;
import ca.skipatrol.application.models.ActionLog;
import ca.skipatrol.application.models.Event;
import ca.skipatrol.application.models.EventLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ActionLogRepository extends JpaRepository<ActionLog, UUID> {

    Optional<ActionLog> findByEvent(Event event);

    List<ActionLog> findAllByEvent_eventID(UUID eventID);

}
