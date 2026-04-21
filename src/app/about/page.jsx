import { Card } from 'antd'
import { RocketOutlined, BulbOutlined, HeartOutlined } from '@ant-design/icons'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata = {
  title: 'About',
  description: 'Learn about 1GbRam — a community for developers on limited hardware.',
}

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-50 to-blue-50 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">About 1GbRam</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            We started 1GbRam because great software doesn&apos;t require top-of-the-line hardware.
            Our mission is to help developers do more with less.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto prose prose-lg text-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our story</h2>
            <p>
              Many talented developers around the world are still writing code on machines with 1–4 GB
              of RAM. They face a unique set of challenges — browser tabs that crash, IDEs that lag,
              and tutorials that assume 16 GB is the baseline.
            </p>
            <p>
              1GbRam exists to bridge that gap. We document what actually works on constrained
              hardware: lightweight editors, swap optimisations, minimal Linux setups, CI pipelines
              that don&apos;t need beefy runners, and much more.
            </p>
            <p>
              Whether you&apos;re on an old laptop, a cheap VPS, or an embedded device — you belong here.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What we believe</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <RocketOutlined className="text-3xl text-blue-600" />,
                title: 'Practical first',
                desc: 'Every tip and guide is tested on real, limited hardware — not just theorised.',
              },
              {
                icon: <BulbOutlined className="text-3xl text-yellow-500" />,
                title: 'Community driven',
                desc: 'The best solutions come from people who have actually faced the problem.',
              },
              {
                icon: <HeartOutlined className="text-3xl text-red-500" />,
                title: 'Inclusive',
                desc: "Hardware should never be a barrier to becoming a great developer.",
              },
            ].map(({ icon, title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 120}>
                <Card className="text-center shadow-sm h-full">
                  <div className="mb-4">{icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm">{desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <ScrollReveal>
        <section className="py-20 px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Want to contribute?</h2>
          <p className="text-gray-500 mb-6">
            Got a tip, fix, or guide that helped you? We&apos;d love to publish it.
          </p>
          <a href="/contact" className="text-blue-600 font-semibold hover:underline">
            Get in touch →
          </a>
        </section>
      </ScrollReveal>
    </div>
  )
}
