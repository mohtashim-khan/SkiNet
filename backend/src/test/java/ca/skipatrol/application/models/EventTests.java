package ca.skipatrol.application.models;

import ca.skipatrol.application.repositories.EventRepository;
import ca.skipatrol.application.repositories.UserRepository;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertTrue;
import java.util.Date;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class EventTests {

    @Autowired
    EventRepository eventRepository;

    private Date testStartDate =  new Date(1,1,1974);
    private Date testEndDate = new Date();

    Event testEvent = new Event("test_event", , endDate, int minPatrollers, int maxPatrollers, String hlUser,
    String allDay, int groupID)


    
}
