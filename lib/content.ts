import { BRAND_NAME } from "./site";

export const faqs = [
  {
    question: "Does this replace me or my team?",
    answer:
      "No. It handles the calls you'd otherwise miss — answering instantly by text, qualifying the lead, and booking the appointment. You and your techs still do the work; the AI just makes sure no opportunity slips through while you're on a job.",
  },
  {
    question: "Is it a real person texting?",
    answer:
      "No. It's an automated AI assistant, and it identifies itself as one. When a conversation needs a human — complex quotes, escalations, or anything outside its scope — it hands off and alerts you or your on-call team.",
  },
  {
    question: "What about spam and texting laws?",
    answer:
      "Compliance is built in. We follow A2P 10DLC registration, honor STOP/HELP keywords automatically, include required opt-out language, and only message callers who contacted you first. Your opt-in and consent data is never sold or shared for marketing.",
  },
  {
    question: "What if the AI says the wrong thing?",
    answer:
      "The assistant is scoped to your services, service area, and booking rules — it won't quote prices it shouldn't or promise things you don't offer. Edge cases and anything it's unsure about are escalated to a human, and you can review every conversation.",
  },
  {
    question: "Do I keep my existing phone number?",
    answer:
      "Yes. We work with your current business number through call forwarding and messaging setup — your customers keep calling the same number they always have. No number porting required.",
  },
] as const;

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export const features = [
  {
    title: "AI lead qualification",
    body: "Conversational AI (powered by DeepSeek) asks the right questions — job type, location, urgency — and captures structured lead details automatically.",
    tone: "accent",
  },
  {
    title: "ZIP-code service-area gating",
    body: "Automatically confirms whether a caller is inside your service area before booking, so you never get dispatched out of range.",
    tone: "cyan",
  },
  {
    title: "Real-time calendar booking",
    body: "Offers live, open time slots and books the appointment directly on your calendar — no back-and-forth phone tag.",
    tone: "accent",
  },
  {
    title: "Emergency escalation",
    body: "Detects gas leaks, flooding, and no-heat emergencies, flags them as priority, and instantly alerts your on-call team.",
    tone: "danger",
  },
  {
    title: "Bilingual — English & Spanish",
    body: "Detects the caller's language and qualifies leads naturally in both English and Spanish.",
    tone: "cyan",
  },
  {
    title: "STOP / HELP compliance built in",
    body: "A2P 10DLC registration, automatic opt-out handling, and required messaging disclosures are handled for you.",
    tone: "accent",
  },
] as const;

export const steps = [
  {
    title: "Catch the missed call",
    body: "When a call goes unanswered, we detect it instantly and trigger an automatic text back to the caller — usually within seconds.",
  },
  {
    title: "AI qualifies by text",
    body: `The ${BRAND_NAME} assistant chats with the caller, identifies the job, verifies the service area, and gauges urgency.`,
  },
  {
    title: "Appointment booked + you're alerted",
    body: "Qualified leads get booked on your calendar, and you receive a real-time alert with the full conversation and lead details.",
  },
] as const;
