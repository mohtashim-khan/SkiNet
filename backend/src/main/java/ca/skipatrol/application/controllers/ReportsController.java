package ca.skipatrol.application.controllers;


import ca.skipatrol.application.Interfaces.ReportsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReportsController {

    @Autowired
    ReportsServices reportsServices;





}
