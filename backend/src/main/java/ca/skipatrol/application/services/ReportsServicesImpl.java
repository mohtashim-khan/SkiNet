package ca.skipatrol.application.services;

import ca.skipatrol.application.Interfaces.ReportsServices;
import ca.skipatrol.application.models.Award;
import ca.skipatrol.application.models.Brand;
import ca.skipatrol.application.models.Discipline;
import ca.skipatrol.application.models.EvalTraining;
import ca.skipatrol.application.models.Jacket;
import ca.skipatrol.application.models.OnSnowEval;
import ca.skipatrol.application.models.OperationalEvent;
import ca.skipatrol.application.models.OperationalTraining;
import ca.skipatrol.application.models.Pack;
import ca.skipatrol.application.models.PatrolCommitment;
import ca.skipatrol.application.models.PersonAward;
import ca.skipatrol.application.models.Role;
import ca.skipatrol.application.models.Season;
import ca.skipatrol.application.models.Size;
import ca.skipatrol.application.models.Uniform;
import ca.skipatrol.application.models.User;
import ca.skipatrol.application.models.Vest;
import ca.skipatrol.application.repositories.UserRepository;
import ch.qos.logback.core.joran.conditional.Condition;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.Metamodel;
import javax.transaction.Transactional;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

//Added Repository tag to service since it interacts with db
@Service
@Repository
@Transactional
public class ReportsServicesImpl implements ReportsServices {

    // Inject Entity Manager via PresistanceContext tag
    @PersistenceContext
    private EntityManager em;

    @Override
    public List<User> getReportData(JsonObject inputDataJSON) {

        // Deserialize JSON input into Java Attributes
        Gson gson = new Gson();

        // OnSnowEval
        String onSnowDisciplineType = gson.fromJson(inputDataJSON.get("onSnowDisciplineType"), String.class);
        LocalDate onSnowDateEvaluated = LocalDate
                .parse(gson.fromJson(inputDataJSON.get("onSnowDateEvaluated"), String.class));
        String onSnowEvaluatedBy = gson.fromJson(inputDataJSON.get("onSnowEvaluatedBy"), String.class);

        // EvalTraining
        String evalEventType = gson.fromJson(inputDataJSON.get("evalEventType"), String.class);
        LocalDate evalDateCompleted = LocalDate
                .parse(gson.fromJson(inputDataJSON.get("evalDateCompleted"), String.class));

        // Operational Training
        String patrollerEventType = gson.fromJson(inputDataJSON.get("patrollerEventType"), String.class);
        LocalDate patrollerDateCompleted = LocalDate
                .parse(gson.fromJson(inputDataJSON.get("patrollerDateCompleted"), String.class));

        // Patrol Commitment
        Boolean commitmentAchieved = gson.fromJson(inputDataJSON.get("commitmentAchieved"), Boolean.class);
        Integer numberofCommitmentDays = gson.fromJson(inputDataJSON.get("numberofCommitmentDays"), Integer.class);
        String season = gson.fromJson(inputDataJSON.get("season"), String.class);

        // Roles
        Boolean admin = gson.fromJson(inputDataJSON.get("admin"), Boolean.class);
        Boolean pl = gson.fromJson(inputDataJSON.get("pl"), Boolean.class);
        Boolean apl = gson.fromJson(inputDataJSON.get("apl"), Boolean.class);
        Boolean hl = gson.fromJson(inputDataJSON.get("hl"), Boolean.class);
        Boolean active = gson.fromJson(inputDataJSON.get("active"), Boolean.class);
        Boolean newUser = gson.fromJson(inputDataJSON.get("newUser"), Boolean.class);
        Boolean trainingEventLead = gson.fromJson(inputDataJSON.get("trainingEventLead"), Boolean.class);
        Boolean onSnowEvaluator = gson.fromJson(inputDataJSON.get("newUser"), Boolean.class);
        Boolean orienteerer = gson.fromJson(inputDataJSON.get("orienteerer"), Boolean.class);
        Boolean recruitmentLead = gson.fromJson(inputDataJSON.get("recruitmentLead"), Boolean.class);
        Boolean p0Lead = gson.fromJson(inputDataJSON.get("p0Lead"), Boolean.class);

        // Uniform and Equipment
        String jacketBrand = gson.fromJson(inputDataJSON.get("jacketBrand"), String.class);
        String jacketSize = gson.fromJson(inputDataJSON.get("jacketSize"), String.class);
        String jacketCondition = gson.fromJson(inputDataJSON.get("jacketCondition"), String.class);
        String jacketNumber = gson.fromJson(inputDataJSON.get("jacketCondition"), String.class);

        String vestNumber = gson.fromJson(inputDataJSON.get("vestNumber"), String.class);
        String vestBrand = gson.fromJson(inputDataJSON.get("vestBrand"), String.class);
        String vestSize = gson.fromJson(inputDataJSON.get("vestSize"), String.class);
        String vestCondition = gson.fromJson(inputDataJSON.get("vestCondition"), String.class);

        String packNumber = gson.fromJson(inputDataJSON.get("packNumber"), String.class);
        String packBrand = gson.fromJson(inputDataJSON.get("packBrand"), String.class);
        String packSize = gson.fromJson(inputDataJSON.get("packSize"), String.class);
        String packCondition = gson.fromJson(inputDataJSON.get("packCondition"), String.class);

        Boolean uniformLeaseSigned = gson.fromJson(inputDataJSON.get("uniformLeaseSigned"), Boolean.class);
        Boolean uniformReturned = gson.fromJson(inputDataJSON.get("uniformReturned"), Boolean.class);

        // Awards
        String [] awards = gson.fromJson(inputDataJSON.get("awards"), String[].class);


        // General Section -- Emergency Contact
        Boolean hasEmergencyContact = gson.fromJson(inputDataJSON.get("hasEmergencyContact"), Boolean.class);

        // Criteria API BoilerPlate
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<User> query = builder.createQuery(User.class);

        // Define user as root class
        Root<User> user = query.from(User.class);

        // Predicate (Conditions) Array List
        ArrayList<Predicate> conditions = new ArrayList<>();

        // Join OnSnow Eval tables
        if (onSnowDisciplineType != null || onSnowDateEvaluated != null || onSnowEvaluatedBy != null) {
            Join<User, OnSnowEval> onSnowEvalJoin = user.join("onSnowEvals");

            if (onSnowDateEvaluated != null) {
                conditions.add(builder.equal(onSnowEvalJoin.get("evaluationDate"), onSnowDateEvaluated));
            }

            if (onSnowEvaluatedBy != null) {
                conditions.add(builder.equal(onSnowEvalJoin.get("evaluatedBy"), onSnowEvaluatedBy));
            }

            if (onSnowDisciplineType != null) {
                Join<OnSnowEval, Discipline> disciplineJoin = onSnowEvalJoin.join("discipline");
                conditions.add(builder.equal(disciplineJoin.get("description"), onSnowDisciplineType));
            }

        }

        // Join Evaltraining -- Why do we have a single table for this whilst we have a
        // lookup for Operational Training for its Event description?
        if (evalEventType != null
                || evalDateCompleted != null) {
            Join<User, EvalTraining> evalTrainingJoin = user.join("evalTrainings");

            if (evalEventType != null) {
                conditions.add(builder.equal(evalTrainingJoin.get("eventType"), evalEventType));
            }

            if (evalDateCompleted != null) {
                conditions.add(builder.equal(evalTrainingJoin.get("completedDate"), evalDateCompleted));
            }
        }

        // Join OperationalTraining
        if (patrollerDateCompleted != null || patrollerEventType != null) {
            Join<User, OperationalTraining> opTrainingJoin = user.join("operationalTrainings");

            if (patrollerDateCompleted != null) {
                conditions.add(builder.equal(opTrainingJoin.get("completedDate"), patrollerDateCompleted));
            }

            if (patrollerEventType != null) {
                Join<OperationalTraining, OperationalEvent> opEventJoin = opTrainingJoin.join("operationalEvent");
                conditions.add(builder.equal(opEventJoin.get("description"), patrollerEventType));
            }
        }

        // Join Patrol Commitment
        if (season != null || numberofCommitmentDays != null || commitmentAchieved != null) {
            Join<User, PatrolCommitment> patrolCommitJoin = user.join("patrolCommitments");

            if (numberofCommitmentDays != null) {
                conditions.add(builder.equal(patrolCommitJoin.get("days"), numberofCommitmentDays));
            }

            if (commitmentAchieved != null) {
                conditions.add(builder.equal(patrolCommitJoin.get("achieved"), commitmentAchieved));
            }

            if (season != null) {
                Join<PatrolCommitment, Season> seasonJoin = patrolCommitJoin.join("season");
                conditions.add(builder.equal(seasonJoin.get("description"), season));
            }
        }

        // Join Role
        if (admin != null || pl != null || apl != null || hl != null || active != null || newUser != null
                || trainingEventLead != null || onSnowEvaluator != null || orienteerer != null
                || recruitmentLead != null || p0Lead != null) {
            Join<User, Role> roleJoin = user.join("role");
            if (admin != null) {
                conditions.add(builder.equal(roleJoin.get("admin"), admin));
            }

            if (pl != null) {
                conditions.add(builder.equal(roleJoin.get("pl"), pl));
            }

            if (apl != null) {
                conditions.add(builder.equal(roleJoin.get("apl"), apl));
            }

            if (hl != null) {
                conditions.add(builder.equal(roleJoin.get("hl"), hl));
            }

            if (active != null) {
                conditions.add(builder.equal(roleJoin.get("active"), active));
            }

            if (newUser != null) {
                conditions.add(builder.equal(roleJoin.get("newUser"), newUser));
            }

            if (trainingEventLead != null) {
                conditions.add(builder.equal(roleJoin.get("trainingEventLead"), trainingEventLead));
            }

            if (onSnowEvaluator != null) {
                conditions.add(builder.equal(roleJoin.get("onSnowEvaluator"), onSnowEvaluator));
            }

            if (orienteerer != null) {
                conditions.add(builder.equal(roleJoin.get("orienteerer"), orienteerer));
            }
            if (recruitmentLead != null) {
                conditions.add(builder.equal(roleJoin.get("recruitmentLead"), recruitmentLead));
            }
            if (trainingEventLead != null) {
                conditions.add(builder.equal(roleJoin.get("trainingEventLead"), trainingEventLead));
            }
            if (p0Lead != null) {
                conditions.add(builder.equal(roleJoin.get("p0Lead"), p0Lead));
            }

        }

        // Join Uniform and Equipment

        if (jacketBrand != null || jacketSize != null || jacketCondition != null || jacketNumber != null
                || vestBrand != null || vestSize != null || vestCondition != null || vestNumber != null
                || packBrand != null || packSize != null || packCondition != null || packNumber != null
                || uniformLeaseSigned != null || uniformReturned != null) {

            Join<User, Uniform> uniformJoin = user.join("uniform");

            if (uniformLeaseSigned != null) {
                conditions.add(builder.equal(uniformJoin.get("leaseSigned"), uniformLeaseSigned));
            }

            if (uniformReturned != null) {
                conditions.add(builder.equal(uniformJoin.get("returned"), uniformReturned));
            }

            if (jacketBrand != null || jacketSize != null || jacketCondition != null || jacketNumber != null) {
                Join<Uniform, Jacket> jacketJoin = user.join("jackets");

                if (jacketBrand != null) {
                    Join<Jacket, Brand> brandJoin = jacketJoin.join("brand");
                    conditions.add(builder.equal(brandJoin.get("description"), jacketBrand));
                }

                if (jacketSize != null) {
                    Join<Jacket, Size> sizeJoin = jacketJoin.join("size");
                    conditions.add(builder.equal(sizeJoin.get("description"), jacketSize));
                }

                if (jacketCondition != null) {
                    Join<Jacket, Condition> conditionJoin = jacketJoin.join("size");
                    conditions.add(builder.equal(conditionJoin.get("description"), jacketCondition));
                }

                if (jacketNumber != null) {
                    conditions.add(builder.equal(jacketJoin.get("number"), jacketNumber));
                }

            }


            if (vestBrand != null || vestSize != null || vestCondition != null || vestNumber != null) {
                Join<Uniform, Vest> vestJoin = user.join("vests");

                if (vestBrand != null) {
                    Join<Vest, Brand> brandJoin = vestJoin.join("brand");
                    conditions.add(builder.equal(brandJoin.get("description"), vestBrand));
                }

                if (vestSize != null) {
                    Join<Vest, Size> sizeJoin = vestJoin.join("size");
                    conditions.add(builder.equal(sizeJoin.get("description"), vestSize));
                }

                if (vestCondition != null) {
                    Join<Vest, Condition> conditionJoin = vestJoin.join("size");
                    conditions.add(builder.equal(conditionJoin.get("description"), vestCondition));
                }

                if (vestNumber != null) {
                    conditions.add(builder.equal(vestJoin.get("number"), vestNumber));
                }

            }

            if (packBrand != null || packSize != null || packCondition != null || packNumber != null) {
                Join<Uniform, Pack> packJoin = user.join("packs");

                if (packBrand != null) {
                    Join<Pack, Brand> brandJoin = packJoin.join("brand");
                    conditions.add(builder.equal(brandJoin.get("description"), packBrand));
                }

                if (packSize != null) {
                    Join<Pack, Size> sizeJoin = packJoin.join("size");
                    conditions.add(builder.equal(sizeJoin.get("description"), packSize));
                }

                if (packCondition != null) {
                    Join<Pack, Condition> conditionJoin = packJoin.join("size");
                    conditions.add(builder.equal(conditionJoin.get("description"), packCondition));
                }

                if (packNumber != null) {
                    conditions.add(builder.equal(packJoin.get("number"), packNumber));
                }

            }
        }

        //Join Awards -- Only allowing a query by award Descriptions
        if(awards != null)
        {
            Join<User, PersonAward> personAwardJoin = user.join("personAwards");
            Join<PersonAward, Award> awardJoin = personAwardJoin.join("award");
            conditions.add(awardJoin.get("description").in((Object [])awards)); //TODO: TEST THIS

        }

        //Join Emergency Contacts
        if(hasEmergencyContact != null)
        {
            conditions.add(builder.equal(user.get("emergencyContacts").isNotNull(), hasEmergencyContact)); //TODO: TEST THIS
        }





        // Make Query
        TypedQuery<User> typedQuery = em.createQuery(query.select(user).where(conditions.toArray(new Predicate[] {})));

        // Return Results
        List<User> results = typedQuery.getResultList();
        return results;

    }

}
