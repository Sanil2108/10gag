package in.co.sanilkhurana.tengag.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;

import java.util.List;

@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column
    private int votes;

    @ManyToOne
    private User user;

    @OneToMany
    private List<Comment> comments;

    public Post() {
    }

    public Post(Long id, String title, int votes, User user) {
        this.id = id;
        this.title = title;
        this.votes = votes;
        this.user = user;
    }

    public List<Comment> getComments() {
        return this.comments;
    }
    
    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public void addComment(Comment comment) {
        this.comments.add(comment);
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getVotes() {
        return this.votes;
    }

    public void setVotes(int votes) {
        this.votes = votes;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", title='" + getTitle() + "'" +
            ", votes='" + getVotes() + "'" +
            ", user='" + getUser() + "'" +
            "}";
    }


}