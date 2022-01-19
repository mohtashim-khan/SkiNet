package ca.skipatrol.application.controllers;

import ca.skipatrol.application.Interfaces.RosterServices;
import ca.skipatrol.application.models.EventLog;
import ca.skipatrol.application.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import java.security.Principal;

@RestController
public class RosterController {
    @Autowired
    RosterServices rosterServices;

    // Remove below reference once done implementing security logic: https://www.baeldung.com/get-user-in-spring-security
    @Autowired
    UserRepository userRepository;

    @RequestMapping(value = "customapi/roster/addToEventLog", method = RequestMethod.PUT)
    public ResponseEntity<Object> AddToEventLog(@RequestBody EventLog eventLog, Principal principal) {

        int code = 500;
        if (principal != null)
            code = rosterServices.AddToEventLog(eventLog, userRepository.findByUsername(principal.getName()).get());

        if (code == 204)
            return ResponseEntity.status(HttpStatus.OK).build();
        else
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

}
