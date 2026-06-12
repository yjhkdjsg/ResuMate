const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");
const { z } = require("zod");

const env = require("../config/env");

const ai = env.geminiApiKey ? new GoogleGenerativeAI(env.geminiApiKey) : null;

const linkSchema = {
  type: SchemaType.OBJECT,
  required: ["label", "url"],
  properties: {
    label: { type: SchemaType.STRING },
    url: { type: SchemaType.STRING },
  },
};

const responseSchema = {
  type: SchemaType.OBJECT,
  required: [
    "basics",
    "summary",
    "experience",
    "education",
    "skills",
    "projects",
    "certifications",
    "languages",
    "interests",
  ],
  properties: {
    basics: {
      type: SchemaType.OBJECT,
      required: ["name", "title", "location", "email", "phone", "links"],
      properties: {
        name: { type: SchemaType.STRING },
        title: { type: SchemaType.STRING },
        location: { type: SchemaType.STRING },
        email: { type: SchemaType.STRING },
        phone: { type: SchemaType.STRING },
        links: {
          type: SchemaType.ARRAY,
          items: linkSchema,
        },
      },
    },

    summary: { type: SchemaType.STRING },

    experience: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        required: ["company", "role", "location", "period", "bullets"],
        properties: {
          company: { type: SchemaType.STRING },
          role: { type: SchemaType.STRING },
          location: { type: SchemaType.STRING },
          period: { type: SchemaType.STRING },
          bullets: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
          },
        },
      },
    },

    education: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        required: ["degree", "school", "location", "period", "details"],
        properties: {
          degree: { type: SchemaType.STRING },
          school: { type: SchemaType.STRING },
          location: { type: SchemaType.STRING },
          period: { type: SchemaType.STRING },
          details: { type: SchemaType.STRING },
        },
      },
    },

    skills: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
    },

    projects: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        required: ["name", "description", "tech", "links"],
        properties: {
          name: { type: SchemaType.STRING },
          description: { type: SchemaType.STRING },
          tech: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
          },
          links: {
            type: SchemaType.ARRAY,
            items: linkSchema,
          },
        },
      },
    },

    certifications: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        required: ["name", "issuer", "year"],
        properties: {
          name: { type: SchemaType.STRING },
          issuer: { type: SchemaType.STRING },
          year: { type: SchemaType.STRING },
        },
      },
    },

    languages: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
    },

    interests: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
    },
  },
};

const validator = z.object({
  basics: z
    .object({
      name: z.string().default(""),
      title: z.string().default(""),
      location: z.string().default(""),
      email: z.string().default(""),
      phone: z.string().default(""),
      links: z
        .array(
          z.object({
            label: z.string().default(""),
            url: z.string().default(""),
          })
        )
        .default([]),
    })
    .default({
      name: "",
      title: "",
      location: "",
      email: "",
      phone: "",
      links: [],
    }),

  summary: z.string().default(""),

  experience: z
    .array(
      z.object({
        company: z.string().default(""),
        role: z.string().default(""),
        location: z.string().default(""),
        period: z.string().default(""),
        bullets: z.array(z.string()).default([]),
      })
    )
    .default([]),

  education: z
    .array(
      z.object({
        degree: z.string().default(""),
        school: z.string().default(""),
        location: z.string().default(""),
        period: z.string().default(""),
        details: z.string().default(""),
      })
    )
    .default([]),

  skills: z.array(z.string()).default([]),

  projects: z
    .array(
      z.object({
        name: z.string().default(""),
        description: z.string().default(""),
        tech: z.array(z.string()).default([]),
        links: z
          .array(
            z.object({
              label: z.string().default(""),
              url: z.string().default(""),
            })
          )
          .default([]),
      })
    )
    .default([]),

  certifications: z
    .array(
      z.object({
        name: z.string().default(""),
        issuer: z.string().default(""),
        year: z.string().default(""),
      })
    )
    .default([]),

  languages: z.array(z.string()).default([]),
  interests: z.array(z.string()).default([]),
});

const EMPTY = {
  basics: {
    name: "",
    title: "",
    location: "",
    email: "",
    phone: "",
    links: [],
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  interests: [],
};

function buildPrompt(rawText) {
  return [
    "You are a resume parser.",
    "The input is text extracted from a PDF. Lines may be jumbled or out of natural reading order.",
    "",
    "Extract structured data:",
    "- basics: name, professional title, location, email, phone, social links such as LinkedIn, GitHub, portfolio, etc.",
    "- summary: professional summary paragraph. Rejoin it if split across lines.",
    "- experience: jobs most recent first, with company, role, period, location if available, and bullet points.",
    "- education: degree, school, period, location, optional details.",
    "- skills: flat array of technical skills.",
    "- projects: name, one-sentence description, optional tech tags, optional links.",
    "- certifications: name, issuer, year.",
    "- languages: flat array.",
    "- interests: flat array.",
    "",
    "Rules:",
    "- Be conservative. Do not invent missing information.",
    "- Use empty strings or arrays where missing.",
    "- Extract verbatim where possible.",
    "- Each experience bullet should read as a complete sentence.",
    "- Preserve original date formats.",
    "",
    "RESUME TEXT:",
    rawText,
  ].join("\n");
}

async function parseResume(rawText) {
  if (!ai || !rawText?.trim()) {
    return EMPTY;
  }

  const prompt = buildPrompt(rawText);

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const model = ai.getGenerativeModel({
        model: env.geminiModel || "gemini-2.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema,
          temperature: 0.1,
        },
      });

      const result = await model.generateContent(prompt);

      const text = result.response.text();

      if (!text) {
        throw new Error("Empty Gemini response");
      }

      const parsed = JSON.parse(text);
      return validator.parse(parsed);
    } catch (err) {
      if (attempt === 2) {
        console.error("Structured resume parse failed:", err.message);
        return EMPTY;
      }
    }
  }

  return EMPTY;
}

module.exports = { parseResume };