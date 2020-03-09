package in.co.sanilkhurana.tengag.models;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class GoogleUser {

    @Id
    public String userId;

    public String email;
    public String profilePictureURL;

    public GoogleUser(String userId) {
        this.userId = userId;
    }

    public GoogleUser() {}

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfilePictureURL() {
        return profilePictureURL;
    }

    public void setProfilePictureURL(String profilePictureURL) {
        this.profilePictureURL = profilePictureURL;
    }

}