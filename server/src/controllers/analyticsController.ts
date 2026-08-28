import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { analyticsService } from '../services/analyticsService.js';

export async function getAnalyticsSummary(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user?.id || 'demo-user';
    const summary = await analyticsService.getSummary(userId);

    res.json({
      success: true,
      data: summary,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { message: err.message || 'Failed to fetch analytics summary' },
    });
  }
}
