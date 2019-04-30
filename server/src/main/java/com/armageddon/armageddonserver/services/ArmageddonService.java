package com.armageddon.armageddonserver.services;

import org.gitlab4j.api.GitLabApi;
import org.gitlab4j.api.GitLabApiException;
import org.gitlab4j.api.ProjectApi;
import org.gitlab4j.api.RepositoryApi;
import org.gitlab4j.api.models.Branch;
import org.gitlab4j.api.models.ProjectAccess;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ArmageddonService {
    public static final Map<String, String> repoToProjectIdMap = Collections.unmodifiableMap(
        new HashMap<String, String>() {{
            put("manage-new", "347");
            put("ui-new", "348");
        }}
    );

    private GitLabApi gitlabApi;
    private String privateToken;

    public ArmageddonService(String privateToken) {
        this.privateToken = privateToken;
        gitlabApi = new GitLabApi("http://gitlab.intranet.huiyin.com", privateToken);
        gitlabApi.enableRequestResponseLogging();
    }


    public List<Branch> getBranches() throws GitLabApiException {
        List<Branch> branches = gitlabApi.getRepositoryApi().getBranches(repoToProjectIdMap.get("ui-new"));
        return Collections.emptyList();
    }
}
