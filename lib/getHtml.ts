export function stripHtml(content = "") {
  // First, strip HTML tags
  let stripped = content.replace(/<[^>]*>/g, "");

  // Remove markdown headers
  stripped = stripped.replace(/^#{1,6}\s+/gm, "");

  // Remove markdown bold and italic
  stripped = stripped.replace(/(\*\*|__)(.*?)\1/g, "$2");
  stripped = stripped.replace(/(\*|_)(.*?)\1/g, "$2");

  // Remove markdown links
  stripped = stripped.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");

  // Remove markdown code blocks and inline code
  stripped = stripped.replace(/`{3}[\s\S]*?`{3}/g, "");
  stripped = stripped.replace(/`([^`]+)`/g, "$1");

  // Remove markdown blockquotes
  stripped = stripped.replace(/^>\s+/gm, "");

  // Remove markdown horizontal rules
  stripped = stripped.replace(/^(?:---|\*\*\*|___)\s*$/gm, "");

  // Remove markdown list markers
  stripped = stripped.replace(/^[\*\-+]\s+/gm, "");
  stripped = stripped.replace(/^\d+\.\s+/gm, "");

  // Decode HTML entities
  stripped = stripped.replace(/&([^;]+);/g, (match, entity) => {
    const entities: { [key: string]: string } = {
      amp: "&",
      lt: "<",
      gt: ">",
      quot: '"',
      apos: "'",
      nbsp: " ",
    };
    return entities[entity] || match;
  });

  // Trim whitespace and remove extra newlines
  stripped = stripped.trim().replace(/\n{3,}/g, "\n\n");

  return stripped;
}
