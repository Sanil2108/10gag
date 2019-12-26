package in.co.sanilkhurana.tengag.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.co.sanilkhurana.tengag.models.Post;
import in.co.sanilkhurana.tengag.models.User;
import in.co.sanilkhurana.tengag.repositories.PostRepository;
import in.co.sanilkhurana.tengag.repositories.UserRepository;

import java.util.ArrayList;

@Service
public class PostRetrievalService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public Post createPost(User user, Post post) {
        user = (User) userRepository.findById(user.getEmail()).get();

        post.setVotes(0);
        post.setComments(new ArrayList<>());
        post.setUser(user);
        postRepository.save(post);

        user.addPost(post);

        userRepository.save(user);

        return post;
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

    public Iterable<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getCompletePost(Long postId) {
        return (Post) postRepository.findById(postId).get();
    }

}