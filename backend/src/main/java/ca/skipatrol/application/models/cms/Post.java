package ca.skipatrol.application.models.cms;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Post {

    @Id
    @GeneratedValue
    @Getter
    private Long id;

    @Column
    private String body;

    @Column(insertable = false,
            updatable = false,
            columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    @Getter
    private LocalDateTime publishedDate;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Getter
    private final Set<Comment> comments = new HashSet<>();

    public void addComment(Comment comment) {
        comments.add(comment);
    }

}
