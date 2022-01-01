package ca.skipatrol.application;

import ca.skipatrol.application.models.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class VisibleFieldConfiguration implements RepositoryRestConfigurer {

    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry corsRegistry) {
        config.exposeIdsFor(Brand.class);
        config.exposeIdsFor(Award.class);
        config.exposeIdsFor(Season.class);
        config.exposeIdsFor(Size.class);
        config.exposeIdsFor(User.class);
        config.exposeIdsFor(Discipline.class);
    }

}