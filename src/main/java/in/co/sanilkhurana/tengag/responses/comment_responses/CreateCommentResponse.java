package in.co.sanilkhurana.tengag.responses.comment_responses;

import in.co.sanilkhurana.tengag.responses.Response;

public class CreateCommentResponse extends Response {

    public CreateCommentResponse() {
        super("Comment created successfully", Response.ResponseType.RESPONSE_TYPE_OK);
    }
}