"use client";

import { useState, useRef, useEffect } from "react";
import { capabilitiesContent } from "@/content/capabilities";

const serviceOptions = capabilitiesContent.capabilities.map(c => c.name);

interface BaseInputProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  name?: string;
}

function FormFieldWrapper({ label, required, isFocused, children }: any) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center gap-2 mb-2 relative h-5">
        {isFocused && (
          <div className="w-[6px] h-[6px] bg-[#cecccc] rounded-full animate-pulse" />
        )}
        <span className={`text-[13px] font-medium text-[#cecccc] transition-all duration-300 ${isFocused ? "" : "pl-0"}`}>
          {label} {required && <span className="text-[#cecccc]/60">*</span>}
        </span>
      </div>
      {children}
    </div>
  );
}

export function TextInput({ label, required, placeholder, type = "text", name }: BaseInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <FormFieldWrapper label={label} required={required} isFocused={isFocused}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="bg-transparent w-full text-base text-[#cecccc] border-b border-[#cecccc]/20 py-3 focus:border-[#cecccc]/70 transition-colors outline-none placeholder:text-[#cecccc]/40 font-normal"
      />
    </FormFieldWrapper>
  );
}

export function TextArea({ label, required, placeholder, name }: BaseInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <FormFieldWrapper label={label} required={required} isFocused={isFocused}>
      <div className="relative w-full">
        <textarea
          name={name}
          placeholder={placeholder}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={4}
          className="bg-transparent w-full text-base text-[#cecccc] border-b border-[#cecccc]/20 py-3 focus:border-[#cecccc]/70 transition-colors outline-none placeholder:text-[#cecccc]/40 font-normal resize-none min-h-[120px]"
        />
        <div className="absolute bottom-3 right-0 pointer-events-none text-[#cecccc]/60 select-none">
          ↗
        </div>
      </div>
    </FormFieldWrapper>
  );
}

export function CustomSelect({ label, required, options, placeholder, name }: BaseInputProps & { options: string[] }) {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <FormFieldWrapper label={label} required={required} isFocused={isFocused || isOpen}>
      <div ref={containerRef} className="relative w-full">
        {/* Hidden input stores the select state for standard native form retrieval */}
        <input type="hidden" name={name} value={selectedValue} required={required} />

        <div
          onClick={() => {
            setIsOpen(!isOpen);
            setIsFocused(true);
          }}
          className={`flex items-center justify-between w-full text-base border-b py-3 cursor-pointer transition-colors ${isOpen || isFocused ? "border-[#cecccc]/70" : "border-[#cecccc]/20"
            }`}
        >
          <span className={selectedValue ? "text-[#cecccc]" : "text-[#cecccc]/40"}>
            {selectedValue || placeholder || "Select option"}
          </span>
          <svg
            className={`w-3 h-3 text-[#cecccc]/60 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 w-full z-50 mt-1 bg-[#41050c] border border-[#cecccc]/20 rounded-lg shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => {
                  setSelectedValue(option);
                  setIsOpen(false);
                  setIsFocused(false);
                }}
                className="px-4 py-3 text-[15px] text-[#cecccc]/80 hover:text-[#cecccc] hover:bg-[#cecccc]/10 cursor-pointer transition-colors"
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </FormFieldWrapper>
  );
}

const FormDivider = () => <div className="h-[1px] w-full bg-[#cecccc]/15 my-2" />;

export function ProjectEnquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      type: "project-enquiry",
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      reason: formData.get("reason"),
      companyName: formData.get("companyName"),
      companyInstagram: formData.get("companyInstagram"),
      hearAboutUs: formData.get("hearAboutUs"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to connect to server.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-16 h-16 bg-brand/20 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-medium text-[#cecccc] mb-3">Submission Sent</h3>
        <p className="text-[#cecccc]/70">Thank you. Our team will review your details and reach out shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Row 1: Name + Mail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput label="Name" name="name" required placeholder="John Smith" />
        <TextInput label="Mail id" name="email" type="email" required placeholder="you@example.com" />
      </div>
      <FormDivider />

      {/* Contact number */}
      <TextInput label="Contact number" name="phone" type="tel" required placeholder="+1 234 567 8900" />
      <FormDivider />

      {/* Reason to connect */}
      <CustomSelect
        label="Reason to connect?"
        name="reason"
        required
        placeholder="Select a reason"
        options={serviceOptions}
      />
      <FormDivider />

      {/* Row 2: Company name + Company instagram (both optional) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput label="Company name" name="companyName" placeholder="Your company" />
        <TextInput label="Company instagram" name="companyInstagram" placeholder="@yourhandle" />
      </div>
      <FormDivider />

      {/* How did you hear — dropdown, required */}
      <CustomSelect
        label="How did you hear about us?"
        name="hearAboutUs"
        placeholder="SELECT OPTION"
        options={["Instagram", "Friends & Family", "Facebook", "Others"]}
      />
      <FormDivider />

      {/* Message — optional */}
      <TextArea label="Leave a message" name="message" placeholder="Anything you'd like us to know (optional)" />

      {error && <div className="text-red-400 text-sm -mt-4">{error}</div>}

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-[#41050c] text-[#cecccc] text-base font-medium px-9 py-3.5 border border-[#41050c] hover:bg-[#404040] hover:border-[#404040] hover:text-[#f6f5f5] transition-all duration-300 w-fit cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Submit"}
        </button>
      </div>
    </form>
  );
}

export function MinimalForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      type: "minimal-enquiry",
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to connect.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in fade-in duration-500">
        <div className="w-16 h-16 bg-brand/20 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-medium text-[#cecccc] mb-3">Message Received</h3>
        <p className="text-[#cecccc]/70">We'll be in touch shortly!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput label="Name" name="name" required placeholder="John Smith" />
        <TextInput label="Email" name="email" type="email" required placeholder="Enter your email" />
      </div>
      <FormDivider />
      <TextArea label="Message" name="message" required placeholder="Leave a message" />

      {error && <div className="text-red-400 text-sm -mt-4">{error}</div>}

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-[#41050c] text-[#cecccc] text-base font-medium px-9 py-3.5 border border-[#41050c] hover:bg-[#404040] hover:border-[#404040] hover:text-[#f6f5f5] transition-all duration-300 w-fit cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
