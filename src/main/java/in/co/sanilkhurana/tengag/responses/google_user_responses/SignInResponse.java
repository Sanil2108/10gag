package in.co.sanilkhurana.tengag.responses.google_user_responses;

import in.co.sanilkhurana.tengag.responses.Response;

public class SignInResponse extends Response {
    public String email;
    public String profilePictureURL;

    public SignInResponse() {
        super("Google user sign in successful", Response.ResponseType.RESPONSE_TYPE_OK);
    }

    public SignInResponse(String email, String profilePictureURL) {
        super("Google user sign in successful", Response.ResponseType.RESPONSE_TYPE_OK);
        this.email = email;
        this.profilePictureURL = profilePictureURL;
    }

    public String getEmail() {
        return email;
    }

    public String getProfilePictureURL() {
        return profilePictureURL;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setProfilePictureURL(String profilePictureURL) {
        this.profilePictureURL = profilePictureURL;
    }

}