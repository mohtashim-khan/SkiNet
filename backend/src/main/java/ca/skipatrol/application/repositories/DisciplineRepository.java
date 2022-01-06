package ca.skipatrol.application.repositories;


import ca.skipatrol.application.models.Discipline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface DisciplineRepository extends JpaRepository<Discipline, UUID> {

    Optional<Discipline> findByDescription(String description);

}