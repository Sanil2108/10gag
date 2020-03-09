package in.co.sanilkhurana.tengag.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

import in.co.sanilkhurana.tengag.models.GoogleUser;
import in.co.sanilkhurana.tengag.responses.Response;
import in.co.sanilkhurana.tengag.responses.google_user_responses.SignInResponse;
import in.co.sanilkhurana.tengag.services.GoogleUserService;

@RestController
@RequestMapping(path = "/api/google-user")
public class GoogleUserController {

    @Autowired
    public GoogleUserService googleUserService;

    @PostMapping("/signin")
    public Response signIn(@RequestBody GoogleUser googleUser) {
        GoogleUser completeGoogleUser = googleUserService.getCompleteUser(googleUser);

        SignInResponse signInResponse = new SignInResponse();
        signInResponse.setEmail(completeGoogleUser.getEmail());
        signInResponse.setProfilePictureURL(completeGoogleUser.getProfilePictureURL());
        return signInResponse;
    }

}