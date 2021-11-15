package ca.skipatrol.application.models;
import ca.skipatrol.application.repositories.Action_LogRepository;
import ca.skipatrol.application.repositories.EventRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class Action_LogTests {

    @Autowired
    Action_LogRepository action_logRepository;

    @Autowired
    EventRepository eventRepository;

    LocalDateTime startDate_1 = LocalDateTime.of(2021, Month.JANUARY, 1, 12, 0, 0);
    LocalDateTime endDate_1 = LocalDateTime.of(2021, Month.JANUARY, 12, 12, 1);
    Event testEvent = new Event("test_event", startDate_1, endDate_1, 1, 3, "yes", "yes", 1);


    LocalDateTime testDate = LocalDateTime.of(2021, Month.JANUARY, 12, 12, 1);
    Action_Log test = new Action_Log(testEvent, "testUsername", "testAction_User", "testResults", testDate);;


    @BeforeAll
    void setup(){
        eventRepository.save(testEvent);
        action_logRepository.save(test);
    }


    @Test
    void testFindByEvent(){
        assertTrue(action_logRepository.findByEvent(testEvent).isPresent());
    }

    @AfterAll
    public void done() {
        action_logRepository.delete(test);
        eventRepository.delete(testEvent);
    }

}
