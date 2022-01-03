package ca.skipatrol.application.Interfaces;

import ca.skipatrol.application.models.Uniform;
import ca.skipatrol.application.models.User;

import java.util.UUID;

public interface ProfileServices {

    Uniform retrieveUniform(UUID uniformID, boolean getVests, boolean getJackets, boolean getPacks);
    User retrieveUserTrainingAndEvaluation(UUID userID, boolean getEvalTrainings, boolean getOpTrainings, boolean getOnSnowEvals);
}
