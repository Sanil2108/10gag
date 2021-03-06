package in.co.sanilkhurana.tengag.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    private String imageURL;

    @Column
    private int votes;

    @ManyToOne
    @JsonIgnore
    private User user;

    @OneToMany
    private List<Comment> comments;

    @Column
    private Long date;

    @JsonIgnore
    @ManyToMany(mappedBy = "upvotedPosts")
    private List<User> upvotedBy;

    @JsonIgnore
    @ManyToMany(mappedBy = "downvotedPosts")
    private List<User> downvotedBy;

    public Post() {
    }

    public Post(Long id, String title, int votes, User user, String imageURL) {
        this.id = id;
        this.title = title;
        this.votes = votes;
        this.user = user;
        this.imageURL = imageURL;
    }

    public List<User> getDownvotedBy() {
        return downvotedBy;
    }

    public void addDownvotedBy(User user) {
        this.downvotedBy.add(user);
    }

    public void removeDownvotedBy(User user) {
        this.downvotedBy.remove(user);
    }

    public List<User> getUpvotedBy() {
        return upvotedBy;
    }

    public void addUpvotedBy(User user) {
        this.upvotedBy.add(user);
    }

    public void removeUpvotedBy(User user) {
        this.upvotedBy.remove(user);
    }

    public void setDate(Long date) {
        this.date = date;
    }

    public Long getDate() {
        return date;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public String getImageURL() {
        return imageURL;
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