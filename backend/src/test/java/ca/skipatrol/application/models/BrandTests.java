package ca.skipatrol.application.models;

import ca.skipatrol.application.repositories.BrandRepository;
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
public class BrandTests {

    @Autowired
    BrandRepository brandRepository;

    String name = "fakename";

    Brand brand = new Brand(name);

    @BeforeAll
    void setup(){
        brandRepository.save(brand);
    }

    @Test
    void testGetBrandByName(){
        assertTrue(brandRepository.findByDescription(name).isPresent());
        brandRepository.delete(brand);
        assertFalse(brandRepository.findByDescription(name).isPresent());
        brandRepository.save(brand);
    }

    @Test
    void testFindAll(){
        List<Brand> temp = brandRepository.findAll();
        assertTrue(temp.size() > 1);
    }

    @AfterAll
    public void done() {
        brandRepository.delete(brand);
    }
}
