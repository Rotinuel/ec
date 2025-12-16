"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About us", href: "#about" },
  { label: "Contact us", href: "#contact" },
];

const benefits = [
  {
    title: "Transparent",
    text: "Learn how your loan works and how terms affect costs.",
  },
  {
    title: "Affordable",
    text: "Loans structured with fixed rates and flexible repayment.",
  },
  {
    title: "Flexible Options",
    text: "Choose terms up to 72 months for your needs.",
  },
];

const loans = [
  {
    title: "Personal Loan",
    img: "/images/personal-loan.png",
    desc: "Get quick cash with fast approval and flexible terms.",
  },
  {
    title: "Home Loan",
    img: "/images/home-loan.png",
    desc: "Turn your dream home into reality with affordable terms.",
  },
  {
    title: "Business Loan",
    img: "/images/business-loan.png",
    desc: "Boost your business cash flow, operations, or upgrades.",
  },
];

const testimonials = [
  {
    name: "Brian Moten",
    text: "Evercrest Lending made the loan process fast, transparent, and easy!",
  },
  {
    name: "Clarice Turner",
    text: "Amazing service and professional support throughout the loan application!",
  },
];

export default function HomePage() {
  const [open, setOpen] = useState(false);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 font-sans space-y-16">

      {/* ===== HEADER ===== */}
      <header className="flex items-center justify-between py-6">
        <Image
          src="/images/evercrestl-logo.png"
          width={160}
          height={50}
          alt="Evercrest Lending"
          className="h-10 sm:h-12 w-auto"
        />

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-lg font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Mobile Nav */}
      {open && (
        <div className="md:hidden bg-white shadow-lg rounded-lg p-6 space-y-4 text-lg font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* ===== HERO ===== */}
      <section id="home" className="text-center space-y-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Welcome to Evercrest Lending
        </h1>
        <p className="text-base sm:text-xl text-gray-700 max-w-3xl mx-auto">
          Where trust and convenience come together. Enjoy fast and secure loans with repayment options designed specifically for you.
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold">
          Apply Now
        </button>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {benefits.map((item) => (
          <div key={item.title} className="space-y-3">
            <h3 className="text-xl sm:text-2xl font-semibold">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.text}</p>
          </div>
        ))}
      </section>

      {/* ===== LOANS ===== */}
      <section id="services" className="space-y-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          For Every Goal, There’s an Evercrest Loan
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {loans.map((loan) => (
            <div
              key={loan.title}
              className="border rounded-xl p-6 text-center space-y-4"
            >
              <Image
                src={loan.img}
                width={200}
                height={140}
                alt={loan.title}
                className="mx-auto"
              />
              <h4 className="text-xl font-semibold">{loan.title}</h4>
              <p className="text-gray-600">{loan.desc}</p>
              <button className="text-blue-600 font-medium">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          Our Customer’s Testimonials
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <div key={t.name} className="p-6 border rounded-lg">
              <p className="italic text-gray-700">“{t.text}”</p>
              <p className="mt-4 font-semibold">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="max-w-lg mx-auto space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          Contact Us
        </h2>

        <form className="space-y-4">
          {["First Name", "Last Name", "Your Email*"].map((placeholder, i) => (
            <input
              key={i}
              type={placeholder.includes("Email") ? "email" : "text"}
              placeholder={placeholder}
              className="w-full border p-3 rounded-lg"
              required={placeholder.includes("*")}
            />
          ))}
          <textarea
            placeholder="Message*"
            className="w-full border p-3 rounded-lg"
            required
          />
          <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold">
            Submit
          </button>
        </form>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        © 2025 Evercrest Lending. All Rights Reserved.
      </footer>

    </main>
  );
}
