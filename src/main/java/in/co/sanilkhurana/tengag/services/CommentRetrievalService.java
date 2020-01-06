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

    public Comment getComment(Long commentId) {
        return commentRepository.findById(commentId).get();
    }

    public Comment getComment(Comment comment) {
        return this.getComment(comment.getId());
    }

    public void upvoteComment(User user, Comment comment) {
        comment = commentRepository.findById(comment.getId()).get();
        user = userRepository.findById(user.getEmail()).get();

        // TODO: Equals in comment based on id
        if (user.getUpvotedComments().contains(comment)) {
            user.removeUpvotedComment(comment);
            comment.removeUpvotedBy(user);
            comment.setPoints(comment.getPoints() - 1);
        }
        else if (user.getDownvotedComments().contains(comment)) {
            user.removeDownvotedComment(comment);
            user.addUpvotedComment(comment);
            comment.removeDownvotedBy(user);
            comment.addUpvotedBy(user);
            comment.setPoints(comment.getPoints() + 2);
        }
        else {
            user.addUpvotedComment(comment);
            comment.addUpvotedBy(user);
            comment.setPoints(comment.getPoints() + 1);
        }

        userRepository.save(user);
        commentRepository.save(comment);
    }

    public void downvoteComment(User user, Comment comment) {
        comment = commentRepository.findById(comment.getId()).get();
        user = userRepository.findById(user.getEmail()).get();

        // TODO: Equals in comment based on id
        if (user.getUpvotedComments().contains(comment)) {
            user.removeUpvotedComment(comment);
            comment.removeUpvotedBy(user);
            user.addDownvotedComment(comment);
            comment.addDownvotedBy(user);
            comment.setPoints(comment.getPoints() - 2);
        }
        else if (user.getDownvotedComments().contains(comment)) {
            user.removeDownvotedComment(comment);
            comment.removeDownvotedBy(user);
            comment.setPoints(comment.getPoints() + 1);
        }
        else {
            user.addDownvotedComment(comment);
            comment.addDownvotedBy(user);
            comment.setPoints(comment.getPoints() - 1);
        }

        userRepository.save(user);
        commentRepository.save(comment);
    }

    public boolean commentExists(Comment comment) {
        return commentExists(comment.getId());
    }

}