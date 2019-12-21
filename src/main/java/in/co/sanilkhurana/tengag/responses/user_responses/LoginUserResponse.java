package in.co.sanilkhurana.tengag.responses.user_responses;

import in.co.sanilkhurana.tengag.models.Token;
import in.co.sanilkhurana.tengag.responses.Response;

public class LoginUserResponse extends Response {

    public Token token;

    public LoginUserResponse(Token token) {
        super("Log in successful!", ResponseType.RESPONSE_TYPE_OK);
        this.token = token;
    }

}