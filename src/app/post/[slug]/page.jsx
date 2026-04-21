import { notFound } from "next/navigation";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchStrapi } from "@/lib/strapi";
import { Tag, Breadcrumb } from "antd";
import { CalendarOutlined, ArrowLeftOutlined } from "@ant-design/icons";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const data = await fetchStrapi(
      "/posts?fields[0]=slug&pagination[limit]=100",
    );
    return (data?.data ?? []).map((post) => ({
      slug: post.attributes?.slug ?? post.slug,
    }));
  } catch {
    return [];
  }
}

async function getPost(slug) {
  try {
    const data = await fetchStrapi(
      `/posts?filters[slug][$eq]=${slug}&populate=*`,
      { revalidate: 3600 },
    );
    const post = data?.data?.[0];
    return post ? (post.attributes ?? post) : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt ?? post.title,
  };
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const { title, content, publishedAt, tags, image, author } = post;
  const cover = image?.data?.attributes?.url ?? image?.url;
  const authorName = author?.data?.attributes?.name ?? author?.name;
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      <ScrollReveal>
        <div className="mb-8">
          <a
            href="/blogs"
            className="text-blue-600 hover:underline flex items-center gap-1 text-sm mb-6"
          >
            <ArrowLeftOutlined /> Back to Blog
          </a>

          {tags && (
            <div className="mb-3 flex flex-wrap gap-1">
              {(Array.isArray(tags) ? tags : tags.split(",")).map((t) => (
                <Tag key={t} color="blue">
                  {t.trim()}
                </Tag>
              ))}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            {title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            {authorName && <span>By {authorName}</span>}
            {publishedAt && (
              <span className="flex items-center gap-1">
                <CalendarOutlined />
                {new Date(publishedAt).toLocaleDateString("en-US", {
                  dateStyle: "long",
                })}
              </span>
            )}
          </div>
        </div>
      </ScrollReveal>

      {cover && (
        <ScrollReveal delay={100}>
          <Image
            src={
              cover.startsWith("http")
                ? cover
                : `${process.env.NEXT_PUBLIC_STRAPI_URL?.replace("/api", "")}${cover}`
            }
            alt={title}
            width={900}
            height={400}
            className="w-full rounded-xl mb-10 object-cover max-h-96"
          />
        </ScrollReveal>
      )}

      <ScrollReveal delay={150}>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </ScrollReveal>
    </article>
  );
}
