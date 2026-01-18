import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    startDate: z.coerce.date(),                      // When you started the project
    endDate: z.coerce.date().optional(),             // When you finished (leave empty for ongoing)
    tags: z.array(z.string()).optional(),
    link: z.string().optional(),  // Can be GitHub, YouTube demo, live site, etc.
    image: z.string().optional(),
    featured: z.boolean().optional().default(false),
    current: z.boolean().optional().default(false),  // true = Currently Working On, false = Past Project
  }),
});

export const collections = { blog, projects };
