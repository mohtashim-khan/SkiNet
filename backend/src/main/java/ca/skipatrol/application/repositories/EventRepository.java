package ca.skipatrol.application.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.format.annotation.DateTimeFormat;

import ca.skipatrol.application.models.Event;

public interface EventRepository extends JpaRepository<Event, Long> {

    /*
     * Operations to be Supported: eventsAltered(req, res) -- need help implementing
     * addToEvent(req, res, next) deleteEvent(req, res) -- already Implemented by
     * CrudRepository (findById() and deleteById() respectively)
     */

    /*
     * eventsAltered() --> Finds all events between certain dates, can sort further
     * by specifiying single or multiple days of the week.
     * 
     * Unsure how to implement the further days of week sorting as the WEEKDAY function in use is not supported by Spring.
     * Also this query changes depending on the amount of days present.
     * 
     * The following Query has to be Implemented somehow,it is only used if days of the week are specified 
     * otherwise only returns the events between the two dates.
     * 
     * @Query("SELECT * FROM event WHERE start_date >= ? AND start_date <= ? AND
     * (WEEKDAY(start_date)=0 OR WEEKDAY(start_date)=1 ...)")
     * 
     * For now just implemented the simple version with no Day of the week sorting.
     */
    List<Event> findByStartDateBetween(@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate, @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)  LocalDateTime endDate);

    List<Event> findByEventName(String name);

    

}
