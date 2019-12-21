package in.co.sanilkhurana.tengag.responses;

public class Response {
    public enum ResponseType {
        RESPONSE_TYPE_OK,
        RESPONSE_TYPE_ERROR,
        RESPONSE_TYPE_ALERT,
    }

    private String responseMessage;
    private ResponseType responseType;

    public Response(String responseMessage, ResponseType responseType) {
        this.responseMessage = responseMessage;
        this.responseType = responseType;
    }

    public String getResponseMessage() {
        return responseMessage;
    }

    public ResponseType getResponseType() {
        return responseType;
    }
}