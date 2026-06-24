import { MetadataRoute } from "next";

const BASE = "https://pickpc.vercel.app";

const categories = [
  "gaming", "student", "work", "creator", "mobile",
  "general", "programming", "highend", "budget", "ai", "beginner", "dtm",
];

const makers = [
  "apple", "lenovo", "dell", "hp", "asus", "microsoft",
  "mouse", "dospara", "pckosho", "msi", "acer", "dynabook", "frontier", "nec",
];

const jisakuBuilds = [
  "budget-50k", "mid-100k", "mid-150k", "high-200k", "valorant-144fps",
];

const knowledgeSlugs = [
  "pc-osusume-2026",
  "daigakusei-pc-2026",
  "pc-10man-ika",
  "video-henshu-pc-2026",
  "programming-pc-2026",
  "spec-guide",
  "windows-vs-mac",
  "used-pc",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const statics: MetadataRoute.Sitemap = [
    { url: BASE,            lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/shindan`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/category`, lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/maker`,    lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/jisaku`,   lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/compare`,  lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/parts/gpu`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/parts/cpu`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((slug) => ({
    url: `${BASE}/category/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const makerPages: MetadataRoute.Sitemap = makers.map((slug) => ({
    url: `${BASE}/maker/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const jisakuPages: MetadataRoute.Sitemap = jisakuBuilds.map((slug) => ({
    url: `${BASE}/jisaku/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const knowledgePages: MetadataRoute.Sitemap = knowledgeSlugs.map((slug) => ({
    url: `${BASE}/knowledge/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...statics, ...categoryPages, ...makerPages, ...jisakuPages, ...knowledgePages];
}
