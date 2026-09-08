import { Link } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useBlogPosts } from "../../hooks/useBlog";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const MotionLink = motion.create(Link);

const BlogPreview = () => {
  const { data: posts, isLoading, isError } = useBlogPosts();
  const featuredPosts = posts?.slice(0, 3) ?? [];

  return (
    <section id="blog" className="bg-[#0a0a0f] light:!bg-white px-6 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 bg-white/5 light:!bg-gray-100 border border-white/10 light:!border-gray-200 text-indigo-400 text-xs font-semibold uppercase tracking-wide px-4 py-1.5 rounded-full mb-5"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
          Health Insights
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold leading-tight"
        >
          <span className="text-white light:!text-gray-900">Expert Insights</span>
          <br />
          <span className="text-white light:!text-gray-900">for </span>
          <span className="text-indigo-400">Better Health</span>
        </motion.h2>

        {isLoading && <p className="text-gray-500 light:!text-gray-600 text-sm mt-12">Loading articles...</p>}
        {isError && (
          <p className="text-red-400 text-sm mt-12">Couldn't load articles right now.</p>
        )}

        {featuredPosts.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mt-12 text-left"
          >
            {featuredPosts.map((post) => (
              <MotionLink
                key={post.id}
                to={`/blog/${post.slug}`}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white/[0.03] light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-2xl overflow-hidden hover:border-indigo-500/40 transition-colors group"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={post.coverImageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-[#0a0a0f]/90 light:!bg-white/90 light:!text-gray-900 text-white text-xs font-medium px-3 py-1 rounded-full">
                    {formatDate(post.publishDate)}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-white light:!text-gray-900 font-semibold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-400 light:!text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-indigo-400 text-sm font-medium group-hover:gap-2.5 transition-all">
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </MotionLink>
            ))}
          </motion.div>
        )}

        {posts && posts.length === 0 && (
          <p className="text-gray-500 light:!text-gray-600 text-sm mt-12">No articles published yet.</p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-12"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }} className="inline-flex">
          <Link
            to="/blog"
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold pl-6 pr-2 py-2 rounded-full transition-colors shadow-md shadow-blue-600/20"
          >
            View More Blog
            <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPreview;
