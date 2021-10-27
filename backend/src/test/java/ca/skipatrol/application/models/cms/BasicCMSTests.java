package ca.skipatrol.application.models.cms;

import ca.skipatrol.application.models.cms.Comment;
import ca.skipatrol.application.models.cms.Post;
import ca.skipatrol.application.repositories.PostRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Objects;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class BasicCMSTests {

    @Autowired
    PostRepository postRepository;

    @Test
    void testListComments() {
        Post newPost = new Post();

        Comment newComment1 = new Comment();
        newComment1.setPost(newPost);

        Comment newComment2 = new Comment();
        newComment2.setPost(newPost);

        newPost.addComment(newComment1);
        newPost.addComment(newComment2);

        postRepository.save(newPost);

        Optional<Post> postResult = postRepository.findById(newPost.getId());
        assertTrue(postResult.isPresent());

        Post foundPost = postResult.get();
        assertTrue(foundPost.getComments().size() > 0);

        Set<Comment> postComments = foundPost.getComments();
        assertTrue(postComments.stream().anyMatch(c -> Objects.equals(c.getId(), newComment1.getId())));
        assertTrue(postComments.stream().anyMatch(c -> Objects.equals(c.getId(), newComment2.getId())));

        postRepository.delete(foundPost);
    }

}
