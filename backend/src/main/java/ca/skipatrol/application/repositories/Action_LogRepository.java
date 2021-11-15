package ca.skipatrol.application.repositories;
import ca.skipatrol.application.models.Action_Log;
import ca.skipatrol.application.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Action_LogRepository extends JpaRepository<Action_Log, Long> {
    Optional<Action_Log> findByEvent(Event event);

    Action_Log save(Action_Log action_log);
}
