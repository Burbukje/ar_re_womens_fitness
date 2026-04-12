import { notFound } from "next/navigation";

async function getBlogPost(slug: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  const res = await fetch(`${apiUrl}/api/posts/${slug}/`, {
    cache: "no-store",
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  return (
    <main>
      <section className="section">
        <div className="container max-w-4xl">
          {post.image && (
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
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="text-center mb-10">
            <p className="blog-date text-gray-500 text-sm">
              {new Date(post.published_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <h1 className="page-title mt-4 text-4xl md:text-5xl leading-tight">
              {post.title}
            </h1>
          </div>

          <div
            className="prose prose-lg max-w-none mx-auto blog-content leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>
    </main>
  );
}

