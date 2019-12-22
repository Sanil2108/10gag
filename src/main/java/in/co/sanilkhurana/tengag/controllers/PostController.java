package in.co.sanilkhurana.tengag.controllers;

import in.co.sanilkhurana.tengag.responses.error_responses.*;
import in.co.sanilkhurana.tengag.responses.post_responses.PostCreatedResponse;
import in.co.sanilkhurana.tengag.responses.user_responses.*;
import in.co.sanilkhurana.tengag.models.Post;
import in.co.sanilkhurana.tengag.models.Token;
import in.co.sanilkhurana.tengag.models.User;
import in.co.sanilkhurana.tengag.responses.Response;
import in.co.sanilkhurana.tengag.services.PostRetrievalService;
import in.co.sanilkhurana.tengag.services.UserAuthenticationService;
import in.co.sanilkhurana.tengag.services.UserRetrievalService;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/posts")
public class PostController {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    // TODO: Rename
    private PostRetrievalService postRetrievalService;

    @Autowired
    private UserRetrievalService userRetrievalService;

    @Autowired
    private UserAuthenticationService userAuthenticationService;

    @PostMapping("/create")
    public Response createPost(@RequestBody ObjectNode createPostRequest) {
        User user = objectMapper.convertValue(createPostRequest.get("user"), User.class);
        Post post = objectMapper.convertValue(createPostRequest.get("post"), Post.class);
        if (!userRetrievalService.userExists(user)) {
            return new UserDoesNotExistErrorResponse();
        }
        if (!userAuthenticationService.isUserAuthentic(user)) {
            return new UserAuthenticationFailedErrorResponse();
        }
        else {
            postRetrievalService.createPost(user, post);
            return new PostCreatedResponse();
        }
    }

    @GetMapping("/get/{postId}")
    public Response getPost(@PathVariable Long postId) {
        if (!postRetrievalService.postExists(postId)) {
            return new PostDoesNotExistErrorResponse();
        }


    }

}
