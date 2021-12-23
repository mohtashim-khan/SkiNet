package ca.skipatrol.application.models;

import ca.skipatrol.application.repositories.OperationalEventRepository;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.UUID;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class OperationalEventTests {

    @Autowired
    OperationalEventRepository operationalEventRepository;

    OperationalEvent testOperationalEvent = new OperationalEvent("TestDescription");

    @Test
    void testSaveOperationalEvent()
    {
        operationalEventRepository.save(testOperationalEvent);
        operationalEventRepository.delete(testOperationalEvent);
    }


}
