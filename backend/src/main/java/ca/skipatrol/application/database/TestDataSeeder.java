package ca.skipatrol.application.database;

import ca.skipatrol.application.models.Role;
import ca.skipatrol.application.models.User;
import ca.skipatrol.application.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class TestDataSeeder implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    private UserRepository repository;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        this.repository.save(new User("username",
                new BCryptPasswordEncoder().encode("password"),
                "Isaac",
                "Newton",
                Role.USER));
    }

}