'use client';
import React from 'react';
import Image from 'next/image';
import NavDropdown from '@/components/NavDropdown';
import Footer from '@/components/footer';
import ScrollToTop from '@/components/ScrollToTop';

const HistoryPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <NavDropdown />

      {/* Hero Section */}
    <section  className="relative bg-cover bg-center py-20 px-6 text-center"  style={{ backgroundImage: "url('/bgbanner.png')" }}>
      <div className="absolute inset-0 bg-opacity-50"></div>
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Our Journey: Spreading Tamil Across the Globe
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-white">
          From humble beginnings to a worldwide movement, discover how Tamil Online Classes connected thousands of
          international students to their heritage.
        </p>
      </div>
    </section>

      {/* About Us Section */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
            About <span className="text-secondary">Universal Tamil Academy</span>
          </h2>
          <p className="text-lg text-black leading-relaxed mb-10">
            At Universal Tamil Academy (UTA), we are dedicated to nurturing a love for the Tamil language among children and young learners across the globe. 
            Our online classes are designed to help students not just learn Tamil, but to truly Listen, Speak, Read and Write it with confidence.  
          </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8"> 
          <div className="bg-white rounded-2xl shadow hover:shadow-lg transition border border-gray-100 overflow-hidden">
            <div className="bg-green-100 py-3 text-center">
              <h3 className="text-xl font-bold text-secondary">Listen</h3>
            </div>
            <div className="p-6">
            <p className="text-black text-lg">
              Students develop listening and comprehension skills to grasp Tamil in real-life situations and conversations.
            </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow hover:shadow-lg transition border border-gray-100 overflow-hidden">
            <div className="bg-green-100 py-3 text-center">
              <h3 className="text-xl font-bold text-secondary">Speak</h3>
            </div>
            <div className="p-6">
              <p className="text-black text-lg">
                We encourage active speaking through storytelling, role-plays, and interactive discussions so kids gain fluency naturally.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow hover:shadow-lg transition border border-gray-100 overflow-hidden">
            <div className="bg-green-100 py-3 text-center">
              <h3 className="text-xl font-bold text-secondary">Read</h3>
            </div>
            <div className="p-6">
              <p className="text-black text-lg">
                Step by step, learners get familiar with Tamil script, letters, and words, progressing into reading stories and passages.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow hover:shadow-lg transition border border-gray-100 overflow-hidden">
            <div className="bg-green-100 py-3 text-center">
              <h3 className="text-xl font-bold text-secondary">Write</h3>
            </div>
            <div className="p-6">
              <p className="text-black text-lg">
                From letters to essays, students gain confidence in writing Tamil correctly and creatively, strengthening literacy skills.
              </p>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-20 px-6 md:px-16 bg-white relative">
        <h2 className="text-3xl font-bold text-center mb-16 text-secondary">
          Milestones in Our Journey
        </h2>
        <div className="max-w-5xl mx-auto space-y-12">

          {/* Content Blocks */}
          <div className="bg-green-50 p-8 rounded-xl shadow hover:shadow-lg transition border border-gray-100">
            <h3 className="text-xl font-semibold mb-3 text-secondary">From Small Steps to Big Dreams</h3>
            <p className="text-black leading-relaxed">
              What started as a few parents wanting their children to learn Tamil 
              soon grew into a movement. Our vision was simple – make Tamil learning
              fun, engaging, and possible from anywhere in the world.
            </p>
          </div>

          <div className="bg-green-100 p-8 rounded-xl shadow hover:shadow-lg transition border border-gray-100">
            <h3 className="text-xl font-semibold mb-3 text-secondary">Online Classes that Feel Like Home</h3>
            <p className="text-black leading-relaxed">
              With songs, storytelling, games, and interactive conversations, our online classes 
              are not just lessons – they're joyful experiences. Children look forward to every session, 
              where learning Tamil feels as natural as speaking with family.
            </p>
          </div>

          <div className="bg-green-50 p-8 rounded-xl shadow hover:shadow-lg transition border border-gray-100">
            <h3 className="text-xl font-semibold mb-3 text-secondary">Building Confidence & Connection</h3>
            <p className="text-black leading-relaxed">
              From the very first words to reading stories and writing essays, 
              we help children gain confidence in Tamil. More importantly, 
              we create a bond with culture and identity, making them proud of their roots.
            </p>
          </div>

          <div className="bg-green-100 p-8 rounded-xl shadow hover:shadow-lg transition border border-gray-100">
            <h3 className="text-xl font-semibold mb-3 text-secondary">Celebrating Tamil Beyond the Classroom</h3>
            <p className="text-black leading-relaxed">
              At UTA, Tamil is not just taught – it is lived. 
              Our cultural programs, storytelling competitions, and festival celebrations 
              bring children closer to traditions while making learning lively and memorable.
            </p>
          </div>

          <div className="bg-green-50 p-8 rounded-xl shadow hover:shadow-lg transition border border-gray-100">
            <h3 className="text-xl font-semibold mb-3 text-secondary">Looking Ahead</h3>
            <p className="text-black leading-relaxed">
              The journey has just begun. With innovative tools, passionate teachers, and 
              a growing global family, Universal Tamil Academy is committed to shaping the 
              next generation of proud Tamil Speaking children around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="bg-white py-16 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-secondary">UTA Community</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <h3 className="text-2xl font-bold text-secondary">5+ Countries</h3>
            <p className="mt-2 text-black">Our students join from USA, North America, Middle East, Mexico and Canada.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <h3 className="text-2xl font-bold text-secondary">50+ Students</h3>
            <p className="mt-2 text-black">Every student receives personalized attention and real-time feedback.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <h3 className="text-2xl font-bold text-secondary">10+ Teachers</h3>
            <p className="mt-2 text-black">Our native Tamil Speaking faculty bring deep cultural insights to every lesson.</p>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default HistoryPage;