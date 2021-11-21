package ca.skipatrol.application.database;

import ca.skipatrol.application.models.*;
import ca.skipatrol.application.repositories.AreaRepository;
import ca.skipatrol.application.repositories.EventLogRepository;
import ca.skipatrol.application.repositories.EventRepository;
import ca.skipatrol.application.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.Optional;
import java.util.stream.Stream;

@Component
public class TestDataSeeder implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    private UserRepository repository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private AreaRepository areaRepository;

    @Autowired
    private EventLogRepository eventLogRepository;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        Optional<User> userLookup = this.repository.findByUsername("username");
        if (userLookup.isEmpty()) {
            User user = new User("username",
                    new BCryptPasswordEncoder().encode("password"),
                    "Isaac",
                    "Newton",
                    Role.USER);
            this.repository.save(new User("username",
                    new BCryptPasswordEncoder().encode("password"),
                    "Isaac",
                    "Newton",
                    Role.USER));
            userLookup = Optional.of(user);
        }

        Optional<Event> eventLookup = this.eventRepository.findByEventName("testEventName");
        if (eventLookup.isEmpty()) {
            LocalDateTime startDate_1 = LocalDateTime.of(2021, Month.JANUARY, 1, 12, 0, 0);
            LocalDateTime endDate_1 = LocalDateTime.of(2021, Month.JANUARY, 12, 12, 1);
            Event test = new Event("test_event", startDate_1, endDate_1, 1, 3, "yes", "yes", 1);
            this.eventRepository.save(test);
            eventLookup = Optional.of(test);
        }

        Optional<Area> areaLookup = this.areaRepository.findByAreaname("Scantron");
        if (areaLookup.isEmpty()) {
            Area testArea = new Area("Scranton");
            this.areaRepository.save(testArea);
            areaLookup = Optional.of(testArea);
        }

        if (Stream.of(userLookup, eventLookup, areaLookup).allMatch(Optional::isPresent)) {
            LocalDateTime test_TimestampRostered = LocalDateTime.of(2021, Month.JANUARY, 12, 12, 1);
            LocalDateTime test_TimestampRequest = LocalDateTime.of(2021, Month.JANUARY, 12, 12, 1);
            EventLog testEventLog = new EventLog(
                    eventLookup.get(),
                    "test_event",
                    "test_username",
                    "test_name",
                    areaLookup.get(),
                    "test_role",
                    "test_userType",
                    "test_shadowing",
                    "test_attendance",
                    test_TimestampRostered,
                    test_TimestampRequest,
                    "test_Comment",
                    "test_Email",
                    "test_PhoneNumber",
                    (byte) 1);
            this.eventLogRepository.save(testEventLog);
        }
    }

}