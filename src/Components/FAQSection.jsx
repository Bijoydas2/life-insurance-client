import React, { useState, useEffect, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ThemeContext } from "../Context/ThemeContext";


const faqData = [
  {
    question: "What is life insurance?",
    answer:
      "Life insurance is a contract that provides financial protection to your beneficiaries in case of your death.",
  },
  {
    question: "How do I apply for a policy?",
    answer:
      "You can apply online through our website by filling out the application form for your chosen policy.",
  },
  {
    question: "Can I pay premiums monthly?",
    answer:
      "Yes, most policies allow flexible premium payments, including monthly, quarterly, or yearly options.",
  },
  {
    question: "What happens if I miss a payment?",
    answer:
      "If a premium payment is missed, the policy may lapse, but some policies offer grace periods or partial coverage.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { theme } = useContext(ThemeContext);
  const dark = theme === "dark";

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section
      className={`max-w-7xl mx-auto px-6 mt-16 py-10 transition-colors duration-300 ${
        dark ? "bg-[#0f172a]" : "bg-white"
      }`}
    >
      <h2
        className={`text-4xl font-extrabold text-center mb-10 ${
          dark ? "text-white" : "text-[#27445D]"
        }`}
        data-aos="fade-down"
      >
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`rounded-xl overflow-hidden shadow-lg border ${
              dark ? "border-[#334155]" : "border-gray-200"
            }`}
            data-aos="fade-up"
            data-aos-delay={index * 100} 
          >
            {/* Question Button  */}
            <button
              onClick={() => toggleFAQ(index)}
              className={`w-full text-left p-5 font-semibold flex justify-between items-center transition-colors duration-300 ${
                dark
                  ? "bg-[#1e293b] text-white hover:bg-[#334155]"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.question}
              <span className="text-2xl font-bold ml-4 text-primary">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {/* Answer Content */}
            {openIndex === index && (
              <div
                className={`p-5 text-lg ${
                  dark ? "bg-gray-800 text-gray-300" : "bg-white text-gray-700"
                }`}
                data-aos="fade-in"
                data-aos-duration="400"
              >
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;