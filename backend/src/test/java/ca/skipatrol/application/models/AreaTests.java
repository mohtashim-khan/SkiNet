package ca.skipatrol.application.models;

import ca.skipatrol.application.repositories.AreaRepository;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class AreaTests {

    @Autowired
    AreaRepository areaRepository;

    Area testArea = new Area("Scranton");

    @BeforeAll
    public void setup() { areaRepository.save(testArea);
    }

    @Test
    void testFindAreaByAreaname() {
        assertTrue(areaRepository.findByAreaname("Scranton").isPresent());
    }

    @AfterAll
    public void done() {
        areaRepository.delete(testArea);
    }

}
