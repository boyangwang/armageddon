package com.armageddon.services;

import com.armageddon.configs.ArmageddonConfig;
import com.armageddon.configs.GITHOSTING_TYPES;
import com.armageddon.connectors.GitlabConnector;
import com.armageddon.db.CommitReview;
import com.armageddon.db.CommitReviewRepository;
import com.armageddon.models.ArmageddonData;
import com.armageddon.models.Commit;
import com.armageddon.models.Repo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArmageddonService {
    private Logger log = LoggerFactory.getLogger(this.getClass());

    private ArmageddonConfig armageddonConfig;
    private CommitReviewRepository commitReviewRepository;
    private GitlabConnector gitlabConnector;

    public ArmageddonService(ArmageddonConfig armageddonConfig, GitlabConnector gitlabConnector, CommitReviewRepository commitReviewRepository) {
        this.armageddonConfig = armageddonConfig;
        this.gitlabConnector = gitlabConnector;
        this.commitReviewRepository = commitReviewRepository;
    }

    public ArmageddonConfig getConfig() {
        return armageddonConfig;
    }

    public ArmageddonData getData(Long cutoff) {
        List<ArmageddonConfig.Repo> repoConfigs = armageddonConfig.getRepos();
        ArmageddonData data = new ArmageddonData();

        log.info("Starting getRepo for {} repos", repoConfigs.size());
        data.data = repoConfigs.parallelStream().map(repoConfig -> getRepoFromRepoConfig(repoConfig, cutoff))
                .collect(Collectors.toList());
        log.info("Done getRepo, count={}", data.data.size());

        data.data.parallelStream().forEach(repo ->
            repo.branches.parallelStream().forEach(branch ->
                    enrichCommitWithCommitReview(branch.commits)
            )
        );

        return data;
    }

    public Repo getRepoFromRepoConfig(ArmageddonConfig.Repo repoConfig, Long cutoff) {
        GITHOSTING_TYPES type = repoConfig.getType();
        Repo repo = new Repo();

        switch (type) {
            case GITLAB:
                repo = gitlabConnector.getRepo(repoConfig, cutoff);
                break;
            default:
                log.warn("Type of repo doesn't match any known GITHOSTING_TYPES: " + type);
        }

        return repo;
    }

    public void enrichCommitWithCommitReview(List<Commit> commits) {
        Iterable<CommitReview> commitReviews = commitReviewRepository.findAllById(commits.stream().map(c -> c.hash)
                .collect(Collectors.toList()));

    }

    public void review(List<CommitReview> commitReviews) {
        log.info("Doing review for {}", commitReviews.toString());
        commitReviewRepository.saveAll(commitReviews);
    }
}
