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
        return new ResponseEntity<>(user, HttpStatus.OK);
    }



}
