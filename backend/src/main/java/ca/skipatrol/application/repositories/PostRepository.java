package ca.skipatrol.application.repositories;

import ca.skipatrol.application.models.cms.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {

}
