"use client"
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  BookOpen,
  CalendarDays,
  CheckCircle,
  Clock,
  BarChart3,
  TrendingUp,
  Activity,
  RefreshCw,
  Check,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
export default function Dashboard() {

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Last updated: Today, 2:30 PM</span>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value="1,248"
          description="+8% from last term"
          icon={<Users className="h-6 w-6" />}
          trend="up"
        />
        <StatsCard
          title="Classes"
          value="32"
          description="Across all grades"
          icon={<BookOpen className="h-6 w-6" />}
          trend="neutral"
        />
        <StatsCard
          title="Upcoming Events"
          value="5"
          description="Next 7 days"
          icon={<CalendarDays className="h-6 w-6" />}
          trend="neutral"
        />
        <StatsCard
          title="Grade Reports"
          value="85%"
          description="Submitted for this term"
          icon={<CheckCircle className="h-6 w-6" />}
          trend="up"
        />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Term Progress</CardTitle>
            <CardDescription>Current academic term is 65% complete</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Term Progress</span>
                <span className="text-sm font-medium">65%</span>
              </div>
              <Progress value={65} />

              <div className="grid gap-4 grid-cols-2 pt-4">
                <div className="border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-blue-50 rounded-full">
                        <Clock className="h-5 w-5 text-blue-500" />
                      </div>
                      <span className="font-medium">Days Left</span>
                    </div>
                    <span className="text-2xl font-semibold">24</span>
                  </div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-green-50 rounded-full">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <span className="font-medium">Completed</span>
                    </div>
                    <span className="text-2xl font-semibold">48</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Tasks Overview</CardTitle>
            <CardDescription>Your pending tasks and approvals</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <TaskItem
                title="Review teacher lesson plans"
                status="pending"
                dueDate="Today"
                priority="high"
              />
              <TaskItem
                title="Approve final grades for Grade 10"
                status="pending"
                dueDate="Tomorrow"
                priority="medium"
              />
              <TaskItem
                title="Class observation: Mrs. Johnson's class"
                status="pending"
                dueDate="Oct 25"
                priority="medium"
              />
              <TaskItem
                title="Parent-teacher meeting preparation"
                status="completed"
                dueDate="Oct 20"
                priority="low"
              />
              <TaskItem
                title="Review curriculum updates"
                status="completed"
                dueDate="Oct 18"
                priority="medium"
              />
            </ul>
            <div className="mt-4">
              <Button variant="outline" className="w-full">View All Tasks</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Academic Performance</CardTitle>
            <CardDescription>Average grades by subject across all classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border-b pb-4">
              <BarChartPlaceholder />
            </div>
            <div className="flex justify-between items-center pt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Current Term</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Previous Term</span>
              </div>
              <Button variant="ghost" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Detailed Report
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Recent Notices</CardTitle>
            <CardDescription>School-wide announcements</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <NoticeItem
                title="Parent-Teacher Conference"
                content="Scheduled for October 28-29. Please prepare student progress reports."
                date="2 hours ago"
                type="info"
              />
              <NoticeItem
                title="Final Exam Schedule"
                content="Final examination timetable has been published. Review by Friday."
                date="Yesterday"
                type="important"
              />
              <NoticeItem
                title="Professional Development"
                content="Workshop on new curriculum implementation next week."
                date="2 days ago"
                type="info"
              />
              <NoticeItem
                title="Budget Requests Due"
                content="Department budget requests for next term due by month-end."
                date="3 days ago"
                type="warning"
              />
            </ul>
            <div className="mt-4">
              <Button variant="outline" className="w-full">View All Notices</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatsCard({ title, value, description, icon, trend }: { 
  title: string, 
  value: string, 
  description: string, 
  icon: React.ReactNode,
  trend: "up" | "down" | "neutral" 
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-primary/10 rounded-lg">
            {icon}
          </div>
          {trend === "up" && <TrendingUp className="h-5 w-5 text-green-500" />}
          {trend === "down" && <TrendingUp className="h-5 w-5 text-red-500 rotate-180" />}
          {trend === "neutral" && <Activity className="h-5 w-5 text-gray-400" />}
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function TaskItem({ title, status, dueDate, priority }: {
  title: string,
  status: "pending" | "completed",
  dueDate: string,
  priority: "high" | "medium" | "low"
}) {
  return (
    <li className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center">
        {status === "pending" ? (
          <div className="h-5 w-5 rounded-full border-2 border-gray-300 mr-3"></div>
        ) : (
          <div className="h-5 w-5 rounded-full bg-green-500 text-white flex items-center justify-center mr-3">
            <Check className="h-3 w-3" />
          </div>
        )}
        <span className={`font-medium ${status === "completed" ? "text-muted-foreground line-through" : ""}`}>{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant={
          priority === "high" ? "destructive" : 
          priority === "medium" ? "outline" : 
          "secondary"
        } className="text-xs">
          {priority}
        </Badge>
        <span className="text-xs text-muted-foreground">{dueDate}</span>
      </div>
    </li>
  );
}

function NoticeItem({ title, content, date, type }: {
  title: string,
  content: string,
  date: string,
  type: "info" | "important" | "warning"
}) {
  const getBorderColor = (type: string) => {
    switch (type) {
      case "important":
        return "rgb(79, 70, 229)";
      case "warning":
        return "rgb(245, 158, 11)";
      default:
        return "rgb(59, 130, 246)";
    }
  };

  return (
    <li className="border-l-4 pl-3 pr-2 py-2 rounded-sm" 
      style={{ 
        borderLeftColor: getBorderColor(type)
      }}
    >
      <div className="flex justify-between items-start">
        <h4 className="font-medium text-sm">{title}</h4>
        <span className="text-xs text-muted-foreground">{date}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-1">{content}</p>
    </li>
  );
}

function BarChartPlaceholder() {
  const data = [
    { month: 'Jan', height: 40 },
    { month: 'Feb', height: 65 },
    { month: 'Mar', height: 75 },
    { month: 'Apr', height: 90 },
    { month: 'May', height: 60 },
    { month: 'Jun', height: 80 },
    { month: 'Jul', height: 70 },
    { month: 'Aug', height: 55 },
    { month: 'Sep', height: 45 },
    { month: 'Oct', height: 85 },
    { month: 'Nov', height: 50 },
    { month: 'Dec', height: 65 }
  ];

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex items-end h-64 space-x-2">
        {data.map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className="w-8 bg-blue-500 rounded-t-md"
              style={{ height: `${item.height}%`, opacity: i % 2 === 0 ? 0.7 : 1 }}
            ></div>
            <div className="text-xs mt-1 text-muted-foreground">
              {item.month}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}