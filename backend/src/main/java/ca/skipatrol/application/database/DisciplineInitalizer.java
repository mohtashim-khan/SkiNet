package ca.skipatrol.application.database;


import ca.skipatrol.application.models.Discipline;
import ca.skipatrol.application.repositories.DisciplineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DisciplineInitalizer implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    private DisciplineRepository disciplineRepository;
    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {

        Optional <Discipline> disciplineLookup = this.disciplineRepository.findByDisciplinename("Alpine Ski");
        if (disciplineLookup.isEmpty()) {
            Discipline testAlpine = new Discipline("Alpine Ski");
            this.disciplineRepository.save(testAlpine);

        }

        disciplineLookup = this.disciplineRepository.findByDisciplinename("Snowboard");
        if (disciplineLookup.isEmpty()) {
            Discipline testSnowboard = new Discipline("Snowboard");
            this.disciplineRepository.save(testSnowboard);

        }

        disciplineLookup = this.disciplineRepository.findByDisciplinename("Telemark Ski");
        if (disciplineLookup.isEmpty()) {
            Discipline testTelemark = new Discipline("Telemark Ski");
            this.disciplineRepository.save(testTelemark);

        }

    }

}
