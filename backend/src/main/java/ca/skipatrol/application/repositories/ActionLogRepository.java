package ca.skipatrol.application.repositories;
import ca.skipatrol.application.models.ActionLog;
import ca.skipatrol.application.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ActionLogRepository extends JpaRepository<ActionLog, Long> {
    Optional<ActionLog> findByEvent(Event event);

    ActionLog save(ActionLog action_log);
}
