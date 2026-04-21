import { fetchStrapi } from "@/lib/strapi";
import { Button, Card } from "antd";
import {
  ArrowRightOutlined,
  ReadOutlined,
  ToolOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import ScrollReveal from "@/components/ScrollReveal"
import PostCard from "@/components/PostCard";

export const revalidate = 60;

async function getRecentPosts() {
  try {
    const data = await fetchStrapi(
      "/posts?sort=publishedAt:desc&pagination[limit]=3&populate=*",
      {
        revalidate: 60,
      },
    );
    return data?.data ?? [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const recentPosts = await getRecentPosts();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white min-h-[70vh] flex items-center px-4 py-32">
        <div className="max-w-4xl mx-auto text-center w-full animate-fade-in-up">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight">
            Dev insights for every machine
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Tutorials, tools, and tips optimised for developers running lean
            hardware.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/blogs">
              <Button
                type="primary"
                size="large"
                icon={<ReadOutlined />}
                ghost
                className="text-white"
              >
                Read the Blog
              </Button>
            </a>
            <a href="/checker">
              <Button
                size="large"
                className="bg-white text-blue-700 border-white hover:!bg-blue-50"
              >
                Try the Checker
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              What we offer
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ReadOutlined className="text-3xl text-blue-600" />,
                title: "Articles & Guides",
                desc: "In-depth posts covering performance, tooling, and workflows for resource-constrained environments.",
                href: "/blogs",
              },
              {
                icon: <ToolOutlined className="text-3xl text-green-600" />,
                title: "RAM Checker",
                desc: "Instantly check whether your system RAM meets the requirements for popular dev tools and frameworks.",
                href: "/checker",
              },
              {
                icon: <TeamOutlined className="text-3xl text-purple-600" />,
                title: "Community",
                desc: "Connect with developers who understand the constraints and share practical, battle-tested solutions.",
                href: "/about",
              },
            ].map(({ icon, title, desc, href }, i) => (
              <ScrollReveal key={title} delay={i * 120}>
                <Card className="text-center shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="mb-4">{icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">{desc}</p>
                  <a
                    href={href}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    Learn more <ArrowRightOutlined />
                  </a>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-bold text-gray-900">
                  Recent Posts
                </h2>
                <a
                  href="/blogs"
                  className="text-blue-600 font-medium hover:underline flex items-center gap-1"
                >
                  View all <ArrowRightOutlined />
                </a>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.map((post, i) => {
                const attrs = post.attributes ?? post;
                return (
                  <ScrollReveal key={attrs.slug} delay={i * 120}>
                    <PostCard {...attrs} />
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <ScrollReveal>
        <section className="bg-gray-900 text-white py-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Have a question or tip to share?
            </h2>
            <p className="text-gray-400 mb-8">
              Reach out — we read every message.
            </p>
            <a href="/contact">
              <Button type="primary" size="large">
                Get in touch
              </Button>
            </a>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
