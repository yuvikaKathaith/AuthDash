import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Shield, Zap, Users } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'Enterprise-grade security with JWT tokens and encrypted passwords',
    },
    {
      icon: Zap,
      title: 'Fast & Scalable',
      description: 'Built on modern architecture that scales with your needs',
    },
    {
      icon: Users,
      title: 'User Management',
      description: 'Complete profile management and role-based access control',
    },
    {
      icon: CheckCircle2,
      title: 'Task Management',
      description: 'Create, organize, and track tasks with powerful filters',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary" />
            <span className="text-xl font-bold">TaskFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/auth')}>
              Sign In
            </Button>
            <Button onClick={() => navigate('/auth')} className="gradient-primary">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-24 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-in">
            <h1 className="mb-6 text-5xl font-bold tracking-tight lg:text-7xl text-balance">
              Manage Your Tasks with{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Confidence
              </span>
            </h1>
            <p className="mb-8 text-xl text-muted-foreground text-balance">
              A scalable web application with secure authentication, powerful task management,
              and a beautiful dashboard experience.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/auth')}
                className="gradient-primary shadow-glow hover:shadow-lg transition-all"
              >
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/auth')}>
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-24 gradient-subtle">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-5xl">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground">
              Built with modern technology for security, speed, and scalability
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border bg-card p-6 shadow-md transition-all hover:shadow-lg animate-fade-in"
              >
                <feature.icon className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-12 text-center shadow-lg">
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join thousands of users who trust TaskFlow for their productivity needs
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/auth')}
            className="gradient-primary shadow-glow hover:shadow-lg transition-all"
          >
            Create Your Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2024 TaskFlow. Built with modern technology and best practices.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;