interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is NexoraXS?",
    answer:
      "NexoraXS is a modular Business Operating System — one platform where you can run multiple business apps (Shops, Clinics, Maintenance, and more) under a single login and workspace.",
  },
  {
    question: "Can I use multiple apps under one account?",
    answer:
      "Yes. Once you create a workspace you can enable any available NexoraXS app for that workspace. All apps share the same authentication and billing.",
  },
  {
    question: "Is my business data kept separate from other users?",
    answer:
      "Absolutely. NexoraXS uses strict workspace-level data isolation. Your data is never visible to other workspaces or businesses on the platform.",
  },
  {
    question: "What apps are available right now?",
    answer:
      "The Shops app (commerce & POS) is available in the current release. Clinics, Maintenance, Restaurants, and CRM are coming soon.",
  },
  {
    question: "How does pricing work?",
    answer:
      "We're finalising pricing plans. You can get started for free during our early access period with no credit card required.",
  },
  {
    question: "How do I get started?",
    answer:
      "Click any 'Get Started' button on this page to create your free NexoraXS account and set up your first workspace in minutes.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
        <p className="mt-4 text-white/60">
          Everything you need to know about NexoraXS.
        </p>
      </div>

      <div className="divide-y divide-white/10">
        {faqs.map((item) => (
          <details key={item.question} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-white/90 hover:text-white">
              {item.question}
              <span className="ml-4 flex-shrink-0 text-white/40 transition-transform duration-200 group-open:rotate-180">
                ▾
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
