package ca.skipatrol.application.models;


import ca.skipatrol.application.repositories.*;
import org.hibernate.Hibernate;
import org.hibernate.proxy.HibernateProxy;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.EntityGraph;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.transaction.Transactional;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class RelationshipMappingTests {

    @Autowired
    UserRepository userRepository;
    EntityManager entityManager;

    //region Lookup Repository Declarations
    @Autowired
    OperationalEventRepository operationalEventRepository;
    @Autowired
    DisciplineRepository disciplineRepository;
    @Autowired
    BrandRepository brandRepository;
    @Autowired
    SizeRepository sizeRepository;
    @Autowired
    ConditionsRepository conditionsRepository;
    @Autowired
    SeasonRepository seasonRepository;
    @Autowired
    AwardRepository awardRepository;
    //endregion

    //region Uniform Relationship Tables
    @Autowired
    VestRepository vestRepository;
    @Autowired
    JacketRepository jacketRepository;
    @Autowired
    PackRepository packRepository;
    @Autowired
    UniformRepository uniformRepository;
    //endregion

    Brand testBrand;
    Size testSize;
    Conditions testCondition;
    Uniform testUniform;
    User testUser;

    @BeforeAll
    public void setup() {
        testBrand = brandRepository.findAll().get(0);
        testSize = sizeRepository.findAll().get(0);
        testCondition = conditionsRepository.findAll().get(0);
        testUser = userRepository.findByUsername("username").get();

        testUniform = new Uniform(false, false, null);
        uniformRepository.save(testUniform);

        //EntityManagerFactory emfactory = Persistence.createEntityManagerFactory();
    }

    @AfterAll
    public void teardown() {
        uniformRepository.deleteById(testUniform.getUniformID());
    }

    //region Vest Relational Mapping Tests
    @Test
    void testSaveDeleteVest() {
        Vest testVest = new Vest("testNumber", testBrand, testSize, testCondition, null);
        vestRepository.save(testVest);
        assertTrue(vestRepository.existsById(testVest.getVestID()));
        vestRepository.delete(testVest);
        assertFalse(vestRepository.existsById(testVest.getVestID()));
    }

    @Test
    void testEagerLoadForVest() {
        Vest testVest = new Vest("testNumber2", testBrand, testSize, testCondition, testUniform);
        vestRepository.save(testVest);
        Vest returnVest = vestRepository.getById(testVest.getVestID());
        assertEquals(returnVest.getBrand(), testBrand);
        assertEquals(returnVest.getCondition(), testCondition);
        assertEquals(returnVest.getSize(), testSize);
        assertEquals(returnVest.getUniform(), testUniform);
        vestRepository.delete(testVest);
    }

    //endregion

    //region Uniform Relational Mapping Tests
//    @Test
//    void testLazyLoadForUniform() {
//        Vest testVest = new Vest("testNumber3", testBrand, testSize, testCondition, testUniform);
//        Uniform testUniform  = new Uniform(false, false, null);
//        testUniform.setVests(Arrays.asList(testVest));
//
//        uniformRepository.save(testUniform);
//        vestRepository.save(testVest);

        //Uniform returnUniform = uniformRepository.getById(testUniform.getUniformID());

//        uniformRepository.delete(testUniform);
//        vestRepository.delete(testVest);
//    }
    //endregion

}