package in.co.sanilkhurana.tengag.responses.error_responses;

import in.co.sanilkhurana.tengag.responses.Response;

public class UserAuthenticationFailedErrorResponse extends Response {

    public UserAuthenticationFailedErrorResponse() {
        super(
            "User authentication failed. Make sure that typed email and password are correct",
            ResponseType.RESPONSE_TYPE_ERROR
        );
    }

}