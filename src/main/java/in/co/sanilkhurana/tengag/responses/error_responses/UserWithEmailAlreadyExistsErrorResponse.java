package in.co.sanilkhurana.tengag.responses.error_responses;

import in.co.sanilkhurana.tengag.responses.Response;

public class UserWithEmailAlreadyExistsErrorResponse extends Response {

    public UserWithEmailAlreadyExistsErrorResponse() {
        super(
            "A user with the same email address already exists",
            ResponseType.RESPONSE_TYPE_ERROR
        );
    }

}