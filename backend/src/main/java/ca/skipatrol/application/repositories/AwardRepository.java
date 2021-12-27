package ca.skipatrol.application.repositories;

import ca.skipatrol.application.models.Award;
import ca.skipatrol.application.models.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AwardRepository extends JpaRepository<Award, Long> {

    Optional<Award> findByDescription(String description);

}