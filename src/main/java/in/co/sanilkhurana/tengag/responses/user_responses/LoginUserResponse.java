package in.co.sanilkhurana.tengag.responses.user_responses;

import in.co.sanilkhurana.tengag.models.Token;
import in.co.sanilkhurana.tengag.models.User;
import in.co.sanilkhurana.tengag.responses.Response;

public class LoginUserResponse extends Response {

    public Token token;
    public User user;
    public long[] upvotedPostsIds;
    public long[] downvotedPostsIds;

    public LoginUserResponse(Token token, User user, long[] upvotedPostsIds, long[] downvotedPostsIds) {
        super("Log in successful!", ResponseType.RESPONSE_TYPE_OK);
        this.token = token;
        this.user = user;

        this.user.setPassword("");
        this.user.setToken(null);

        this.upvotedPostsIds = upvotedPostsIds;
        this.downvotedPostsIds = downvotedPostsIds;
    }

}