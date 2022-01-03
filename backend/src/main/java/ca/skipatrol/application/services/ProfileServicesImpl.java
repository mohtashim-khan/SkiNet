package ca.skipatrol.application.services;

import ca.skipatrol.application.Interfaces.LookupServices;
import ca.skipatrol.application.Interfaces.ProfileServices;
import ca.skipatrol.application.models.*;
import ca.skipatrol.application.repositories.*;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Lookup;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.UUID;

@Service
@Transactional
public class ProfileServicesImpl implements ProfileServices {

    //region Repository Declarations
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
    //endregion

    //region Service Declarations
    @Autowired
    LookupServices lookupServices;
    //endregion

    boolean createUniformAll(Uniform uniform)
    {
        // Add checks for vest, jacket, pack, user, etc. where needed

        uniformRepository.save(uniform);

        return true;
    }

    public Uniform retrieveUniform(UUID uniformID, boolean getVests, boolean getJackets, boolean getPacks)
    {

        Uniform uniform = uniformRepository.getById(uniformID);

        Uniform returnVal = new Uniform(
                uniform.getUniformID(),
                uniform.getLeaseSigned(),
                uniform.getReturned(),
                uniform.getUser());

        if(getVests) {
            Hibernate.initialize(uniform.getVests().size());
            returnVal.setVests(uniform.getVests());
        }
        if(getJackets) {
            Hibernate.initialize(uniform.getJackets().size());
            returnVal.setJackets(uniform.getJackets());
        }
        if(getPacks) {
            Hibernate.initialize(uniform.getPacks().size());
            returnVal.setPacks(uniform.getPacks());
        }

        return returnVal;
    }

    public User retrieveUserTrainingAndEvaluation(UUID userID, boolean getEvalTrainings, boolean getOpTrainings, boolean getOnSnowEvals)
    {
        User user = userRepository.findById(userID).get();

        User returnVal = new User(user.getUserID(),
                user.getUsername(),
                user.getPassword(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhoneNumber());

        if(getEvalTrainings) {
            Hibernate.initialize(user.getEvalTrainings().size());
            returnVal.setEvalTrainings(user.getEvalTrainings());
        }
        if(getOpTrainings) {
            Hibernate.initialize(user.getOperationalTrainings().size());
            returnVal.setOperationalTrainings(user.getOperationalTrainings());
        }
        if (getOnSnowEvals) {
            Hibernate.initialize(user.getOnSnowEvals().size());
            returnVal.setOnSnowEvals(user.getOnSnowEvals());
        }

        return returnVal;
    }

}


















