package ca.skipatrol.application.Interfaces;


import ca.skipatrol.application.models.Event;
import ca.skipatrol.application.models.EventLog;
import ca.skipatrol.application.models.User;
import com.google.gson.JsonObject;

import java.time.LocalDateTime;
import java.util.List;

public interface RosterServices {

    EventLog ParseEventLogJson(JsonObject eventLogJSON);
    int AddToEventLog(EventLog eventLog, User actionUser);
    int AddSubRequest(EventLog eventLog, User actionUser);
    int RemoveUserEventLog(EventLog eventLog, User actionUser);
    List<Event> RetrieveEventsByDateFull(LocalDateTime startDate, LocalDateTime endDate, JsonObject weekDays);
}
