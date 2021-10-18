package ca.skipatrol.application.repositories;

import ca.skipatrol.application.models.Area;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AreaRepository extends JpaRepository<Area,Long> {

    Optional<Area> findByAreaname(String areaname);

    Area save(Area area);

}