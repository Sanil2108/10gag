package in.co.sanilkhurana.tengag.responses.post_responses;

import in.co.sanilkhurana.tengag.responses.Response;

public class DownvotePostResponse extends Response {

    public DownvotePostResponse() {
        super("Post downvoted successfully", Response.ResponseType.RESPONSE_TYPE_OK);
    }
}