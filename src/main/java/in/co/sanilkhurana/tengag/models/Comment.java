package in.co.sanilkhurana.tengag.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String text;

    @Column
    private int points;

    @ManyToOne
    private User originalPoster;

    @ManyToOne
    @JsonIgnore
    private Comment parentComment;

    @ManyToOne
    @JsonIgnore
    private Post parentPost;

    @OneToMany
    private List<Comment> childrenComments;


    public Comment() {
    }

    public Comment(String text, int points, User originalPoster, List<Comment> childrenComments) {
        this.text = text;
        this.points = points;
        this.originalPoster = originalPoster;
        this.childrenComments = childrenComments;
    }

    public Long getId() {
        return id;
    }

    public Comment getParentComment() {
        return parentComment;
    }

    public void setParentComment(Comment parentComment) {
        this.parentComment = parentComment;
    }

    public Post getParentPost() {
        return parentPost;
    }

    public void setParentPost(Post parentPost) {
        this.parentPost = parentPost;
    }

    public String getText() {
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getPoints() {
        return this.points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public User getOriginalPoster() {
        return this.originalPoster;
    }

    public void setOriginalPoster(User originalPoster) {
        this.originalPoster = originalPoster;
    }

    public List<Comment> getChildrenComments() {
        return this.childrenComments;
    }

    public void setChildrenComments(List<Comment> childrenComments) {
        this.childrenComments = childrenComments;
    }

    public void addChildComment(Comment comment) {
        this.childrenComments.add(comment);
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", text='" + getText() + "'" +
            ", points='" + getPoints() + "'" +
            ", originalPoster='" + getOriginalPoster() + "'" +
            ", childrenComments='" + getChildrenComments() + "'" +
            "}";
    }

}