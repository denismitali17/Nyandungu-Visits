export const renderTemplate = (templateContent, context) => {
  let renderedContent = templateContent;
  for (const [key, value] of Object.entries(context)) {
    const placeholder = new RegExp(`{{${key}}}`, "g"); // Matches all instances of {{key}}
    renderedContent = renderedContent.replace(placeholder, value);
  }
  return renderedContent;
};
