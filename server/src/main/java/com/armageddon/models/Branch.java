package com.armageddon.models;

import com.armageddon.db.Commit;

import java.util.ArrayList;
import java.util.List;

public class Branch {
    public String branchName;
    public List<Commit> commits = new ArrayList<>();
}
