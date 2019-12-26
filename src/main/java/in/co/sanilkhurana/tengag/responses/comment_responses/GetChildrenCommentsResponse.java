package in.co.sanilkhurana.tengag.responses.comment_responses;

import java.util.List;

import in.co.sanilkhurana.tengag.models.Comment;
import in.co.sanilkhurana.tengag.responses.Response;

public class GetChildrenCommentsResponse extends Response {

    public List<Comment> comments;

    public GetChildrenCommentsResponse(List<Comment> comments) {
        super("Children comments retrieved successfully", Response.ResponseType.RESPONSE_TYPE_OK);

        this.comments = comments;
    }
}