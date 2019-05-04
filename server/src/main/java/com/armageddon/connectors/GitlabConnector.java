package com.armageddon.connectors;

import com.armageddon.configs.ArmageddonConfig;
import org.gitlab4j.api.GitLabApi;
import org.gitlab4j.api.GitLabApiException;
import org.gitlab4j.api.models.Branch;

import java.util.List;

public class GitlabConnector {

    private GitLabApi gitlabApi;
    private ArmageddonConfig armageddonConfig;

    public GitlabConnector(ArmageddonConfig armageddonConfig) {
        ArmageddonConfig.Githosting.Gitlab gitlab = armageddonConfig.getGithosting().getGitlab();
        gitlabApi = new GitLabApi(gitlab.getBaseUrl(), gitlab.getPrivateToken());
        gitlabApi.enableRequestResponseLogging();
    }

    public List<Branch> getBranches(Integer projectId) throws GitLabApiException {
        return gitlabApi.getRepositoryApi().getBranches(projectId);
    }
}
