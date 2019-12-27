package in.co.sanilkhurana.tengag.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.co.sanilkhurana.tengag.models.Comment;
import in.co.sanilkhurana.tengag.models.Post;
import in.co.sanilkhurana.tengag.models.User;
import in.co.sanilkhurana.tengag.responses.Response;
import in.co.sanilkhurana.tengag.responses.comment_responses.CreateCommentResponse;
import in.co.sanilkhurana.tengag.responses.comment_responses.CreateReplyResponse;
import in.co.sanilkhurana.tengag.responses.comment_responses.GetChildrenCommentsResponse;
import in.co.sanilkhurana.tengag.responses.error_responses.CommentDoesNotExistErrorResponse;
import in.co.sanilkhurana.tengag.responses.error_responses.UserAuthenticationFailedErrorResponse;
import in.co.sanilkhurana.tengag.responses.error_responses.UserDoesNotExistErrorResponse;
import in.co.sanilkhurana.tengag.services.CommentRetrievalService;
import in.co.sanilkhurana.tengag.services.UserAuthenticationService;
import in.co.sanilkhurana.tengag.services.UserRetrievalService;

@RestController
@RequestMapping("/comments")
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