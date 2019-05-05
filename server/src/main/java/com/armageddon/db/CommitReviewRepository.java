package com.armageddon.db;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommitReviewRepository extends CrudRepository<CommitReview, String> { }
