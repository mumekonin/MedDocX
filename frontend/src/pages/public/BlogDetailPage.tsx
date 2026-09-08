import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/Footer";
import { useBlogPostBySlug, useBlogPosts } from "../../hooks/useBlog";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const MotionLink = motion.create(Link);

const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError } = useBlogPostBySlug(slug ?? "");
  const { data: allPosts } = useBlogPosts();

  const relatedPosts = allPosts?.filter((p) => p.slug !== slug).slice(0, 3) ?? [];

  return (
    <div>
      <Navbar />
      <main className="pt-[72px] bg-[#0a0a0f] light:!bg-white min-h-screen">
        {isLoading && (
          <p className="text-gray-500 light:!text-gray-600 text-sm text-center py-24">Loading article...</p>
        )}
        {isError && (
          <p className="text-red-400 text-sm text-center py-24">
            Couldn't find that article. It may have been removed or unpublished.
          </p>
        )}

        {post && (
          <>
            <article className="px-6 pt-14 pb-16">
              <div className="max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-1.5 text-gray-400 light:!text-gray-600 hover:text-white light:hover:!text-gray-900 text-sm mb-8 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to all articles
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
                  className="flex items-center gap-4 text-gray-500 light:!text-gray-600 text-xs mb-5"
                >
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {formatDate(post.publishDate)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> {post.author}
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
                  className="text-3xl md:text-4xl font-bold text-white light:!text-gray-900 leading-tight mb-8"
                >
                  {post.title}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
                  className="rounded-2xl overflow-hidden mb-10"
                >
                  <img
                    src={post.coverImageUrl}
                    alt={post.title}
                    className="w-full h-64 md:h-96 object-cover"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
                  className="text-gray-300 light:!text-gray-600 leading-relaxed whitespace-pre-line text-[15px]"
                >
                  {post.content}
                </motion.div>
              </div>
            </article>

            {relatedPosts.length > 0 && (
              <section className="border-t border-white/10 light:!border-gray-200 px-6 py-16">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-white light:!text-gray-900 font-bold text-2xl mb-8 text-center">
                    More Articles
                  </h2>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid md:grid-cols-3 gap-6"
                  >
                    {relatedPosts.map((related) => (
                      <MotionLink
                        key={related.id}
                        to={`/blog/${related.slug}`}
                        variants={cardVariants}
                        whileHover={{ y: -8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="group bg-white/[0.03] light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-2xl overflow-hidden hover:border-indigo-500/40 transition-colors"
                      >
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={related.coverImageUrl}
                            alt={related.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="text-white light:!text-gray-900 font-semibold mb-2 line-clamp-2">
                            {related.title}
                          </h3>
                          <span className="inline-flex items-center gap-1.5 text-indigo-400 text-sm font-medium group-hover:gap-2.5 transition-all">
                            Read More <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </MotionLink>
                    ))}
                  </motion.div>
                </div>
              </section>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
