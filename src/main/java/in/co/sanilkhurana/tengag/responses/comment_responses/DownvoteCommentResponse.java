package in.co.sanilkhurana.tengag.responses.comment_responses;

import in.co.sanilkhurana.tengag.responses.Response;

public class DownvoteCommentResponse extends Response {

    public DownvoteCommentResponse() {
        super("Comment downvoted successfully", Response.ResponseType.RESPONSE_TYPE_OK);
    }
}