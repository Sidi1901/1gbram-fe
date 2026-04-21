import ScrollReveal from "@/components/ScrollReveal";
import PostCard from "@/components/PostCard";
import { fetchStrapi } from "@/lib/strapi";
import { Empty } from "antd";

export const revalidate = 60;

export const metadata = {
  title: "Blog",
  description:
    "Articles, guides, and tips for developers working with limited resources.",
};

async function getPosts() {
  try {
    const data = await fetchStrapi("/posts?sort=publishedAt:desc&populate=*", {
      revalidate: 3600,
    });
    return data?.data ?? [];
  } catch {
    return [];
  }
}

export default async function BlogsPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <ScrollReveal>
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Blogs</h1>
          <p className="text-gray-500 text-lg">
            Guides, tips, and deep dives for low-resource development.
          </p>
        </div>
      </ScrollReveal>

      {posts.length === 0 ? (
        <Empty description="No posts yet — check back soon." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => {
            const attrs = post.attributes ?? post;
            return (
              <ScrollReveal key={attrs.slug} delay={i * 80}>
                <PostCard {...attrs} />
              </ScrollReveal>
            );
          })}
        </div>
      )}
    </div>
  );
}
