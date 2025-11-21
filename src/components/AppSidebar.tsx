import { LayoutDashboard, ListTodo, User, LogOut, Sparkles } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Tasks', url: '/dashboard/tasks', icon: ListTodo },
  { title: 'Profile', url: '/dashboard/profile', icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === 'collapsed';

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar 
      collapsible="icon"
      className={cn(
        "border-r border-sidebar-border backdrop-blur-xl",
        "transition-all duration-300 ease-in-out"
      )}
    >
      <SidebarHeader className="border-b border-sidebar-border/50">
        <div className={cn(
          "flex items-center gap-3 p-4 transition-all duration-300",
          isCollapsed ? "justify-center" : "justify-start"
        )}>
          <div className="relative">
            <div className="h-9 w-9 rounded-xl bg-gradient-primary shadow-glow flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="absolute -inset-1 bg-gradient-primary opacity-20 blur-lg rounded-xl -z-10" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                TaskFlow
              </span>
              <span className="text-xs text-muted-foreground">Workspace</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className={cn(
            "text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2",
            isCollapsed && "text-center"
          )}>
            {isCollapsed ? '•' : 'Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className={cn(
                          "relative group flex items-center gap-3 px-3 py-2.5 rounded-xl",
                          "transition-all duration-200 ease-out",
                          "hover:bg-sidebar-accent/80",
                          !active && "text-sidebar-foreground/70 hover:text-sidebar-foreground",
                          isCollapsed && "justify-center"
                        )}
                        activeClassName={cn(
                          "bg-gradient-to-r from-sidebar-accent to-sidebar-accent/50",
                          "text-sidebar-accent-foreground font-medium",
                          "shadow-lg shadow-primary/10",
                          "before:absolute before:inset-0 before:rounded-xl",
                          "before:bg-gradient-primary before:opacity-10"
                        )}
                      >
                        <item.icon className={cn(
                          "h-5 w-5 shrink-0 transition-transform duration-200",
                          active && "text-primary",
                          "group-hover:scale-110"
                        )} />
                        {!isCollapsed && (
                          <span className="truncate text-sm font-medium">
                            {item.title}
                          </span>
                        )}
                        {active && !isCollapsed && (
                          <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary shadow-glow" />
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/50 p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <Button
              variant="ghost"
              size={isCollapsed ? "icon" : "default"}
              className={cn(
                "w-full transition-all duration-200",
                "hover:bg-destructive/10 hover:text-destructive",
                "rounded-xl",
                !isCollapsed && "justify-start gap-3"
              )}
              onClick={() => {
                console.log('Sign out clicked');
              }}
            >
              <LogOut className="h-4 w-4 shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium">Sign Out</span>}
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}