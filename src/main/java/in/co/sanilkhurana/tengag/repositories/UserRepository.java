package in.co.sanilkhurana.tengag.repositories;

import org.springframework.data.repository.CrudRepository;

import in.co.sanilkhurana.tengag.models.User;

public interface UserRepository extends CrudRepository<User, String> {

}