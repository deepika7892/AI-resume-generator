package com.resume.ai.backend.resume_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class webconfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}