export interface AnalyticsSummary {
  kpis: {
    totalSolved: number;
    activeStreak: number;
    weeklyStudyHours: number;
    reviewsDueCount: number;
  };
  difficultyDistribution: {
    easy: number;
    medium: number;
    hard: number;
    total: number;
  };
  studyDistribution: {
    dsaHours: number;
    webDevHours: number;
    coreCsHours: number;
    totalHours: number;
  };
  dueReviews: Array<{
    id: string;
    title: string;
    interval: string;
    difficulty: string;
    topic: string;
  }>;
}

export class AnalyticsService {
  async getSummary(userId: string): Promise<AnalyticsSummary> {
    // In production, queries PostgreSQL via Supabase or returns computed profile metrics
    return {
      kpis: {
        totalSolved: 142,
        activeStreak: 7,
        weeklyStudyHours: 26.5,
        reviewsDueCount: 4,
      },
      difficultyDistribution: {
        easy: 54,
        medium: 72,
        hard: 16,
        total: 142,
      },
      studyDistribution: {
        dsaHours: 14.5,
        webDevHours: 8.0,
        coreCsHours: 4.0,
        totalHours: 26.5,
      },
      dueReviews: [
        { id: '1', title: 'Binary Search (Rotated Array)', interval: 'Day 7 Revision', difficulty: 'Medium', topic: 'Binary Search' },
        { id: '2', title: 'Dynamic Programming (Knapsack 0/1)', interval: 'Day 14 Revision', difficulty: 'Hard', topic: 'Dynamic Programming' },
        { id: '3', title: 'Graph BFS & Topological Sort', interval: 'Day 3 Revision', difficulty: 'Medium', topic: 'Graphs' },
        { id: '4', title: 'Database Indexing & B-Trees', interval: 'Day 7 Revision', difficulty: 'Easy', topic: 'DBMS' },
      ],
    };
  }
}

export const analyticsService = new AnalyticsService();
