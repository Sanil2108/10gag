package in.co.sanilkhurana.tengag.responses.post_responses;

import in.co.sanilkhurana.tengag.responses.Response;

public class PostCreatedResponse extends Response {

    public PostCreatedResponse() {
        super("Post created successfully", Response.ResponseType.RESPONSE_TYPE_OK);
    }

}