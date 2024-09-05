import slugify from "slugify";
import crypto from "crypto";

export const generateSlugify = (char: string): string => {
  const prevSlug = slugify(char, {
    lower: true,
    strict: true,
    trim: true,
  });

  const code = generateCode();

  return `${prevSlug}-${code}`;
};

function generateCode() {
  const now = new Date();

  const dateString = now.toISOString();

  const buffer = Buffer.from(dateString);

  const hash = crypto.createHash("sha256").update(buffer).digest();

  const hexPart = hash.toString("hex").slice(0, 4);

  return hexPart;
}
