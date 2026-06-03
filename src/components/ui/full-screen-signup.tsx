"use client";

import { SunIcon as Sunburst, MoonIcon } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface FullScreenSignupProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const FullScreenSignup = ({ isDark, onToggleTheme }: FullScreenSignupProps) => {
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [agreedError, setAgreedError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validateFullName = (value: string) => {
    return value.trim().split(/\s+/).length >= 2;
  };

  const validateContactNumber = (value: string) => {
    return /^[+]?[\d\s\-().]{7,15}$/.test(value.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    if (!validateFullName(fullName)) {
      setFullNameError("Please enter your first and last name.");
      valid = false;
    } else {
      setFullNameError("");
    }

    if (!validateContactNumber(contactNumber)) {
      setContactNumberError("Please enter a valid contact number.");
      valid = false;
    } else {
      setContactNumberError("");
    }

    if (!agreed) {
      setAgreedError("You must agree to the terms before submitting.");
      valid = false;
    } else {
      setAgreedError("");
    }

    setSubmitted(true);

    if (valid) {
      const { error } = await supabase
        .from("registrations")
        .insert({
          full_name: fullName,
          contact_number: contactNumber,
          consent_given: agreed,
          consented_at: new Date().toISOString(),
        });

      if (error) {
        console.error("Supabase error:", error.message);
        alert("Something went wrong. Please try again.");
      } else {
        alert("Registration successful!");
        setFullName("");
        setContactNumber("");
        setSubmitted(false);
      }
    }
  };

  // suppress unused warning
  void submitted;

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden p-4">
      <div className="w-full max-w-5xl rounded-3xl p-[2px] bg-gradient-to-br from-orange-500 via-purple-500 to-blue-500 shadow-xl">
      <div className="w-full relative overflow-hidden flex flex-col md:flex-row rounded-3xl">

        {/* Left decorative panel — all absolute elements clipped inside this */}
        <div className="bg-black text-white p-8 md:p-12 md:w-1/2 relative rounded-bl-3xl overflow-hidden">
          <div className="w-full h-full z-[2] absolute inset-0 bg-gradient-to-t from-transparent to-black"></div>
          <div className="flex absolute inset-0 z-[2] overflow-hidden backdrop-blur-2xl">
            <div className="h-full z-[2] w-[4rem] bg-gradient-to-r from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30] opacity-30"></div>
            <div className="h-full z-[2] w-[4rem] bg-gradient-to-r from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30] opacity-30"></div>
            <div className="h-full z-[2] w-[4rem] bg-gradient-to-r from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30] opacity-30"></div>
            <div className="h-full z-[2] w-[4rem] bg-gradient-to-r from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30] opacity-30"></div>
            <div className="h-full z-[2] w-[4rem] bg-gradient-to-r from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30] opacity-30"></div>
            <div className="h-full z-[2] w-[4rem] bg-gradient-to-r from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30] opacity-30"></div>
          </div>
          <div className="w-[15rem] h-[15rem] bg-orange-500 absolute z-[1] rounded-full bottom-0 left-0"></div>
          <div className="w-[8rem] h-[5rem] bg-white absolute z-[1] rounded-full bottom-0 left-0"></div>
          <h1 className="text-2xl md:text-3xl font-medium leading-tight z-10 tracking-tight relative">
            Design and dev partner for small businesses.
          </h1>
        </div>

        <div className="p-8 md:p-12 md:w-1/2 flex flex-col bg-secondary z-[99] text-secondary-foreground">
          <div className="flex flex-col items-left mb-8">
            <button
              type="button"
              className="text-orange-500 mb-4 p-2 rounded-xl bg-inherit cursor-pointer w-fit"
              aria-label="Toggle theme"
              onClick={onToggleTheme}
            >
              {isDark ? <Sunburst className="h-10 w-10" /> : <MoonIcon className="h-10 w-10" />}
            </button>
            <h2 className="text-3xl font-medium mb-2 tracking-tight">
              Get Started
            </h2>
            <p className="text-left opacity-80">
              Welcome to MyStudio — Let's get started
            </p>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
            noValidate
          >
            <div>
              <label htmlFor="fullName" className="block text-sm mb-2">
                Your Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Juan dela Cruz"
                className={`text-sm w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring-1 bg-white text-black focus:ring-orange-500 ${
                  fullNameError ? "border-red-500" : "border-gray-300"
                }`}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                aria-invalid={!!fullNameError}
                aria-describedby="fullName-error"
              />
              {fullNameError && (
                <p id="fullName-error" className="text-red-500 text-xs mt-1">
                  {fullNameError}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contactNumber" className="block text-sm mb-2">
                Contact Number
              </label>
              <input
                type="tel"
                id="contactNumber"
                placeholder="+63 912 345 6789"
                className={`text-sm w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring-1 bg-white text-black focus:ring-orange-500 ${
                  contactNumberError ? "border-red-500" : "border-gray-300"
                }`}
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                aria-invalid={!!contactNumberError}
                aria-describedby="contactNumber-error"
              />
              {contactNumberError && (
                <p id="contactNumber-error" className="text-red-500 text-xs mt-1">
                  {contactNumberError}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-start gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  className="mt-0.5 accent-orange-500 cursor-pointer"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  aria-describedby="agreed-error"
                />
                <span>
                  I agree that my name and contact number will be collected and used solely for registration purposes, stored securely, and will not be shared with third parties.
                </span>
              </label>
              {agreedError && (
                <p id="agreed-error" className="text-red-500 text-xs mt-1">{agreedError}</p>
              )}
              <p className="text-xs opacity-60 mt-2">
                🔒 Your data is protected under the Philippine Data Privacy Act of 2012. You may request access, correction, or deletion of your data at any time by contacting us.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Submit
            </button>

            <div className="text-center text-gray-600 text-sm flex items-center justify-center gap-2">
              You can also email me.{" "}
              <a
                href="mailto:isagani.cortavista@gmail.com"
                aria-label="Send email"
                className="inline-flex items-center hover:opacity-80 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-6 w-6">
                  <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"/>
                  <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"/>
                  <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"/>
                  <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0 C4.924,8,3,9.924,3,12.298z"/>
                  <path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"/>
                </svg>
              </a>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};
