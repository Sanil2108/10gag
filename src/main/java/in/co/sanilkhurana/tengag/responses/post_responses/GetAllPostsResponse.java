package in.co.sanilkhurana.tengag.responses.post_responses;

import java.util.ArrayList;

import in.co.sanilkhurana.tengag.models.Post;
import in.co.sanilkhurana.tengag.responses.Response;

public class GetAllPostsResponse extends Response {

    ArrayList<Post> posts;

    public GetAllPostsResponse(ArrayList<Post> posts) {
        super("Posts retrieved successfully", Response.ResponseType.RESPONSE_TYPE_OK);

        this.posts = posts;
    }

    public void setPosts(ArrayList<Post> posts) {
        this.posts = posts;
    }

    public ArrayList<Post> getPosts() {
        return posts;
    }
}