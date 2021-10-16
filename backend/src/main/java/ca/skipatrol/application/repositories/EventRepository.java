package ca.skipatrol.application.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ca.skipatrol.application.models.Event;

public interface EventRepository extends JpaRepository<Event, Long> {

}
