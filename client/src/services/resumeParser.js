// For MVP: text copy-paste extraction
// Note: For PDF parsing, integrate PyPDF2 on backend instead

export const parseResumeText = (text) => {
  // Simple regex-based extraction from pasted text
  const extractEmail = () => {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const matches = text.match(emailRegex);
    return matches ? matches[0] : '';
  };

  const extractPhone = () => {
    const phoneRegex = /(\+?1?\d{9,15})/g;
    const matches = text.match(phoneRegex);
    return matches ? matches[0] : '';
  };

  const extractGitHub = () => {
    const gitHubRegex = /(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/i;
    const matches = text.match(gitHubRegex);
    return matches ? `https://github.com/${matches[1]}` : '';
  };

  const extractName = () => {
    // First non-empty line is often the name
    const lines = text.split('\n').filter((line) => line.trim());
    return lines.length > 0 ? lines[0].trim() : '';
  };

  const extractWorkplaceHistory = () => {
    // Look for company names and dates (simple heuristic)
    const workplaceRegex = /(?:^|\n)([A-Z][a-zA-Z\s&,.-]*)\s*(?:\d{4}|\d{1,2}\/\d{1,2})/gm;
    const matches = text.matchAll(workplaceRegex);
    return Array.from(matches).map((match) => ({
      company: match[1].trim(),
      title: '', // Would require more advanced parsing
      startDate: '',
      endDate: '',
    }));
  };

  const extractProjectHistory = () => {
    // Look for project-like entries
    const projectRegex = /(?:Project|Built|Created|Developed):\s*(.+?)(?:\n|$)/gi;
    const matches = text.matchAll(projectRegex);
    return Array.from(matches).map((match) => ({
      name: match[1].trim(),
      description: '',
      technologies: [],
    }));
  };

  return {
    name: extractName(),
    contact: {
      email: extractEmail(),
      phone: extractPhone(),
    },
    workplace_history: extractWorkplaceHistory(),
    project_history: extractProjectHistory(),
    github_link: extractGitHub(),
  };
};

