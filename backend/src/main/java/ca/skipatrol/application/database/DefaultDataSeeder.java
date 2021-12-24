package ca.skipatrol.application.database;

import ca.skipatrol.application.models.*;
import ca.skipatrol.application.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DefaultDataSeeder implements ApplicationListener<ApplicationReadyEvent> {


    @Autowired
    private AwardRepository awardRepository;
    @Autowired
    private BrandRepository brandRepository;
    @Autowired
    private DisciplineRepository disciplineRepository;
    @Autowired
    private SizeRepository sizeRepository;
    @Autowired
    private SeasonRepository seasonRepository;
    @Autowired
    private OperationalEventRepository operationalEventRepository;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        Optional<Award> awardLookup;
        for(String name : awardDefaults) {
            awardLookup = this.awardRepository.findByDescription(name);
            if (awardLookup.isEmpty()) {
                Award testAward = new Award(name);
                this.awardRepository.save(testAward);
            }
        }

        Optional<Brand> brandLookup;
        for(String name : brandDefaults) {
            brandLookup = this.brandRepository.findByDescription(name);
            if (brandLookup.isEmpty()) {
                Brand brand = new Brand(name);
                this.brandRepository.save(brand);
            }
        }

        Optional<Discipline> disciplineLookup;
        for(String name : disciplineDefaults) {
            disciplineLookup = this.disciplineRepository.findByDescription(name);
            if (disciplineLookup.isEmpty()) {
                Discipline discipline = new Discipline(name);
                this.disciplineRepository.save(discipline);
            }
        }

        Optional<Size> sizeLookup;
        for(int i = 0; i < sizeDefaults.length; i++) {
            sizeLookup = this.sizeRepository.findByDescription(sizeDefaults[i]);
            if (sizeLookup.isEmpty()){
                Size size = new Size(sizeDefaults[i], i);
                this.sizeRepository.save(size);
            }
        }

        Optional<Season> seasonLookup;
        for(int i = 0; i < seasonDefaults.length; i++) {
            seasonLookup = this.seasonRepository.findByDescription(seasonDefaults[i]);
            if (seasonLookup.isEmpty()){
                Season season = new Season(seasonDefaults[i], i);
                this.seasonRepository.save(season);
            }
        }

        Optional<OperationalEvent> operationalEventLookup;
        for(String name : operationalEventDefaults) {
            operationalEventLookup = this.operationalEventRepository.findByDescription(name);
            if (operationalEventLookup.isEmpty()) {
                OperationalEvent operationalEvent = new OperationalEvent(name);
                this.operationalEventRepository.save(operationalEvent);
            }
        }

    }

    private String[] awardDefaults = {
            "A over T",
            "\"Triangle\" Operational Proficieny Award",
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

    private String[] brandDefaults = {
            "Spyder",
            "North Face",
            "Helly Hansen"
    };

    private String[] disciplineDefaults = {
            "Alpine Ski",
            "Snowboard",
            "Telemark Ski"
    };

    private String[] sizeDefaults = {
            "XS",
            "S",
            "M",
            "L",
            "XL",
            "XXL",
            "XXXL"
    };

    private String[] seasonDefaults = {
            "2022 - 2023",
            "2023 - 2024",
            "2024 - 2025",
            "2025 - 2026",
            "2026 - 2027",
            "2027 - 2028",
            "2028 - 2029",
            "2029 - 2030",
            "2030 - 2031",
            "2031 - 2032",
            "2032 - 2033"
    };

    private String[] operationalEventDefaults = {
            "Returning Weekend",
            "Scenario Training",
            "STARS",
            "Ski Improvement",
            "Toboggan Training",
            "Lift Evacuation"
    };
}
