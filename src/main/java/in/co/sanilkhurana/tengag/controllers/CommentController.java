package in.co.sanilkhurana.tengag.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.co.sanilkhurana.tengag.models.*;
import in.co.sanilkhurana.tengag.responses.Response;
import in.co.sanilkhurana.tengag.responses.comment_responses.*;
import in.co.sanilkhurana.tengag.responses.error_responses.*;
import in.co.sanilkhurana.tengag.services.*;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    // TODO: Rename
    @Autowired
    private CommentRetrievalService commentRetrievalService;

    @Autowired
    private UserRetrievalService userRetrievalService;

    @Autowired
    private UserAuthenticationService userAuthenticationService;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping("/createReply")
    public Response createReply(@RequestBody ObjectNode createReplyRequest) {
        User user = objectMapper.convertValue(createReplyRequest.get("user"), User.class);
        Comment newComment = objectMapper.convertValue(createReplyRequest.get("newComment"), Comment.class);
        Comment parentComment = objectMapper.convertValue(createReplyRequest.get("parentComment"), Comment.class);

        if (!userRetrievalService.userExists(user)) {
            return new UserDoesNotExistErrorResponse();
        }
        if (!userAuthenticationService.isUserAuthentic(user)) {
            return new UserAuthenticationFailedErrorResponse();
        }
        if (!commentRetrievalService.commentExists(parentComment)) {
            return new CommentDoesNotExistErrorResponse();
        }
        commentRetrievalService.createReply(user, newComment, parentComment);

        return new CreateReplyResponse();
    }

    @PostMapping("/createComment")
    public Response createComment(@RequestBody ObjectNode createCommentRequest) {
        User user = objectMapper.convertValue(createCommentRequest.get("user"), User.class);
        Comment comment = objectMapper.convertValue(createCommentRequest.get("comment"), Comment.class);
        Post post = objectMapper.convertValue(createCommentRequest.get("post"), Post.class);

        if (!userRetrievalService.userExists(user)) {
            return new UserDoesNotExistErrorResponse();
        }
        if (!userAuthenticationService.isUserAuthentic(user)) {
            return new UserAuthenticationFailedErrorResponse();
        }
        commentRetrievalService.createComment(user, comment, post);

        return new CreateCommentResponse();
    }

    @PostMapping("/downvote/{commentId}")
    public Response downvoteComment(@RequestBody ObjectNode downvoteCommentRequest, @PathVariable Long commentId) {
        User user = objectMapper.convertValue(downvoteCommentRequest.get("user"), User.class);
        if (!userRetrievalService.userExists(user)) {
            return new UserDoesNotExistErrorResponse();
        }
        if (!userAuthenticationService.isUserAuthentic(user)) {
            return new UserAuthenticationFailedErrorResponse();
        }
        if (!commentRetrievalService.commentExists(commentId)) {
            return new CommentDoesNotExistErrorResponse();
        }
        commentRetrievalService.downvoteComment(user, commentRetrievalService.getComment(commentId));
        return new DownvoteCommentResponse();
    }

    @PostMapping("/upvote/{commentId}")
    public Response upvoteComment(@RequestBody ObjectNode upvoteCommentRequest, @PathVariable Long commentId) {
        User user = objectMapper.convertValue(upvoteCommentRequest.get("user"), User.class);
        if (!userRetrievalService.userExists(user)) {
            return new UserDoesNotExistErrorResponse();
        }
        if (!userAuthenticationService.isUserAuthentic(user)) {
            return new UserAuthenticationFailedErrorResponse();
        }
        if (!commentRetrievalService.commentExists(commentId)) {
            return new CommentDoesNotExistErrorResponse();
        }
        commentRetrievalService.upvoteComment(user, commentRetrievalService.getComment(commentId));
        return new UpvoteCommentResponse();
    }

    @GetMapping("/getChildren/{commentId}")
    public Response getChildrenComments(@PathVariable Long commentId) {
        if (!commentRetrievalService.commentExists(commentId)) {
            return new CommentDoesNotExistErrorResponse();
        }
        return new GetChildrenCommentsResponse(
            commentRetrievalService.getAllChildrenComments(commentId)
        );
    }

}