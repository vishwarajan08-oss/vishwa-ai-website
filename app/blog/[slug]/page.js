import { allArticles, getArticleBySlug } from "@/content/blog/index";
import BlogArticlePage from "@/components/BlogArticlePage";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return allArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: `${article.title} | Core Consulting Blog`,
    description: article.excerpt,
  };
}

export default function ArticlePage({ params }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();
  return <BlogArticlePage article={article} />;
}
