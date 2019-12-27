package in.co.sanilkhurana.tengag.responses.comment_responses;

import in.co.sanilkhurana.tengag.responses.Response;

public class CreateReplyResponse extends Response {

    public CreateReplyResponse() {
        super("Reply created successfully", Response.ResponseType.RESPONSE_TYPE_OK);
    }
}