'use client';

import React from 'react';
import NavDropdown from '@/components/NavDropdown';
import Footer from '@/components/footer';
import ScrollToTop from '@/components/ScrollToTop';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavDropdown />
      <section  className="relative bg-cover bg-center py-20 px-6 text-center"  style={{ backgroundImage: "url('/bgbanner.png')" }}>
      <div className="absolute inset-0 bg-opacity-50"></div>
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Privacy Policy
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-white">
          Your trust is important to us. Learn how we protect your data and ensure transparency in our services.
        </p>
      </div>
    </section>

      <section className="flex-grow px-6 py-12 max-w-5xl mx-auto text-gray-800">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="mb-6">
          Welcome to Universal Tamil Academy. This Privacy Policy along with our Terms of Use describes our practices regarding how we collect, store, use, share, and secure your Personal Information. It also describes your choices regarding use, access, and correction of your Personal Information and your rights in relation to your Personal Information.
        </p>
        <p className="mb-6">
          By providing your consent to this Privacy Policy and using our services, you agree to the collection, use, and transfer of your Personal Information as set out in this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not use/access our website.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">1. What is a Privacy Policy?</h2>
        <p className="mb-4">
          A Privacy Policy outlines how we collect, use, and protect your personal information. This Privacy Policy is compliant with major privacy regulations including GDPR, CCPA, and the Indian Information Technology Act.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">2. Why Do We Have This Policy?</h2>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>To explain how we handle data</li>
          <li>To comply with laws</li>
          <li>To build trust with users</li>
          <li>To ensure safe use of our services</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">3. Data We Collect</h2>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Personal Info: Name, E-mail ID, Phone, Country, Gender, DOB, Profile Image, Student Details</li>
          <li>Account Info: Username, Password (encrypted)</li>
          <li>Device Info: IP address, Browser, Device Type, Pages Visited</li>
          <li>Payment Info: Card Details, Address, E-mail ID, Transaction ID</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">4. How We Use Your Data</h2>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Communicate through E-mail, WhatsApp, or SMS</li>
          <li>Provide, analyze, administer, and improve our services</li>
          <li>Provide customer service and support</li>
          <li>Detect and prevent fraudulent or illegal activities</li>
        </ul>

         <h2 className="text-xl font-semibold mt-8 mb-3">5. Information Sharing and Disclosure</h2>
        <p className="mb-3">We do not sell your personal information. We may share information with:</p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li><strong>Teachers and Staff:</strong> For scheduling classes, tracking progress, and providing educational services</li>
          <li><strong>Service Providers:</strong> Payment processors, hosting providers, analytics services, and communication platforms</li>
          <li><strong>Legal Requirements:</strong> When required by law, or legal process</li>
        </ul>
        <div className="mb-4">
          <p className="text-sm"><strong>Note:</strong> All payment transactions are processed through secure payment gateway providers. We do not store complete card information - only the last 4 digits for verification purposes.</p>
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-3">6. Data Security</h2>
        <p className="mb-3">We implement appropriate technical and administrative security measures including:</p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>SSL encryption for data transmission</li>
          <li>Firewalls and data encryption</li>
          <li>Physical access controls to our data centers</li>
          <li>Information access authorization controls</li>
          <li>Regular security assessments and updates</li>
          <li>Password encryption using advanced hashing algorithms</li>
        </ul>
        <p className="text-sm text-gray-600">While we implement robust security measures, no method of transmission over the Internet is 100% secure. We continuously work to enhance our security practices.</p>

        <h2 className="text-xl font-semibold mt-8 mb-3">7. Children's Privacy</h2>
          <p className="mb-3">We comply with COPPA and other children's privacy regulations:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>We do not knowingly collect personal information from children under 13 without parental consent</li>
            <li>We collect only necessary information for educational purposes</li>
            <li>Parents can contact us to refuse further collection or use of their child's information</li>
          </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">8. User Rights</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Access and review your personal information</li>
          <li>Request deletion of your personal information</li>
          <li>Withdraw consent for data processing</li>
          <li>Request data portability</li>
        </ul>
        <p className="mb-4 mt-4">
          To exercise your rights, contact us at <strong>universaltamilacademy@gmail.com</strong>.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">9. Account Deletion Request</h2>
        <p className="mb-4">
          To request the deletion of your account, please send an email to universaltamilacademy@gmail.com with the subject line "Account Deletion Request" and include your registered email address and any relevant details. Our team will process your request and take the necessary actions promptly.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">10. Cookies and Tracking</h2>
        <p className="mb-2">We use cookies and similar technologies for:</p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>Authentication and security</li>
          <li>Personalizing your experience</li>
          <li>Analyzing site traffic and usage patterns</li>
          <li>Remembering your preferences and settings</li>
          <li>Providing relevant content and advertisements</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">11. Updates to This Policy</h2>
        <p className="mb-4">We may update this Privacy Policy periodically. We will notify registered users of significant changes and update the "last updated" date. Continued use of our services after changes constitutes acceptance of the revised policy.</p>

        <h2 className="text-xl font-semibold mt-8 mb-2">12. Copyright</h2>
        <p className="mb-4">
          All content on this site, including text and images, is owned by Universal Tamil Academy and protected by copyright law. Do not
          copy without permission.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">13. Contact Information</h2>
        <div>
          <p className="mb-2">If you have any questions or requests about this Privacy Policy:</p>
          <p className="mb-1">📧 Email: universaltamilacademy@gmail.com</p>
          {/* <p className="mb-1">📞 Phone: +91 99999 99999</p> */}
          <p className="mb-1">🌐 Website: www.universaltamilacademy.com</p>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default PrivacyPolicyPage;