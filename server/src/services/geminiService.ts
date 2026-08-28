import { GoogleGenerativeAI } from '@google/generative-ai';
import { ENV } from '../config/env.js';

export type AiMode = 'socratic' | 'mock-interview' | 'resume-review' | 'study-planner' | 'general';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

const SYSTEM_PROMPTS: Record<AiMode, string> = {
  socratic: `You are the CareerOS Socratic DSA & Algorithmic Coach. 
CRITICAL RULE: DO NOT write full code solutions or give away the entire algorithm directly.
Your goal is to guide the student through questions and progressive hints:
1. Ask them what brute-force approach they see and what its time/space complexity is.
2. Give subtle clues about data structure choice (e.g. hash map vs binary search vs two pointers).
3. If they are stuck, suggest a small example or edge case (empty array, duplicates, negative numbers).
Format all math and complexity with LaTeX and use bold highlights.`,

  'mock-interview': `You are an elite Staff Software Engineer conducting a Technical Phone Screen / Behavioral Screen at a top tech company (Google, Meta, Amazon).
1. Ask challenging, real-world questions on Operating Systems (concurrency, virtual memory), DBMS (indexing, ACID, isolation levels), Computer Networks (TCP, HTTP/3, DNS), or System Design.
2. After the candidate responds, provide constructive feedback:
   - Score: (e.g., 4/5)
   - What they explained well
   - Missing technical nuances / trade-offs they should have mentioned
3. Then follow up with the next question or drill deeper into their answer.`,

  'resume-review': `You are a Senior Technical Recruiter & Hiring Manager. 
Your goal is to review project descriptions and convert them into high-impact, quantified resume bullet points.
Always follow the Google formula: "Accomplished [X] as measured by [Y], by doing [Z]".
Highlight specific tech stack choices, architectural trade-offs, concurrency, database performance, or latency improvements.`,

  'study-planner': `You are a Career Strategist for Software Engineers.
Based on the candidate's target role (e.g. Backend Engineer, Full-Stack Developer) and timeline, generate structured, weekly milestones balancing DSA practice, full-stack project building, and Core CS revision.`,

  general: `You are the CareerOS Engineering Assistant. Answer technical software development questions with high precision, clear code examples, and architectural explanations.`,
};

export class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;

  constructor() {
    if (ENV.GEMINI_API_KEY) {
      this.genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);
    }
  }

  async generateResponse(
    prompt: string,
    mode: AiMode = 'socratic',
    history: ChatMessage[] = []
  ): Promise<string> {
    if (!this.genAI) {
      // Intelligent fallback when GEMINI_API_KEY is not yet populated in .env
      return this.getMockResponse(prompt, mode);
    }

    try {
      const systemInstruction = SYSTEM_PROMPTS[mode] || SYSTEM_PROMPTS.general;
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction,
      });

      const contents = [
        ...history.map((msg) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        })),
        { role: 'user', parts: [{ text: prompt }] },
      ];

      const result = await model.generateContent({ contents });
      const response = result.response;
      return response.text() || 'No response generated.';
    } catch (err: any) {
      console.error('[Gemini API Error]', err.message);
      return this.getMockResponse(prompt, mode);
    }
  }

  private getMockResponse(prompt: string, mode: AiMode): string {
    if (mode === 'socratic') {
      return `💡 **Socratic Guidance**: Let's break down your question about "${prompt}".\n\n1. What is the brute-force approach to this problem, and what is its time complexity?\n2. Can you use a hash set or two pointers to reduce the search time from $O(N^2)$ to $O(N)$?\n3. What edge cases should you test first (e.g., empty inputs, duplicates)?`;
    }

    if (mode === 'mock-interview') {
      return `🎙️ **Mock Interview Feedback**:\n\nRegarding "${prompt}":\n- **Score**: 4.2 / 5.0\n- **Strengths**: Clear understanding of core concepts.\n- **Improvement**: Make sure to explicitly mention how write-ahead logging (WAL) guarantees Durability in ACID transactions.\n\n**Next Question**: How does PostgreSQL handle multi-version concurrency control (MVCC) during concurrent reads and writes?`;
    }

    if (mode === 'resume-review') {
      return `📄 **Optimized Resume Bullets** for "${prompt}":\n\n• Engineered a resilient distributed microservice using Node.js and Redis, reducing p99 API response latency by **35%** under 5,000 requests/sec load.\n• Architected normalized PostgreSQL schema with composite indexing, eliminating sequential scans and decreasing query execution time by **42%**.\n• Automated end-to-end CI/CD test workflows with GitHub Actions, accelerating release cycles from days to minutes.`;
    }

    return `🤖 **CareerOS Assistant**: Here is an analysis of "${prompt}". Focus on strong typing, modular architecture, and predictable state transitions.`;
  }
}

export const geminiService = new GeminiService();
