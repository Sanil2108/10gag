package in.co.sanilkhurana.tengag.responses.error_responses;

import in.co.sanilkhurana.tengag.responses.Response;

public class UserWithUsernameAlreadyExistsErrorResponse extends Response {

    public UserWithUsernameAlreadyExistsErrorResponse() {
        super(
            "A user with the same username already exists",
            ResponseType.RESPONSE_TYPE_ERROR
        );
    }

}