package in.co.sanilkhurana.tengag.responses.error_responses;

import in.co.sanilkhurana.tengag.responses.Response;

public class CommentDoesNotExistErrorResponse extends Response {

    public CommentDoesNotExistErrorResponse() {
        super(
            "This comment does not exist",
            ResponseType.RESPONSE_TYPE_ERROR
        );
    }

}