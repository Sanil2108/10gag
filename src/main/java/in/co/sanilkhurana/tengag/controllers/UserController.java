package in.co.sanilkhurana.tengag.controllers;

import in.co.sanilkhurana.tengag.responses.error_responses.*;
import in.co.sanilkhurana.tengag.responses.user_responses.*;
import in.co.sanilkhurana.tengag.models.Token;
import in.co.sanilkhurana.tengag.models.User;
import in.co.sanilkhurana.tengag.responses.Response;
import in.co.sanilkhurana.tengag.services.UserAuthenticationService;
import in.co.sanilkhurana.tengag.services.UserRetrievalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/users")
public class UserController {

    @Autowired
    private UserAuthenticationService userAuthenticationService;

    @Autowired
    private UserRetrievalService userRetrievalService;

    @PostMapping("/login")
    public Response loginUser(@RequestBody User user) {
        if (!userRetrievalService.userExists(user)) {
            return new UserDoesNotExistErrorResponse();
        }
        if (!userAuthenticationService.isUserAuthentic(user)) {
            return new UserAuthenticationFailedErrorResponse();
        }
        else {
            Token newToken = userAuthenticationService.updateOrCreateTokenForUser(user);
            LoginUserResponse loginUserResponse = new LoginUserResponse(newToken);

            return loginUserResponse;
        }
    }

    @PostMapping("/register")
    public Response registerUser(@RequestBody User user) {
        if (userRetrievalService.userExists(user)) {
            return new UserWithEmailAlreadyExistsErrorResponse();
        }
        userRetrievalService.createNewUser(user);
        userAuthenticationService.updateOrCreateTokenForUser(user);

        return new RegisterUserResponse();
    }

    // TODO:
    @PostMapping("/update")
    public Response updateUser(@RequestBody User user) {
        if (!userRetrievalService.userExists(user)) {
            return new UserDoesNotExistErrorResponse();
        }
        if (!userAuthenticationService.isUserAuthentic(user)) {
            return new UserAuthenticationFailedErrorResponse();
        }
        userRetrievalService.updateUser(user);
        userAuthenticationService.updateOrCreateTokenForUser(user);

        return new UpdateUserResponse();
    }

}
