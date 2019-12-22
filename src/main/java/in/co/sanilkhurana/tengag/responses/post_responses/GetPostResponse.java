package in.co.sanilkhurana.tengag.responses.post_responses;

import in.co.sanilkhurana.tengag.models.Post;
import in.co.sanilkhurana.tengag.responses.Response;

public class GetPostResponse extends Response {

    Post post;

    public GetPostResponse(Post post) {
        super("Post retrieved successfully", Response.ResponseType.RESPONSE_TYPE_OK);

        this.post = post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public Post getPost() {
        return post;
    }
}