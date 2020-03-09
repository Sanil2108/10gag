package in.co.sanilkhurana.tengag.services;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.co.sanilkhurana.tengag.models.Token;
import in.co.sanilkhurana.tengag.models.User;
import in.co.sanilkhurana.tengag.repositories.TokenRepository;
import in.co.sanilkhurana.tengag.repositories.UserRepository;

@Service
public class UserAuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenRepository tokenRepository;

    public boolean isUserAuthentic(User user) {
        User correctUser = (User) userRepository.findById(user.getEmail()).get();
        if (correctUser.getPassword().equals(user.getPassword())) {
            return true;
        }
        if (correctUser.getToken() != null && correctUser.getToken().getToken() != null &&
            user.getToken() != null && user.getToken().getToken() != null
            && correctUser.getToken().getToken().equals(user.getToken().getToken())) {
            return true;
        }
        return false;
    }

    public Token updateOrCreateTokenForUser(User user) {
        User correctUser = (User) userRepository.findById(user.getEmail()).get();
        Token token;
        if (correctUser.getToken() == null) {
            token = new Token();
            token.setToken(getRandomTokenString());
            token.setUser(correctUser);
            tokenRepository.save(token);
            correctUser.setToken(token);
            userRepository.save(correctUser);
        }
        else {
            token = correctUser.getToken();
        }

        return token;
    }

    public static String getRandomTokenString() {
        String token = "";
        String alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQESTUVWXYZ1234567890-_=+`~,.<>/?;:[]{}|)(*&^%$#@!";
        Random random = new Random();
        for (int i = 0; i < 30; i += 1) {
            token += "" + alphabet.charAt(random.nextInt(alphabet.length()));
        }
        return token;
    }
    

}