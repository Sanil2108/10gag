package in.co.sanilkhurana.tengag.repositories;

import org.springframework.data.repository.CrudRepository;

import in.co.sanilkhurana.tengag.models.GoogleUser;

public interface GoogleUserRepository extends CrudRepository<GoogleUser, String> {
}