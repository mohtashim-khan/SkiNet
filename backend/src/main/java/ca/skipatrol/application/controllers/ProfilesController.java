package ca.skipatrol.application.controllers;

import ca.skipatrol.application.Interfaces.ProfileServices;
import ca.skipatrol.application.models.Uniform;
import ca.skipatrol.application.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class ProfilesController {

    @Autowired
    ProfileServices profileServices;

    @RequestMapping(value = "/customapi/profile/uniform", method = RequestMethod.GET)
    public ResponseEntity<Object> getUniform(
            @RequestParam UUID uniformID,
            @RequestParam(required = false) boolean getVests,
            @RequestParam(required = false) boolean getJackets,
            @RequestParam(required = false) boolean getPacks)
    {
        Uniform uniform = profileServices.retrieveUniform(uniformID, getVests, getJackets, getPacks);
        return new ResponseEntity<>(uniform, HttpStatus.OK);
    }

    @RequestMapping(value = "/customapi/profile/user/TrainingAndEvaluation", method = RequestMethod.GET)
    public ResponseEntity<Object> getUserTrainingAndEvaluation(
            @RequestParam UUID userID,
            @RequestParam(required = false) boolean getEvalTrainings,
            @RequestParam(required = false) boolean getOpTrainings,
            @RequestParam(required = false) boolean getOnSnowEvals)
    {
        User user = profileServices.retrieveUserTrainingAndEvaluation(userID, getEvalTrainings, getOpTrainings, getOnSnowEvals);
        if (user != null)
            return new ResponseEntity<>(user, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/customapi/profile/user/EmergencyContacts", method = RequestMethod.GET)
    public ResponseEntity<Object> getUserEmergencyContacts(
            @RequestParam UUID userID)
    {
        User user = profileServices.retrieveUserEmergencyContacts(userID);

        if (user != null)
            return new ResponseEntity<>(user, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/customapi/profile/user/PatrolCommitments", method = RequestMethod.GET)
    public ResponseEntity<Object> getUserPatrolCommitments(
            @RequestParam UUID userID)
    {
        User user = profileServices.retrieveUserPatrolCommitments(userID);

        if (user != null)
            return new ResponseEntity<>(user, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/customapi/profile/user/Awards", method = RequestMethod.GET)
    public ResponseEntity<Object> getUserAwards(
            @RequestParam UUID userID)
    {
        User user = profileServices.retrieveUserAwards(userID);

        if (user != null)
            return new ResponseEntity<>(user, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/customapi/profile/user/Uniform", method = RequestMethod.GET)
    public ResponseEntity<Object> retrieveUserUniform(
            @RequestParam UUID userID)
    {
        User user = profileServices.retrieveUserUniform(userID);

        if (user != null)
            return new ResponseEntity<>(user, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/customapi/profile/user/Role", method = RequestMethod.GET)
    public ResponseEntity<Object> retrieveUserRoles(
            @RequestParam UUID userID)
    {
        User user = profileServices.retrieveUserRole(userID);

        if (user != null)
            return new ResponseEntity<>(user, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/customapi/profile/user", method = RequestMethod.GET)
    public ResponseEntity<Object> retrieveUserAll(
            @RequestParam UUID userID)
    {
        User user = profileServices.retrieveUserAll(userID);

        if (user != null)
            return new ResponseEntity<>(user, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
