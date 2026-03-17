package com.resume.ai.backend.resume_backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Certification {

    private String title;
    private String issuer;
    private String year;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getIssuer() { return issuer; }
    public void setIssuer(String issuer) { this.issuer = issuer; }

    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }
}