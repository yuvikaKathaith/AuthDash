import { useAuth } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const { user } = useAuth();

  const { data: tasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const stats = {
    total: tasks?.length || 0,
    completed: tasks?.filter(t => t.status === 'completed').length || 0,
    inProgress: tasks?.filter(t => t.status === 'in_progress').length || 0,
    pending: tasks?.filter(t => t.status === 'pending').length || 0,
  };

  return (
  <div className="space-y-10 animate-fade-in">
    {/* Header */}
    <div className="space-y-1">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        Dashboard
      </h1>
      <p className="text-muted-foreground">
        Welcome back! Here's an overview of your tasks.
      </p>
    </div>

    {/* Stats Cards */}
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* TOTAL */}
      <Card className="shadow-xl hover:shadow-2xl transition-all border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          <Clock className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">All your tasks</p>
        </CardContent>
      </Card>

      {/* PENDING */}
      <Card className="shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 backdrop-blur-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Pending</CardTitle>
          <AlertCircle className="h-4 w-4 text-yellow-400" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.pending}</div>
          <p className="text-xs text-muted-foreground">Not started yet</p>
        </CardContent>
      </Card>

      {/* IN PROGRESS */}
      <Card className="shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 backdrop-blur-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          <Clock className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.inProgress}</div>
          <p className="text-xs text-muted-foreground">Currently working on</p>
        </CardContent>
      </Card>

      {/* COMPLETED */}
      <Card className="shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 backdrop-blur-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.completed}</div>
          <p className="text-xs text-muted-foreground">Done and dusted</p>
        </CardContent>
      </Card>
    </div>

    {/* Quick Actions */}
    <Card className="shadow-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
      <CardHeader>
        <CardTitle className="text-xl">Quick Actions</CardTitle>
        <CardDescription>Get started with your most common actions</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4 md:grid-cols-2">
        {/* Manage Tasks */}
        <a
          href="/dashboard/tasks"
          className="flex items-center gap-4 rounded-xl border border-primary/20 p-4
            bg-gradient-to-r from-purple-500/10 to-pink-500/10 
            transition-all hover:scale-[1.02] hover:bg-primary/20"
        >
          <div className="rounded-xl bg-purple-500/20 p-3">
            <CheckCircle2 className="h-7 w-7 text-purple-500" />
          </div>
          <div>
            <p className="font-semibold text-lg">Manage Tasks</p>
            <p className="text-sm text-muted-foreground">
              View, update, and organize your tasks
            </p>
          </div>
        </a>

        {/* Profile */}
        <a
          href="/dashboard/profile"
          className="flex items-center gap-4 rounded-xl border border-blue-500/20 p-4
            bg-gradient-to-r from-blue-500/10 to-cyan-500/10 
            transition-all hover:scale-[1.02] hover:bg-blue-500/20"
        >
          <div className="rounded-xl bg-blue-500/20 p-3">
            <Clock className="h-7 w-7 text-blue-500" />
          </div>
          <div>
            <p className="font-semibold text-lg">Update Profile</p>
            <p className="text-sm text-muted-foreground">
              Manage your account details
            </p>
          </div>
        </a>
      </CardContent>
    </Card>
  </div>
);
};

export default Dashboard;