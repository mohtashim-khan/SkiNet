package ca.skipatrol.application.models.cms;

import ca.skipatrol.application.models.PersonAward;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Post {

    @Id
    @GeneratedValue
    @Getter
    private Long id;

    @Column(columnDefinition="TEXT")
    @Getter
    @Setter
    private String title;

    @Column(columnDefinition="TEXT")
    @Getter
    @Setter
    private String body;

    @Getter
    @Setter
    @JoinColumn
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn
    private Topic topic;

    @Column(insertable = false,
            updatable = false,
            columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    @Getter
    private LocalDateTime publishedDate;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Getter
    private final Set<Comment> comments = new HashSet<>();

    @Getter
    @Setter
    @OneToMany(mappedBy = "post", fetch = FetchType.EAGER)
    private List<Attachment> attachments;

    public void addComment(Comment comment) {
        comments.add(comment);
    }

}
