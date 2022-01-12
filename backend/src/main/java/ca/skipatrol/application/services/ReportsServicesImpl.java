package ca.skipatrol.application.services;

import ca.skipatrol.application.Interfaces.ReportsServices;
import ca.skipatrol.application.models.Discipline;
import ca.skipatrol.application.models.EvalTraining;
import ca.skipatrol.application.models.OnSnowEval;
import ca.skipatrol.application.models.OperationalEvent;
import ca.skipatrol.application.models.OperationalTraining;
import ca.skipatrol.application.models.PatrolCommitment;
import ca.skipatrol.application.models.Role;
import ca.skipatrol.application.models.Season;
import ca.skipatrol.application.models.Uniform;
import ca.skipatrol.application.models.User;
import ca.skipatrol.application.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
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

    //Inject Entity Manager via PresistanceContext tag
    @PersistenceContext
    private EntityManager em;

    @Override
    public void getReportData(JsonObject inputDataJSON) {

        // Deserialize JSON input into Java Attributes
        Gson gson = new Gson();
        String[] disciplineType = gson.fromJson(inputDataJSON.get("disciplineType"), String[].class);
        LocalDate dateEvaluated = LocalDate.parse(gson.fromJson(inputDataJSON.get("dateEvaluated"), String.class));
        String evaluatedBy = gson.fromJson(inputDataJSON.get("evaluatedBy"), String.class);
        String eventType = gson.fromJson(inputDataJSON.get("eventType"), String.class);
        LocalDate dateCompleted = LocalDate.parse(gson.fromJson(inputDataJSON.get("dateCompleted"), String.class));
        String evalEventType = gson.fromJson(inputDataJSON.get("evalEventType"), String.class);
        LocalDate evalDateCompleted = LocalDate
                .parse(gson.fromJson(inputDataJSON.get("evalDateCompleted"), String.class));
        String patrollerEventType = gson.fromJson(inputDataJSON.get("patrollerEventType"), String.class);
        LocalDate patrollerDateCompleted = LocalDate
                .parse(gson.fromJson(inputDataJSON.get("patrollerDateCompleted"), String.class));
        Boolean commitmentAchieved = gson.fromJson(inputDataJSON.get("commitmentAchieved"), Boolean.class);
        Integer numberofCommitmentDays = gson.fromJson(inputDataJSON.get("numberofCommitmentDays"), Integer.class);
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

        // Criteria API BoilerPlate
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<User> query = builder.createQuery(User.class);
        Root<User> user = query.from(User.class);

        
        //Predicate (Conditions) Array List
        ArrayList<Predicate> conditions = new ArrayList<>();

        //Join OnSnow Eval tables
        Join<User, OnSnowEval>onSnowEvalJoin = user.join("onSnowEvals");
        Join<OnSnowEval, Discipline> disciplineJoin = onSnowEvalJoin.join("discipline");

        //Join Evaltraining
        Join<User, EvalTraining> evalTrainingJoin = disciplineJoin.join("evalTrainings");

        //Join OperationalTraining
        Join<User, OperationalTraining> opTrainingJoin = evalTrainingJoin.join("evalTrainings");
        Join<OperationalTraining, OperationalEvent> opEventJoin = opTrainingJoin.join("operationalEvent");

        //Join Patrol Commitment
        Join<User, PatrolCommitment> patrolCommitJoin = opEventJoin.join("patrolCommitments");
        Join<PatrolCommitment, Season> seasonJoin = patrolCommitJoin.join("season");

        //Join Role
        Join<User, Role> roleJoin = seasonJoin.join("role");
        
        //Join Uniform and Equipment
        Join<User, Uniform> uniformJoin = roleJoin.join("uniform");
        









    }

}
