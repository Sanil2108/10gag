package in.co.sanilkhurana.tengag.services;

import org.springframework.beans.factory.annotation.Autowired;

import in.co.sanilkhurana.tengag.models.Post;
import in.co.sanilkhurana.tengag.models.User;
import in.co.sanilkhurana.tengag.repositories.PostRepository;
import in.co.sanilkhurana.tengag.repositories.UserRepository;

import java.util.ArrayList;

public class PostRetrievalService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public void createPost(User user, Post post) {
        user = (User) userRepository.findById(user.getEmail()).get();

        post.setVotes(0);
        post.setComments(new ArrayList<>());
        post.setUser(user);

        user.addPost(post);

        userRepository.save(user);
        postRepository.save(post);
    }

    public boolean postExists(Long postId) {
        return postRepository.existsById(postId);
    }

    public boolean postExists(Post post) {
        return this.postExists(post.getId());
    }

    public void deletePost(Post post) {
        postRepository.delete(post);
    }

    public Post[] getAllPosts() {

    }

    public Post getCompletePost(Long postId) {

    }

}