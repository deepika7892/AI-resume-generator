package com.resume.ai.backend.resume_backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Project {

    private String title = "";
    private String description = "";
    private List<String> techStack = new ArrayList<>();
    private String link = "";

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getTechStack() { return techStack; }
    public void setTechStack(List<String> techStack) { this.techStack = techStack; }

    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }
}