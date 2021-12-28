package ca.skipatrol.application.repositories;

import ca.skipatrol.application.models.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RolesRepository extends JpaRepository<Roles, UUID> {

}
