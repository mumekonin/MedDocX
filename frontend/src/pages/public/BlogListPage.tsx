import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, User } from "lucide-react";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/Footer";
import { useBlogPosts } from "../../hooks/useBlog";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const BlogListPage = () => {
  const { data: posts, isLoading, isError } = useBlogPosts();
  const [featured, ...rest] = posts ?? [];

  return (
    <div>
      <Navbar />
      <main className="pt-[72px] bg-[#0a0a0f] min-h-screen">
        <section className="px-6 py-16 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Expert <span className="text-indigo-400">Health Insights</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mt-4">
            Practical, doctor-informed articles to help you make better health decisions.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-24">
          {isLoading && (
            <p className="text-gray-500 text-sm text-center">Loading articles...</p>
          )}
          {isError && (
            <p className="text-red-400 text-sm text-center">
              Couldn't load articles right now. Please try again later.
            </p>
          )}
          {posts && posts.length === 0 && (
            <p className="text-gray-500 text-sm text-center">No articles published yet.</p>
          )}

          {/* Featured post - larger, distinct treatment */}
          {featured && (
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid md:grid-cols-2 gap-0 bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/40 transition-colors mb-6"
            >
              <div className="relative h-64 md:h-full overflow-hidden">
                <img
                  src={featured.coverImageUrl}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Latest Article
                </span>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-gray-500 text-xs mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {formatDate(featured.publishDate)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> {featured.author}
                  </span>
                </div>
                <h2 className="text-white font-bold text-2xl mb-3 leading-snug">
                  {featured.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">
                  {featured.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-indigo-400 text-sm font-semibold w-fit group-hover:gap-2.5 transition-all">
                  Read Full Article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          )}

          {/* Remaining posts grid */}
          {rest.length > 0 && (
            <div className="grid md:grid-cols-3 gap-6">
              {rest.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/40 transition-colors"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={post.coverImageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-[#0a0a0f]/90 text-white text-xs font-medium px-3 py-1 rounded-full">
                      {formatDate(post.publishDate)}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-white font-semibold mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-indigo-400 text-sm font-medium group-hover:gap-2.5 transition-all">
                      Read More <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogListPage;