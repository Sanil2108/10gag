package in.co.sanilkhurana.tengag.responses.user_responses;

import in.co.sanilkhurana.tengag.models.User;
import in.co.sanilkhurana.tengag.responses.Response;

public class GetUserResponse extends Response {
    
    User user;
    long[] upvotedPostsIds;
    long[] downvotedPostsIds;

    public GetUserResponse(User user, long[] upvotedPostsIds, long[] downvotedPostsIds) {
        super("User fetched successfully", Response.ResponseType.RESPONSE_TYPE_OK);
        this.user = user;
        this.upvotedPostsIds = upvotedPostsIds;
        this.downvotedPostsIds = downvotedPostsIds;
    }

    public User getUser() {
        user.setPassword("");
        user.setToken(null);
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public long[] getUpvotedPostsIds() {
        return this.upvotedPostsIds;
    }

    public void setUpvotedPostsIds(long[] upvotedPostsIds) {
        this.upvotedPostsIds = upvotedPostsIds;
    }

    public long[] getDownvotedPostsIds() {
        return this.downvotedPostsIds;
    }

    public void setDownvotedPostsIds(long[] downvotedPostsIds) {
        this.downvotedPostsIds = downvotedPostsIds;
    }
    
}