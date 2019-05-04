package com.armageddon.services;

import com.armageddon.configs.ArmageddonConfig;
import org.springframework.stereotype.Service;

@Service
public class ArmageddonService {
    private ArmageddonConfig armageddonConfig;

    public ArmageddonService(ArmageddonConfig armageddonConfig) {
        this.armageddonConfig = armageddonConfig;
    }

    public ArmageddonConfig getConfig() {
        return armageddonConfig;
    }
}
