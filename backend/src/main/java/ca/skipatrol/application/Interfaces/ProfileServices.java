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

    int updateVest(Vest vest);

    int updateJacket(Jacket jacket);

    int updatePack(Pack pack);

    boolean deletePatrolCommitmentsInBatch(ArrayList<UUID> patrolCommitmentIDs);

    boolean deleteEvalTrainingsInBatch(ArrayList<UUID> evalTrainingIDs);

    boolean deleteOperationalTrainingsInBatch(ArrayList<UUID> operationalTrainingIDs);

    boolean deleteOnSnowEvalsInBatch(ArrayList<UUID> onSnowEvalIDs);

    boolean deletePacksInBatch(ArrayList<UUID> packIDs);

    boolean deleteJacketsInBatch(ArrayList<UUID> jacketIDs);

    boolean deleteVestsInBatch(ArrayList<UUID> vestIDs);

    boolean deleteRolesInBatch(ArrayList<UUID> roleIDs);

    boolean deleteAwardsInBatch(ArrayList<UUID> personAwardIDs);

    User createNewUser(String username,
            String password,
            String firstName,
            String lastName,
            String email,
            String phoneNumber,
            String eventRole);

    boolean editOnSnowEvals(UUID evalID, String discipline, String evaluatedBy, String evaluationDate );
}
