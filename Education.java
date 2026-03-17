package com.resume.ai.backend.resume_backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Education {

    private String degree = "";
    private String college = "";
    private String year = "";
    private String score = "";

    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }

    public String getCollege() { return college; }
    public void setCollege(String college) { this.college = college; }

    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }

    public String getScore() { return score; }
    public void setScore(String score) { this.score = score; }
}