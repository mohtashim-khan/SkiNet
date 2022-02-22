package ca.skipatrol.application.repositories;

import ca.skipatrol.application.models.cms.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, Long>, JpaSpecificationExecutor<Post> {

    Optional<Post> findByTitle(String title);
    List<Post> findByTopic_TopicID(UUID topicID);

}
