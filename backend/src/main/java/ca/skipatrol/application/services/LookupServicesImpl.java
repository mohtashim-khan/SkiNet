package ca.skipatrol.application.services;

import ca.skipatrol.application.Interfaces.LookupServices;
import ca.skipatrol.application.models.Season;
import ca.skipatrol.application.models.Size;
import ca.skipatrol.application.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


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

    public void saveSize(Size size) {
        List<Size> sizeList = sizeRepository.findAll();
        size.setSequence(sizeList.size());
        sizeRepository.save(size);
    }

    public void deleteSeason(UUID seasonID) {
        List<Season> seasonList = seasonRepository.findAll();
        int delSeq = seasonRepository.findById(seasonID).get().getSequence();
        seasonRepository.deleteById(seasonID);

        if (delSeq != seasonList.size()) {
            for (int i = delSeq; i < seasonList.size(); i++) {
                Season updatedSeason = seasonList.get(i);
                updatedSeason.setSequence(updatedSeason.getSequence() - 1);
                seasonRepository.save(updatedSeason);
            }
        }
    }

    public void deleteSize(UUID sizeID) {
        List<Size> sizeList = sizeRepository.findAll();
        int delSeq = sizeRepository.findById(sizeID).get().getSequence();
        sizeRepository.deleteById(sizeID);

        if (delSeq != sizeList.size()) {
            for (int i = delSeq; i < sizeList.size(); i++) {
                Size updatedSize = sizeList.get(i);
                updatedSize.setSequence(updatedSize.getSequence());
                sizeRepository.save(updatedSize);
            }
        }
    }

    public boolean deleteBrandsInBatch(ArrayList<UUID> brandIDs) {
        try
        {
            brandRepository.deleteAllByIdInBatch(brandIDs);
            for (UUID brandID : brandIDs) {
                assert (brandRepository.findById(brandID).isEmpty());
            }
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public boolean deleteAwardsInBatch(ArrayList<UUID> awardIDs)
    {
        try
        {
            awardRepository.deleteAllByIdInBatch(awardIDs);
            for (UUID awardID : awardIDs) {
                assert (awardRepository.findById(awardID).isEmpty());
            }
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public boolean deleteSeasonsInBatch(ArrayList<UUID> seasonIDs)
    {
        try
        {
            for (UUID seasonID : seasonIDs) {
                this.deleteSeason(seasonID);
                assert (seasonRepository.findById(seasonID).isEmpty());
            }
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public boolean deleteDisciplineInBatch(ArrayList<UUID> disciplineIDs)
    {
        try
        {
            disciplineRepository.deleteAllByIdInBatch(disciplineIDs);
            for (UUID disciplineID : disciplineIDs) {
                assert (disciplineRepository.findById(disciplineID).isEmpty());
            }
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public boolean deleteOperationalEventsInBatch(ArrayList<UUID> operationalEventIDs)
    {
        try
        {
            operationalEventRepository.deleteAllByIdInBatch(operationalEventIDs);
            for (UUID operationalEventID : operationalEventIDs) {
                assert (operationalEventRepository.findById(operationalEventID).isEmpty());
            }
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public boolean deleteSizesInBatch(ArrayList<UUID> sizeIDs)
    {
        try
        {
            for (UUID sizeID : sizeIDs) {
                this.deleteSize(sizeID);
                assert (sizeRepository.findById(sizeID).isEmpty());
            }
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public boolean deleteConditionsInBatch(ArrayList<UUID> conditionIDs)
    {
        try
        {
            conditionsRepository.deleteAllByIdInBatch(conditionIDs);
            for (UUID conditionID : conditionIDs) {
                assert (conditionsRepository.findById(conditionID).isEmpty());
            }
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

}
