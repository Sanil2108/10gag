package in.co.sanilkhurana.tengag.repositories;

import org.springframework.data.repository.CrudRepository;

import in.co.sanilkhurana.tengag.models.Comment;

public interface CommentRepository extends CrudRepository<Comment, Long> {

}