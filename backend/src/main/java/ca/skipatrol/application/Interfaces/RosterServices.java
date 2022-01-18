package ca.skipatrol.application.Interfaces;


import ca.skipatrol.application.models.EventLog;
import ca.skipatrol.application.models.User;

public interface RosterServices {

    int AddToEventLog(EventLog eventLog, User actionUser);

}
