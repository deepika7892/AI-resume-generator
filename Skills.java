package com.resume.ai.backend.resume_backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Skills {

    private List<String> technical = new ArrayList<>();
    private List<String> soft = new ArrayList<>();

    public List<String> getTechnical() { return technical; }
    public void setTechnical(List<String> technical) { this.technical = technical; }

    public List<String> getSoft() { return soft; }
    public void setSoft(List<String> soft) { this.soft = soft; }
}