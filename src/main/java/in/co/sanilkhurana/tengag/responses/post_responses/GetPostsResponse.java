package in.co.sanilkhurana.tengag.responses.post_responses;

import java.util.ArrayList;
import java.util.List;

import in.co.sanilkhurana.tengag.models.Post;
import in.co.sanilkhurana.tengag.responses.Response;

public class GetPostsResponse extends Response {

    List<Post> posts;

    public GetPostsResponse(List<Post> posts) {
        super("Posts retrieved successfully", Response.ResponseType.RESPONSE_TYPE_OK);

        this.posts = posts;
    }

    public void setPosts(ArrayList<Post> posts) {
        this.posts = posts;
    }

    public List<Post> getPosts() {
        return posts;
    }
}