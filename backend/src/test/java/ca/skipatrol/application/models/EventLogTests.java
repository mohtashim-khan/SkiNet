package ca.skipatrol.application.models;

import ca.skipatrol.application.repositories.AreaRepository;
import ca.skipatrol.application.repositories.EventLogRepository;
import ca.skipatrol.application.repositories.EventRepository;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class EventLogTests {

    @Autowired
    EventLogRepository eventLogRepository;
    @Autowired
    EventRepository eventRepository;
    @Autowired
    AreaRepository areaRepository;

    // Setup Test Data
    LocalDateTime testStartDate = LocalDateTime.of(2021, Month.JANUARY, 1, 12, 0, 0);
    LocalDateTime testEndDate = LocalDateTime.of(2021, Month.JANUARY, 12, 12, 1);
    Event testEvent = new Event("test_event", testStartDate, testEndDate, 1, 3, "yes", "yes", 1);
    Area testArea = new Area("test_Area");
    LocalDateTime test_TimestampRostered = LocalDateTime.of(2021, Month.JANUARY, 12, 12, 1);
    LocalDateTime test_TimestampRequest = LocalDateTime.of(2021, Month.JANUARY, 12, 12, 1);

    EventLog testEventLog = new EventLog(1,
            testEvent,
            "test_event",
            "test_username",
            "test_name",
            testArea,
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

    @BeforeAll
    public void setup()
    {
        areaRepository.save(testArea);
        eventRepository.save(testEvent);
        eventLogRepository.save(testEventLog);
    }

    @Test
    void testFindByUsername()
    {
        List<EventLog> testVal = eventLogRepository.findByUsername("test_username");
        assertTrue(testVal.size() > 0);
    }

    @AfterAll
    public void done()
    {
        eventLogRepository.delete(testEventLog);
        eventRepository.delete(testEvent);
        areaRepository.delete(testArea);
    }

}
