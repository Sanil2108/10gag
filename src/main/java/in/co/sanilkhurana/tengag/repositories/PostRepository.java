package in.co.sanilkhurana.tengag.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;

import in.co.sanilkhurana.tengag.models.Post;

public interface PostRepository extends PagingAndSortingRepository<Post, Long> {
}