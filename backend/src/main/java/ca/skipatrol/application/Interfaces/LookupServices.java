package ca.skipatrol.application.Interfaces;

import ca.skipatrol.application.models.Season;

import java.util.ArrayList;

public interface LookupServices {

    public void saveSeason(Season season);
    public void deleteSeason(long id);
    public boolean deleteBrandsInBatch(ArrayList<Long> ids);
    public boolean deleteAwardsInBatch(ArrayList<Long> ids);
    public boolean deleteSeasonsInBatch(ArrayList<Long> ids);
    public boolean deleteDisciplineInBatch(ArrayList<Long> ids);


}
