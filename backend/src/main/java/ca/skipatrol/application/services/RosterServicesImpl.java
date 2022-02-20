package ca.skipatrol.application.services;

import ca.skipatrol.application.Interfaces.ProfileServices;
import ca.skipatrol.application.Interfaces.RosterServices;
import ca.skipatrol.application.models.*;
import ca.skipatrol.application.repositories.*;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriBuilder;

import javax.transaction.Transactional;
import java.net.URI;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.*;

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
    ActionLogRepository actionLogRepository;

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
        Event event = eventRepository.getById(eventLog.getEvent().getEventID());

        //check if user exists and await result
        if (existingEventLogs.stream().anyMatch(x -> x.getUser().getUserID() == eventLog.getUser().getUserID())){
            AddActionToActionLog(actionUser.getUsername() + " already in table. No action.", actionUser, event);
            return 204;
        }

        //adding a shadow or unavailable no questions
        if (eventLog.getRole().equals(EventRole.SHADOW) || eventLog.getRole() == EventRole.UNAVAILABLE) {
            eventLogRepository.save(eventLog);
            return 204;
        }
        else //need to insert
        {
            //get current Assigned Count
            int maxVal = (eventLog.getRole() == EventRole.TRAINEE)?event.getMaxTrainees():event.getMaxPatrollers();
            long currentCount = existingEventLogs.stream().filter(x -> x.getRole() == eventLog.getRole()).count();

            if (currentCount < maxVal) {
                eventLogRepository.save(eventLog);
                AddActionToActionLog(eventLog.getUser().getUsername() + " inserted into " +
                    eventLog.getRole() + " table by " + actionUser.getUsername(),
                    actionUser, event);
            }
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
                        AddActionToActionLog("Sub Requested by " + transfer.get().getUser().getUsername() +
                                ". Replaced from Waitlist: " + waitPerson.get().getUser().getUsername(),
                                actionUser, event);
                    }
                    else // no one in waitlist so insert current person that wants to go as replacement
                    {
                        eventLogRepository.save(eventLog);

                        //deleting person we got that has sub request
                        eventLogRepository.delete(transfer.get());
                        AddActionToActionLog("Sub Requested by " + transfer.get().getUser().getUsername() +
                                ". Replaced with: " + eventLog.getUser().getUsername(),
                                actionUser, event);
                    }
                }
                else // put into waitlist
                {
                    eventLog.setRole(EventRole.WAITLIST);
                    eventLogRepository.save(eventLog);
                    AddActionToActionLog(eventLog.getUser().getUsername() + " inserted into Waitlist by " + actionUser.getUsername(), actionUser, event);
                }
            }
        }

        return 204;
    }

    @Override
    public int AddSubRequest(EventLog eventLog, User actionUser)
    {
        List<EventLog> existingEventLogs = eventLogRepository.findAllByEvent_eventID(eventLog.getEvent().getEventID());
        Optional<EventLog> userEventLogReturn = existingEventLogs.stream().filter(x -> x.getUser().getUserID() == eventLog.getUser().getUserID()).findFirst();
        Event event = eventRepository.getById(eventLog.getEvent().getEventID());

        //check if user exists and await result
        if (userEventLogReturn.isEmpty())
            return 404;
        else
        {
            EventLog userEventLog = userEventLogReturn.get();

            // if already sub request they have to be de sub requested
            if (!userEventLog.getTimestampRostered().equals(minDate))
            {
                userEventLog.setTimestampRostered(minDate);
                eventLogRepository.save(userEventLog);
            }
            // add sub-request
            else
            {
                if (!eventLog.getRole().equals(EventRole.SHADOW) && !eventLog.getRole().equals(EventRole.WAITLIST))
                {
                    int maxVal = (eventLog.getRole() == EventRole.TRAINEE)?event.getMaxTrainees():event.getMaxPatrollers();
                    long currentCount = existingEventLogs.stream().filter(x -> x.getRole() == eventLog.getRole()).count();

                    //-1 is if the person potentially was removed from the table
                    if(currentCount - 1 < maxVal)
                    {
                        if (eventLog.getRole().equals(EventRole.ROSTERED) || eventLog.getRole().equals(EventRole.TRAINEE))
                        {
                            Optional<EventLog> transfer;
                            if (eventLog.getRole() == EventRole.TRAINEE)
                                transfer = existingEventLogs.stream().filter(x -> x.getRole() == EventRole.WAITLIST &&
                                        x.getUser().getUserType() == EventRole.TRAINEE).findFirst();
                            else
                                transfer = existingEventLogs.stream().filter(x -> x.getRole() == EventRole.WAITLIST &&
                                        x.getUser().getUserType() != EventRole.TRAINEE).findFirst();

                            if(transfer.isPresent())
                            {
                                EventLog transferEventLog = transfer.get();
                                transferEventLog.setTimestampRostered(LocalDateTime.now());
                                eventLogRepository.save(transferEventLog);


                                eventLogRepository.deleteById(existingEventLogs.stream().filter(x ->
                                        x.getUser().equals(eventLog.getUser()) &&
                                        x.getRole().equals(eventLog.getRole())).findFirst().get().getEventLogID());

                                AddActionToActionLog("Sub Requested by"
                                        + actionUser.getUsername().toString()
                                        + ". Replaced from Waitlist: "
                                        + transfer.get().getUser().getUsername(),
                                        actionUser,
                                        event);

                                return 204;
                            }
                            else //check if user exists and await result
                            {
                                EventLog updateToSub = existingEventLogs.stream().filter(x -> x.getUser().equals(eventLog.getUser())).findFirst().get();
                                updateToSub.setTimestampSubrequest(LocalDateTime.now());

                                AddActionToActionLog("Sub Requested by " + actionUser.getUsername().toString(), actionUser, event);
                                return 204;
                            }

                        }

                    }
                    AddActionToActionLog("Sub Requested by Shadow or Waitlist: Not supported", actionUser, event);
                    return 204;
                }

            }

        }

        return 500;
    }

    public int RemoveUserEventLog(EventLog eventLog, User actionUser)
    {
        List<EventLog> existingEventLogs = eventLogRepository.findAllByEvent_eventID(eventLog.getEvent().getEventID());
        Optional<EventLog> userEventLogReturn = existingEventLogs.stream().filter(x -> x.getUser().getUserID() == eventLog.getUser().getUserID()).findFirst();
        Event event = eventRepository.getById(eventLog.getEvent().getEventID());

        if (userEventLogReturn.isEmpty())
            return 404;
        else
        {
            eventLogRepository.deleteById(userEventLogReturn.get().getEventLogID());
            AddActionToActionLog(eventLog.getUser().getUsername() + "removed by " + actionUser.getUsername(),
                    actionUser,
                    event);

            if (!eventLog.getRole().equals(EventRole.SHADOW) && !eventLog.getRole().equals(EventRole.WAITLIST))
            {
                int maxVal = (eventLog.getRole() == EventRole.TRAINEE) ? event.getMaxTrainees() : event.getMaxPatrollers();
                long currentVal = existingEventLogs.stream().filter(x -> x.getRole() == eventLog.getRole()).count();

                if(currentVal < maxVal)
                {
                    Optional<EventLog> transfer = null;
                    if (eventLog.getRole() == EventRole.TRAINEE)
                        transfer = existingEventLogs.stream().filter(x -> x.getRole() == EventRole.WAITLIST &&
                                x.getUser().getUserType() == EventRole.TRAINEE).findFirst();
                    else if (eventLog.getRole() == EventRole.ROSTERED)
                        transfer = existingEventLogs.stream().filter(x -> x.getRole().equals(EventRole.WAITLIST) &&
                                x.getUser().getUserType() != EventRole.ROSTERED).findFirst();

                    if (transfer.isPresent())
                    {
                        EventLog transferEventLog = transfer.get();
                        transferEventLog.setTimestampRostered(LocalDateTime.now());
                        transferEventLog.setRole(transferEventLog.getUser().getUserType());
                        AddActionToActionLog("Replaced from Waitlist" + transferEventLog.getUser().getUsername(), actionUser, event);

                        return 204;
                    }

                    return 204;
                }

            }

        }

        return 500;
    }

    public List<Event> RetrieveEventsByDateFull(LocalDateTime startDate, LocalDateTime endDate, JsonObject weekDays)
    {
        Gson gson = new Gson();
        List<Event> eventsReturn = new ArrayList();

        List<String> weekDaysString = gson.fromJson(weekDays.get("weekDays"), List.class);

        List<DayOfWeek> dayOfWeeks = new ArrayList();
        for (String weekDay: weekDaysString)
            dayOfWeeks.add(DayOfWeek.valueOf(weekDay.toUpperCase(Locale.ROOT)));

        List<Event> events = eventRepository.findByStartDateBetween(startDate, endDate);

        for (Event event: events)
        {
            if (dayOfWeeks.contains(event.getStartDate().getDayOfWeek()))
                eventsReturn.add(event);
        }

        return eventsReturn;
    }

    private void AddActionToActionLog(String actionString, User actionUser, Event event)
    {
        ActionLog actionLog = new ActionLog(event, actionUser.getUsername(), actionUser.getUserID().toString(), actionString, LocalDateTime.now());
        actionLogRepository.save(actionLog);
    }

    private UUID ParseLastURIPartToUUID(String uri)
    {
        String[] uriParts = uri.split("/");
        return UUID.fromString(uriParts[uriParts.length - 1]);
    }

}
