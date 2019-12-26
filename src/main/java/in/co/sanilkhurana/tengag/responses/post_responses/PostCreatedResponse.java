package in.co.sanilkhurana.tengag.responses.post_responses;

import in.co.sanilkhurana.tengag.models.Post;
import in.co.sanilkhurana.tengag.responses.Response;

public class PostCreatedResponse extends Response {
    public Post post;

    public PostCreatedResponse(Post post) {
        super("Post created successfully", Response.ResponseType.RESPONSE_TYPE_OK);

        this.post = post;
    }

}