'use client';
import React, { useEffect, useState } from 'react';
import NavDropdown from '@/components/NavDropdown';
import Link from 'next/link';
import Footer from '@/components/footer';
import ScrollToTop from '@/components/ScrollToTop';

interface SubscriptionPlan {
  value: string;
  _id: string;
  name: string;
  price: number;
  features: string[];
}

const Plans = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [billingCycle, setBillingCycle] = useState<"freeTrial" | "monthly" | "yearly">("monthly");
  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch('/api/subscription');
        const data = await res.json();
        setPlans(data);
      } catch (err) {
        console.error('Failed to fetch subscription plans:', err);
      }
    };
    fetchPlans();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavDropdown />

      {/* Hero Section */}
      <section  className="relative bg-cover bg-center py-20 px-6 text-center"  style={{ backgroundImage: "url('/bgbanner.png')" }}>
      <div className="absolute inset-0 bg-opacity-50"></div>
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Join Our Online Tamil Classes Today
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-white">
          Choose a subscription that fits your learning journey. Enjoy live classes and engaging activities.
        </p>
      </div>
    </section>

      {/* Subscription Plans */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <h2 className="text-3xl font-bold text-center mb-4 text-secondary">Universal Tamil Academy – Subscription Plans</h2>
        {/* <h4 className="text-lg font-bold italic text-center text-black mt-10">
         Grade 1 to 4 (Basic), 5 & 6 (Intermediate), and 7 & 8 (Advanced) refer to the levels of Tamil language learning,<br /> not his/her school grade. For example, a 10 year-old is new to Tamil may start at Grade between 1 to 4 – Basic Tamil, <br />while a 12 year-old with Good Tamil language skill might start at Grade 5 or 6 – Intermediate Tamil.</h4> */}
        <h4 className="text-lg font-bold italic text-center text-black mt-10">
          Grade 1 to 4 (Basic), 5 & 6 (Intermediate), and 7 & 8 (Advanced) refer to the levels of Tamil language learning,
          <br /> not the student’s school grade. For example, a 10-year-old new to Tamil may start at Grade 1–4 (Basic Tamil),
          <br /> while a 12-year-old with good Tamil language skills might start at Grade 5 or 6 (Intermediate Tamil).
        </h4>
        <h5 className="text-lg font-bold italic text-center text-black mt-5 mb-5">
          * Tamil grade is assigned by the teacher after the free trial session. Based on the Tamil grade, you can choose your subscription plan.
        </h5>
        <div className="flex justify-center mb-12">
          <div className="bg-white shadow-md font-bold rounded-full p-1 flex">
            <button
              onClick={() => setBillingCycle("freeTrial")}
              className={`px-6 py-2 rounded-full font-large transition ${
                billingCycle === "freeTrial"
                  ? "bg-primary text-white"
                  : "text-secondary hover:text-black"
              }`}
            >
              Free Trial
            </button>
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full font-large transition ${
                billingCycle === "monthly"
                  ? "bg-primary text-white"
                  : "text-secondary hover:text-black"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-full font-large transition ${
                billingCycle === "yearly"
                  ? "bg-primary text-white"
                  : "text-secondary hover:text-black"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>
        
        <div className={`grid gap-8 ${
          billingCycle === "freeTrial"
            ? "grid-cols-1 place-items-center" 
            : "grid-cols-1 md:grid-cols-4"     
          }`}>
          {plans.filter((plan) => {
              if (billingCycle === "freeTrial") {
               return plan.value === "freeTrial"; 
              } else {
               return plan.value !== "freeTrial";
              }
            }).map((plan) => (
            <div key={plan._id} className={`bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300 
              ${billingCycle === "freeTrial" ? "w-full max-w-sm" : ""} border border-gray-100`}>
              <h3 className="text-2xl font-bold text-primary mb-2">{plan.name}</h3>
              <p className="text-black mb-4">Weekly Tamil Sessions</p>

                <hr className="my-2 border-secondary" />

                <p className="font-bold text-black mb-3">
                  Program Includes:
                </p>
              <ul className="text-md text-black space-y-2 mb-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-amber-600 mr-2">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.value === "freeTrial" ? (
              <p className="text-3xl font-bold mb-1 text-primary">
                $0 <span className="text-lg text-gray-500">/ Free Trial</span>
              </p>
              ) : (
              <p className="text-3xl font-bold mb-1 text-secondary">
              $
              {billingCycle === "monthly"
                ? Number(plan.price)
                : Number(plan.price) * 10}
              <span className="text-lg text-gray-500">
                {" "}/ {billingCycle}
              </span>
              </p>
              )}
              <Link href="/register">
                <button className="w-full bg-primary hover:bg-amber-600 text-white py-2 rounded transition">
                  {plan.value === "freeTrial" ? "Start Free Trial" : "Get Started"}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

  <div className="bg-white py-12 px-6 md:px-12 text-center">
    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">
           Universal Tamil Academy</h1>
  <p className="max-w-3xl mx-auto text-lg mb-12 text-black">
    At UTA, we make Tamil learning engaging, fun, and effective for children around the world. 
    Our structured curriculum and interactive online classes ensure that kids not only learn the language, 
    but also connect deeply with Tamil culture and values.
  </p>

  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
    <div className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition transform border border-gray-100">
      <h3 className="text-xl font-semibold mb-2 text-secondary">📚 Structured Levels</h3>
      <p className="text-lg text-black">
        Beginner to Advanced levels designed to match every child's learning pace and comfort.
      </p>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition transform border border-gray-100">
      <h3 className="text-xl font-semibold mb-2 text-secondary">🌎 Global Community</h3>
      <p className="text-lg text-black">
        Students from across the United States, Canada, and many other countries learn together in our classes.
      </p>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition transform border border-gray-100">
      <h3 className="text-xl font-semibold mb-2 text-secondary">🎶 Fun & Interactive</h3>
      <p className="text-lg text-black">
        Songs, stories, games, and cultural activities make every class exciting and memorable.
      </p>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition transform border border-gray-100">
      <h3 className="text-xl font-semibold mb-2 text-secondary">👩‍🏫 Expert Teachers</h3>
      <p className="text-lg text-black">
        Experienced educators passionate about teaching Tamil to children in a joyful and engaging way.
      </p>
    </div>
  </div>
</div>

     <Footer />
     <ScrollToTop />
    </div>
  );
};

export default Plans;