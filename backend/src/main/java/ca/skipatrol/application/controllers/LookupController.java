package ca.skipatrol.application.controllers;

import ca.skipatrol.application.Interfaces.LookupServices;
import ca.skipatrol.application.models.Season;
import ca.skipatrol.application.repositories.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class LookupController {

    @Autowired
    LookupServices lookupServices;

    @Autowired
    BrandRepository brandRepository;

    @RequestMapping(value = "/customapi/lookups/season", method = RequestMethod.PUT, headers = "Accept=application/json")
    public ResponseEntity<Object> saveSeason(@RequestBody Season season) {

        lookupServices.saveSeason(season);
        return new ResponseEntity<>("Season saved correctly", HttpStatus.OK);
    }

    @RequestMapping(value = "/customapi/lookups/season/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteSeason(@PathVariable long id) {

        lookupServices.deleteSeason(id);
        return new ResponseEntity<>("Season deleted correctly", HttpStatus.OK);
    }

    @RequestMapping(value = "/customapi/lookups/brand/deleteInBatch", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteBrandInBatch(@RequestParam ArrayList<Long> ids) {
        brandRepository.deleteAllByIdInBatch(ids);
        for (Long id : ids) {
            assert (brandRepository.findById(id).isEmpty());
        }
        return new ResponseEntity<>("Brands deleted correctly", HttpStatus.OK);
    }

}