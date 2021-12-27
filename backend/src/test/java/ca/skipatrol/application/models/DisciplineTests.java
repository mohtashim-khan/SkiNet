package ca.skipatrol.application.models;

import ca.skipatrol.application.repositories.DisciplineRepository;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class DisciplineTests {

    @Autowired
    DisciplineRepository disciplineRepository;
    String testDisciplineName1 = "Alpine Ski";
    String testDisciplineName2 = "Snowboard";
    String testDisciplineName3 = "Telemark Ski";

    Discipline testDiscipline1 = new Discipline(testDisciplineName1);
    Discipline testDiscipline2 = new Discipline(testDisciplineName2);
    Discipline testDiscipline3 = new Discipline(testDisciplineName3);




    @BeforeAll
    public void setup() {
        //disciplineRepository.save(testDiscipline1);

    }

    @Test
    void testFindAll() {
        List<Discipline> testList = disciplineRepository.findAll();
        assertTrue(testList.get(0).getDescription().equals(testDisciplineName1));
        assertTrue(testList.get(1).getDescription().equals(testDisciplineName2));
        assertTrue(testList.get(2).getDescription().equals(testDisciplineName3));
    }






}
