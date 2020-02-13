package in.co.sanilkhurana.tengag.controllers;

import in.co.sanilkhurana.tengag.responses.error_responses.*;
import in.co.sanilkhurana.tengag.responses.user_responses.*;
import in.co.sanilkhurana.tengag.models.Token;
import in.co.sanilkhurana.tengag.models.User;
import in.co.sanilkhurana.tengag.models.Post;
import in.co.sanilkhurana.tengag.responses.Response;
import in.co.sanilkhurana.tengag.services.UserAuthenticationService;
import in.co.sanilkhurana.tengag.services.UserRetrievalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/users")
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

            List<Post> upvotedPosts = userRetrievalService.getUpvotedPosts(user);
            List<Post> downvotedPosts = userRetrievalService.getDownvotedPosts(user);

            long[] upvotedPostIds = new long[upvotedPosts.size()];
            long[] downvotedPostIds = new long[downvotedPosts.size()];

            for (int i=0; i < upvotedPosts.size(); i++) {
                upvotedPostIds[i] = ((Post)upvotedPosts.get(i)).getId();
            }

            for (int i=0; i < downvotedPosts.size(); i++) {
                downvotedPostIds[i] = ((Post)downvotedPosts.get(i)).getId();
            }
            
            LoginUserResponse loginUserResponse = new LoginUserResponse(
                newToken,
                userRetrievalService.getUser(user.getEmail()),
                upvotedPostIds,
                downvotedPostIds
            );

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

    @GetMapping("/get/{userName}")
    public Response getUser(@PathVariable String userName) {
        User user = userRetrievalService.getUserByUsername(userName);
        if (user == null) {
            return new UserDoesNotExistErrorResponse();
        }

        List<Post> upvotedPosts = user.getUpvotedPosts();
        List<Post> downvotedPosts = user.getDownvotedPosts();

        long[] upvotedPostIds = new long[upvotedPosts.size()];
        long[] downvotedPostIds = new long[downvotedPosts.size()];

        for (int i=0; i < upvotedPosts.size(); i++) {
            upvotedPostIds[i] = ((Post)upvotedPosts.get(i)).getId();
        }

        for (int i=0; i < upvotedPosts.size(); i++) {
            downvotedPostIds[i] = ((Post)downvotedPosts.get(i)).getId();
        }

        return new GetUserResponse(user, upvotedPostIds, downvotedPostIds);
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
