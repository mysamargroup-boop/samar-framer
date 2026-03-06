import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import blogData from '@/lib/blog.json';

export const metadata: Metadata = {
    title: 'Journal | Samar Framer',
    description: 'Read stories, photography tips, and updates from the world of luxury wedding and fashion photography.',
};

export default function BlogPage() {
    const posts = blogData.posts;

    return (
        <div className="bg-background min-h-screen">
            {/* Header */}
            <section className="pt-48 pb-24 px-6 text-center space-y-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-cover mix-blend-screen" style={{ backgroundImage: `url(${PlaceHolderImages.find(i => i.id === 'abstract-bg')?.imageUrl || ""})` }} />
                <div className="relative z-10 max-w-4xl mx-auto space-y-6">
                    <span className="text-accent uppercase tracking-[0.4em] text-sm font-bold">The Journal</span>
                    <h1 className="text-6xl md:text-8xl font-headline tracking-tighter leading-tight">Stories <span className="italic text-primary">Untold</span></h1>
                    <p className="text-muted-foreground text-xl font-body italic leading-relaxed max-w-2xl mx-auto">
                        Insights, musings, and the creative process behind our most compelling photographic journeys.
                    </p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-24 px-6 relative z-10 bg-card/30">
                <div className="max-w-7xl mx-auto">
                    {posts.length === 0 ? (
                        <div className="text-center text-muted-foreground py-24">
                            <p className="font-body text-xl italic">No stories published yet. Please check back later.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {posts.map((post, i) => {
                                // Determine cover image based on imageHint (fallback to empty)
                                const mockImage = post.imageHint.includes('wedding')
                                    ? PlaceHolderImages.find(i => i.id === 'portfolio-wedding-1')?.imageUrl
                                    : post.imageHint.includes('maternity')
                                        ? PlaceHolderImages.find(i => i.id === 'portfolio-maternity-1')?.imageUrl
                                        : post.imageHint.includes('fashion')
                                            ? PlaceHolderImages.find(i => i.id === 'portfolio-fashion-1')?.imageUrl
                                            : PlaceHolderImages.find(i => i.id === 'hero-1')?.imageUrl;

                                return (
                                    <article key={post.id} className="group flex flex-col space-y-6">
                                        <Link href={`/blog/${post.slug}`} className="block relative aspect-[4/3] overflow-hidden rounded-2xl mb-4">
                                            <Image
                                                src={mockImage || ""}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                                data-ai-hint={post.imageHint}
                                            />
                                            <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-4 py-1 rounded-full border border-primary/20">
                                                <span className="text-[10px] uppercase font-bold tracking-widest text-primary">{post.category}</span>
                                            </div>
                                        </Link>

                                        <div className="flex-1 flex flex-col space-y-4">
                                            <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-muted-foreground">
                                                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                                <div className="w-1 h-1 rounded-full bg-primary" />
                                                <span>By {post.author}</span>
                                            </div>

                                            <Link href={`/blog/${post.slug}`} className="block group-hover:text-primary transition-colors">
                                                <h2 className="text-3xl font-headline leading-tight capitalize">{post.title}</h2>
                                            </Link>

                                            <p className="text-muted-foreground font-body leading-relaxed line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                        </div>

                                        <div className="pt-4">
                                            <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-4 text-sm font-bold uppercase tracking-[0.2em] text-foreground group-hover:text-primary transition-colors">
                                                Read Story
                                                <div className="w-8 h-px bg-foreground group-hover:bg-primary group-hover:w-12 transition-all duration-300" />
                                            </Link>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
