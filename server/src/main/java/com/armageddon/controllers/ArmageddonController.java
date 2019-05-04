package com.armageddon.controllers;

import com.armageddon.ArmageddonServerApplication;
import com.armageddon.configs.ArmageddonConfig;
import com.armageddon.models.ArmageddonData;
import com.armageddon.services.ArmageddonService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/armageddon")
public class ArmageddonController {
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
    public String doReview() {
        return "{\"status\": \"success\"}";
    }
}
