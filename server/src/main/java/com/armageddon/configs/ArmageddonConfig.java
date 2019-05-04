package com.armageddon.configs;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.env.YamlPropertySourceLoader;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.support.DefaultPropertySourceFactory;
import org.springframework.core.io.support.EncodedResource;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@PropertySource(value = "classpath:armageddon.yml", factory = YamlPropertyLoaderFactory.class)
@ConfigurationProperties("armageddon")
public class ArmageddonConfig {
    private List<Repo> repos = new ArrayList<>();
    private Githosting githosting = new Githosting();

    public List<Repo> getRepos() {
        return repos;
    }

    public void setRepos(List<Repo> repos) {
        this.repos = repos;
    }

    public Githosting getGithosting() {
        return githosting;
    }

    public void setGithosting(Githosting githosting) {
        this.githosting = githosting;
    }

    public static class Githosting {
        private Gitlab gitlab = new Gitlab();

        public Gitlab getGitlab() {
            return gitlab;
        }

        public void setGitlab(Gitlab gitlab) {
            this.gitlab = gitlab;
        }

        public static class Gitlab {
            private String baseUrl;
            private String privateToken;
            private Map<String, Integer> repoNameToRepoIdMap = new HashMap<>();

            public Map<String, Integer> getRepoNameToRepoIdMap() {
                return repoNameToRepoIdMap;
            }

            public void setRepoNameToRepoIdMap(Map<String, Integer> repoNameToRepoIdMap) {
                this.repoNameToRepoIdMap = repoNameToRepoIdMap;
            }

            public String getBaseUrl() {
                return baseUrl;
            }

            public void setBaseUrl(String baseUrl) {
                this.baseUrl = baseUrl;
            }

            public String getPrivateToken() {
                return privateToken;
            }

            public void setPrivateToken(String privateToken) {
                this.privateToken = privateToken;
            }
        }
    }

    public static class Repo {
        private String name;
        private String url;
        private GITHOSTING_TYPES type;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }

        public GITHOSTING_TYPES getType() {
            return type;
        }

        public void setType(GITHOSTING_TYPES type) {
            this.type = type;
        }
    }
}

class YamlPropertyLoaderFactory extends DefaultPropertySourceFactory {

    @NonNull
    @Override
    public org.springframework.core.env.PropertySource<?> createPropertySource(String name, EncodedResource resource)
            throws IOException {
        if (resource == null) {
            throw new IOException();
        }
        return new YamlPropertySourceLoader().load(resource.getResource().getFilename(), resource.getResource()).get(0);
    }
}
