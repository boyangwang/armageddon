package com.armageddon.armageddonserver.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.armageddon.armageddonserver.ArmageddonServerApplication;

@RestController
public class ArmageddonController {

    @GetMapping("/version")
    public String getVersion() {
        return "Version: " + ArmageddonServerApplication.VERSION;
    }
}
