package ca.skipatrol.application.repositories;

import ca.skipatrol.application.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    User save(User user);

}