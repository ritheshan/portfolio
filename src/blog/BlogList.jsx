import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { postList } from "./posts";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const reactionEmojis = ["💯", "💎", "🎯", "🤯", "⚡", "🧠"];
const reactionKeys = ["hundred", "diamond", "target", "mindblown", "bolt", "brain"];

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

// Helper to get sortable date
const getSortableDate = (dateValue) => {
  if (!dateValue) return 0;
  if (dateValue instanceof Date) return dateValue.getTime();
  const dateStr = String(dateValue);
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])).getTime();
  }
  const date = new Date(dateValue);
  return isNaN(date.getTime()) ? 0 : date.getTime();
};

export default function BlogList() {
  const { theme } = useTheme();
  const [blogStats, setBlogStats] = useState({});
  
  const allPosts = [...postList].sort((a, b) => getSortableDate(b.date) - getSortableDate(a.date));

  // Fetch views and reactions for all blogs
  useEffect(() => {
    const fetchStats = async () => {
      const stats = {};
      for (const post of postList) {
        try {
          const ref = doc(db, "blogs", post.slug);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            stats[post.slug] = snap.data();
          }
        } catch (error) {
          console.error("Error fetching blog stats:", error);
        }
      }
      setBlogStats(stats);
    };
    
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link 
            to="/" 
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
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blogs
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Thoughts, learnings, and updates from my journey.
          </p>
        </motion.div>

        <div className="space-y-6">
          {allPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="block group"
              >
                <article className={`p-6 md:p-8 rounded-2xl border border-gray-200 bg-white hover:border-${theme.colors.primary}-300 hover:shadow-lg transition-all duration-300`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h2 className={`text-xl md:text-2xl font-semibold text-gray-900 group-hover:text-${theme.colors.primary}-600 transition-colors`}>
                      {post.title}
                    </h2>
                    <time className="text-sm text-gray-500 mt-1 md:mt-0">
                      {formatDate(post.date)}
                    </time>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {post.description}
                  </p>
                  
                  {/* Views and Reactions - WhatsApp/LinkedIn style */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Views */}
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        👁️ {blogStats[post.slug]?.views || 0}
                      </span>
                      
                      {/* Compact Reactions - stacked emojis */}
                      {blogStats[post.slug]?.reactions && 
                        Object.values(blogStats[post.slug].reactions).some(v => v > 0) && (
                        <div className="flex items-center">
                          <div className="flex -space-x-1">
                            {reactionKeys.map((key, i) => {
                              const count = blogStats[post.slug]?.reactions?.[key] || 0;
                              if (count > 0) {
                                return (
                                  <span 
                                    key={key} 
                                    className="inline-flex items-center justify-center w-5 h-5 text-xs bg-gray-100 rounded-full border border-white"
                                    title={`${reactionEmojis[i]} ${count}`}
                                  >
                                    {reactionEmojis[i]}
                                  </span>
                                );
                              }
                              return null;
                            })}
                          </div>
                          <span className="ml-1.5 text-xs text-gray-500">
                            {Object.values(blogStats[post.slug]?.reactions || {}).reduce((a, b) => a + b, 0)}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className={`inline-flex items-center text-${theme.colors.primary}-600 font-medium group-hover:gap-2 transition-all`}>
                      Read more
                      <svg 
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5l7 7-7 7" 
                        />
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {allPosts.length === 0 && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 text-lg"
          >
            No posts yet. Check back soon!
          </motion.p>
        )}
      </div>
    </div>
  );
}
