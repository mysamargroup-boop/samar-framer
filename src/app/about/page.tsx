import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Camera, Heart, Lightbulb, Users } from "lucide-react";

export default function AboutPage() {
  const team = [
    { name: "Arjun Mehta", role: "Founder & Lead Photographer", image: PlaceHolderImages.find(i => i.id === "photographer-1")?.imageUrl },
    { name: "Sanya Gupta", role: "Creative Director", image: PlaceHolderImages.find(i => i.id === "team-director")?.imageUrl },
    { name: "Rahul Verma", role: "Cinematographer", image: PlaceHolderImages.find(i => i.id === "team-cinematographer")?.imageUrl },
  ];

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="pt-48 pb-24 px-6 text-center space-y-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover" style={{ backgroundImage: `url(${PlaceHolderImages.find(i => i.id === 'abstract-bg')?.imageUrl || ""})` }} />
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <span className="text-accent uppercase tracking-[0.4em] text-sm font-bold">Established 2012</span>
          <h1 className="text-6xl md:text-8xl font-headline tracking-tighter leading-tight">The Vision Behind The Frame</h1>
          <p className="text-muted-foreground text-xl font-body italic leading-relaxed">
            "We don't capture objects; we capture the space between the soul and the light."
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6 bg-card">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src={PlaceHolderImages.find(i => i.id === "studio-interior")?.imageUrl || ""}
              alt="Studio Interior"
              fill
              className="object-cover"
              data-ai-hint="luxury studio"
            />
          </div>
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-headline uppercase tracking-widest">Our Journey</h2>
              <div className="w-24 h-1 bg-primary" />
            </div>
            <div className="space-y-6 text-muted-foreground text-lg font-body leading-relaxed">
              <p>
                Eternal Frame began as a small passion project in a sun-drenched corner of South Mumbai. Our founder, Arjun Mehta, envisioned a studio where photography wasn't just a service, but a high-art form of preservation.
              </p>
              <p>
                Over the last decade, we have evolved into one of India's most sought-after luxury photography brands. Our signature style—dramatic, cinematic, and emotionally raw—has graced high-end weddings, international fashion magazines, and global brand campaigns.
              </p>
              <p>
                Today, our team consists of award-winning visual artists, editors, and technicians who share a singular obsession: perfection.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <h4 className="font-headline text-3xl text-primary">500+</h4>
                <p className="text-xs uppercase tracking-widest">Weddings Captured</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-headline text-3xl text-primary">24</h4>
                <p className="text-xs uppercase tracking-widest">Global Awards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Heart className="w-10 h-10 text-primary" />, title: "Emotion First", desc: "Technical skill is secondary to the feeling captured in the eyes." },
              { icon: <Lightbulb className="w-10 h-10 text-primary" />, title: "Innovation", desc: "Constantly experimenting with lighting, gear, and post-production." },
              { icon: <Users className="w-10 h-10 text-primary" />, title: "Bespoke Service", desc: "Every client is a unique muse. We tailor every aspect of our process." }
            ].map((v, i) => (
              <div key={i} className="space-y-6 p-10 bg-card rounded-3xl border border-border">
                {v.icon}
                <h3 className="text-2xl font-headline uppercase tracking-widest">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-headline">The Artists</h2>
            <p className="text-muted-foreground tracking-widest uppercase text-sm">Passionate hearts behind the lens</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, i) => (
              <div key={i} className="group space-y-6 text-center">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image
                    src={member.image || ""}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint="portrait"
                  />
                </div>
                <div>
                  <h3 className="font-headline text-2xl tracking-widest uppercase mb-1">{member.name}</h3>
                  <p className="text-primary text-sm uppercase tracking-[0.2em] font-bold">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
