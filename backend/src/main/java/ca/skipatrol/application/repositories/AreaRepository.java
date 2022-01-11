package ca.skipatrol.application.repositories;

import ca.skipatrol.application.models.Area;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Optional;
import java.util.UUID;


public interface AreaRepository extends JpaRepository<Area, UUID> {

    Optional<Area> findByAreaname(String areaname);
}