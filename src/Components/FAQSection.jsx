import React, { useState } from "react";

const faqData = [
  {
    question: "What is life insurance?",
    answer: "Life insurance is a contract that provides financial protection to your beneficiaries in case of your death."
  },
  {
    question: "How do I apply for a policy?",
    answer: "You can apply online through our website by filling out the application form for your chosen policy."
  },
  {
    question: "Can I pay premiums monthly?",
    answer: "Yes, most policies allow flexible premium payments, including monthly, quarterly, or yearly options."
  },
  {
    question: "What happens if I miss a payment?",
    answer: "If a premium payment is missed, the policy may lapse, but some policies offer grace periods or partial coverage."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 mt-16">
      <h2 className="text-4xl font-extrabold text-center text-primary mb-10">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-4 bg-gray-100 font-semibold flex justify-between items-center hover:bg-gray-200  text-gray-700 transition-colors"
            >
              {item.question}
              <span>{openIndex === index ? "-" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="p-4 text-gray-700 bg-white">
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
