package ca.skipatrol.application.database;

import ca.skipatrol.application.models.*;
import ca.skipatrol.application.models.cms.Post;
import ca.skipatrol.application.repositories.*;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.Optional;
import java.util.function.Function;

@Component
public final class TestDataSeeder implements ApplicationListener<ApplicationReadyEvent> {

        @Autowired
        private UserRepository userRepository;
        @Autowired
        private EventRepository eventRepository;
        @Autowired
        private AreaRepository areaRepository;
        @Autowired
        private EventLogRepository eventLogRepository;
        @Autowired
        private RoleRepository roleRepository;
        @Autowired
        private EvalTrainingRepository evalTrainingRepository;
        @Autowired
        private OperationalTrainingRepository operationalTrainingRepository;
        @Autowired
        private EmergencyContactRepository emergencyContactRepository;
        @Autowired
        private PatrolCommitmentRepository patrolCommitmentRepository;
        @Autowired
        private PersonAwardRepository personAwardRepository;

        @Autowired
        OperationalEventRepository operationalEventRepository;
        @Autowired
        DisciplineRepository disciplineRepository;
        @Autowired
        BrandRepository brandRepository;
        @Autowired
        SizeRepository sizeRepository;
        @Autowired
        ConditionsRepository conditionsRepository;
        @Autowired
        SeasonRepository seasonRepository;
        @Autowired
        AwardRepository awardRepository;

        @Autowired
        private OnSnowEvalRepository onSnowEvalRepository;
        @Autowired
        private PostRepository postRepository;

        @Override
        public void onApplicationEvent(ApplicationReadyEvent event) {
                Optional<User> userLookup = this.userRepository.findByUsername("username");
                if (userLookup.isEmpty()) {
                        User user = new User("username",
                                        new BCryptPasswordEncoder().encode("password"),
                                        "Isaac",
                                        "Newton",
                                        "test@email.com",
                                        "000-000-0000");
                        this.userRepository.save(user);

                        user = userRepository.findByUsername("username").get();
                        Role role = new Role(false, false, false, false,
                                        false, false, false,
                                        false, false, false, false, user);
                        this.roleRepository.save(role);

                        OperationalEvent operationalEvent = operationalEventRepository
                                        .findByDescription("Lift Evacuation").get();
                        Season season = seasonRepository.findByDescription("2023 - 2024").get();
                        Award award = awardRepository.findByDescription("The Lake Louise Family Award").get();

                        evalTrainingRepository.save(new EvalTraining("testEventType", LocalDateTime.now(), user));
                        operationalTrainingRepository
                                        .save(new OperationalTraining(LocalDateTime.now(), operationalEvent, user));
                        emergencyContactRepository.save(new EmergencyContact("Father", "000-000-0000", user));
                        patrolCommitmentRepository.save(new PatrolCommitment(false, 30, "testNote", season, user));
                        personAwardRepository.save(new PersonAward("testComment", award, season, user));
                }

                Optional<User> userLookup2 = this.userRepository.findByUsername("AAAAA");
                if (userLookup2.isEmpty()) {
                        User user = new User("AAAAA",
                                        new BCryptPasswordEncoder().encode("password"),
                                        "Michael",
                                        "Scott",
                                        "test@email.com",
                                        "000-000-0000");
                        this.userRepository.save(new User("AAAAA",
                                        new BCryptPasswordEncoder().encode("password"),
                                        "Michael",
                                        "Scott",
                                        "test@email.com",
                                        "000-000-0000"));
                        userLookup2 = Optional.of(user);

                        user = userRepository.findByUsername("AAAAA").get();
                        Role role = new Role(false, false, false, false,
                                        false, false, false,
                                        false, false, false, false, user);
                        this.roleRepository.save(role);
                        LocalDateTime date1 = LocalDateTime.of(2021, Month.JANUARY, 12, 12, 1);
                        Discipline testDiscipline = new Discipline("fuck");
                        disciplineRepository.save(testDiscipline);
                        OnSnowEval onSnowEval = new OnSnowEval(date1, testDiscipline, "branden", user);
                        this.onSnowEvalRepository.save(onSnowEval);
                }

                Optional<Event> eventLookup = this.eventRepository.findByEventName("testEventName");
                if (eventLookup.isEmpty()) {
                        LocalDateTime startDate_1 = LocalDateTime.of(2021, Month.JANUARY, 1, 12, 0, 0);
                        LocalDateTime endDate_1 = LocalDateTime.of(2021, Month.JANUARY, 12, 12, 1);
                        Event test = new Event("test_event", startDate_1, endDate_1, 1, 3, "yes", "yes", 1);
                        this.eventRepository.save(test);
                        eventLookup = Optional.of(test);
                }

                Optional<Area> areaLookup = this.areaRepository.findByAreaname("Scantron");
                if (areaLookup.isEmpty()) {
                        Area testArea = new Area("Scantron");
                        this.areaRepository.save(testArea);
                        areaLookup = Optional.of(testArea);
                }

                if (userLookup.isPresent() && areaLookup.isPresent() && eventLookup.isPresent()) {
                        LocalDateTime test_TimestampRostered = LocalDateTime.of(2021, Month.JANUARY, 12, 12, 1);
                        LocalDateTime test_TimestampRequest = LocalDateTime.of(2021, Month.JANUARY, 12, 12, 1);
                        EventLog testEventLog = new EventLog(
                                        eventLookup.get(),
                                        "test_event",
                                        "test_username",
                                        "test_name",
                                        areaLookup.get(),
                                        "test_role",
                                        "test_userType",
                                        "test_shadowing",
                                        "test_attendance",
                                        test_TimestampRostered,
                                        test_TimestampRequest,
                                        "test_Comment",
                                        "test_Email",
                                        "test_PhoneNumber",
                                        (byte) 1);
                        this.eventLogRepository.save(testEventLog);
                }

                seedTestPostData();
        }

        private void seedTestPostData() {
                {
                        String title = "Got Stuck? Try These Tips To Streamline Your SKI PATROL";
                        Optional<Post> testPost = this.postRepository.findByTitle(title);

                        if (testPost.isEmpty()) {
                                Post newTestPost = new Post();
                                newTestPost.setTitle(title);
                                newTestPost.setBody(
                                                "According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyways. Because bees don't care what humans think is impossible.");
                                this.postRepository.save(newTestPost);
                        }
                }

                {
                        String title = "Skiing Burnout Is Real. Here’s How to Avoid It";
                        Optional<Post> testPost = this.postRepository.findByTitle(title);

                        if (testPost.isEmpty()) {
                                Post newTestPost = new Post();
                                newTestPost.setTitle(title);
                                newTestPost.setBody("The Turks pay me a golden treasure. Yet, I am poor, \n" +
                                                " because I am a river to my people! Is \n" +
                                                " that service?" + "\n\n" +
                                                " There's nothing further here for a \n" +
                                                " warrior. We drive bargains. Old men's \n" +
                                                " work. Young men make wars and the virtues \n" +
                                                " of war are the virtues of young men; \n" +
                                                " courage and hope for the future. Then, \n" +
                                                " old men make the peace. And the vices of \n" +
                                                " peace are the vices of old men; mistrust \n" +
                                                " and caution. It must be so. What I owe \n" +
                                                " you is beyond evaluation. The power-\n" +
                                                " house, the telephone exchange - these I \n" +
                                                " concede; the pumping plant I must retain.");
                                this.postRepository.save(newTestPost);
                        }
                }

                int requiredTestPostCount = 20;
                for (long currentPostCount = this.postRepository
                                .count(); currentPostCount < requiredTestPostCount; currentPostCount++) {
                        int titleLength = 6;
                        int bodyLength = 20;
                        int defaultWordLength = 5;

                        Function<Integer, String> sentenceGenerator = (n) -> {
                                StringBuilder sb = new StringBuilder();
                                for (int i = 0; i < n; i++) {
                                        sb.append(RandomString.make(defaultWordLength));
                                        sb.append(" ");
                                }
                                return sb.toString();
                        };

                        Post newTestPost = new Post();
                        newTestPost.setTitle(sentenceGenerator.apply(titleLength));
                        newTestPost.setBody(sentenceGenerator.apply(bodyLength));
                        this.postRepository.save(newTestPost);
                }
        }

}