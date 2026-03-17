package com.resume.ai.backend.resume_backend.controller;

import com.resume.ai.backend.resume_backend.dto.ResumeDto;
import com.resume.ai.backend.resume_backend.services.ResumeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping("/resume")
    public ResponseEntity<ResumeDto> generateResume(@RequestBody InputRequest request) {

        ResumeDto resume = resumeService.generateResumeJson(request.getInput());

        if (resume == null) {
            return ResponseEntity.internalServerError().build();
        }

        return ResponseEntity.ok(resume);
    }

    static class InputRequest {
        private String input;

        public String getInput() { return input; }
        public void setInput(String input) { this.input = input; }
    }
}