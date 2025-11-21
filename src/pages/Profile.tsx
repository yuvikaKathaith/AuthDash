import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { z } from "zod";

const profileSchema = z.object({
  full_name: z.string().trim().min(2).max(100),
});

const Profile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user!.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const updateMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const data = {
        full_name: formData.get("full_name") as string,
      };
      const validated = profileSchema.parse(data);

      const { error } = await supabase
        .from("profiles")
        .update(validated)
        .eq("id", user!.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated successfully");
      setEditing(false);
    },
    onError: (error: any) => {
      if (error instanceof z.ZodError) toast.error(error.errors[0].message);
      else toast.error(error.message || "Failed to update profile");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateMutation.mutate(formData);
  };

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="max-w-2xl space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Profile
        </h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <Card className="backdrop-blur-xl bg-card/70 shadow-xl border border-white/10 rounded-2xl transition-all hover:shadow-2xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/40 shadow-md">
              <AvatarFallback className="text-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                {getInitials(profile?.full_name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-semibold">
                {profile?.full_name || "User"}
              </CardTitle>
              <CardDescription>{user?.email}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  defaultValue={profile?.full_name || ""}
                  maxLength={100}
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  Save Changes
                </Button>
                <Button variant="outline" type="button" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-5">
              <div>
                <Label>Full Name</Label>
                <p className="mt-1 text-lg font-medium">{profile?.full_name || "Not set"}</p>
              </div>

              <div>
                <Label>Email</Label>
                <p className="mt-1 text-lg font-medium">{user?.email}</p>
              </div>

              <Button
                onClick={() => setEditing(true)}
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md hover:shadow-lg"
              >
                Edit Profile
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-xl backdrop-blur-xl bg-card/70 border border-white/10 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl">Account Information</CardTitle>
          <CardDescription>Your account activity details</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label>Account Created</Label>
            <p className="mt-1">
              {profile?.created_at
                ? new Date(profile.created_at).toLocaleDateString()
                : "Unknown"}
            </p>
          </div>

          <div>
            <Label>Last Updated</Label>
            <p className="mt-1">
              {profile?.updated_at
                ? new Date(profile.updated_at).toLocaleDateString()
                : "Unknown"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
