package com.armageddon.controllers;

import com.armageddon.db.CommitReview;

import java.util.List;

public class ReviewRequestBody {
    public String reviewRepoName;
    public List<CommitReview> reviewCommits;
}
