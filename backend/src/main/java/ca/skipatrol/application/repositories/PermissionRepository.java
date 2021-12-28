package ca.skipatrol.application.repositories;

import ca.skipatrol.application.models.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;


public interface PermissionRepository extends JpaRepository<Permission, UUID> {

    Optional<Permission> findByDescription(String description);
    Optional<Permission> findByLevel(Integer level);

}
