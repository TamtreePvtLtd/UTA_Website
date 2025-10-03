'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { parsePhoneNumberFromString, AsYouType } from 'libphonenumber-js';
import NavDropdown from '../NavDropdown';

// Complete countries list with ISO codes
const countries = [
  { name: "Afghanistan", code: "+93", iso: "AF" },
  { name: "Albania", code: "+355", iso: "AL" },
  { name: "Algeria", code: "+213", iso: "DZ" },
  { name: "Andorra", code: "+376", iso: "AD" },
  { name: "Angola", code: "+244", iso: "AO" },
  { name: "Antigua and Barbuda", code: "+1", iso: "AG" },
  { name: "Argentina", code: "+54", iso: "AR" },
  { name: "Armenia", code: "+374", iso: "AM" },
  { name: "Australia", code: "+61", iso: "AU" },
  { name: "Austria", code: "+43", iso: "AT" },
  { name: "Azerbaijan", code: "+994", iso: "AZ" },
  { name: "Bahamas", code: "+1", iso: "BS" },
  { name: "Bahrain", code: "+973", iso: "BH" },
  { name: "Bangladesh", code: "+880", iso: "BD" },
  { name: "Barbados", code: "+1", iso: "BB" },
  { name: "Belarus", code: "+375", iso: "BY" },
  { name: "Belgium", code: "+32", iso: "BE" },
  { name: "Belize", code: "+501", iso: "BZ" },
  { name: "Benin", code: "+229", iso: "BJ" },
  { name: "Bhutan", code: "+975", iso: "BT" },
  { name: "Bolivia", code: "+591", iso: "BO" },
  { name: "Bosnia and Herzegovina", code: "+387", iso: "BA" },
  { name: "Botswana", code: "+267", iso: "BW" },
  { name: "Brazil", code: "+55", iso: "BR" },
  { name: "Brunei", code: "+673", iso: "BN" },
  { name: "Bulgaria", code: "+359", iso: "BG" },
  { name: "Burkina Faso", code: "+226", iso: "BF" },
  { name: "Burundi", code: "+257", iso: "BI" },
  { name: "Cabo Verde", code: "+238", iso: "CV" },
  { name: "Cambodia", code: "+855", iso: "KH" },
  { name: "Cameroon", code: "+237", iso: "CM" },
  { name: "Canada", code: "+1", iso: "CA" },
  { name: "Central African Republic", code: "+236", iso: "CF" },
  { name: "Chad", code: "+235", iso: "TD" },
  { name: "Chile", code: "+56", iso: "CL" },
  { name: "China", code: "+86", iso: "CN" },
  { name: "Colombia", code: "+57", iso: "CO" },
  { name: "Comoros", code: "+269", iso: "KM" },
  { name: "Congo", code: "+242", iso: "CG" },
  { name: "Costa Rica", code: "+506", iso: "CR" },
  { name: "Croatia", code: "+385", iso: "HR" },
  { name: "Cuba", code: "+53", iso: "CU" },
  { name: "Cyprus", code: "+357", iso: "CY" },
  { name: "Czech Republic", code: "+420", iso: "CZ" },
  { name: "Denmark", code: "+45", iso: "DK" },
  { name: "Djibouti", code: "+253", iso: "DJ" },
  { name: "Dominica", code: "+1", iso: "DM" },
  { name: "Dominican Republic", code: "+1", iso: "DO" },
  { name: "Ecuador", code: "+593", iso: "EC" },
  { name: "Egypt", code: "+20", iso: "EG" },
  { name: "El Salvador", code: "+503", iso: "SV" },
  { name: "Equatorial Guinea", code: "+240", iso: "GQ" },
  { name: "Eritrea", code: "+291", iso: "ER" },
  { name: "Estonia", code: "+372", iso: "EE" },
  { name: "Eswatini", code: "+268", iso: "SZ" },
  { name: "Ethiopia", code: "+251", iso: "ET" },
  { name: "Fiji", code: "+679", iso: "FJ" },
  { name: "Finland", code: "+358", iso: "FI" },
  { name: "France", code: "+33", iso: "FR" },
  { name: "Gabon", code: "+241", iso: "GA" },
  { name: "Gambia", code: "+220", iso: "GM" },
  { name: "Georgia", code: "+995", iso: "GE" },
  { name: "Germany", code: "+49", iso: "DE" },
  { name: "Ghana", code: "+233", iso: "GH" },
  { name: "Greece", code: "+30", iso: "GR" },
  { name: "Grenada", code: "+1", iso: "GD" },
  { name: "Guatemala", code: "+502", iso: "GT" },
  { name: "Guinea", code: "+224", iso: "GN" },
  { name: "Guinea-Bissau", code: "+245", iso: "GW" },
  { name: "Guyana", code: "+592", iso: "GY" },
  { name: "Haiti", code: "+509", iso: "HT" },
  { name: "Honduras", code: "+504", iso: "HN" },
  { name: "Hungary", code: "+36", iso: "HU" },
  { name: "Iceland", code: "+354", iso: "IS" },
  { name: "India", code: "+91", iso: "IN" },
  { name: "Indonesia", code: "+62", iso: "ID" },
  { name: "Iran", code: "+98", iso: "IR" },
  { name: "Iraq", code: "+964", iso: "IQ" },
  { name: "Ireland", code: "+353", iso: "IE" },
  { name: "Israel", code: "+972", iso: "IL" },
  { name: "Italy", code: "+39", iso: "IT" },
  { name: "Jamaica", code: "+1", iso: "JM" },
  { name: "Japan", code: "+81", iso: "JP" },
  { name: "Jordan", code: "+962", iso: "JO" },
  { name: "Kazakhstan", code: "+7", iso: "KZ" },
  { name: "Kenya", code: "+254", iso: "KE" },
  { name: "Kiribati", code: "+686", iso: "KI" },
  { name: "Korea, North", code: "+850", iso: "KP" },
  { name: "Korea, South", code: "+82", iso: "KR" },
  { name: "Kosovo", code: "+383", iso: "XK" },
  { name: "Kuwait", code: "+965", iso: "KW" },
  { name: "Kyrgyzstan", code: "+996", iso: "KG" },
  { name: "Laos", code: "+856", iso: "LA" },
  { name: "Latvia", code: "+371", iso: "LV" },
  { name: "Lebanon", code: "+961", iso: "LB" },
  { name: "Lesotho", code: "+266", iso: "LS" },
  { name: "Liberia", code: "+231", iso: "LR" },
  { name: "Libya", code: "+218", iso: "LY" },
  { name: "Liechtenstein", code: "+423", iso: "LI" },
  { name: "Lithuania", code: "+370", iso: "LT" },
  { name: "Luxembourg", code: "+352", iso: "LU" },
  { name: "Madagascar", code: "+261", iso: "MG" },
  { name: "Malawi", code: "+265", iso: "MW" },
  { name: "Malaysia", code: "+60", iso: "MY" },
  { name: "Maldives", code: "+960", iso: "MV" },
  { name: "Mali", code: "+223", iso: "ML" },
  { name: "Malta", code: "+356", iso: "MT" },
  { name: "Marshall Islands", code: "+692", iso: "MH" },
  { name: "Mauritania", code: "+222", iso: "MR" },
  { name: "Mauritius", code: "+230", iso: "MU" },
  { name: "Mexico", code: "+52", iso: "MX" },
  { name: "Micronesia", code: "+691", iso: "FM" },
  { name: "Moldova", code: "+373", iso: "MD" },
  { name: "Monaco", code: "+377", iso: "MC" },
  { name: "Mongolia", code: "+976", iso: "MN" },
  { name: "Montenegro", code: "+382", iso: "ME" },
  { name: "Morocco", code: "+212", iso: "MA" },
  { name: "Mozambique", code: "+258", iso: "MZ" },
  { name: "Myanmar", code: "+95", iso: "MM" },
  { name: "Namibia", code: "+264", iso: "NA" },
  { name: "Nauru", code: "+674", iso: "NR" },
  { name: "Nepal", code: "+977", iso: "NP" },
  { name: "Netherlands", code: "+31", iso: "NL" },
  { name: "New Zealand", code: "+64", iso: "NZ" },
  { name: "Nicaragua", code: "+505", iso: "NI" },
  { name: "Niger", code: "+227", iso: "NE" },
  { name: "Nigeria", code: "+234", iso: "NG" },
  { name: "North Macedonia", code: "+389", iso: "MK" },
  { name: "Norway", code: "+47", iso: "NO" },
  { name: "Oman", code: "+968", iso: "OM" },
  { name: "Pakistan", code: "+92", iso: "PK" },
  { name: "Palau", code: "+680", iso: "PW" },
  { name: "Palestine", code: "+970", iso: "PS" },
  { name: "Panama", code: "+507", iso: "PA" },
  { name: "Papua New Guinea", code: "+675", iso: "PG" },
  { name: "Paraguay", code: "+595", iso: "PY" },
  { name: "Peru", code: "+51", iso: "PE" },
  { name: "Philippines", code: "+63", iso: "PH" },
  { name: "Poland", code: "+48", iso: "PL" },
  { name: "Portugal", code: "+351", iso: "PT" },
  { name: "Qatar", code: "+974", iso: "QA" },
  { name: "Romania", code: "+40", iso: "RO" },
  { name: "Russia", code: "+7", iso: "RU" },
  { name: "Rwanda", code: "+250", iso: "RW" },
  { name: "Saint Kitts and Nevis", code: "+1", iso: "KN" },
  { name: "Saint Lucia", code: "+1", iso: "LC" },
  { name: "Saint Vincent and the Grenadines", code: "+1", iso: "VC" },
  { name: "Samoa", code: "+685", iso: "WS" },
  { name: "San Marino", code: "+378", iso: "SM" },
  { name: "Sao Tome and Principe", code: "+239", iso: "ST" },
  { name: "Saudi Arabia", code: "+966", iso: "SA" },
  { name: "Senegal", code: "+221", iso: "SN" },
  { name: "Serbia", code: "+381", iso: "RS" },
  { name: "Seychelles", code: "+248", iso: "SC" },
  { name: "Sierra Leone", code: "+232", iso: "SL" },
  { name: "Singapore", code: "+65", iso: "SG" },
  { name: "Slovakia", code: "+421", iso: "SK" },
  { name: "Slovenia", code: "+386", iso: "SI" },
  { name: "Solomon Islands", code: "+677", iso: "SB" },
  { name: "Somalia", code: "+252", iso: "SO" },
  { name: "South Africa", code: "+27", iso: "ZA" },
  { name: "South Sudan", code: "+211", iso: "SS" },
  { name: "Spain", code: "+34", iso: "ES" },
  { name: "Sri Lanka", code: "+94", iso: "LK" },
  { name: "Sudan", code: "+249", iso: "SD" },
  { name: "Suriname", code: "+597", iso: "SR" },
  { name: "Sweden", code: "+46", iso: "SE" },
  { name: "Switzerland", code: "+41", iso: "CH" },
  { name: "Syria", code: "+963", iso: "SY" },
  { name: "Taiwan", code: "+886", iso: "TW" },
  { name: "Tajikistan", code: "+992", iso: "TJ" },
  { name: "Tanzania", code: "+255", iso: "TZ" },
  { name: "Thailand", code: "+66", iso: "TH" },
  { name: "Timor-Leste", code: "+670", iso: "TL" },
  { name: "Togo", code: "+228", iso: "TG" },
  { name: "Tonga", code: "+676", iso: "TO" },
  { name: "Trinidad and Tobago", code: "+1", iso: "TT" },
  { name: "Tunisia", code: "+216", iso: "TN" },
  { name: "Turkey", code: "+90", iso: "TR" },
  { name: "Turkmenistan", code: "+993", iso: "TM" },
  { name: "Tuvalu", code: "+688", iso: "TV" },
  { name: "Uganda", code: "+256", iso: "UG" },
  { name: "Ukraine", code: "+380", iso: "UA" },
  { name: "United Arab Emirates", code: "+971", iso: "AE" },
  { name: "United Kingdom", code: "+44", iso: "GB" },
  { name: "United States", code: "+1", iso: "US" },
  { name: "Uruguay", code: "+598", iso: "UY" },
  { name: "Uzbekistan", code: "+998", iso: "UZ" },
  { name: "Vanuatu", code: "+678", iso: "VU" },
  { name: "Vatican City", code: "+39", iso: "VA" },
  { name: "Venezuela", code: "+58", iso: "VE" },
  { name: "Vietnam", code: "+84", iso: "VN" },
  { name: "Yemen", code: "+967", iso: "YE" },
  { name: "Zambia", code: "+260", iso: "ZM" },
  { name: "Zimbabwe", code: "+263", iso: "ZW" }
];

const ParentRegisterForm = () => {
  const [formData, setFormData] = useState({
    whatsapp: '',
    email: '',
    password: '',
    country: '',
    countryCode: '',
    countryIso: ''
  });
  
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({ 
    email: '', 
    password: '', 
    phone: '', 
    general: '' 
  });
  
  const [touched, setTouched] = useState({ 
    email: false, 
    password: false, 
    phone: false, 
    country: false 
  });
  
  const [isValidating, setIsValidating] = useState(false);
  const [phoneFormat, setPhoneFormat] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  
  const router = useRouter();

  // Real-time phone number formatting and validation
  const validateAndFormatPhone = useCallback((phone: string, countryCode: string, countryIso: string) => {
    if (!phone || !countryIso) return { isValid: false, formatted: phone, message: '' };
    
    try {
      const fullNumber = countryCode + phone.replace(/\D/g, '');
      const phoneNumber = parsePhoneNumberFromString(fullNumber, countryIso as any);
      
      if (!phoneNumber) {
        return { 
          isValid: false, 
          formatted: phone, 
          message: 'Invalid phone number format' 
        };
      }
      
      const isValid = phoneNumber.isValid();
      const formatted = new AsYouType(countryIso as any).input(phone);
      
      return {
        isValid,
        formatted,
        message: isValid ? '' : 'Please enter a valid phone number for the selected country',
        international: phoneNumber.formatInternational()
      };
    } catch (error) {
      return { 
        isValid: false, 
        formatted: phone, 
        message: 'Error validating phone number' 
      };
    }
  }, []);

  // Validation functions
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Updated password validation to return array of specific errors
  const validatePassword = (password: string, isInitial: boolean = false) => {
    const errors: string[] = [];
    
    if (isInitial) {
      // Show full requirement text initially
      return ["Atleast 6 characters and include uppercase, lowercase, number, and special character"];
    }
    
    if (password.length === 0) {
      return ["Password is required"];
    }
    
    if (password.length < 6) {
      errors.push("Atleast 6 characters");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("One uppercase letter (A-Z)");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("One lowercase letter (a-z)");
    }
    if (!/\d/.test(password)) {
      errors.push("One number (0-9)");
    }
    if (!/[@$!%*?&]/.test(password)) {
      errors.push("One special character (@$!%*?&)");
    }
    
    return errors;
  };

  // Handle field changes with real-time validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'country') {
      const selectedCountry = countries.find(c => c.name === value);
      setFormData(prev => ({ 
        ...prev, 
        country: value, 
        countryCode: selectedCountry?.code || '',
        countryIso: selectedCountry?.iso || ''
      }));
      
      setTouched(prev => ({ ...prev, country: true }));
      
      // Revalidate phone when country changes
      if (formData.whatsapp) {
        const validation = validateAndFormatPhone(
          formData.whatsapp, 
          selectedCountry?.code || '', 
          selectedCountry?.iso || ''
        );
        setErrors(prev => ({ ...prev, phone: validation.message }));
        setPhoneFormat(validation.formatted);
      }
      
    } else if (name === 'whatsapp') {
      // Format phone number in real-time
      const digitsOnly = value.replace(/\D/g, '');
      const validation = validateAndFormatPhone(digitsOnly, formData.countryCode, formData.countryIso);
      
      setFormData(prev => ({ ...prev, [name]: digitsOnly }));
      setPhoneFormat(validation.formatted);
      setErrors(prev => ({ ...prev, phone: validation.message }));
      
    } else if (name === 'password') {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Real-time password validation
      if (touched.password) {
        const isInitial = value.length === 0 && touched.password;
        const passwordErrors = validatePassword(value, isInitial);
        setPasswordErrors(passwordErrors);
        
        // Set main errors object for form validation
        setErrors(prev => ({ 
          ...prev, 
          password: passwordErrors.length > 0 ? 'Please fix password requirements' : '' 
        }));
      }
      
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Real-time validation for other fields
      if (name === 'email' && touched.email) {
        setErrors(prev => ({ 
          ...prev, 
          email: validateEmail(value) ? '' : 'Please enter a valid email address' 
        }));
      }
    }
  };

  // Handle field blur
  const handleBlur = (field: 'email' | 'password' | 'phone' | 'country') => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    if (field === 'email') {
      setErrors(prev => ({ 
        ...prev, 
        email: validateEmail(formData.email) ? '' : 'Please enter a valid email address' 
      }));
    }
    
    if (field === 'password') {
      const isInitial = formData.password.length === 0;
      const passwordErrors = validatePassword(formData.password, isInitial);
      setPasswordErrors(passwordErrors);
      
      setErrors(prev => ({ 
        ...prev, 
        password: passwordErrors.length > 0 ? 'Please fix password requirements' : '' 
      }));
    }
    
    if (field === 'phone' || field === 'country') {
      const validation = validateAndFormatPhone(
        formData.whatsapp, 
        formData.countryCode, 
        formData.countryIso
      );
      setErrors(prev => ({ ...prev, phone: validation.message }));
    }
  };

  // Check if password is valid for form submission
  const isPasswordValid = (password: string) => {
    const hasMinLength = password.length >= 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);
    
    return hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsValidating(true);
    
    // Final validation
    const emailError = validateEmail(formData.email) ? '' : 'Please enter a valid email address';
    const passwordValid = isPasswordValid(formData.password);
    const passwordError = passwordValid ? '' : 'Please fix password requirements';
    const phoneValidation = validateAndFormatPhone(
      formData.whatsapp, 
      formData.countryCode, 
      formData.countryIso
    );
    const phoneError = phoneValidation.isValid ? '' : phoneValidation.message;
    
    const hasErrors = emailError || passwordError || phoneError || !formData.country;
    
    if (hasErrors) {
      // Update password errors for display
      if (!passwordValid) {
        const currentErrors = validatePassword(formData.password, formData.password.length === 0);
        setPasswordErrors(currentErrors);
      }
      
      setErrors({
        email: emailError,
        password: passwordError,
        phone: phoneError || (!formData.country ? 'Please select a country' : ''),
        general: 'Please fix all errors before submitting'
      });
      setTouched({ email: true, password: true, phone: true, country: true });
      setIsValidating(false);
      return;
    }

    try {
      const fullPhoneNumber = formData.countryCode + formData.whatsapp.replace(/\D/g, '');
      
      const res = await fetch('/api/parentSignup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          whatsapp: fullPhoneNumber,
          password: formData.password,
          role: 'Parent',
          country: formData.country,
          countryCode: formData.countryCode, countryIso: formData.countryIso,
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      setMessage(data.message || 'Registration successful!');
      setTimeout(() => router.push('/login'), 2000);
      
    } catch (err: any) {
      setErrors(prev => ({ ...prev, general: err.message }));
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavDropdown />
    <div className="flex flex-col md:flex-row flex-1">
      {/* Left: Image */}
      <div className="relative w-full md:w-[60%] bg-gradient-to-br from-white to-white text-black flex flex-col justify-center px-10 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Join Universal Tamil Academy
          </h1>
          <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
            Create your parent account and connect your children with world-class
            Tamil teachers. Be part of our global mission to preserve and spread
            Tamil language and culture.
          </p>

          <div className="space-y-4">
            <p className="flex items-center text-lg">
              <span className="mr-2">✔</span> Easy parent registration
            </p>
            <p className="flex items-center text-lg">
              <span className="mr-2">✔</span> Add and manage your children
            </p>
            <p className="flex items-center text-lg">
              <span className="mr-2">✔</span> Access free trial classes
            </p>
          </div>

          {/* <div className="mt-10 text-sm italic text-white/90">
            “உலகம் முழுவதும் தமிழ் கற்க – Universal Tamil Academy”
          </div> */}
        </div>
      
      {/* Right: Form */}
      <div className="w-full md:w-[40%] flex flex-col justify-center px-6 py-10 bg-white">
        <div className="max-w-md w-full mx-auto space-y-8">
          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}
          
          {message && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">{message}</p>
            </div>
          )}
          
          <div className="font-bold text-neutral-800 flex flex-col space-y-2">
            <h3 className="text-black font-bold text-3xl">PARENT REGISTRATION</h3>
            <p className="text-md text-neutral-400">Create New Account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="flex flex-col space-y-1 w-full">
              <input 
                type="email" 
                name="email" 
                placeholder="Email Address (abc@gmail.com)" 
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                className={`block w-full px-3 py-3 mt-1 border rounded-lg focus:outline-none text-md ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-gray-400 focus:bg-gray-50'
                }`}
                required 
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="flex flex-col space-y-1 w-full">
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur('password')}
                className={`block w-full px-3 py-3 mt-1 border rounded-lg focus:outline-none text-md ${
                  errors.password ? 'border-red-500 bg-red-50' : 'border-gray-400 focus:bg-gray-50'
                }`}
                required 
              />
              
              {/* Password Error Display */}
              {(touched.password && passwordErrors.length > 0) && (
                <div className="text-sm text-red-500 mt-2">
                  <p className="font-medium mb-1">Password must contain:</p>
                  <ul className="space-y-1">
                    {passwordErrors.map((error, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span className={formData.password.length > 0 && error.includes("must be at least") ? 
                          (formData.password.length >= 6 ? "text-green-600" : "text-red-500") :
                          formData.password.length > 0 && error.includes("uppercase") ? 
                          (/[A-Z]/.test(formData.password) ? "text-green-600" : "text-red-500") :
                          formData.password.length > 0 && error.includes("lowercase") ? 
                          (/[a-z]/.test(formData.password) ? "text-green-600" : "text-red-500") :
                          formData.password.length > 0 && error.includes("number") ? 
                          (/\d/.test(formData.password) ? "text-green-600" : "text-red-500") :
                          formData.password.length > 0 && error.includes("special character") ? 
                          (/[@$!%*?&]/.test(formData.password) ? "text-green-600" : "text-red-500") :
                          "text-red-500"
                        }>
                          {error}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Country Field */}
            <div className="flex flex-col space-y-1 w-full">
              <select 
                name="country" 
                value={formData.country}
                onChange={handleChange}
                onBlur={() => handleBlur('country')}
                className={`block w-full px-3 py-3 mt-1 border rounded-lg focus:outline-none text-md ${
                  touched.country && !formData.country ? 'border-red-500 bg-red-50' : 'border-gray-400 focus:bg-gray-50'
                }`}
                required
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name} ({country.code})
                  </option>
                ))}
              </select>
              {touched.country && !formData.country && (
                <p className="text-sm text-red-500">Please select a country</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="flex flex-col space-y-1 w-full">
              <div className="flex space-x-2">
                <div className="w-1/4">
                  <input 
                    type="text" 
                    value={formData.countryCode}
                    placeholder="+1"
                    readOnly 
                    className="block w-full px-3 py-3 mt-1 border border-gray-400 rounded-lg focus:outline-none bg-gray-100 text-md"
                  />
                </div>
                <div className="w-3/4">
                  <input 
                    type="tel" 
                    name="whatsapp" 
                    placeholder="Phone number"
                    value={phoneFormat}
                    onChange={handleChange}
                    onBlur={() => handleBlur('phone')}
                    className={`block w-full px-3 py-3 mt-1 border rounded-lg focus:outline-none text-md ${
                      errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-400 focus:bg-gray-50'
                    }`}
                    required 
                  />
                </div>
              </div>
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>

            <div className="w-full pt-2">
              <button 
                type="submit" 
                disabled={isValidating}
                className={`w-full py-3 font-semibold text-lg text-white rounded-md transition ${
                  isValidating 
                    ? 'bg-primary hover:bg-transparent border border-primary hover:text-primary cursor-not-allowed' 
                    : 'bg-primary hover:bg-transparent border border-primary hover:text-primary'
                }`}
              >
                {isValidating ? 'Registering...' : 'Register'}
              </button>
            </div>

            <div className="text-center">
              <p className="text-md font-medium text-neutral-800">
                Already have an account?{' '}
                <Link href="/login">
                  <span className="text-[#1565C0] hover:underline text-md">Login</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ParentRegisterForm;