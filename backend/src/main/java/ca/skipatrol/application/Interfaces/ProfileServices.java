package ca.skipatrol.application.Interfaces;

import ca.skipatrol.application.models.EventRole;
import ca.skipatrol.application.models.Uniform;
import ca.skipatrol.application.models.User;

import java.util.ArrayList;
import java.util.UUID;

public interface ProfileServices {

    Uniform retrieveUniform(UUID uniformID, boolean getVests, boolean getJackets, boolean getPacks);

    User retrieveUserTrainingAndEvaluation(UUID userID, boolean getEvalTrainings, boolean getOpTrainings,
            boolean getOnSnowEvals);

    User retrieveUserEmergencyContacts(UUID userID);

    User retrieveUserPatrolCommitments(UUID userID);

    User retrieveUserAwards(UUID userID);

    User retrieveUserUniform(UUID userID);

    User retrieveUserRole(UUID userID);

    User retrieveUserAll(UUID userID);

    public boolean deletePatrolCommitmentsInBatch(ArrayList<UUID> patrolCommitmentIDs);

    public boolean deleteEvalTrainingsInBatch(ArrayList<UUID> evalTrainingIDs);

    public boolean deleteOperationalTrainingsInBatch(ArrayList<UUID> operationalTrainingIDs);

    public boolean deleteOnSnowEvalsInBatch(ArrayList<UUID> onSnowEvalIDs);

    public boolean deletePacksInBatch(ArrayList<UUID> packIDs);

    public boolean deleteJacketsInBatch(ArrayList<UUID> jacketIDs);

    public boolean deleteVestsInBatch(ArrayList<UUID> vestIDs);

    public boolean deleteRolesInBatch(ArrayList<UUID> roleIDs);

    public User createNewUser(String username,
            String password,
            String firstName,
            String lastName,
            String email,
            String phoneNumber,
            String eventRole);
}
