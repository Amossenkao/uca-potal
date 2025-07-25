import Link from 'next/link';
import { Award, BookOpen, Users, Heart, Target, ThumbsUp } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-brand-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Our School</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Building a foundation for success through quality education and holistic development
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Story</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Founded in 1990, our school started with a vision to provide quality education that nurtures young minds and helps them reach their full potential. What began as a small institution with just 50 students has now grown into a thriving educational community serving over 1,200 students across elementary, middle, and high school programs.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Over the years, we have maintained our commitment to academic excellence while adapting to the changing educational landscape. Our innovative approaches to teaching and learning have earned us recognition as one of the leading educational institutions in the region.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Today, we continue to build on our rich heritage while embracing new technologies and methodologies to prepare our students for success in an ever-changing world.
              </p>
            </div>
            <div className="relative h-80 md:h-full">
              <div className="bg-gray-300 dark:bg-gray-700 h-full w-full rounded-lg relative flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">School Building Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission & Vision</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mr-4">
                  <Target className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Our Mission</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                To provide a nurturing and inclusive learning environment where students develop critical thinking skills, creativity, and character. We strive to empower our students with the knowledge, skills, and values they need to become responsible global citizens and lifelong learners.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mr-4">
                  <Heart className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Our Vision</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                To be recognized as a center of educational excellence that inspires a passion for learning and prepares students to thrive in a complex, interconnected world. We envision graduates who are intellectually curious, socially responsible, and equipped to make meaningful contributions to society.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Core Values</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              These principles guide our approach to education and shape our school culture
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Excellence</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We pursue excellence in all aspects of education, challenging ourselves and our students to reach their highest potential.
              </p>
            </div>
            
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Lifelong Learning</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We foster curiosity and a love of learning that extends beyond the classroom and continues throughout life.
              </p>
            </div>
            
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-4">
                <ThumbsUp className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Integrity</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We promote honesty, ethical behavior, and accountability in all interactions within our community.
              </p>
            </div>
            
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Inclusivity</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We celebrate diversity and create an inclusive environment where every student feels valued and respected.
              </p>
            </div>
            
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Compassion</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We nurture empathy and kindness, encouraging students to understand others and contribute positively to society.
              </p>
            </div>
            
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Innovation</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We embrace creative thinking and new approaches to education that prepare students for the challenges of tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Leadership Team</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Dedicated professionals committed to educational excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md">
              <div className="h-64 bg-gray-300 dark:bg-gray-700 relative flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">Principal Photo</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Dr. Sarah Johnson</h3>
                <p className="text-brand-600 dark:text-brand-400 mb-2">Principal</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  With over 20 years of experience in education, Dr. Johnson leads our school with vision and dedication.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md">
              <div className="h-64 bg-gray-300 dark:bg-gray-700 relative flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">Vice Principal Photo</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Michael Rodriguez</h3>
                <p className="text-brand-600 dark:text-brand-400 mb-2">Vice Principal, Academics</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Passionate about curriculum development and instructional excellence.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md">
              <div className="h-64 bg-gray-300 dark:bg-gray-700 relative flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">Admin Director Photo</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Jennifer Lee</h3>
                <p className="text-brand-600 dark:text-brand-400 mb-2">Director of Administration</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Ensures smooth operations and resource management throughout the school.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md">
              <div className="h-64 bg-gray-300 dark:bg-gray-700 relative flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">Student Affairs Photo</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">David Thompson</h3>
                <p className="text-brand-600 dark:text-brand-400 mb-2">Director of Student Affairs</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Dedicated to student well-being, counseling, and extracurricular programs.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link 
              href="#" 
              className="inline-flex items-center justify-center border border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-md px-6 py-3"
            >
              Meet Our Full Faculty
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Come Visit Our Campus</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Experience our vibrant learning environment firsthand. Schedule a tour to see our facilities and meet our faculty.</p>
          <Link 
            href="/admissions" 
            className="bg-white text-brand-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium inline-block"
          >
            Schedule a Visit
          </Link>
        </div>
      </section>
    </div>
  );
}