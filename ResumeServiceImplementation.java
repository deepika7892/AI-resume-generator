package com.resume.ai.backend.resume_backend.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.resume.ai.backend.resume_backend.dto.ResumeDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

@Service
public class ResumeServiceImplementation implements ResumeService {

    @Value("${groq.api.key}")
    private String apiKey;

    @Override
    public ResumeDto generateResumeJson(String userInput) {

        try {
            URL url = new URL("https://api.groq.com/openai/v1/chat/completions");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + apiKey);
            conn.setRequestProperty("Content-Type", "application/json");

            String systemPrompt = """
You are a professional AI Resume Generator.

Return ONLY valid JSON.
Do NOT add explanations.
Do NOT add markdown.
Do NOT rename fields.
Do NOT add extra fields.

The JSON must EXACTLY match this structure:

{
  "name": "",
  "email": "",
  "phone": "",
  "linkedin": "",
  "github": "",
  "summary": "",
  "education": [
    {
      "degree": "",
      "college": "",
      "year": "",
      "score": ""
    }
  ],
  "skills": {
    "technical": [],
    "soft": []
  },
  "projects": [
    {
      "title": "",
      "description": "",
      "techStack": [],
      "link": ""
    }
  ],
  "experience": [
    {
      "title": "",
      "company": "",
      "duration": "",
      "description": ""
    }
  ],
  "internships": [
    {
      "title": "",
      "company": "",
      "duration": "",
      "description": ""
    }
  ],
  "certifications": [
    {
      "title": "",
      "issuer": "",
      "year": ""
    }
  ],
  "achievements": [],
  "languages": []
}

IMPORTANT RULES:
- Do NOT leave ANY field empty.
- Do NOT return empty strings.
- Do NOT return empty arrays.
- Always generate realistic professional email and phone number.
- Always generate a 3-4 line professional summary.
- Always generate at least:
    • 2 detailed projects (minimum 3 lines description each)
    • 1 internship with full details
    • 1 professional experience if appropriate
- techStack must contain at least 3 technologies.
- achievements must contain at least 3 strong points.
- languages must contain at least 2 entries.
- If input is short, intelligently create professional content.
- Keep descriptions concise and professional.
- Avoid long paragraphs.
- Use short impactful statements (1-2 lines).
-Professional summary must be maximum 80 words and 3–4 lines only.
- Optimize for one-page resume length.

Return JSON only.
""";

            ObjectMapper mapper = new ObjectMapper();

            ChatRequest request = new ChatRequest(systemPrompt, userInput);
            String payload = mapper.writeValueAsString(request);

            try (OutputStream os = conn.getOutputStream()) {
                os.write(payload.getBytes(StandardCharsets.UTF_8));
            }

            InputStream is = (conn.getResponseCode() >= 200 && conn.getResponseCode() < 300)
                    ? conn.getInputStream()
                    : conn.getErrorStream();

            BufferedReader br = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8));
            StringBuilder responseBuilder = new StringBuilder();
            String line;

            while ((line = br.readLine()) != null) {
                responseBuilder.append(line);
            }

            String rawResponse = responseBuilder.toString();
            JsonNode rootNode = mapper.readTree(rawResponse);

            String aiContent = rootNode
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

            // Clean AI output
            aiContent = aiContent
                    .replaceAll("```json", "")
                    .replaceAll("```", "")
                    .replaceAll("^json", "")
                    .trim();

            // Extract JSON portion safely
            int firstBrace = aiContent.indexOf("{");
            int lastBrace = aiContent.lastIndexOf("}");

            if (firstBrace != -1 && lastBrace != -1) {
                aiContent = aiContent.substring(firstBrace, lastBrace + 1);
            }

            System.out.println("FINAL CLEAN JSON:");
            System.out.println(aiContent);

            return mapper.readValue(aiContent, ResumeDto.class);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    static class ChatRequest {
        public String model = "llama-3.3-70b-versatile";
        public Object[] messages;
        public double temperature = 0.3;

        public ChatRequest(String systemPrompt, String userInput) {
            this.messages = new Object[]{
                    new Message("system", systemPrompt),
                    new Message("user", userInput)
            };
        }
    }

    static class Message {
        public String role;
        public String content;

        public Message(String role, String content) {
            this.role = role;
            this.content = content;
        }
    }
}