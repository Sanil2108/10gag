package in.co.sanilkhurana.tengag.services;

import java.util.List;
import java.util.ArrayList;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.co.sanilkhurana.tengag.models.Comment;
import in.co.sanilkhurana.tengag.models.Post;
import in.co.sanilkhurana.tengag.models.User;
import in.co.sanilkhurana.tengag.repositories.CommentRepository;
import in.co.sanilkhurana.tengag.repositories.PostRepository;
import in.co.sanilkhurana.tengag.repositories.UserRepository;

@Service
public class CommentRetrievalService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;
    
    public Iterable<Comment> getAllCommentsOfPost(Post post) {
        return ((Post) postRepository.findById(post.getId()).get()).getComments();
    }

    public List<Comment> getAllChildrenComments(Comment comment) {
        return getAllChildrenComments(comment.getId());
    }

    public List<Comment> getAllChildrenComments(Long commentId) {
        List<Comment> comments = new ArrayList<Comment>();
        CollectionUtils.addAll(comments, ((Comment) commentRepository.findById(commentId).get()).getChildrenComments().iterator());
        return comments;
    }

    public boolean commentExists(Long commentId) {
        return commentRepository.existsById(commentId);
    }

    public void createReply(User user, Comment newComment, Comment parentComment) {
        newComment.setOriginalPoster(user);
        newComment.setPoints(0);
        newComment.setChildrenComments(new ArrayList<Comment>());
        newComment.setParentPost(null);
        newComment.setParentComment(parentComment);
        commentRepository.save(newComment);

        parentComment = (Comment) commentRepository.findById(parentComment.getId()).get();
        parentComment.addChildComment(newComment);
        commentRepository.save(parentComment);

        user = (User) userRepository.findById(user.getEmail()).get();
        user.addComment(newComment);
        userRepository.save(user);
    }

    public void createComment(User user, Comment comment, Post post) {
        comment.setOriginalPoster(user);
        comment.setPoints(0);
        comment.setChildrenComments(new ArrayList<Comment>());
        comment.setParentPost(post);
        comment.setParentComment(null);
        commentRepository.save(comment);

        post = (Post) postRepository.findById(post.getId()).get();
        post.addComment(comment);
        postRepository.save(post);

        user = (User) userRepository.findById(user.getEmail()).get();
        user.addComment(comment);
        userRepository.save(user);
    }

    public boolean commentExists(Comment comment) {
        return commentExists(comment.getId());
    }

}