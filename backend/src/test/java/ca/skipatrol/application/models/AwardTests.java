package ca.skipatrol.application.models;

import ca.skipatrol.application.repositories.AwardRepository;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class AwardTests {

    @Autowired
    AwardRepository awardRepository;

    String name = "fakeAward";

    Award award = new Award(name);

    @BeforeAll
    void setup(){
        awardRepository.save(award);
    }

    @Test
    void testGetBrandByName(){
        assertTrue(awardRepository.findByDescription(name).isPresent());
        awardRepository.delete(award);
        assertFalse(awardRepository.findByDescription(name).isPresent());
        awardRepository.save(award);
    }

    @Test
    void testFindAll(){
        List<Award> temp = awardRepository.findAll();
        assertTrue(temp.size() > 1);
    }

    @AfterAll
    public void done() {
        awardRepository.delete(award);
    }
}
