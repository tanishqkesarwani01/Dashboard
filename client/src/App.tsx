import React from 'react';
import { Route, Switch } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AppShell } from '@/app/layout/AppShell';
import { DashboardOverview } from '@/features/analytics/DashboardOverview';
import { DsaPage } from '@/features/dsa/DsaPage';
import { CurriculumPage } from '@/features/curriculum/CurriculumPage';
import { HabitsPage } from '@/features/habits-logs/HabitsPage';
import { ProjectsPage } from '@/features/projects/ProjectsPage';
import { CustomModulesPage } from '@/features/custom-modules/CustomModulesPage';
import { AnalyticsPage } from '@/features/analytics/AnalyticsPage';
import { AiCopilotDrawer } from '@/features/ai-copilot/AiCopilotDrawer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" richColors theme="dark" />
      <AppShell>
        <Switch>
          <Route path="/" component={DashboardOverview} />
          <Route path="/analytics" component={AnalyticsPage} />
          <Route path="/dsa" component={DsaPage} />
          <Route path="/curriculum/webdev">
            {() => <CurriculumPage trackType="webdev" />}
          </Route>
          <Route path="/curriculum/corecs">
            {() => <CurriculumPage trackType="corecs" />}
          </Route>
          <Route path="/habits" component={HabitsPage} />
          <Route path="/projects" component={ProjectsPage} />
          <Route path="/custom-modules" component={CustomModulesPage} />
          <Route>
            {() => (
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-3">
                <h2 className="text-xl font-bold text-white">404 - Page Not Found</h2>
                <p className="text-xs text-slate-400">The module or page you requested does not exist.</p>
              </div>
            )}
          </Route>
        </Switch>
      </AppShell>
      <AiCopilotDrawer />
    </QueryClientProvider>
  );
}

export default App;
