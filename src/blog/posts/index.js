// Import all blog posts
import * as firstPost from './placement-journey.md';


export const posts = {
  'placement-journey': firstPost,
  
};

export const postList = Object.entries(posts).map(([slug, post]) => ({
  slug,
  ...post.frontmatter,
}));
