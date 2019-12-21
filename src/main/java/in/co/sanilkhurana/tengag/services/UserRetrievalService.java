package in.co.sanilkhurana.tengag.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.co.sanilkhurana.tengag.models.User;
import in.co.sanilkhurana.tengag.repositories.UserRepository;

@Service
public class UserRetrievalService {

    @Autowired
    private UserRepository userRepository;

    public boolean userExists(User user) {
        return userRepository.existsById(user.getEmail());
    }

    public void createNewUser(User user) {
        userRepository.save(user);
    }

    public void updateUser(User user) {
        // TODO:
    }

}