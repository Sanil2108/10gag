package in.co.sanilkhurana.tengag.responses.post_responses;

import java.util.ArrayList;
import java.util.List;

import in.co.sanilkhurana.tengag.models.Post;
import in.co.sanilkhurana.tengag.responses.Response;

public class GetNumberOfPagesResponse extends Response {

    int pageLength;

    public GetNumberOfPagesResponse(int pageLength) {
        super("Page length retrieved successfully", Response.ResponseType.RESPONSE_TYPE_OK);

        this.pageLength = pageLength;
    }

    public void setPageLength(int pageLength) {
        this.pageLength = pageLength;
    }

    public int getPageLength() {
        return pageLength;
    }
}