package com.armageddon.models;

import java.util.ArrayList;
import java.util.List;

public class Repo {
    public String repoName;

    public List<Remote> remotes = new ArrayList<>();

    public List<Branch> branches = new ArrayList<>();
}
