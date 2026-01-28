import posts from "../../shared/data/posts.json";

export const onRequestGet: PagesFunction = async () => {
  return Response.json(posts);
};

