package ca.skipatrol.application.services;

import ca.skipatrol.application.Interfaces.LookupServices;
import ca.skipatrol.application.models.Season;
import ca.skipatrol.application.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class LookupServicesImpl implements LookupServices {

    //region Lookup Repository Declarations
    @Autowired
    OperationalEventRepository operationalEventRepository;
    @Autowired
    DisciplineRepository disciplineRepository;
    @Autowired
    BrandRepository brandRepository;
    @Autowired
    SizeRepository sizeRepository;
    @Autowired
    ConditionsRepository conditionsRepository;
    @Autowired
    SeasonRepository seasonRepository;
    @Autowired
    AwardRepository awardRepository;
    //endregion



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

    public boolean deleteBrandsInBatch(ArrayList<Long> ids) {
        try
        {
            brandRepository.deleteAllByIdInBatch(ids);
            for (Long id : ids) {
                assert (brandRepository.findById(id).isEmpty());
            }
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public boolean deleteAwardsInBatch(ArrayList<Long> ids)
    {
        try
        {
            awardRepository.deleteAllByIdInBatch(ids);
            for (Long id : ids) {
                assert (awardRepository.findById(id).isEmpty());
            }
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public boolean deleteSeasonsInBatch(ArrayList<Long> ids)
    {
        try
        {
            for (Long id : ids) {
                this.deleteSeason(id);
                assert (seasonRepository.findById(id).isEmpty());
            }
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public boolean deleteDisciplineInBatch(ArrayList<Long> ids)
    {
        try
        {
            disciplineRepository.deleteAllByIdInBatch(ids);
            for (Long id : ids) {
                assert (disciplineRepository.findById(id).isEmpty());
            }
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }


}
