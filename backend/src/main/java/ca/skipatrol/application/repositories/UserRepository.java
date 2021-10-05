package ca.skipatrol.application.repositories;

import ca.skipatrol.application.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

    User save(User user);

}