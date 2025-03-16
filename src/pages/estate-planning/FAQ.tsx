// src/pages/EstatePlanning/FAQ.tsx
import React, { useState } from "react";
import { FAQ } from "../../types/estate-palnning";
import { Accordion } from "../../components/ui/Accordian";
import { InfoAlert } from "../../components/etstate-planning/InfoAlert";

const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Mock FAQ data
  const faqs: FAQ[] = [
    {
      id: "faq-1",
      question: "What is the difference between a Will and a nomination?",
      answer:
        "While both are part of estate planning, they serve different purposes. A Will is a comprehensive legal document that distributes all your assets according to your wishes after death. A nomination, on the other hand, is asset-specific and only facilitates quick transfer of particular assets. Under Indian law, nominees are generally considered trustees who must ultimately transfer assets to legal heirs as per succession laws or the Will, except in case of insurance where nominees are beneficial owners.",
      category: "basics",
    },
    {
      id: "faq-2",
      question: "Is registration of a Will mandatory in India?",
      answer:
        "No, registration of a Will is not mandatory in India. A Will is legally valid even without registration if it meets other requirements like being signed by the testator in the presence of two witnesses who also sign the Will. However, registration is highly recommended as it adds a layer of authenticity, prevents tampering, provides safe custody, and makes the probate process smoother.",
      category: "will",
    },
    {
      id: "faq-3",
      question: "Who can be a witness to my Will?",
      answer:
        "Any adult person of sound mind can be a witness to your Will. However, it's advisable that the witness not be a beneficiary under the Will or spouse of a beneficiary, as this may raise questions about their impartiality. Ideally, witnesses should be independent individuals who know the testator but don't have an interest in the Will. It's good practice to have at least two witnesses as required by the Indian Succession Act.",
      category: "will",
    },
    {
      id: "faq-4",
      question: "Can I disinherit my legal heirs through my Will?",
      answer:
        "In India, the ability to disinherit legal heirs depends on the applicable personal law. Under Hindu law, a person can generally disinherit legal heirs through a Will for self-acquired property. However, for ancestral property (especially under Hindu Undivided Family), there are limitations. Under Muslim law, testamentary freedom is limited to one-third of the property. For Christians and Parsis, the Indian Succession Act allows more testamentary freedom, but there may be provisions for maintenance of dependents.",
      category: "legal",
    },
    {
      id: "faq-5",
      question: "What happens if I die without a Will in India?",
      answer:
        "Dying without a Will is called dying intestate. In such cases, your assets will be distributed according to the succession laws applicable to your religion. For Hindus, Buddhists, Jains, and Sikhs, the Hindu Succession Act will apply. For Muslims, the Muslim Personal Law will govern. For Christians and Parsis, provisions of the Indian Succession Act will apply. These laws prescribe a specific order of inheritance and proportion of assets to be distributed to each legal heir.",
      category: "legal",
    },
    {
      id: "faq-6",
      question: "What is probate and when is it required in India?",
      answer:
        "Probate is a certificate issued by a court confirming the authenticity of a Will and authorizing the executor to administer the estate. In India, probate is mandatory in the Presidency towns of Mumbai, Kolkata, and Chennai. In other places, it's typically required for immovable property transactions after death. Probate is also often demanded by banks, financial institutions, and property registrars to transfer high-value assets, even though not legally mandatory in all jurisdictions.",
      category: "legal",
    },
    {
      id: "faq-7",
      question: "How do I plan for my digital assets in India?",
      answer:
        "Digital asset planning in India is still evolving legally. Best practices include: 1) Create an inventory of all digital assets including online accounts, cryptocurrencies, and digital files, 2) Document access information securely and share with a trusted person or include it in a confidential letter attached to your Will, 3) Include specific provisions for digital assets in your Will, 4) Consider using digital inheritance services that provide secure vaults for digital asset information with controlled posthumous access.",
      category: "digital",
    },
    {
      id: "faq-8",
      question:
        "Can NRIs own property in India and how does inheritance work for them?",
      answer:
        "Yes, Non-Resident Indians (NRIs) can own property in India, subject to FEMA regulations. For inheritance, Indian succession laws apply to immovable property in India regardless of the owner's nationality or residence. For NRIs, estate planning should ideally cover cross-border issues, including potential double taxation treaties, repatriation of inherited assets, and compliance with both Indian and foreign inheritance laws. NRIs should also consider creating separate Wills for Indian and foreign assets.",
      category: "nri",
    },
    {
      id: "faq-9",
      question:
        "What is a Hindu Undivided Family (HUF) and how does it affect estate planning?",
      answer:
        "A Hindu Undivided Family (HUF) is a legal entity unique to Hindu law representing a family unit consisting of all persons lineally descended from a common ancestor. HUF property is governed by special rules under Hindu law. The Karta (senior-most male member) manages the property but doesn't have complete testamentary rights over it. Estate planning for HUF requires understanding ancestral property rights, coparcenary shares, and the distinction between HUF property and personal assets.",
      category: "hindu-law",
    },
  ];

  // Categories for filtering
  const categories = [
    { id: "all", label: "All Questions" },
    { id: "basics", label: "Basics" },
    { id: "will", label: "Wills" },
    { id: "legal", label: "Legal Aspects" },
    { id: "digital", label: "Digital Assets" },
    { id: "nri", label: "NRI Concerns" },
    { id: "hindu-law", label: "Hindu Law" },
  ];

  // Filter FAQs based on active category
  const filteredFaqs =
    activeCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  // Format FAQs for the Accordion component
  const faqItems = filteredFaqs.map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: <p className="text-sm text-gray-600">{faq.answer}</p>,
  }));

  return (
    <div>
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>

        {/* Category Filter */}
        <div className="mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  activeCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <Accordion items={faqItems} />

        {/* Consultation CTA */}
        <div className="mt-8">
          <InfoAlert
            type="cta"
            title="Have more questions?"
            actionText="Schedule a Consultation"
            onAction={() => console.log("Navigate to consultation scheduling")}
          >
            <p>
              Our estate planning experts can help you navigate complex
              inheritance matters specific to your situation.
            </p>
          </InfoAlert>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
