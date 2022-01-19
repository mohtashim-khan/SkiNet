package ca.skipatrol.application.services;

import ca.skipatrol.application.Interfaces.RosterServices;
import ca.skipatrol.application.models.Event;
import ca.skipatrol.application.models.EventLog;
import ca.skipatrol.application.models.EventRole;
import ca.skipatrol.application.models.User;
import ca.skipatrol.application.repositories.AreaRepository;
import ca.skipatrol.application.repositories.EventLogRepository;
import ca.skipatrol.application.repositories.EventRepository;
import ca.skipatrol.application.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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

    static LocalDateTime minDate = LocalDateTime.of(1970,1,1,0,0);

    @Override
    public int AddToEventLog(EventLog eventLog, User actionUser)
    {
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

}
