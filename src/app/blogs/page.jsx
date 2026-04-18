import Link from "next/link";
import Image from "next/image";
import { fetchStrapi, STRAPI_MEDIA_URL } from "@/lib/strapi";
import { Tag, Empty } from "antd";
import { CalendarOutlined, ArrowRightOutlined } from "@ant-design/icons";

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
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Blogs</h1>
        <p className="text-gray-500 text-lg">
          Guides, tips, and deep dives for low-resource development.
        </p>
      </div>

      {posts.length === 0 ? (
        <Empty description="No posts yet — check back soon." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const { title, slug, excerpt, publishedAt, tags, image, author } =
              post.attributes ?? post;
            const coverUrl = image?.data?.attributes?.url ?? image?.url;
            const authorName = author?.data?.attributes?.name ?? author?.name;
            const fullCover = coverUrl
              ? coverUrl.startsWith("http")
                ? coverUrl
                : `${STRAPI_MEDIA_URL}${coverUrl}`
              : null;

            return (
              <Link
                key={slug}
                href={`/post/${slug}`}
                className="group no-underline flex flex-col rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {/* Cover image */}
                <div className="relative h-48 w-full bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
                  {fullCover ? (
                    <Image
                      src={fullCover}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-black text-indigo-200 select-none">
                        {title?.[0]?.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5">
                  {tags && (
                    <div className="mb-3 flex flex-wrap gap-1">
                      {(Array.isArray(tags) ? tags : tags.split(","))
                        .slice(0, 3)
                        .map((t) => (
                          <Tag key={t} color="blue" className="text-xs m-0">
                            {t.trim()}
                          </Tag>
                        ))}
                    </div>
                  )}

                  <h2 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {title}
                  </h2>

                  {excerpt && (
                    <p className="text-sm text-gray-500 line-clamp-3 flex-1 leading-relaxed">
                      {excerpt}
                    </p>
                  )}

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                      {authorName && (
                        <span className="text-xs font-medium text-gray-700">
                          {authorName}
                        </span>
                      )}
                      {publishedAt && (
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <CalendarOutlined />
                          {new Date(publishedAt).toLocaleDateString("en-US", {
                            dateStyle: "medium",
                          })}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-medium text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read more <ArrowRightOutlined />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
