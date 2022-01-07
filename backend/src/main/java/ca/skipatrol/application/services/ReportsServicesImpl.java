package ca.skipatrol.application.services;


import ca.skipatrol.application.Interfaces.ReportsServices;
import ca.skipatrol.application.models.OnSnowEval;
import ca.skipatrol.application.models.Role;
import ca.skipatrol.application.models.Uniform;
import ca.skipatrol.application.models.User;
import ca.skipatrol.application.repositories.OnSnowEvalRepository;
import ca.skipatrol.application.repositories.OperationalTrainingRepository;
import ca.skipatrol.application.repositories.RoleRepository;
import ca.skipatrol.application.repositories.UniformRepository;
import ca.skipatrol.application.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import com.google.gson.JsonObject;

@Service
@Transactional
public class ReportsServicesImpl implements ReportsServices {

    @Autowired
    UserRepository userRepository;




    @Override
    public void getReportData(JsonObject reportDataJSON) {
        
        
    }
    


}
