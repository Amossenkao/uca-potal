"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavBar from "@/components/sections/NavBar";

import { 
  GraduationCap,
  Award,
  Laptop,
  Users,
  BookOpen,
  Shield,
  Zap,
  Building,
  Wifi,
  FlaskConical,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  ChevronRight,
  Star,
  Target,
  Heart,
  Globe,
  ArrowRight

} from "lucide-react";


export default function SchoolHomepage() {

  return (
    <div className="min-h-screen bg-background">
      <NavBar/>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://res.cloudinary.com/dcalueltd/image/upload/v1753368059/school-management-system/uca/Hero.png`
          }}
        />
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Upstairs Christian Academy
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Nurturing minds, building character, and inspiring excellence through quality Christian education
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3">
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-3 bg-white/10 border-white text-white hover:bg-white hover:text-primary">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Our School Section */}
      <section id="about" className="py-16 sm:py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose Upstairs Christian Academy?</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              We provide exceptional education that nurtures both academic excellence and spiritual growth
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                  <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl">Academic Excellence</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Our rigorous curriculum and dedicated teachers ensure students achieve their highest potential with consistently high test scores.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                  <Laptop className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-xl">Technology Focused</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Modern computer labs, smart classrooms, and digital learning tools prepare students for the future.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                  <Heart className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl">Character Development</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  We focus on building strong moral values and character through Christian principles and community service.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50 transition-colors">
                  <Users className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle className="text-xl">Small Class Sizes</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Our low student-to-teacher ratio ensures personalized attention and better learning outcomes for every student.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4 group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                  <Target className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle className="text-xl">Holistic Education</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  We develop the whole child through academics, arts, athletics, and spiritual growth programs.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mb-4 group-hover:bg-teal-200 dark:group-hover:bg-teal-900/50 transition-colors">
                  <Globe className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                </div>
                <CardTitle className="text-xl">Global Perspective</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Our international programs and diverse community prepare students for success in a global society.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">World-Class Facilities</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              State-of-the-art facilities designed to enhance learning and provide the best educational experience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                  <Zap className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-lg">Modern E-Portal System</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Advanced online platform for grades, assignments, and parent communication
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                  <Laptop className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-lg">Computer Laboratory</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Fully equipped with latest computers and high-speed internet connectivity
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3 group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                  <FlaskConical className="h-7 w-7 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-lg">Science Laboratory</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Well-equipped labs for chemistry, biology, and physics experiments
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-3 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50 transition-colors">
                  <BookOpen className="h-7 w-7 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle className="text-lg">Digital Library</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Extensive collection of books and digital resources for research
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-3 group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                  <Wifi className="h-7 w-7 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle className="text-lg">Campus-Wide WiFi</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  High-speed wireless internet access throughout the entire campus
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-14 h-14 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mb-3 group-hover:bg-teal-200 dark:group-hover:bg-teal-900/50 transition-colors">
                  <Building className="h-7 w-7 text-teal-600 dark:text-teal-400" />
                </div>
                <CardTitle className="text-lg">Smart Classrooms</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Interactive whiteboards and multimedia systems in every classroom
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-14 h-14 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-3 group-hover:bg-pink-200 dark:group-hover:bg-pink-900/50 transition-colors">
                  <Shield className="h-7 w-7 text-pink-600 dark:text-pink-400" />
                </div>
                <CardTitle className="text-lg">Security System</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  24/7 CCTV monitoring and secure campus environment for student safety
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-3 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/50 transition-colors">
                  <Star className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle className="text-lg">Multi-Purpose Hall</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Large auditorium for assemblies, performances, and special events
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Administrative Team Section */}
      <section id="team" className="py-16 sm:py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Leadership Team</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Experienced educators and administrators dedicated to your child's success
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Principal */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">Dr. John Doe</CardTitle>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Principal</Badge>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Ed.D in Educational Leadership with over 20 years experience in academic administration and curriculum development.
                </p>
                <div className="flex justify-center gap-2">
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-1" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Vice Principal */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b494?w=150&h=150&fit=crop&crop=face" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">Prof. Jane Smith</CardTitle>
                <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">Vice Principal</Badge>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  M.Ed in Secondary Education with expertise in student affairs, discipline management, and academic counseling.
                </p>
                <div className="flex justify-center gap-2">
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-1" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Registrar */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                  <AvatarFallback>MB</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">Mr. Michael Brown</CardTitle>
                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Registrar</Badge>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  B.A in Business Administration specializing in student records management, enrollment, and academic documentation.
                </p>
                <div className="flex justify-center gap-2">
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-1" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Academic Director */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" />
                  <AvatarFallback>SW</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">Dr. Sarah Wilson</CardTitle>
                <Badge variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">Academic Director</Badge>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Ph.D in Curriculum and Instruction, responsible for academic programs, teacher development, and assessment.
                </p>
                <div className="flex justify-center gap-2">
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-1" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Student Affairs Director */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" />
                  <AvatarFallback>RT</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">Mr. Robert Taylor</CardTitle>
                <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Student Affairs Director</Badge>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  M.A in Student Personnel Services, overseeing student activities, counseling services, and campus life.
                </p>
                <div className="flex justify-center gap-2">
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-1" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Finance Director */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face" />
                  <AvatarFallback>LD</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">Ms. Linda Davis</CardTitle>
                <Badge variant="outline" className="bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400">Finance Director</Badge>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  CPA with MBA in Finance, managing school finances, budgeting, tuition, and financial aid programs.
                </p>
                <div className="flex justify-center gap-2">
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-1" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 dark:bg-gray-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* School Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Unity Christian Academy</h3>
                  <p className="text-sm text-gray-400">Excellence in Education</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Nurturing minds, building character, and inspiring excellence through quality Christian education since 1995.
              </p>
              <div className="flex gap-4">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800">
                  <Instagram className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Admissions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Academic Programs</a></li>
                <li><a href="#facilities" className="text-gray-400 hover:text-white transition-colors">Facilities</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Student Life</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">News & Events</a></li>
              </ul>
            </div>

            {/* Academic Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Academics</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Elementary School</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Junior High School</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Senior High School</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Course Catalog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Academic Calendar</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Library</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-400">123 Education Street</p>
                    <p className="text-gray-400">Monrovia, Montserrado</p>
                    <p className="text-gray-400">Liberia</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-gray-400">+231 770 123 456</p>
                    <p className="text-gray-400">+231 880 789 012</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-gray-400">info@unityca.edu.lr</p>
                    <p className="text-gray-400">admissions@unityca.edu.lr</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h5 className="font-semibold mb-3">School Hours</h5>
                <div className="text-gray-400 text-sm">
                  <p>Monday - Friday: 7:30 AM - 3:30 PM</p>
                  <p>Saturday: 8:00 AM - 12:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Unity Christian Academy. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Site Map</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}