package com.armageddon.services;

import com.armageddon.configs.ArmageddonConfig;
import com.armageddon.configs.GITHOSTING_TYPES;
import com.armageddon.connectors.GitlabConnector;
import com.armageddon.db.Commit;
import com.armageddon.db.CommitRepository;
import com.armageddon.models.ArmageddonData;
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
    private CommitRepository commitRepository;
    private GitlabConnector gitlabConnector;

    public ArmageddonService(ArmageddonConfig armageddonConfig, GitlabConnector gitlabConnector, CommitRepository commitRepository) {
        this.armageddonConfig = armageddonConfig;
        this.gitlabConnector = gitlabConnector;
        this.commitRepository = commitRepository;
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
        Iterable<Commit> commitReviews = commitRepository.findAllById(commits.stream().map(Commit::getHash)
                .collect(Collectors.toList()));
        commitReviews.forEach(commitReview -> {
            Commit commit = commits.stream().filter(c -> c.getHash().equals(commitReview.getHash()))
                    .findAny()
                    .orElse(null);
            if (commit == null) {
                return;
            }
            commit.setReviewed(commitReview.getReviewed());
            commit.setReviewComment(commitReview.getReviewComment());
        });
        commitRepository.saveAll(commitReviews);
    }

    public void review(List<Commit> commits) {
        log.info("Doing review for {}", commits.toString());
        commitRepository.saveAll(commits);
    }
}
