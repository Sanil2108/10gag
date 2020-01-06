package in.co.sanilkhurana.tengag.responses.post_responses;

import in.co.sanilkhurana.tengag.models.Post;
import in.co.sanilkhurana.tengag.responses.Response;

public class UpvotePostResponse extends Response {

    public UpvotePostResponse() {
        super("Post upvoted successfully", Response.ResponseType.RESPONSE_TYPE_OK);
    }
}