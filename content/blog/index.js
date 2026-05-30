import { article as a1 } from "./how-wealth-management-firms-are-using-ai-in-2026";
import { article as a2 } from "./the-future-of-ai-in-wealth-management";
import { article as a3 } from "./what-the-next-five-years-look-like-for-advisory-firms";
import { article as a4 } from "./why-most-ai-implementations-in-finance-fail";
import { article as a5 } from "./ai-is-not-replacing-advisors";
import { article as a6 } from "./5-repetitive-tasks-advisory-firms-can-automate";
import { article as a7 } from "./building-an-ai-workflow-for-client-meetings";
import { article as a8 } from "./how-to-cut-client-reporting-time-in-half";
import { article as a9 } from "./hidden-cost-of-manual-processes";
import { article as a10 } from "./what-firms-should-know-before-adopting-ai";
import { article as a11 } from "./how-smaller-rias-can-compete-with-larger-firms";
import { article as a12 } from "./why-your-crm-is-underperforming";
import { article as a13 } from "./claude-vs-chatgpt-for-financial-advisory-workflows";
import { article as a14 } from "./ai-strategy-vs-ai-tools";
import { article as a15 } from "./how-to-build-an-ai-adoption-roadmap";
import { article as a16 } from "./the-case-for-starting-small-with-ai";
import { article as a17 } from "./why-workflow-audits-come-first";
import { article as a18 } from "./how-to-get-your-team-to-use-ai-tools";
import { article as a19 } from "./what-is-an-ai-workflow";
import { article as a20 } from "./meeting-note-ai-tools-compared";
import { article as a21 } from "./how-crm-automation-works-in-wealth-management";
import { article as a22 } from "./best-ai-tools-for-financial-research-2026";
import { article as a23 } from "./what-hipaa-compliance-means-for-ai";
import { article as a24 } from "./how-ai-helps-advisors-spend-more-time-with-clients";
import { article as a25 } from "./using-ai-to-improve-client-communication";
import { article as a26 } from "./what-clients-actually-think-about-ai-in-finance";
import { article as a27 } from "./how-to-use-ai-for-client-onboarding";
import { article as a28 } from "./how-ai-helps-boutique-advisory-firms-scale";
import { article as a29 } from "./using-ai-to-win-more-clients-through-better-follow-up";
import { article as a30 } from "./operational-infrastructure-that-separates-growing-firms";

export const allArticles = [
  a1, a2, a3, a4, a5, a6, a7, a8, a9, a10,
  a11, a12, a13, a14, a15, a16, a17, a18, a19, a20,
  a21, a22, a23, a24, a25, a26, a27, a28, a29, a30,
].sort((a, b) => new Date(b.date) - new Date(a.date));

export function getArticleBySlug(slug) {
  return allArticles.find((a) => a.slug === slug) || null;
}
