package ca.skipatrol.application.models;

import ca.skipatrol.application.repositories.AreaRepository;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
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

    String areaName = RandomString.make(12);

    Area testArea = new Area(areaName);

    @BeforeAll
    public void setup() { areaRepository.save(testArea);
    }

    @Test
    void testFindAreaByAreaname() {
        assertTrue(areaRepository.findByAreaname(areaName).isPresent());
    }

    @AfterAll
    public void done() {
        areaRepository.delete(testArea);
    }

}
