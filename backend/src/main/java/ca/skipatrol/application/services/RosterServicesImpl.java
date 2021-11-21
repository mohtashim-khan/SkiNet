package ca.skipatrol.application.services;

import ca.skipatrol.application.Interfaces.RosterServices;
import ca.skipatrol.application.repositories.AreaRepository;
import ca.skipatrol.application.repositories.EventLogRepository;
import ca.skipatrol.application.repositories.EventRepository;
import ca.skipatrol.application.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RosterServicesImpl implements RosterServices {
    @Autowired
    AreaRepository areaRepository;
    @Autowired
    EventLogRepository eventLogRepository;
    @Autowired
    EventRepository eventRepository;
    @Autowired
    UserRepository userRepository;


}
