package ca.skipatrol.application.controllers;

import ca.skipatrol.application.Interfaces.PostServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PostsController {

    @Autowired
    PostServices postServices;

    @RequestMapping(value = "/customapi/posts/search", method = RequestMethod.POST, headers = "Content-Type=application/json")
    public ResponseEntity<Object> search(@RequestBody List<String> searchTerms) {
        return new ResponseEntity<>(postServices.getPostsWhereTitleOrBodyContainsAnyWord(searchTerms), HttpStatus.OK);
    }

}
