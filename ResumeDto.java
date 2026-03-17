package com.resume.ai.backend.resume_backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ResumeDto {

    public String name;
    public String email;
    public String phone;
    public String linkedin;
    public String github;
    public String summary;
    public List<Education> education;
    public Skills skills;
    public List<Project> projects;
    public List<Experience> experience;
    public List<Internship> internships;
    public List<Certification> certifications;
    public List<String> achievements;
    public List<String> languages;
}