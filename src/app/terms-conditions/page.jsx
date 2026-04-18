export const metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for using 1GbRam.',
}

export default function TermsConditionsPage() {
  const sections = [
    {
      title: '1. Acceptance of terms',
      content: `By accessing or using 1GbRam ("the Site"), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the Site.`,
    },
    {
      title: '2. Use of content',
      content: `All articles, guides, and other written content on the Site are published for informational and educational purposes. You may share links to content or quote short excerpts with attribution, but you may not reproduce full articles without explicit written permission.`,
    },
    {
      title: '3. No warranty',
      content: `The content on this Site is provided "as is" without warranty of any kind. Configurations, commands, and code snippets are offered in good faith but may not be suitable for every environment. Always test in a safe environment before applying changes to production systems.`,
    },
    {
      title: '4. Limitation of liability',
      content: `1GbRam and its contributors shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the Site or reliance on any content published here.`,
    },
    {
      title: '5. User submissions',
      content: `If you submit content via the Contact page or any other channel, you grant us a non-exclusive, royalty-free licence to use, adapt, and publish that content on the Site with appropriate attribution.`,
    },
    {
      title: '6. External links',
      content: `The Site may link to third-party websites. We are not responsible for the content or privacy practices of those sites. Links are provided for convenience only.`,
    },
    {
      title: '7. Governing law',
      content: `These terms are governed by applicable law. Any disputes will be resolved in the jurisdiction where 1GbRam operates.`,
    },
    {
      title: '8. Changes to these terms',
      content: `We reserve the right to update these terms at any time. Continued use of the Site after changes are posted constitutes acceptance of the revised terms.`,
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Terms & Conditions</h1>
      <p className="text-gray-400 text-sm mb-10">Effective date: April 18, 2026</p>

      <div className="prose prose-gray max-w-none space-y-8">
        <p className="text-gray-600 leading-relaxed">
          Please read these Terms and Conditions carefully before using 1GbRam.
        </p>

        {sections.map(({ title, content }) => (
          <section key={title}>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600 leading-relaxed">{content}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
