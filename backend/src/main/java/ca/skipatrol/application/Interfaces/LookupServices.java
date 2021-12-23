package ca.skipatrol.application.Interfaces;

import ca.skipatrol.application.models.Season;

public interface LookupServices {

    public void saveSeason(Season season);
    public void deleteSeason(long id);

}
