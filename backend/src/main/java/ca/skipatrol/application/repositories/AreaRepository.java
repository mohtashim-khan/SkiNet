package ca.skipatrol.application.repositories;

import ca.skipatrol.application.models.Area;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Optional;


public interface AreaRepository extends JpaRepository<Area,Long> {

    Optional<Area> findByAreaname(String areaname);

    Area save(Area area); //LATER ON -- HANDLE CASE FOR IF AREA ALREADY EXISTS
    void deleteById(long id);



}