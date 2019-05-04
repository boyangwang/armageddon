package com.armageddon.models;

import java.util.ArrayList;
import java.util.List;

public class Branch {
    public String branchName;
    public List<Commit> commits = new ArrayList<>();
}
