package ca.skipatrol.application.database;


import ca.skipatrol.application.Interfaces.LookupServices;
import ca.skipatrol.application.models.Season;
import ca.skipatrol.application.repositories.SeasonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class SeasonInitalizer implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    private SeasonRepository seasonRepository;
    @Autowired
    private LookupServices lookupServices;
    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {

        Optional <Season> seasonLookup = this.seasonRepository.findBySeasonname("2022 - 2023");
        if (seasonLookup.isEmpty()) {
            Season test1 = new Season("2022 - 2023");
            this.lookupServices.saveSeason(test1);

        }

        seasonLookup = this.seasonRepository.findBySeasonname("2023 - 2024");
        if (seasonLookup.isEmpty()) {
            Season test2 = new Season("2023 - 2024");
            this.lookupServices.saveSeason(test2);

        }

        seasonLookup = this.seasonRepository.findBySeasonname("2024 - 2025");
        if (seasonLookup.isEmpty()) {
            Season test3 = new Season("2024 - 2025");
            this.lookupServices.saveSeason(test3);

        }

        seasonLookup = this.seasonRepository.findBySeasonname("2025 - 2026");
        if (seasonLookup.isEmpty()) {
            Season test4 = new Season("2025 - 2026");
            this.lookupServices.saveSeason(test4);;

        }

        seasonLookup = this.seasonRepository.findBySeasonname("2026 - 2027");
        if (seasonLookup.isEmpty()) {
            Season test5 = new Season("2026 - 2027");
            this.lookupServices.saveSeason(test5);

        }

        seasonLookup = this.seasonRepository.findBySeasonname("2027 - 2028");
        if (seasonLookup.isEmpty()) {
            Season test6 = new Season("2027 - 2028");
            this.lookupServices.saveSeason(test6);

        }

        seasonLookup = this.seasonRepository.findBySeasonname("2028 - 2029");
        if (seasonLookup.isEmpty()) {
            Season test7 = new Season("2028 - 2029");
            this.lookupServices.saveSeason(test7);

        }

        seasonLookup = this.seasonRepository.findBySeasonname("2029 - 2030");
        if (seasonLookup.isEmpty()) {
            Season test8 = new Season("2029 - 2030");
            this.lookupServices.saveSeason(test8);

        }


        seasonLookup = this.seasonRepository.findBySeasonname("2030 - 2031");
        if (seasonLookup.isEmpty()) {
            Season testAlpine = new Season("2030 - 2031");
            this.lookupServices.saveSeason(testAlpine);

        }

        seasonLookup = this.seasonRepository.findBySeasonname("2031 - 2032");
        if (seasonLookup.isEmpty()) {
            Season testAlpine = new Season("2031 - 2032");
            this.lookupServices.saveSeason(testAlpine);

        }



    }

}
