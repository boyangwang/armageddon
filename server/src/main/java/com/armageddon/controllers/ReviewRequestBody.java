package com.armageddon.controllers;

import com.armageddon.db.Commit;

import java.util.List;

public class ReviewRequestBody {
    public String reviewRepoName;
    public List<Commit> reviewCommits;
}
