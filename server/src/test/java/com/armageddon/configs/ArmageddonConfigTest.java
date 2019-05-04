package com.armageddon.configs;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ArmageddonConfigTest {

    @Autowired
    private ArmageddonConfig armageddonConfig;

    @Test
    public void configs() throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();

        System.out.println(objectMapper.writeValueAsString(armageddonConfig));
        assertEquals("http://gitlab.intranet.huiyin.com", armageddonConfig.getGithosting().getGitlab().getBaseUrl());
        assertEquals(1, armageddonConfig.getRepos().size());
    }
}
