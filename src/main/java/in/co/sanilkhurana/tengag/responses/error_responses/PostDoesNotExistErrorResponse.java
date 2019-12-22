package in.co.sanilkhurana.tengag.responses.error_responses;

import in.co.sanilkhurana.tengag.responses.Response;

public class PostDoesNotExistErrorResponse extends Response {

    public PostDoesNotExistErrorResponse() {
        super(
            "This post does not exist",
            ResponseType.RESPONSE_TYPE_ERROR
        );
    }

}