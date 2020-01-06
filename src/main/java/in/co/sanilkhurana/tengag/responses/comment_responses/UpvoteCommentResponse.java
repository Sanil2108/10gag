package in.co.sanilkhurana.tengag.responses.comment_responses;

import in.co.sanilkhurana.tengag.responses.Response;

public class UpvoteCommentResponse extends Response {

    public UpvoteCommentResponse() {
        super("Comment upvoted successfully", Response.ResponseType.RESPONSE_TYPE_OK);
    }
}