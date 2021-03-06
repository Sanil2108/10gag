package in.co.sanilkhurana.tengag.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
public class User {

    @Column
    private String userName;

    @Id
    private String email;

    @Column
    private String password;

    @OneToMany
    @JsonIgnore
    private List<Post> posts;

    @OneToMany
    @JsonIgnore
    private List<Comment> comments;

    @OneToOne
    private Token token;

    @ManyToMany
    @JsonIgnore
    private List<Comment> upvotedComments;

    @ManyToMany
    @JsonIgnore
    private List<Comment> downvotedComments;

    @ManyToMany
    @JsonIgnore
    private List<Post> upvotedPosts;

    @ManyToMany
    @JsonIgnore
    private List<Post> downvotedPosts;

    public User() {}

    public User(String userName, String email, String password) {
        this.userName = userName;
        this.email = email;
        this.password = password;
    }

    public List<Comment> getUpvotedComments() {
        return upvotedComments;
    }

    public void addUpvotedComment(Comment comment) {
        this.upvotedComments.add(comment);
    }

    public void removeUpvotedComment(Comment comment) {
        this.upvotedComments.remove(comment);
    }

    public List<Comment> getDownvotedComments() {
        return downvotedComments;
    }

    public void addDownvotedComment(Comment comment) {
        this.downvotedComments.add(comment);
    }

    public void removeDownvotedComment(Comment comment) {
        this.downvotedComments.remove(comment);
    }

    public List<Post> getDownvotedPosts() {
        return downvotedPosts;
    }

    public void addDownvotedPost(Post post) {
        this.downvotedPosts.add(post);
    }

    public void removeDownvotedPost(Post post) {
        this.downvotedPosts.remove(post);
    }

    public List<Post> getUpvotedPosts() {
        return upvotedPosts;
    }

    public void addUpvotedPost(Post post) {
        this.upvotedPosts.add(post);
    }

    public void removeUpvotedPost(Post post) {
        this.upvotedPosts.remove(post);
    }

    public void addComment(Comment comment) {
        comments.add(comment);
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public Token getToken() {
        return this.token;
    }

    public void setToken(Token token) {
        this.token = token;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void addPost(Post p) {
        posts.add(p);
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "{" +
            ", userName='" + getUserName() + "'" +
            ", email='" + getEmail() + "'" +
            ", password='" + getPassword() + "'" +
            "}";
    }


}