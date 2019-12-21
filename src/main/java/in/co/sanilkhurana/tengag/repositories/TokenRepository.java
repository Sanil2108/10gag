package in.co.sanilkhurana.tengag.repositories;

import org.springframework.data.repository.CrudRepository;

import in.co.sanilkhurana.tengag.models.Token;

public interface TokenRepository extends CrudRepository<Token, Long> {

}