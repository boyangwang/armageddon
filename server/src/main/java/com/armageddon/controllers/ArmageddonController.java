package com.armageddon.controllers;

import com.armageddon.ArmageddonServerApplication;
import com.armageddon.configs.ArmageddonConfig;
import com.armageddon.models.ArmageddonData;
import com.armageddon.services.ArmageddonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/armageddon")
public class ArmageddonController {
    private Logger log = LoggerFactory.getLogger(this.getClass());

    private ArmageddonService armageddonService;

    public ArmageddonController(ArmageddonService armageddonService) {
        this.armageddonService = armageddonService;
    }

    @GetMapping("/version")
    public String getVersion() {
        return "Version: " + ArmageddonServerApplication.VERSION;
    }

    @GetMapping("/config")
    public ArmageddonConfig getConfig() {
        return armageddonService.getConfig();
    }

    @GetMapping("/data")
    public ArmageddonData getData(@RequestParam Long cutoff) {
        return armageddonService.getData(cutoff);
    }

    @PostMapping("/review")
    public String doReview(@RequestBody ReviewRequestBody body) {
        log.info("Doing reviews for repo {} length {}", body.reviewRepoName, body.reviewCommits.size());

        armageddonService.review(body.reviewCommits);

        return "{\"status\": \"success\"}";
    }
}
