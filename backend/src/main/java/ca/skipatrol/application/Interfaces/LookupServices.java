package ca.skipatrol.application.Interfaces;

import ca.skipatrol.application.models.Season;

import java.util.ArrayList;
import java.util.UUID;

public interface LookupServices {

    public void saveSeason(Season season);
    public void deleteSeason(UUID seasonID);
    public void deleteSize(UUID sizeID);
    public boolean deleteBrandsInBatch(ArrayList<UUID> brandIDs);
    public boolean deleteAwardsInBatch(ArrayList<UUID> awardIDs);
    public boolean deleteSeasonsInBatch(ArrayList<UUID> seasonIDs);
    public boolean deleteDisciplineInBatch(ArrayList<UUID> disciplineIDs);
    public boolean deleteOperationalEventsInBatch(ArrayList<UUID> disciplineIDs);
    public boolean deleteSizesInBatch(ArrayList<UUID> disciplineIDs);
    public boolean deleteConditionsInBatch(ArrayList<UUID> disciplineIDs);


}
