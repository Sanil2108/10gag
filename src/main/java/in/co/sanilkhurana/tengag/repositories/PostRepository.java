package in.co.sanilkhurana.tengag.repositories;

import org.springframework.data.repository.CrudRepository;

import in.co.sanilkhurana.tengag.models.Post;

public interface PostRepository extends CrudRepository<Post, Long> {

}