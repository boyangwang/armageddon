package com.armageddon.controllers;

import com.armageddon.ArmageddonServerApplication;
import com.armageddon.configs.ArmageddonConfig;
import com.armageddon.services.ArmageddonService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
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
}
