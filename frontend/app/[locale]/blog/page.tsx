import Link from "next/link";
import { getTranslations } from "next-intl/server";

async function getBlogPosts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  console.log("🔍 Attempting to connect to Django at:", apiUrl);

  try {
    const res = await fetch(`${apiUrl}/api/posts/`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Fetching:", `${apiUrl}/api/posts/`);

    if (res.ok) {
      const data = await res.json();
      console.log(`✅ Fetched ${data.length} real posts from Django`);
      return data;
    }
  } catch (error) {
    console.error("❌ Django connection failed:", error);
  }

  // Fallback: Return dummy data so the page renders
  console.log("⚠️ Using dummy data because Django connection failed");
  return [
    {
      id: 1,
      title: "Welcome to Ar-Re Blog",
      slug: "welcome-to-ar-re-blog",
      excerpt:
        "This is a sample post. Connect Django successfully to see real blog posts.",
      published_at: new Date().toISOString(),
      image: null,
    },
    {
      id: 2,
      title: "Strength Training Tips for Women",
      slug: "strength-training-tips",
      excerpt:
        "Learn how to build strength safely and effectively in a supportive environment.",
      published_at: new Date(Date.now() - 86400000).toISOString(),
      image: null,
    },
  ];
}
export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("blog");

  const posts = await getBlogPosts();

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="section-header centered">
            <span className="eyebrow">Stories & Insights</span>
            <h1 className="page-title">{t("title")}</h1>
            <p>{t("subtitle")}</p>
          </div>

          <div className="blog-grid">
            {posts.length === 0 ? (
              <p className="text-center py-20 text-gray-500">{t("no_posts")}</p>
            ) : (
              posts.map((post: any) => (
                <Link
                  key={post.id}
                  href={`/${locale}/blog/${post.slug}`}
                  className="blog-card group"
                >
                  {post.image ? (
                    <div className="blog-image">
                      <img
                        src={
                          post.image.startsWith("http")
                            ? post.image
                            : `${
                                process.env.NEXT_PUBLIC_API_URL ||
                                "http://127.0.0.1:8000"
                              }${post.image}`
                        }
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="blog-image bg-gray-100 flex items-center justify-center">
                      <span className="text-6xl">🏋️‍♀️</span>
                    </div>
                  )}

                  <div className="blog-content">
                    <p className="blog-date">
                      {new Date(post.published_at).toLocaleDateString()}
                    </p>
                    <h2 className="blog-title">{post.title}</h2>
                    <p className="blog-excerpt line-clamp-3">{post.excerpt}</p>
                    <span className="read-more">Read more →</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
