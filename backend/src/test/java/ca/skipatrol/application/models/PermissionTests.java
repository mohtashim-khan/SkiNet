package ca.skipatrol.application.models;

import ca.skipatrol.application.repositories.PermissionRepository;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class PermissionTests {
    @Autowired
    PermissionRepository permissionRepository;

    Permission testPermission = new Permission(UUID.randomUUID(), "Test", 99);

//    @Test
//    void testSaveAndFindByPermission()
//    {
//        Permission testPermission = new Permission(UUID.randomUUID(), "TestPermission", 99);
//        permissionRepository.save(testPermission);
//        permissionRepository.delete(testPermission);
//    }

}
