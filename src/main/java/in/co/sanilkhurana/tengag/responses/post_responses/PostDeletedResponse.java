package in.co.sanilkhurana.tengag.responses.post_responses;

import in.co.sanilkhurana.tengag.responses.Response;

public class PostDeletedResponse extends Response {

    public PostDeletedResponse() {
        super("Post deleted successfully", Response.ResponseType.RESPONSE_TYPE_OK);
    }

}