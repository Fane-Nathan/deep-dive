import { motion } from 'motion/react';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Accent = 'cyan' | 'violet' | 'emerald' | 'amber';

// Static class strings per accent so Tailwind's JIT can see them.
const ACCENTS: Record<Accent, {
  iconBox: string;
  badge: string;
  badgeDot: string;
  titleHover: string;
  cardHover: string;
  bar: string;
  bullet: string;
  overlay: string;
}> = {
  cyan: {
    iconBox: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    badge: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20',
    badgeDot: 'bg-cyan-400',
    titleHover: 'group-hover:text-cyan-300',
    cardHover: 'hover:border-cyan-500/50 hover:shadow-cyan-500/10',
    bar: 'from-cyan-500 via-sky-400 to-blue-500',
    bullet: 'text-cyan-400',
    overlay: 'from-cyan-500/5',
  },
  violet: {
    iconBox: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    badge: 'text-violet-300 bg-violet-500/10 border-violet-500/20',
    badgeDot: 'bg-violet-400',
    titleHover: 'group-hover:text-violet-300',
    cardHover: 'hover:border-violet-500/50 hover:shadow-violet-500/10',
    bar: 'from-violet-500 via-purple-400 to-fuchsia-500',
    bullet: 'text-violet-400',
    overlay: 'from-violet-500/5',
  },
  emerald: {
    iconBox: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    badge: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
    badgeDot: 'bg-emerald-400',
    titleHover: 'group-hover:text-emerald-300',
    cardHover: 'hover:border-emerald-500/50 hover:shadow-emerald-500/10',
    bar: 'from-emerald-500 via-teal-400 to-cyan-500',
    bullet: 'text-emerald-400',
    overlay: 'from-emerald-500/5',
  },
  amber: {
    iconBox: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    badge: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
    badgeDot: 'bg-amber-400',
    titleHover: 'group-hover:text-amber-300',
    cardHover: 'hover:border-amber-500/50 hover:shadow-amber-500/10',
    bar: 'from-amber-500 via-orange-400 to-rose-500',
    bullet: 'text-amber-400',
    overlay: 'from-amber-500/5',
  },
};

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  course?: string;
  delay?: number;
  githubUrl?: string;
  liveUrl?: string;
  accent?: Accent;
  icon?: LucideIcon;
  highlights?: string[];
  station?: number;
}

export function ProjectCard({
  title,
  description,
  tags,
  course,
  delay = 0,
  githubUrl,
  liveUrl,
  accent = 'cyan',
  icon: Icon,
  highlights = [],
  station,
}: ProjectCardProps) {
  const a = ACCENTS[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100, delay }}
      className={`group relative rounded-3xl bg-slate-900/40 border border-slate-700/50 pt-7 px-8 pb-5 flex flex-col h-full overflow-hidden backdrop-blur-xl shadow-lg transition-[border-color,background-color,box-shadow] duration-300 ${a.cardHover}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${a.overlay} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${a.bar} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

      {/* Station number watermark */}
      {station !== undefined && (
        <div className="absolute -bottom-8 -right-1 text-[130px] leading-none font-black font-mono text-white/[0.04] select-none pointer-events-none">
          {String(station).padStart(2, '0')}
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full">
        {/* Dive-log header strip */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3 min-w-0">
            {Icon && (
              <div className={`p-2.5 rounded-xl border shrink-0 ${a.iconBox}`}>
                <Icon className="w-5 h-5" />
              </div>
            )}
            {station !== undefined && (
              <div className="font-mono text-[10px] tracking-[0.25em] text-slate-500 uppercase leading-relaxed">
                Station {String(station).padStart(2, '0')}
                <br />
                Dive Log
              </div>
            )}
          </div>
          {course && (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border rounded-full shrink-0 ${a.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${a.badgeDot}`}></span>
              {course}
            </span>
          )}
        </div>

        <h3 className={`text-2xl font-bold text-slate-100 mb-3 transition-colors ${a.titleHover}`}>{title}</h3>
        <p className="text-slate-400 text-sm mb-5 leading-relaxed">{description}</p>

        {/* Concrete highlights fill the card body */}
        {highlights.length > 0 && (
          <ul className="space-y-2.5 mb-5 flex-grow">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-slate-300 leading-snug">
                <ChevronRight className={`w-4 h-4 mt-0.5 shrink-0 ${a.bullet}`} />
                {h}
              </li>
            ))}
          </ul>
        )}
        {highlights.length === 0 && <div className="flex-grow" />}

        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 text-[11px] font-medium tracking-wide text-slate-300 bg-slate-800/50 border border-slate-700 rounded-lg">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-5 pt-4 border-t border-slate-800/80">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group/link">
              <Github className="w-4 h-4 group-hover/link:text-cyan-400 transition-colors" /> Code
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group/link">
              <ExternalLink className="w-4 h-4 group-hover/link:text-pink-400 transition-colors" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
