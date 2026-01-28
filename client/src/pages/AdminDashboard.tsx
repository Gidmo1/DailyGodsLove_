import { useAuth } from "@/hooks/use-auth";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { Loader2, Users, FileText, Mail, Plus, Trash2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = "/api/login";
    }
  }, [authLoading, isAuthenticated]);

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: [api.posts.list.path],
    enabled: isAuthenticated
  });

  if (authLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-grow container-custom py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-primary">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.firstName || 'Admin'}</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => window.location.href = "/api/logout"}>
              Logout
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="hover-elevate">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{posts?.length || 0}</div>
            </CardContent>
          </Card>
          <Card className="hover-elevate">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Newsletter</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Active</div>
            </CardContent>
          </Card>
          <Card className="hover-elevate">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verse Status</CardTitle>
              <Plus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Automated</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Devotional Posts</CardTitle>
            <Button size="sm" onClick={() => toast({ title: "Coming Soon", description: "Post editor is being finalized." })}>
              <Plus className="w-4 h-4 mr-2" /> New Post
            </Button>
          </CardHeader>
          <CardContent>
            {postsLoading ? (
              <Loader2 className="w-6 h-6 animate-spin mx-auto" />
            ) : (
              <div className="divide-y divide-border">
                {posts?.map((post) => (
                  <div key={post.id} className="flex justify-between items-center py-4">
                    <div>
                      <h4 className="font-bold text-primary">{post.title}</h4>
                      <p className="text-sm text-muted-foreground italic">/{post.slug}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
                {(!posts || posts.length === 0) && (
                  <p className="text-center py-8 text-muted-foreground">No posts found.</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

