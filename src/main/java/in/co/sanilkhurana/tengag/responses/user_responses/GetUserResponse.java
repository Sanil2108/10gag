package in.co.sanilkhurana.tengag.responses.user_responses;

import in.co.sanilkhurana.tengag.models.User;
import in.co.sanilkhurana.tengag.responses.Response;

public class GetUserResponse extends Response {
    
    User user;

    public GetUserResponse(User user) {
        super("User fetched successfully", Response.ResponseType.RESPONSE_TYPE_OK);
        this.user = user;
    }

    public User getUser() {
        user.setPassword("");
        user.setToken(null);
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}