package ca.skipatrol.application.services;

import ca.skipatrol.application.Interfaces.LookupServices;
import ca.skipatrol.application.Interfaces.ProfileServices;
import ca.skipatrol.application.models.*;
import ca.skipatrol.application.repositories.*;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class ProfileServicesImpl implements ProfileServices {

    // region Repository Declarations
    @Autowired
    UniformRepository uniformRepository;
    @Autowired
    VestRepository vestRepository;
    @Autowired
    JacketRepository jacketRepository;
    @Autowired
    PackRepository packRepository;
    @Autowired
    PatrolCommitmentRepository patrolCommitmentRepository;
    @Autowired
    PersonAwardRepository personAwardRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    EmergencyContactRepository emergencyContactRepository;
    @Autowired
    OnSnowEvalRepository onSnowEvalRepository;
    @Autowired
    OperationalEventRepository operationalEventRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    EvalTrainingRepository evalTrainingRepository;
    @Autowired
    OperationalTrainingRepository operationalTrainingRepository;
    @Autowired
    DisciplineRepository disciplineRepository;
    // endregion

    // region Service Declarations
    @Autowired
    LookupServices lookupServices;
    // endregion

    // region Uniform-related API Calls
    boolean createUniformAll(Uniform uniform) {
        // Add checks for vest, jacket, pack, user, etc. where needed

        uniformRepository.save(uniform);

        return true;
    }

    public Uniform retrieveUniform(UUID uniformID, boolean getVests, boolean getJackets, boolean getPacks) {

        Uniform uniform = uniformRepository.getById(uniformID);

        Uniform returnVal = new Uniform(
                uniform.getUniformID(),
                uniform.getLeaseSigned(),
                uniform.getReturned(),
                uniform.getUser());

        if (getVests) {
            Hibernate.initialize(uniform.getVests().size());
            returnVal.setVests(uniform.getVests());
        }
        if (getJackets) {
            Hibernate.initialize(uniform.getJackets().size());
            returnVal.setJackets(uniform.getJackets());
        }
        if (getPacks) {
            Hibernate.initialize(uniform.getPacks().size());
            returnVal.setPacks(uniform.getPacks());
        }

        return returnVal;
    }
    // endregion

    // region User-related API Calls
    public User retrieveUserTrainingAndEvaluation(UUID userID, boolean getEvalTrainings, boolean getOpTrainings,
            boolean getOnSnowEvals) {
        Optional<User> userEntity = userRepository.findById(userID);

        if (userEntity.isPresent()) {
            User user = userEntity.get();
            User returnVal = new User(user.getUserID(),
                    user.getUsername(),
                    user.getPassword(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getPhoneNumber(),
                    user.getUserType());

            if (getEvalTrainings) {
                Hibernate.initialize(user.getEvalTrainings().size());
                returnVal.setEvalTrainings(user.getEvalTrainings());
            }
            if (getOpTrainings) {
                Hibernate.initialize(user.getOperationalTrainings().size());
                returnVal.setOperationalTrainings(user.getOperationalTrainings());
            }
            if (getOnSnowEvals) {
                Hibernate.initialize(user.getOnSnowEvals().size());
                returnVal.setOnSnowEvals(user.getOnSnowEvals());
            }

            return returnVal;
        }
        return null;
    }

    public User retrieveUserEmergencyContacts(UUID userID) {
        Optional<User> userEntity = userRepository.findById(userID);

        if (userEntity.isPresent()) {
            User user = userEntity.get();

            User returnVal = new User(user.getUserID(),
                    user.getUsername(),
                    user.getPassword(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getPhoneNumber(),
                    user.getUserType());

            Hibernate.initialize(user.getEmergencyContacts().size());
            returnVal.setEmergencyContacts(user.getEmergencyContacts());

            return returnVal;
        }
        return null;
    }

    public User retrieveUserPatrolCommitments(UUID userID) {
        Optional<User> userEntity = userRepository.findById(userID);

        if (userEntity.isPresent()) {
            User user = userEntity.get();

            User returnVal = new User(user.getUserID(),
                    user.getUsername(),
                    user.getPassword(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getPhoneNumber(),
                    user.getUserType());

            Hibernate.initialize(user.getPatrolCommitments().size());
            returnVal.setPatrolCommitments(user.getPatrolCommitments());

            return returnVal;
        }
        return null;
    }

    public User retrieveUserAwards(UUID userID) {
        Optional<User> userEntity = userRepository.findById(userID);

        if (userEntity.isPresent()) {
            User user = userEntity.get();

            User returnVal = new User(user.getUserID(),
                    user.getUsername(),
                    user.getPassword(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getPhoneNumber(),
                    user.getUserType());

            Hibernate.initialize(user.getPersonAwards().size());
            returnVal.setPersonAwards(user.getPersonAwards());

            return returnVal;
        }
        return null;
    }

    public User retrieveUserUniform(UUID userID) {
        Optional<User> userEntity = userRepository.findById(userID);

        if (userEntity.isPresent()) {
            User user = userEntity.get();

            User returnVal = new User(user.getUserID(),
                    user.getUsername(),
                    user.getPassword(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getPhoneNumber(),
                    user.getUserType());

            List<Uniform> uniforms = new ArrayList<Uniform>();

            if (user.getUniforms().size() > 0) {
                for (Uniform uniform : user.getUniforms()) {
                    Uniform returnUniform = retrieveUniform(uniform.getUniformID(), true, true, true);

                    uniforms.add(returnUniform);
                }
            }
            returnVal.setUniforms(uniforms);

            return returnVal;
        }
        return null;
    }

    public User retrieveUserRole(UUID userID) {
        Optional<User> userEntity = userRepository.findById(userID);

        if (userEntity.isPresent()) {
            User user = userEntity.get();

            User returnVal = new User(user.getUserID(),
                    user.getUsername(),
                    user.getPassword(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getPhoneNumber(),
                    user.getUserType());

            returnVal.setRole(user.getRole());

            return returnVal;
        }
        return null;
    }

    public User retrieveUserAll(UUID userID) {
        Optional<User> userEntity = userRepository.findById(userID);

        if (userEntity.isPresent()) {
            User user = userEntity.get();

            User returnVal = new User(user.getUserID(),
                    user.getUsername(),
                    user.getPassword(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getPhoneNumber(),
                    user.getUserType());

            Hibernate.initialize(user.getEvalTrainings().size());
            returnVal.setEvalTrainings(user.getEvalTrainings());
            Hibernate.initialize(user.getOperationalTrainings().size());
            returnVal.setOperationalTrainings(user.getOperationalTrainings());
            Hibernate.initialize(user.getOnSnowEvals().size());
            returnVal.setOnSnowEvals(user.getOnSnowEvals());
            Hibernate.initialize(user.getEmergencyContacts().size());
            returnVal.setEmergencyContacts(user.getEmergencyContacts());
            Hibernate.initialize(user.getPatrolCommitments().size());
            returnVal.setPatrolCommitments(user.getPatrolCommitments());
            Hibernate.initialize(user.getPersonAwards().size());
            returnVal.setPersonAwards(user.getPersonAwards());
            returnVal.setRole(user.getRole());

            return returnVal;
        }
        return null;
    }

    // endregion
    public boolean deletePatrolCommitmentsInBatch(ArrayList<UUID> patrolCommitmentIDs) {
        try {
            patrolCommitmentRepository.deleteAllByIdInBatch(patrolCommitmentIDs);
            for (UUID patrolCommitmentID : patrolCommitmentIDs) {
                assert (patrolCommitmentRepository.findById(patrolCommitmentID).isEmpty());
            }
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public boolean deleteEvalTrainingsInBatch(ArrayList<UUID> evalTrainingIDs) {
        try {
            evalTrainingRepository.deleteAllByIdInBatch(evalTrainingIDs);
            for (UUID evalTrainingID : evalTrainingIDs) {
                assert (evalTrainingRepository.findById(evalTrainingID).isEmpty());
            }
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public boolean deleteOperationalTrainingsInBatch(ArrayList<UUID> operationalTrainingIDs) {
        try {
            operationalTrainingRepository.deleteAllByIdInBatch(operationalTrainingIDs);
            for (UUID operationalTrainingID : operationalTrainingIDs) {
                assert (operationalTrainingRepository.findById(operationalTrainingID).isEmpty());
            }
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public boolean deleteOnSnowEvalsInBatch(ArrayList<UUID> onSnowEvalIDs) {
        try {
            onSnowEvalRepository.deleteAllByIdInBatch(onSnowEvalIDs);
            for (UUID onSnowEvalID : onSnowEvalIDs) {
                assert (onSnowEvalRepository.findById(onSnowEvalID).isEmpty());
            }
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public boolean deletePacksInBatch(ArrayList<UUID> packIDs) {
        try {
            packRepository.deleteAllByIdInBatch(packIDs);
            for (UUID packID : packIDs) {
                assert (packRepository.findById(packID).isEmpty());
            }
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public boolean deleteJacketsInBatch(ArrayList<UUID> jacketIDs) {
        try {
            jacketRepository.deleteAllByIdInBatch(jacketIDs);
            for (UUID jacketID : jacketIDs) {
                assert (jacketRepository.findById(jacketID).isEmpty());
            }
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public boolean deleteVestsInBatch(ArrayList<UUID> vestIDs) {
        try {
            vestRepository.deleteAllByIdInBatch(vestIDs);
            for (UUID vestID : vestIDs) {
                assert (vestRepository.findById(vestID).isEmpty());
            }
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public boolean deleteRolesInBatch(ArrayList<UUID> roleIDs) {
        try {
            roleRepository.deleteAllByIdInBatch(roleIDs);
            for (UUID roleID : roleIDs) {
                assert (roleRepository.findById(roleID).isEmpty());
            }
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public boolean deleteAwardsInBatch(ArrayList<UUID> personAwardIDs) {
        try {
            personAwardRepository.deleteAllByIdInBatch(personAwardIDs);
            for (UUID personAwardID : personAwardIDs) {
                assert (personAwardRepository.findById(personAwardID).isEmpty());
            }
            return true;
        } catch (Exception ex) {
            return false;
        }
    }


    public User createNewUser(String username,
            String password,
            String firstName,
            String lastName,
            String email,
            String phoneNumber,
            String eventRole) {

        Optional<User> userLookup = this.userRepository.findByUsername(username);
        if (!userLookup.isEmpty()) {
            return null;
        }
        userLookup = this.userRepository.findByEmail(email);
        if (!userLookup.isEmpty()) {
            return null;
        }

        User myUser = new User(username, new BCryptPasswordEncoder().encode(password), firstName, lastName, email,
                phoneNumber, EventRole.valueOf(eventRole));

        this.userRepository.save(myUser);
        Optional<User> userEntity = userRepository.findByUsername(username);
        User user = userEntity.get();

        Uniform uniform = new Uniform(false, false, user);
        uniformRepository.save(uniform);
        emergencyContactRepository.save(new EmergencyContact("", "", "", user));
        Role role = new Role(false, false, false, false,
                false, true, false,
                false, false, false, false, user);
        this.roleRepository.save(role);
        userEntity = userRepository.findByUsername(username);
        user = userEntity.get();
        User returnVal = new User(user.getUserID(),
                user.getUsername(),
                user.getPassword(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getUserType());

        return returnVal;

    }

    public boolean editOnSnowEvals(UUID evalID, String discipline, String evaluatedBy, String evaluationDate){
        LocalDate theDate = LocalDate.parse(evaluationDate);

        Optional<Discipline> disciplineSearch = disciplineRepository.findByDescription(discipline);

        if(disciplineSearch.isEmpty()){
            return false;
        }

        Optional<OnSnowEval> onSnowEvalSearch = onSnowEvalRepository.findById(evalID);
        if(onSnowEvalSearch.isEmpty()){
            return false;
        }

        OnSnowEval myEval = onSnowEvalSearch.get();
        myEval.setDiscipline(disciplineSearch.get());
        myEval.setEvaluationDate(theDate);
        myEval.setEvaluatedBy(evaluatedBy);

        return true;
    }

    public boolean editOperationalTrainings(UUID evalID, String operationalEvent, String evaluationDate ){
        LocalDate theDate = LocalDate.parse(evaluationDate);

        Optional<OperationalEvent> opEventSearch = operationalEventRepository.findByDescription(operationalEvent);

        if(opEventSearch.isEmpty()){
            return false;
        }

        Optional<OperationalTraining> opTrainingSearch = operationalTrainingRepository.findById(evalID);
        if(opTrainingSearch.isEmpty()){
            return false;
        }

        OperationalTraining myTraining = opTrainingSearch.get();
        myTraining.setOperationalEvent(opEventSearch.get());
        myTraining.setCompletedDate(theDate);
        return true;
    }
}
