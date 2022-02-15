package ca.skipatrol.application.Interfaces;


import ca.skipatrol.application.models.EventLog;
import ca.skipatrol.application.models.User;
import com.google.gson.JsonObject;

public interface RosterServices {

    EventLog ParseEventLogJson(JsonObject eventLogJSON);
    int AddToEventLog(EventLog eventLog, User actionUser);
    int AddSubRequest(EventLog eventLog, User actionUser);
}
