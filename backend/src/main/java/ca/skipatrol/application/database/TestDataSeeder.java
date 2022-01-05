package ca.skipatrol.application.database;

import ca.skipatrol.application.models.*;
import ca.skipatrol.application.repositories.*;
import net.bytebuddy.utility.RandomString;
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
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private AreaRepository areaRepository;

    @Autowired
    private EventLogRepository eventLogRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private OnSnowEvalRepository onSnowEvalRepository;

    @Autowired
    private DisciplineRepository disciplineRepository;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        Optional<User> userLookup = this.userRepository.findByUsername("username");
        if (userLookup.isEmpty()) {
            User user = new User("username",
                    new BCryptPasswordEncoder().encode("password"),
                    "Isaac",
                    "Newton",
                    "test@email.com",
                    "000-000-0000");
            this.userRepository.save(new User("username",
                    new BCryptPasswordEncoder().encode("password"),
                    "Isaac",
                    "Newton",
                    "test@email.com",
                    "000-000-0000"));
            userLookup = Optional.of(user);

            user = userRepository.findByUsername("username").get();
            Role role = new Role(false, false, false, false,
                    false, false, false,
                    false, false, false, false, user);
            this.roleRepository.save(role);
        }

        Optional<User> userLookup2 = this.userRepository.findByUsername("AAAAA");
        if (userLookup2.isEmpty()) {
            User user = new User("AAAAA",
                    new BCryptPasswordEncoder().encode("password"),
                    "Michael",
                    "Scott",
                    "test@email.com",
                    "000-000-0000");
            this.userRepository.save(new User("AAAAA",
                    new BCryptPasswordEncoder().encode("password"),
                    "Michael",
                    "Scott",
                    "test@email.com",
                    "000-000-0000"));
            userLookup2 = Optional.of(user);

            user = userRepository.findByUsername("AAAAA").get();
            Role role = new Role(false, false, false, false,
                    false, false, false,
                    false, false, false, false, user);
            this.roleRepository.save(role);
            LocalDateTime date1 = LocalDateTime.of(2021, Month.JANUARY, 12, 12, 1);
            Discipline testDiscipline = new Discipline("fuck");
            disciplineRepository.save(testDiscipline);
            OnSnowEval onSnowEval = new OnSnowEval(date1, testDiscipline, user);
            this.onSnowEvalRepository.save(onSnowEval);
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
            Area testArea = new Area("Scantron");
            this.areaRepository.save(testArea);
            areaLookup = Optional.of(testArea);
        }

        if (userLookup.isPresent() && areaLookup.isPresent() && eventLookup.isPresent()) {
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