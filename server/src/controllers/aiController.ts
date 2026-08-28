import { Response } from 'express';
import { z } from 'zod';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { geminiService, AiMode } from '../services/geminiService.js';

const chatSchema = z.object({
  prompt: z.string().min(1, 'Prompt cannot be empty'),
  mode: z.enum(['socratic', 'mock-interview', 'resume-review', 'study-planner', 'general']).default('socratic'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().default([]),
});

export async function handleAiChat(req: AuthenticatedRequest, res: Response) {
  try {
    const parseResult = chatSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        error: { message: parseResult.error.errors[0].message },
      });
    }

    const { prompt, mode, history } = parseResult.data;
    const aiResponse = await geminiService.generateResponse(prompt, mode as AiMode, history);

    res.json({
      success: true,
      data: {
        response: aiResponse,
        mode,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { message: err.message || 'AI request failed' },
    });
  }
}
