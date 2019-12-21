package in.co.sanilkhurana.tengag.responses.error_responses;

import in.co.sanilkhurana.tengag.responses.Response;

public class UserDoesNotExistErrorResponse extends Response {

    public UserDoesNotExistErrorResponse() {
        super(
            "This user does not exist",
            ResponseType.RESPONSE_TYPE_ERROR
        );
    }

}