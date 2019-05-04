package com.armageddon.services;

import com.armageddon.configs.ArmageddonConfig;
import com.armageddon.configs.GITHOSTING_TYPES;
import com.armageddon.connectors.GitlabConnector;
import com.armageddon.models.ArmageddonData;
import com.armageddon.models.Repo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArmageddonService {
    private Logger log = LoggerFactory.getLogger(this.getClass());

    private ArmageddonConfig armageddonConfig;
    private GitlabConnector gitlabConnector;

    public ArmageddonService(ArmageddonConfig armageddonConfig, GitlabConnector gitlabConnector) {
        this.armageddonConfig = armageddonConfig;
        this.gitlabConnector = gitlabConnector;
    }

    public ArmageddonConfig getConfig() {
        return armageddonConfig;
    }

    public ArmageddonData getData(Long cutoff) {
        List<ArmageddonConfig.Repo> repoConfigs = armageddonConfig.getRepos();
        ArmageddonData data = new ArmageddonData();

        for (ArmageddonConfig.Repo repoConfig: repoConfigs) {
            GITHOSTING_TYPES type = repoConfig.getType();
            switch(type) {
                case GITLAB:
                    Repo repo = gitlabConnector.getRepo(repoConfig, cutoff);
                    addRepoToArmageddonData(repo, data);
                    break;
                default:
                    log.warn("Type of repo doesn't match any known GITHOSTING_TYPES: " + type);
            }
        }
        return data;
    }

    public void addRepoToArmageddonData(Repo repo, ArmageddonData data) {
        data.data.add(repo);
    }
}
