package com.resume.ai.backend.resume_backend.services;

import com.resume.ai.backend.resume_backend.dto.ResumeDto;

public interface ResumeService {
    ResumeDto generateResumeJson(String userInput);
}