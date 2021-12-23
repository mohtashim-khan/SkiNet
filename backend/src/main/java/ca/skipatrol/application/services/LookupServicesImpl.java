package ca.skipatrol.application.services;

import ca.skipatrol.application.Interfaces.LookupServices;
import ca.skipatrol.application.models.Season;
import ca.skipatrol.application.repositories.SeasonRepository;
import ca.skipatrol.application.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class LookupServicesImpl implements LookupServices {

    @Autowired
    SeasonRepository seasonRepository;

    public void saveSeason(Season season) {
        List<Season> seasonList = seasonRepository.findAll();
        season.setSequence(seasonList.size() + 1);
        seasonRepository.save(season);

    }

    public void deleteSeason(long id) {
        List<Season> seasonList = seasonRepository.findAll();
        int delSeq = seasonRepository.findById(id).getSequence();
        seasonRepository.deleteById(id);

        if (delSeq != seasonList.size()) {
            for (int i = delSeq; i < seasonList.size(); i++) {
                Season updatedSeason = seasonList.get(i);
                updatedSeason.setSequence(updatedSeason.getSequence() - 1);
                seasonRepository.save(updatedSeason);

            }
        }

    }
}
