package ca.skipatrol.application.repositories;

import ca.skipatrol.application.models.ActionLog;
import ca.skipatrol.application.models.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BrandRepository extends JpaRepository<Brand, Long> {

    Optional<Brand> findByDescription(String name);


}
