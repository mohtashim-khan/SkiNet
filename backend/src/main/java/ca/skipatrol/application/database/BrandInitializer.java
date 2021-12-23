package ca.skipatrol.application.database;



import ca.skipatrol.application.models.Brand;
import ca.skipatrol.application.repositories.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class BrandInitializer implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    private BrandRepository brandRepository;
    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {

        Optional <Brand> BrandLookup = this.brandRepository.getBrandByName("Spyder");
        if (BrandLookup.isEmpty()) {
            Brand testSpyder = new Brand("Spyder");
            this.brandRepository.save(testSpyder);

        }

        BrandLookup = this.brandRepository.getBrandByName("North Face");
        if (BrandLookup.isEmpty()) {
            Brand testNorthFace = new Brand("North Face");
            this.brandRepository.save(testNorthFace);

        }

        BrandLookup = this.brandRepository.getBrandByName("Helly Hansen");
        if (BrandLookup.isEmpty()) {
            Brand testHellyHansen = new Brand("Helly Hansen");
            this.brandRepository.save(testHellyHansen);

        }

    }

}