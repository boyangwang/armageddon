package com.armageddon.connectors;

import com.armageddon.configs.ArmageddonConfig;
import com.armageddon.db.Commit;
import com.armageddon.db.CommitRepository;
import com.armageddon.models.Remote;
import com.armageddon.models.Repo;
import org.gitlab4j.api.GitLabApi;
import org.gitlab4j.api.GitLabApiException;
import org.gitlab4j.api.models.Branch;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class GitlabConnector {
    private Logger log = LoggerFactory.getLogger(this.getClass());

    private GitLabApi gitlabApi;
    private ArmageddonConfig armageddonConfig;
    private CommitRepository commitRepository;

    public GitlabConnector(ArmageddonConfig armageddonConfig, CommitRepository commitRepository) {
        this.armageddonConfig = armageddonConfig;
        this.commitRepository = commitRepository;

        ArmageddonConfig.Githosting.Gitlab gitlab = armageddonConfig.getGithosting().getGitlab();
        log.info("Instantiating gitlabApi using baseUrl: {} and private token: {}",
                gitlab.getBaseUrl(), gitlab.getPrivateToken());
        gitlabApi = new GitLabApi(gitlab.getBaseUrl(), gitlab.getPrivateToken());
        gitlabApi.enableRequestResponseLogging();
    }

    public List<Branch> getBranches(Integer projectId) throws GitLabApiException {
        log.info("Getting branches for projectId: " + projectId);
        return gitlabApi.getRepositoryApi().getBranches(projectId);
    }

    public List<org.gitlab4j.api.models.Commit> getCommits(Integer projectId, String branch, Long cutoff) {
        Date since = new Date(cutoff);
        Date until = new Date();
        try {
            return gitlabApi.getCommitsApi().getCommits(projectId, branch, since, until);
        } catch (GitLabApiException e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public Repo getRepo(ArmageddonConfig.Repo repoConfig, Long cutoff) {
        String repoName = repoConfig.getName();
        Integer projectId = armageddonConfig.getGithosting().getGitlab().getRepoNameToRepoIdMap().get(repoName);
        Repo repo = new Repo();
        repo.repoName = repoName;
        repo.remotes = Collections.singletonList(new Remote(
            // FIXME default to origin for now
            "origin", repoConfig.getUrl()
        ));

        List<Branch> branches;
        try {
            branches = getBranches(projectId);
        } catch (GitLabApiException e) {
            e.printStackTrace();
            branches = Collections.emptyList();
        }

        repo.branches = branches.parallelStream().map(branch -> {
            com.armageddon.models.Branch branchData = new com.armageddon.models.Branch();
            branchData.branchName = branch.getName();
            branchData.commits = getCommits(projectId, branch.getName(), cutoff)
                    .stream().map(this::commitToCommitData).collect(Collectors.toList());

            return branchData;
        }).collect(Collectors.toList());
        return repo;
    }

    private Commit commitToCommitData(org.gitlab4j.api.models.Commit commit) {
        Commit commitData = new Commit();

        log.info("Processing commit {}", commit);
        commitData.setHash(commit.getId());
        commitData.setAuthor(commit.getAuthorName() + ' ' + commit.getAuthorEmail());
        commitData.setMessage(commit.getMessage());
        commitData.setReviewComment("");
        commitData.setReviewed(false);
        commitData.setTimestamp(commit.getAuthoredDate().getTime());

        log.info("Transformed to commit data {}", commitData);
        return commitData;
    }
}
