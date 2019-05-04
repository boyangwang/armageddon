package com.armageddon.connectors;

import com.armageddon.configs.ArmageddonConfig;
import com.armageddon.models.Remote;
import com.armageddon.models.Repo;
import org.gitlab4j.api.GitLabApi;
import org.gitlab4j.api.GitLabApiException;
import org.gitlab4j.api.models.Branch;
import org.gitlab4j.api.models.Commit;
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

    public GitlabConnector(ArmageddonConfig armageddonConfig) {
        this.armageddonConfig = armageddonConfig;
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

    public List<Commit> getCommits(Integer projectId, String branch, Long cutoff) {
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

        repo.branches = branches.stream().map(branch -> {
            com.armageddon.models.Branch branchData = new com.armageddon.models.Branch();
            branchData.branchName = branch.getName();
            branchData.commits = getCommits(projectId, branch.getName(), cutoff)
                    .stream().map(this::commitToCommitData).collect(Collectors.toList());
            return branchData;
        }).collect(Collectors.toList());
        return repo;
    }

    private com.armageddon.models.Commit commitToCommitData(Commit commit) {
        com.armageddon.models.Commit commitData = new com.armageddon.models.Commit();
        commitData.hash = commit.getId();
        commitData.author = commit.getAuthor().toString();
        commitData.message = commit.getMessage();
        //FIXME empty reviewComment for now
        commitData.reviewComment = "";
        //FIXME reviewed false for now
        commitData.reviewed = false;
        commitData.timestamp = commit.getTimestamp().getTime();
        return commitData;
    }
}
