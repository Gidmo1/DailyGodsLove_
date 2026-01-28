import posts from "../../../shared/data/posts.json";

export const onRequestGet: PagesFunction = async ({ params }) => {
  const slug = String(params.slug || "");
  const post = (posts as any[]).find((p) => p.slug === slug);

  if (!post) {
    return new Response(JSON.stringify({ message: "Post not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return Response.json(post);
};
