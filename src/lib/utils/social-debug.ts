/**
 * Social Media Cache Debugging Utilities
 * Use these URLs to debug and clear cached metadata
 */

export const socialDebugUrls = {
  facebook: (url: string) => `https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(url)}`,
  twitter: (url: string) => `https://cards-dev.twitter.com/validator?url=${encodeURIComponent(url)}`,
  linkedin: (url: string) => `https://www.linkedin.com/post-inspector/inspect/${encodeURIComponent(url)}`,
};

/**
 * Generate social debug URLs for a given page
 */
export function generateSocialDebugUrls(pageUrl: string) {
  return {
    facebook: socialDebugUrls.facebook(pageUrl),
    twitter: socialDebugUrls.twitter(pageUrl),
    linkedin: socialDebugUrls.linkedin(pageUrl),
  };
}

/**
 * Check if metadata is properly set
 */
export function validateMetadata(metadata: {
  title?: string;
  description?: string;
  image?: string;
}) {
  const issues: string[] = [];
  
  if (!metadata.title || metadata.title.length < 10) {
    issues.push('Title is missing or too short (minimum 10 characters)');
  }
  
  if (metadata.title && metadata.title.length > 60) {
    issues.push('Title is too long (maximum 60 characters for optimal display)');
  }
  
  if (!metadata.description || metadata.description.length < 50) {
    issues.push('Description is missing or too short (minimum 50 characters)');
  }
  
  if (metadata.description && metadata.description.length > 160) {
    issues.push('Description is too long (maximum 160 characters for optimal display)');
  }
  
  if (!metadata.image) {
    issues.push('Open Graph image is missing');
  }
  
  return {
    isValid: issues.length === 0,
    issues,
  };
} 