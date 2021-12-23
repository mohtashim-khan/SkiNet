package ca.skipatrol.application.controllers;

import ca.skipatrol.application.Interfaces.LookupServices;
import ca.skipatrol.application.models.Season;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LookupController {
    @Autowired
    LookupServices lookupServices;

    @RequestMapping(value = "/customapi/lookups/season", method = RequestMethod.PUT)
    public ResponseEntity<Object>
    saveSeason(@RequestBody Season season) {

        lookupServices.saveSeason(season);
        return new ResponseEntity<>("Season saved correctly", HttpStatus.OK);
    }






}