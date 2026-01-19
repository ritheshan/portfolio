import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { marked } from "marked";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { posts } from "./posts";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../lib/firebase";

const reactions = [
  { key: "hundred", emoji: "💯" },
  { key: "diamond", emoji: "💎" },
  { key: "target", emoji: "🎯" },
  { key: "mindblown", emoji: "🤯" },
  { key: "bolt", emoji: "⚡" },
  { key: "brain", emoji: "🧠" }
];

// Helper function to safely format dates
const formatDate = (dateValue) => {
  if (!dateValue) return 'Unknown date';
  
  try {
    // If it's already a Date object
    if (dateValue instanceof Date) {
      return dateValue.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    
    // If it's a string, parse it
    const dateStr = String(dateValue);
    // Handle YYYY-MM-DD format
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    
    // Fallback to regular parsing
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return String(dateValue);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return String(dateValue);
  }
};

export default function BlogPost() {
  const { slug } = useParams();
  const { theme } = useTheme();
  const post = posts[slug];

  const [views, setViews] = useState(0);
  const [reacts, setReacts] = useState({});
  const [userReacts, setUserReacts] = useState({});

  // Load user's reactions from localStorage
  useEffect(() => {
    if (!slug) return;
    const stored = localStorage.getItem(`blog-reactions-${slug}`);
    if (stored) {
      setUserReacts(JSON.parse(stored));
    }
  }, [slug]);

  // Track blog views and load reactions
  useEffect(() => {
    if (!slug) return;
    
    const ref = doc(db, "blogs", slug);

    const init = async () => {
      try {
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          await setDoc(ref, { views: 1, reactions: {} });
          setViews(1);
          setReacts({});
        } else {
          await updateDoc(ref, { views: increment(1) });
          const data = snap.data();
          setViews(data.views + 1);
          setReacts(data.reactions || {});
        }
      } catch (error) {
        console.error("Error tracking blog views:", error);
      }
    };

    init();
  }, [slug]);

  const react = async (key) => {
    // Check if user already reacted with this emoji
    if (userReacts[key]) {
      return; // Already reacted
    }

    try {
      const ref = doc(db, "blogs", slug);
      await updateDoc(ref, {
        [`reactions.${key}`]: increment(1)
      });

      // Update local state
      setReacts(r => ({ ...r, [key]: (r[key] || 0) + 1 }));
      
      // Save to localStorage
      const newUserReacts = { ...userReacts, [key]: true };
      setUserReacts(newUserReacts);
      localStorage.setItem(`blog-reactions-${slug}`, JSON.stringify(newUserReacts));
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link 
              to="/blog" 
              className={`inline-flex items-center px-6 py-3 bg-${theme.colors.primary}-600 text-white rounded-lg hover:bg-${theme.colors.primary}-700 transition-colors`}
            >
              Back to Blog
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  // Configure marked for better rendering
  marked.setOptions({
    breaks: true,
    gfm: true
  });

  const htmlContent = marked(post.default);

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link 
            to="/blog" 
            className={`inline-flex items-center text-${theme.colors.primary}-600 hover:text-${theme.colors.primary}-700 mb-8 transition-colors`}
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
            Back to Blog
          </Link>

          <article>
            <header className="mb-8 pb-8 border-b border-gray-200">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {post.frontmatter.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600">
                <time className="flex items-center">
                  <svg 
                    className="w-5 h-5 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                    />
                  </svg>
                  {formatDate(post.frontmatter.date)}
                </time>
                <span className="flex items-center gap-1">
                  👁️ {views}
                </span>
              </div>

              {/* Reactions - Compact inline style */}
              <div className="flex items-center gap-1 mt-4">
                {reactions.map(r => (
                  <motion.button
                    key={r.key}
                    onClick={() => react(r.key)}
                    disabled={userReacts[r.key]}
                    className={`flex items-center gap-0.5 px-2 py-1 rounded-full transition-colors text-sm ${
                      userReacts[r.key] 
                        ? 'bg-blue-100 border border-blue-300 cursor-default' 
                        : 'hover:bg-gray-100 cursor-pointer'
                    }`}
                    whileHover={!userReacts[r.key] ? { scale: 1.1 } : {}}
                    whileTap={!userReacts[r.key] ? { scale: 0.9 } : {}}
                    title={userReacts[r.key] ? 'You reacted' : `React with ${r.emoji}`}
                  >
                    <span>{r.emoji}</span>
                    {(reacts[r.key] || 0) > 0 && (
                      <span className="text-xs text-gray-600">{reacts[r.key]}</span>
                    )}
                  </motion.button>
                ))}
              </div>
              {post.frontmatter.description && (
                <p className="mt-4 text-xl text-gray-600 leading-relaxed">
                  {post.frontmatter.description}
                </p>
              )}
            </header>

            <div
              className="prose prose-lg max-w-none 
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900
                prose-ul:my-4 prose-li:text-gray-700
                prose-ol:my-4
                prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </article>

          {/* Navigation to other posts */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <Link 
              to="/blog" 
              className={`inline-flex items-center px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium`}
            >
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7" 
                />
              </svg>
              View All Posts
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
