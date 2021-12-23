package ca.skipatrol.application.database;



import ca.skipatrol.application.models.Award;
import ca.skipatrol.application.models.Brand;
import ca.skipatrol.application.repositories.AwardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AwardInitializer implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    private AwardRepository awardRepository;

    private String[] awardDefaults = {"A over T", "\"Triangle\" Operational Proficieny Award",
            "Accomodation Award",
            "Andrews/Hamstead Award – 1st Year Patroller Award",
            "Brad Geisler Proficiency Award",
            "Bull Wheel Award",
            "Burgess Shale",
            "Edward D. Simper Memorial Award - White Telephone",
            "Fundraising Award",
            "George Ennis Memorial - Most Valuable Patroller",
            "Golden Shaft Award", "Head Smashed in Buffalo Jump",
            "Jim Frew \"Load and Go\" First Aid Proficiency",
            "Mallard Award",
            "Most Days Patrolled (Polek Lack)",
            "Silent Strike",
            "The Lake Louise Family Award"
    };
    

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        Optional<Award> awardLookup;
        for(String name : awardDefaults) {
            awardLookup = this.awardRepository.getAwardByName(name);
            if (awardLookup.isEmpty()) {
                Award testAward = new Award(name);
                this.awardRepository.save(testAward);
            }
        }


    }

}