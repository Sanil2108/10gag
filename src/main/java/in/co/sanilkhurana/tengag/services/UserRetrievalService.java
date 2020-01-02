package in.co.sanilkhurana.tengag.services;

import java.util.Iterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.co.sanilkhurana.tengag.models.User;
import in.co.sanilkhurana.tengag.repositories.UserRepository;

@Service
public class UserRetrievalService {

    @Autowired
    private UserRepository userRepository;

    public User getUser(String email) {
        return userRepository.findById(email).get();
    }

    public boolean userExists(User user) {
        return userRepository.existsById(user.getEmail());
    }

    public User getUserByUsername(String username) {
        Iterator<User> users = userRepository.findAll().iterator();
        while(users.hasNext()) {
            User currentUser = users.next();
            if (currentUser.getUserName().equals(username)) {
                return currentUser;
            }
        }
        return null;
    }

    public void createNewUser(User user) {
        userRepository.save(user);
    }

    public void updateUser(User user) {
        // TODO:
    }

}