import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import blogData from '@/lib/blog.json';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = blogData.posts.find(p => p.slug === params.slug);

    if (!post) {
        return { title: 'Post Not Found | Samar Framer' };
    }

    return {
        title: `${post.title} | Samar Framer Journal`,
        description: post.excerpt,
    };
}

// Generate static params so these pages can be built cleanly
export async function generateStaticParams() {
    return blogData.posts.map((post) => ({
        slug: post.slug,
    }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = blogData.posts.find(p => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    // Determine cover image based on imageHint
    const coverImage = post.imageHint.includes('wedding')
        ? PlaceHolderImages.find(i => i.id === 'portfolio-wedding-1')?.imageUrl
        : post.imageHint.includes('maternity')
            ? PlaceHolderImages.find(i => i.id === 'portfolio-maternity-1')?.imageUrl
            : post.imageHint.includes('fashion')
                ? PlaceHolderImages.find(i => i.id === 'portfolio-fashion-1')?.imageUrl
                : PlaceHolderImages.find(i => i.id === 'hero-1')?.imageUrl;

    return (
        <article className="bg-background min-h-screen pb-32">
            {/* Return Link */}
            <div className="fixed top-32 left-8 z-50 hidden xl:block">
                <Link
                    href="/blog"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-background/80 backdrop-blur-md border border-border hover:border-primary transition-all text-sm uppercase tracking-widest group"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Journal
                </Link>
            </div>

            {/* Hero Image */}
            <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
                <Image
                    src={coverImage || ""}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={post.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-24 text-left">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="inline-block bg-primary/20 backdrop-blur-md px-4 py-1 rounded-full border border-primary/40">
                            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-primary">{post.category}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline leading-tight capitalize">{post.title}</h1>
                        <div className="flex items-center gap-4 text-xs md:text-sm uppercase tracking-widest text-muted-foreground font-bold">
                            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            <div className="w-1 h-1 rounded-full bg-primary" />
                            <span>Words by {post.author}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
                <div className="prose prose-lg prose-neutral dark:prose-invert prose-headings:font-headline prose-p:font-body prose-p:leading-relaxed prose-p:text-muted-foreground prose-a:text-primary max-w-none">
                    <p className="text-2xl font-body italic text-foreground/90 border-l-4 border-primary pl-6 mb-12">
                        {post.excerpt}
                    </p>

                    <div className="whitespace-pre-wrap">
                        {post.content}
                    </div>
                </div>

                {/* Share/Footer */}
                <div className="mt-24 pt-12 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
                    <Link href="/blog" className="xl:hidden inline-flex items-center gap-2 text-sm uppercase tracking-widest font-bold hover:text-primary transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                        Back to Journal
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Share this story</span>
                        {/* Mock share buttons */}
                        <div className="flex gap-4">
                            {['Facebook', 'Twitter', 'Pinterest'].map((platform) => (
                                <button key={platform} className="text-sm font-body hover:text-primary transition-colors">
                                    {platform}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
