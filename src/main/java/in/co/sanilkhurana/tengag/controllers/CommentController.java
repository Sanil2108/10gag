package in.co.sanilkhurana.tengag.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import in.co.sanilkhurana.tengag.responses.Response;
import in.co.sanilkhurana.tengag.responses.comment_responses.GetChildrenCommentsResponse;
import in.co.sanilkhurana.tengag.responses.error_responses.CommentDoesNotExistErrorResponse;
import in.co.sanilkhurana.tengag.services.CommentRetrievalService;

@Controller
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentRetrievalService commentRetrievalService;

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