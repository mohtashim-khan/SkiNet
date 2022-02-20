package ca.skipatrol.application.Interfaces;

import ca.skipatrol.application.models.*;
import com.google.gson.JsonObject;

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

    Vest ParseVestJson(JsonObject vestJSON);

    Jacket ParseJacketJson(JsonObject vestJSON);

    Pack ParsePackJson(JsonObject vestJSON);

    PatrolCommitment ParsePatrolCommitmentJson(JsonObject patrolCommitmentJSON);

    PersonAward ParsePersonAwardJson(JsonObject personAwardJSON);

    int UpdateVest(Vest vest);

    int UpdateJacket(Jacket jacket);

    int UpdatePack(Pack pack);

    int UpdatePatrolCommitment(PatrolCommitment patrolCommitment);

    int UpdatePersonAward(PersonAward personAward);

    public boolean deletePatrolCommitmentsInBatch(ArrayList<UUID> patrolCommitmentIDs);

    public boolean deleteEvalTrainingsInBatch(ArrayList<UUID> evalTrainingIDs);

    public boolean deleteOperationalTrainingsInBatch(ArrayList<UUID> operationalTrainingIDs);

    public boolean deleteOnSnowEvalsInBatch(ArrayList<UUID> onSnowEvalIDs);

    public boolean deletePacksInBatch(ArrayList<UUID> packIDs);

    public boolean deleteJacketsInBatch(ArrayList<UUID> jacketIDs);

    public boolean deleteVestsInBatch(ArrayList<UUID> vestIDs);

    public boolean deleteRolesInBatch(ArrayList<UUID> roleIDs);

    public boolean deleteAwardsInBatch(ArrayList<UUID> personAwardIDs);

    public User createNewUser(String username,
            String password,
            String firstName,
            String lastName,
            String email,
            String phoneNumber,
            String eventRole);

    public boolean editOnSnowEvals(UUID evalID, String discipline, String evaluatedBy, String evaluationDate );

    public boolean editOperationalTrainings(UUID evalID, String operationalEvent, String evaluationDate );
}
