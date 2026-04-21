export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for 1GbRam.',
}

import ScrollReveal from '@/components/ScrollReveal'

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: '1. Information we collect',
      content: `We collect information you voluntarily provide when you contact us (name, email address, message content). We may also collect anonymous usage analytics (page views, referrer URLs) through privacy-respecting tools that do not track individuals.`,
    },
    {
      title: '2. How we use your information',
      content: `We use the information you submit only to respond to your enquiry. We do not sell, trade, or rent your personal information to third parties. Anonymous analytics are used solely to improve the site's content and performance.`,
    },
    {
      title: '3. Cookies',
      content: `We use only essential cookies required for the site to function. We do not use advertising or tracking cookies. You can disable cookies in your browser settings; this will not affect your ability to read content.`,
    },
    {
      title: '4. Third-party services',
      content: `Our content is served from Strapi CMS hosted on our own infrastructure. We do not embed third-party advertising networks or social media trackers.`,
    },
    {
      title: '5. Data retention',
      content: `Contact form submissions are retained for up to 12 months and then deleted unless an ongoing relationship requires otherwise.`,
    },
    {
      title: '6. Your rights',
      content: `You have the right to access, correct, or delete any personal data we hold about you. To exercise these rights, contact us via the Contact page.`,
    },
    {
      title: '7. Changes to this policy',
      content: `We may update this policy occasionally. Changes will be posted on this page with an updated effective date.`,
    },
    {
      title: '8. Contact',
      content: `For privacy-related questions, please use the Contact page.`,
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <ScrollReveal>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Effective date: April 18, 2026</p>
      </ScrollReveal>

      <div className="prose prose-gray max-w-none space-y-8">
        <ScrollReveal delay={80}>
          <p className="text-gray-600 leading-relaxed">
            At 1GbRam we take your privacy seriously. This policy explains what data we collect, how we
            use it, and what rights you have.
          </p>
        </ScrollReveal>

        {sections.map(({ title, content }, i) => (
          <ScrollReveal key={title} delay={i * 60}>
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
              <p className="text-gray-600 leading-relaxed">{content}</p>
            </section>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
