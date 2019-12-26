package in.co.sanilkhurana.tengag.services;

import java.util.List;
import java.util.ArrayList;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.co.sanilkhurana.tengag.models.Comment;
import in.co.sanilkhurana.tengag.models.Post;
import in.co.sanilkhurana.tengag.repositories.CommentRepository;
import in.co.sanilkhurana.tengag.repositories.PostRepository;

@Service
public class CommentRetrievalService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;
    
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

    public boolean commentExists(Comment comment) {
        return commentExists(comment.getId());
    }

}