"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Shield, Calendar, Settings } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">My Profile</h1>
        <p className="text-muted-foreground">
          View and manage your personal information
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile Header Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                  alt={user.name}
                />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
                <p className="text-muted-foreground mb-4">{user.email}</p>
                <Link href="/profile/settings">
                  <Button>
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
              <User className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">Full Name</p>
                <p className="text-sm text-muted-foreground">{user.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">Email Address</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">Role</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {user.role}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">Member Since</p>
                <p className="text-sm text-muted-foreground">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                Track your sign language learning journey
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="p-4 rounded-lg bg-primary/10">
                  <p className="text-2xl font-bold text-primary">0</p>
                  <p className="text-xs text-muted-foreground">Words Learned</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/20">
                  <p className="text-2xl font-bold text-secondary-foreground">0</p>
                  <p className="text-xs text-muted-foreground">Games Played</p>
                </div>
                <div className="p-4 rounded-lg bg-accent/30">
                  <p className="text-2xl font-bold text-accent-foreground">0</p>
                  <p className="text-xs text-muted-foreground">Translations</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
