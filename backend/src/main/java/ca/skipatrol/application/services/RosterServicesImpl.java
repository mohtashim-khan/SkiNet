package ca.skipatrol.application.services;

import ca.skipatrol.application.Interfaces.ProfileServices;
import ca.skipatrol.application.Interfaces.RosterServices;
import ca.skipatrol.application.models.*;
import ca.skipatrol.application.repositories.AreaRepository;
import ca.skipatrol.application.repositories.EventLogRepository;
import ca.skipatrol.application.repositories.EventRepository;
import ca.skipatrol.application.repositories.UserRepository;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriBuilder;

import javax.transaction.Transactional;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class RosterServicesImpl implements RosterServices {
    @Autowired
    AreaRepository areaRepository;
    @Autowired
    EventLogRepository eventLogRepository;
    @Autowired
    EventRepository eventRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ProfileServices profileServices;

    static LocalDateTime minDate = LocalDateTime.of(1970,1,1,0,0);

    @Override
    public EventLog ParseEventLogJson(JsonObject eventLogJSON)
    {
        Gson gson = new Gson();
        EventLog eventLog = new EventLog();

        eventLog.setComment(gson.fromJson(eventLogJSON.get("comment"), String.class));
        eventLog.setEmail(gson.fromJson(eventLogJSON.get("email"), String.class));
        eventLog.setPhoneNumber(gson.fromJson(eventLogJSON.get("phoneNumber"), String.class));
        eventLog.setTrainer(gson.fromJson(eventLogJSON.get("trainer"), Boolean.class));
        eventLog.setRole(gson.fromJson(eventLogJSON.get("role"), EventRole.class));
        eventLog.setAttendance(gson.fromJson(eventLogJSON.get("attendance"), EventAttendance.class));

        UUID eventID = ParseLastURIPartToUUID(gson.fromJson(eventLogJSON.get("event"), String.class));
        eventLog.setEvent((Event) Hibernate.unproxy(eventRepository.getById(eventID)));
        UUID userID = ParseLastURIPartToUUID(gson.fromJson(eventLogJSON.get("user"), String.class));
        eventLog.setUser((User) Hibernate.unproxy(userRepository.getById(userID)));

        String areaURI = gson.fromJson(eventLogJSON.get("shadowing"), String.class);
        if(areaURI != null && !areaURI.isEmpty())
            eventLog.setArea((Area) Hibernate.unproxy(areaRepository.getById(ParseLastURIPartToUUID(areaURI))));

        String shadowingURI = gson.fromJson(eventLogJSON.get("shadowing"), String.class);
        if(shadowingURI != null && !shadowingURI.isEmpty())
            eventLog.setUser((User) Hibernate.unproxy(userRepository.getById(ParseLastURIPartToUUID(shadowingURI))));

        return eventLog;
    }

    @Override
    public int AddToEventLog(EventLog eventLog, User actionUser)
    {
        eventLog.setTimestampRostered(LocalDateTime.now());
        eventLog.setTimestampSubrequest(minDate);
        List<EventLog> existingEventLogs = eventLogRepository.findAllByEvent_eventID(eventLog.getEvent().getEventID());

        //check if user exists and await result
        if (existingEventLogs.stream().anyMatch(x -> x.getUser().getUserID() == eventLog.getUser().getUserID()))
            return 204;

        //adding a shadow or unavailable no questions
        if (eventLog.getRole().equals(EventRole.SHADOW) || eventLog.getRole() == EventRole.UNAVAILABLE) {
            eventLogRepository.save(eventLog);
            return 204;
        }
        else //need to insert
        {
            Event event = eventRepository.getById(eventLog.getEvent().getEventID());

            //get current Assigned Count
            int maxVal = (eventLog.getRole() == EventRole.TRAINEE)?event.getMaxTrainees():event.getMaxPatrollers();
            long currentCount = existingEventLogs.stream().filter(x -> x.getRole() == eventLog.getRole()).count();

            if (currentCount < maxVal)
                eventLogRepository.save(eventLog);
            else
            {
                //see if there are any people that request sub
                Optional<EventLog> transfer;
                if (eventLog.getRole() == EventRole.TRAINEE)
                    transfer = existingEventLogs.stream().filter(x -> x.getRole() == EventRole.TRAINEE &&
                            x.getUser().getUserType() == EventRole.TRAINEE &&
                            x.getTimestampSubrequest() != minDate).findFirst();
                else
                    transfer = existingEventLogs.stream().filter(x -> x.getRole() == eventLog.getRole() &&
                            x.getUser().getUserType() != EventRole.TRAINEE &&
                            x.getTimestampSubrequest() != minDate).findFirst();

                if (transfer.isPresent() && currentCount-1 < maxVal) //someone has sub request
                {
                    //see if there are any people waiting on waitlist
                    Optional<EventLog> waitPerson;
                    if (eventLog.getRole() == EventRole.TRAINEE)
                        waitPerson = existingEventLogs.stream().filter(x -> x.getRole() == EventRole.WAITLIST && x.getUser().getUserType() == EventRole.TRAINEE).findFirst();
                    else
                        waitPerson = existingEventLogs.stream().filter(x -> x.getRole() == EventRole.WAITLIST && x.getUser().getUserType() != EventRole.TRAINEE).findFirst();

                    //get person in waitlist first to rostered
                    if (waitPerson.isPresent())
                    {
                        // TODO: Need to review this logic!
                        EventLog update = existingEventLogs.stream().filter(x -> x.getUser().getUsername().equals(eventLog.getUser().getUsername())).findFirst().get();

                        update.setTimestampRostered(LocalDateTime.now());
                        update.setRole(update.getUser().getUserType());
                        update.setTimestampSubrequest(minDate);
                        eventLogRepository.save(update);

                        //deleting person we got that has sub request
                        eventLogRepository.delete(transfer.get());
                    }
                    else // no one in waitlist so insert current person that wants to go as replacement
                    {
                        eventLogRepository.save(eventLog);

                        //deleting person we got that has sub request
                        eventLogRepository.delete(transfer.get());
                    }
                }
                else // put into waitlist
                {
                    eventLog.setRole(EventRole.WAITLIST);
                    eventLogRepository.save(eventLog);
                }
            }
        }

        return 204;
    }

    private UUID ParseLastURIPartToUUID(String uri)
    {
        String[] uriParts = uri.split("/");
        return UUID.fromString(uriParts[uriParts.length - 1]);
    }

}
