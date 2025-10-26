import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 mt-16">
      <h2
        className="text-4xl font-extrabold text-center text-[#27445D] mb-10"
        data-aos="fade-down"
      >
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden"
            data-aos="fade-up"
            data-aos-delay={index * 100} // stagger effect
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-4 bg-gray-100 font-semibold flex justify-between items-center hover:bg-gray-200 text-gray-700 transition-colors"
            >
              {item.question}
              <span className="text-xl font-bold">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <div
                className="p-4 text-gray-700 bg-white"
                data-aos="fade-in"
                data-aos-duration="600"
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
