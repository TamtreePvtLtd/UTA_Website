'use client';

import React from 'react';
import NavDropdown from '@/components/NavDropdown';
import Footer from '@/components/footer';
import ScrollToTop from '@/components/ScrollToTop';

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavDropdown />
      <section className="relative bg-cover bg-center py-20 px-6 text-center" style={{ backgroundImage: "url('/bgbanner.png')" }}>
        <div className="absolute inset-0 bg-opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms & Conditions
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-white">
            Please read these Terms carefully before using Universal Tamil Academy services.
          </p>
        </div>
      </section>

      <section className="flex-grow px-6 py-12 max-w-5xl mx-auto text-gray-800">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Quick Overview</h2>
          <p>These Terms of Service constitute a legally binding agreement between you and Universal Tamil Academy regarding your use of our website, applications, and educational services. By accessing or using our services, you acknowledge that you have read, understood, and agreed to be bound by these Terms.</p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">1. Interpretation and Definitions</h2>
        <div className="mb-6">
          <p className="mb-4">For the purposes of these Terms and Conditions:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Universal Tamil Academy.</li>
            <li><strong>Service</strong> refers to the online Tamil language classes, educational content, and related services accessible via our website and applications.</li>
            <li><strong>Website</strong> refers to Universal Tamil Academy, accessible from www.universaltamilacademy.com</li>
            <li><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
            <li><strong>Student</strong> means a Member who enrolls for Courses on our platform. In case of minor students, this refers to the parent or guardian who enrolls their child or ward for Courses.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mb-4 ">2. Acknowledgment and Acceptance</h2>
        <p className="mb-6">By accessing or using our Site, Application, or Services, you agree to comply with and be legally bound by these Terms and Conditions, whether or not you become a registered user. These Terms govern your access to and use of the Site, Application, and Services, and constitute a binding legal agreement between you and Universal Tamil Academy. </p>
        <p className="mb-6">If you do not agree to these Terms, you have no right to obtain information from or otherwise continue using the Site, Application, or Services. Failure to use our services in accordance with these Terms may subject you to civil and criminal liabilities. </p>

        <h2 className="text-2xl font-semibold mb-4 ">3. Eligibility and User Accounts</h2>
        <div className="mb-6">
          <p className="mb-4">Use of the Site, Application, and Services is available only to persons who can form legally binding contracts under applicable laws. </p>
          <ul className="list-disc list-inside space-y-2">
            <li>The Site, Application, and Services are intended solely for persons who are 18 years of age or older.</li>
            <li>If you are below 18, your parent or guardian must open an account and help you enroll in courses appropriate for your age.</li>
            <li>Any access to or use of our services by anyone under 18 is expressly prohibited unless supervised by a parent or guardian.</li>
            <li>By accessing or using our services, you represent and warrant that you are 18 years or older, or have obtained parental consent. </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mb-4 ">4. Account Registration and Security</h2>
        <div className="mb-6">
          <p className="mb-4">In order to access certain features of the Site and Application, and to enroll for courses, you must register to create an account and become a Member. </p>
          <ul className="list-disc list-inside space-y-2">
            <li>You agree to provide accurate, current, and complete information during the registration process.</li>
            <li>You are responsible for safeguarding your password and for all activities that occur under your account.</li>
            <li>You agree not to disclose your password to any third party.</li>
            <li>You agree to immediately notify us of any unauthorized use of your account.</li>
            <li>We reserve the right to refuse service, terminate accounts, or remove content at our sole discretion.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mb-4 ">5. Services Description</h2>
        <p className="mb-6">Universal Tamil Academy provides an online platform that offers various online Tamil language courses for Students. Our services include live online classes, pre-recorded lessons, study materials, and educational resources. Unless explicitly specified otherwise, our responsibilities are limited to facilitating the availability of courses through the Site, Application, and Services. </p>

        <h2 className="text-2xl font-semibold mb-4 ">6. Payments, Fees, and Refunds</h2>
        <div className="mb-6">
          <p className="mb-4">The following terms apply to payments for our services:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Course Fees must be paid in full before accessing paid courses or services.</li>
            <li>We use third-party payment processors to handle all payment transactions.</li>
            <li>We do not store your complete payment card information on our servers.</li>
            <li>All payment transactions are processed through secure payment gateway providers. </li>
          </ul>
          <p className="mt-4 font-semibold">Refund Policy:</p>
          <p>Refund requests will be reviewed and processed on a case-by-case basis. Please contact us directly at universaltamilacademy@gmail.com to discuss refund options.</p>
        </div>

        <h2 className="text-2xl font-semibold mb-4 ">7. Intellectual Property Rights</h2>
        <div className="mb-6">
          <p className="mb-4">All content available through our Services, including text, graphics, data, articles, photos, images, illustrations, course materials, and user submissions, is protected by copyright and other intellectual property laws.</p>
          <ul className="list-disc list-inside space-y-2">
            <li>The Service and its original content, features, and functionality are owned by Universal Tamil Academy and are protected by international copyright, trademark, and other intellectual property laws.</li>
            <li>No information, content, or material from our Services may be copied, reproduced, republished, duplicated, sold, resold, uploaded, posted, transmitted, or distributed without our express written permission.</li>
            <li>You may not use any meta tags or any "hidden text" utilizing our name or trademarks without our express written consent.</li>
            <li>Any unauthorized use terminates the permission granted by these Terms.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mb-4 ">8. User Conduct and Restrictions</h2>
        <div className="mb-6">
          <p className="mb-4">You agree not to use the Service to contribute any content or engage in behavior that:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Infringes on any intellectual property rights or proprietary rights</li>
            <li>Violates any law or regulation</li>
            <li>Is harmful, deceptive, threatening, harassing, defamatory, obscene, or otherwise objectionable</li>
            <li>Compromises the security of our Services or others' accounts</li>
            <li>Attempts to access other users' accounts or circumvent security measures</li>
            <li>Disrupts the proper functioning of our infrastructure or engages in spamming activities</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mb-4 ">9. Communication Consent</h2>
        <p className="mb-6">By registering for our services, you explicitly consent to receive communications from us via email, SMS, WhatsApp, push notifications, or other electronic means regarding your account, transactions, and promotional offers. This consent overrides any registration with Do Not Disturb (DND) services, as permitted under applicable telecommunications regulations.</p>

        <h2 className="text-2xl font-semibold mb-4 ">10. Privacy Policy</h2>
        <p className="mb-6">Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information when you use our Services. By using our Services, you agree to the collection and use of information in accordance with our Privacy Policy. Please read our Privacy Policy carefully before using our Service. </p>

        <h2 className="text-2xl font-semibold mb-4 ">11. Disclaimer of Warranties</h2>
        <div className="mb-6">
          <p className="mb-4">The Service is provided to you "AS IS" and "AS AVAILABLE" with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company expressly disclaims all warranties, whether express, implied, statutory, or otherwise. </p>
          <ul className="list-disc list-inside space-y-2">
            <li>We do not warrant that the Service will meet your requirements, achieve any intended results, or be error-free.</li>
            <li>We do not warrant that the Service will operate without interruption or meet any performance or reliability standards.</li>
            <li>We do not guarantee the accuracy, reliability, or currency of any information provided through the Service.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mb-4 ">12. Limitation of Liability</h2>
        <p className="mb-6">To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever arising out of or in any way related to your use of or inability to use the Service. </p>
        <p className="mb-6">Notwithstanding any damages that you might incur, the entire liability of the Company and any of its suppliers under any provision of these Terms shall be limited to the amount actually paid by you for the Service. </p>

        <h2 className="text-2xl font-semibold mb-4 ">13. Termination</h2>
        <p className="mb-6">We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms and Conditions. Upon termination, your right to use the Service will cease immediately. </p>

        <h2 className="text-2xl font-semibold mb-4 ">14. Governing Law and Dispute Resolution</h2>
        <div className="mb-6">
          <p className="mb-4">The laws of India, excluding its conflicts of law rules, shall govern these Terms and your use of the Service. </p>
          <p className="mb-4">If you have any concern or dispute about the Service, you agree to first try to resolve the dispute informally by contacting the Company. </p>
          <p>Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in Chennai, India.</p>
        </div>

        <h2 className="text-2xl font-semibold mb-4 ">15. Changes to Terms</h2>
        <p className="mb-6">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. </p>
        <p className="mb-6">By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service. </p>

        <h2 className="text-2xl font-semibold mb-4 ">16. Contact Information</h2>
        <div>
          <p className="mb-2">If you have any questions about these Terms and Conditions, you can contact us:</p>
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

export default TermsAndConditionsPage;