package ca.skipatrol.application.controllers;

import ca.skipatrol.application.Interfaces.RosterServices;
import ca.skipatrol.application.models.Event;
import ca.skipatrol.application.models.EventLog;
import ca.skipatrol.application.models.User;
import ca.skipatrol.application.repositories.UserRepository;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.server.ExposesResourceFor;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpServerErrorException;

@RestController
public class RosterController {
    @Autowired
    RosterServices rosterServices;

    // Remove below reference once done implementing security logic: https://www.baeldung.com/get-user-in-spring-security
    @Autowired
    UserRepository userRepository;

    @RequestMapping(value = "customapi/roster/addToEventLog", method = RequestMethod.PUT)
    public ResponseEntity<Object> AddToEventLog(@RequestBody EventLog eventLog) {
        rosterServices.AddToEventLog(eventLog, userRepository.findByUsername("username").get());
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null);
    }
}
