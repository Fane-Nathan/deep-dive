import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Mail, GraduationCap, Code2, Cpu, Globe, Database, BrainCircuit, Briefcase, FileText, Camera, ExternalLink, ChevronDown, Instagram } from 'lucide-react';
import { ProjectCard } from './components/ProjectCard';

// Inline certificate viewer: a glowing scanline appears at the centre, then
// splits — one edge sweeps up, one sweeps down — while a clip-path reveals
// the document between them.
const REVEAL = { delay: 0.25, duration: 0.7, ease: [0.25, 1, 0.5, 1] as const };

function CertificateReveal({ open, src, title }: { open: boolean; src: string; title: string }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key={src}
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ height: { duration: 0.4, ease: [0.25, 1, 0.5, 1] }, opacity: { duration: 0.25 } }}
          className="overflow-hidden"
        >
          <div className="relative mt-6">
            {/* Top reveal edge */}
            <motion.div
              initial={{ top: '50%', scaleX: 0, opacity: 1 }}
              animate={{ top: '0%', scaleX: 1, opacity: 0 }}
              transition={{
                top: REVEAL,
                scaleX: { duration: 0.25, ease: 'easeOut' },
                opacity: { delay: 1.0, duration: 0.35 },
              }}
              className="absolute left-0 right-0 h-[2px] z-10 pointer-events-none bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_14px_rgba(34,211,238,0.9)]"
            />
            {/* Bottom reveal edge */}
            <motion.div
              initial={{ top: '50%', scaleX: 0, opacity: 1 }}
              animate={{ top: '100%', scaleX: 1, opacity: 0 }}
              transition={{
                top: REVEAL,
                scaleX: { duration: 0.25, ease: 'easeOut' },
                opacity: { delay: 1.0, duration: 0.35 },
              }}
              className="absolute left-0 right-0 h-[2px] z-10 pointer-events-none bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_14px_rgba(34,211,238,0.9)]"
            />

            <motion.div
              initial={{ clipPath: 'inset(50% 0% 50% 0%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              exit={{ clipPath: 'inset(50% 0% 50% 0%)' }}
              transition={{ clipPath: REVEAL }}
              className="rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-950/70"
            >
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800/80 bg-slate-950/80">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">{title}</span>
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-300 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Full size
                </a>
              </div>
              <iframe src={`${src}#toolbar=0&navpanes=0`} title={title} className="w-full h-[420px] sm:h-[520px] bg-white" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Hero() {
  return (
    <div className="w-[calc(100%-3rem)] md:w-11/12 xl:w-full max-w-4xl bg-[#020513]/40 backdrop-blur-md p-6 sm:p-10 md:p-12 rounded-3xl border border-teal-500/20 shadow-2xl shadow-teal-500/10 text-slate-50 text-center flex flex-col items-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs sm:text-sm text-teal-300 font-medium tracking-wide w-fit mb-6">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
        </span>
        Computer Science Student @ BINUS University
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-md mb-8">
        Felix Nathaniel Surjodinoto
      </h2>

      <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 sm:mb-8 leading-[1.1]">
        Architecting <br />
        <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Intelligent Systems
        </span>
      </h1>

      <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 sm:mb-10 max-w-2xl font-light leading-relaxed">
        Specializing in Artificial Intelligence and Machine Learning. Turning complex algorithms into intelligent, scalable, and seamless solutions.
      </p>

      <div className="flex gap-4">
        <div className="flex gap-2">
          <a href="https://github.com/Fane-Nathan" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-slate-800/50 hover:bg-slate-700/80 border border-slate-700/50 text-slate-300 hover:text-white transition-all shadow-lg">
            <Github className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/felix-nathaniel-s/" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-slate-800/50 hover:bg-slate-700/80 border border-slate-700/50 text-slate-300 hover:text-white transition-all shadow-lg">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="mailto:felnat.surjo@gmail.com" className="p-4 rounded-full bg-slate-800/50 hover:bg-slate-700/80 border border-slate-700/50 text-slate-300 hover:text-white transition-all shadow-lg">
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
}

const SKILLS = [
  {
    icon: BrainCircuit,
    title: 'Machine Learning',
    desc: 'PyTorch, Scikit-Learn, Pandas',
    details: [
      'PyTorch pipelines behind my TMRL RL² research',
      'Scikit-Learn for classical models and baselines',
      'Pandas for dataset curation and analysis',
    ],
  },
  {
    icon: Cpu,
    title: 'AI & Data',
    desc: 'Python, TensorFlow, Deep Learning',
    details: [
      'Fine-tuned Gemma 3 (7B) during my FlexyPack internship',
      'NLP pipelines: TDSM and the AI Research Assistant',
      'Deep learning coursework on the BINUS AI track',
    ],
  },
  {
    icon: Globe,
    title: 'Cloud & DevOps',
    desc: 'AWS, Docker, CI/CD pipelines',
    details: [
      'Dockerized deployments for personal projects',
      'CI/CD pipelines for automated build and test',
      'Core AWS services from coursework and projects',
    ],
  },
  {
    icon: Database,
    title: 'Systems & DB',
    desc: 'PostgreSQL, MongoDB, SQL',
    details: [
      'Relational design and SQL from database coursework',
      'MongoDB document stores for project backends',
    ],
  },
];

function SkillCard({ icon: Icon, title, desc, details }: (typeof SKILLS)[number]) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen(v => !v)}
      className="text-left w-full p-8 rounded-3xl bg-[#020513]/40 backdrop-blur-xl border border-blue-500/20 hover:border-blue-500/50 transition-all hover:-translate-y-1 shadow-xl group cursor-pointer"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="p-3 bg-blue-500/10 w-fit rounded-xl group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
          <Icon className="w-8 h-8 text-blue-400" />
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="p-1.5 rounded-full text-slate-500 group-hover:text-blue-300 transition-colors"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400">{desc}</p>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <ul className="mt-5 pt-4 border-t border-blue-500/20 space-y-2.5">
              {details.map((d) => (
                <li key={d} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                  <span className="text-blue-400 mt-0.5">▹</span>
                  {d}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

const ACADEMIC_DOCS = {
  transcript: { src: '/academic-transcript.pdf', title: 'Academic Transcript' },
  ielts: { src: '/ielts-certificate.pdf', title: 'IELTS Certificate (6.5)' },
} as const;

export function Academics() {
  const [openDoc, setOpenDoc] = useState<keyof typeof ACADEMIC_DOCS | null>(null);

  return (
    <div className="w-[calc(100%-3rem)] md:w-11/12 xl:w-full max-w-6xl flex flex-col lg:flex-row gap-8 lg:gap-16 text-slate-50">
      <div className="lg:w-1/2 bg-[#020513]/40 backdrop-blur-xl p-6 sm:p-10 rounded-3xl border border-blue-500/20 shadow-2xl shadow-blue-900/20">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-teal-500/20 border border-blue-500/30 text-blue-300 shadow-inner">
            <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Academic Profile</h2>
        </div>
        <p className="text-slate-300 mb-8 leading-relaxed text-base sm:text-lg font-light">
          Currently pursuing a Bachelor's Degree in Computer Science at BINUS University.
          My coursework focuses heavily on Artificial Intelligence, Machine Learning, and building scalable cloud infrastructures.
        </p>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
          <div className="p-4 sm:p-6 rounded-2xl bg-[#020513]/60 border border-blue-500/30 shadow-lg relative overflow-hidden group flex flex-col justify-between min-h-[110px] sm:min-h-[130px]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-blue-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2">Current GPA</div>
            <div className="text-2xl sm:text-4xl font-black text-white tracking-tight">3.54<span className="text-slate-500 text-base sm:text-xl font-medium">/4.00</span></div>
          </div>
          <div className="p-4 sm:p-6 rounded-2xl bg-[#020513]/60 border border-teal-500/30 shadow-lg relative overflow-hidden group flex flex-col justify-between min-h-[110px] sm:min-h-[130px]">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-teal-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2">Focus Track</div>
            <div className="text-lg sm:text-2xl font-bold text-white leading-tight">Artificial Intelligence</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <button
            onClick={() => setOpenDoc(openDoc === 'transcript' ? null : 'transcript')}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl font-medium transition-all border text-xs sm:text-sm shadow-lg text-center cursor-pointer ${openDoc === 'transcript'
                ? 'bg-blue-500/30 text-white border-blue-400/60'
                : 'bg-blue-500/10 text-blue-200 hover:bg-blue-500/20 hover:text-white border-blue-500/30'
              }`}
          >
            <FileText className="w-4 h-4 shrink-0" /> Academic Transcript
          </button>
          <button
            onClick={() => setOpenDoc(openDoc === 'ielts' ? null : 'ielts')}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl font-medium transition-all border text-xs sm:text-sm shadow-lg text-center cursor-pointer ${openDoc === 'ielts'
                ? 'bg-teal-500/30 text-white border-teal-400/60'
                : 'bg-teal-500/10 text-teal-200 hover:bg-teal-500/20 hover:text-white border-teal-500/30'
              }`}
          >
            <FileText className="w-4 h-4 shrink-0" /> IELTS Certificate (6.5)
          </button>
        </div>

        <CertificateReveal open={openDoc === 'transcript'} {...ACADEMIC_DOCS.transcript} />
        <CertificateReveal open={openDoc === 'ielts'} {...ACADEMIC_DOCS.ielts} />

      </div>

      <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 content-start items-start">
        {SKILLS.map((skill) => (
          <SkillCard key={skill.title} {...skill} />
        ))}
      </div>
    </div>
  );
}

export function Experience() {
  const [showCert, setShowCert] = useState(false);

  return (
    <div className="w-[calc(100%-3rem)] md:w-11/12 xl:w-full max-w-4xl text-slate-50">
      <div className="mb-8 sm:mb-12 text-center">
        <div className="inline-flex items-center justify-center p-3 sm:p-4 rounded-3xl bg-cyan-500/10 text-cyan-400 mb-4 sm:mb-6 border border-cyan-500/20 backdrop-blur-lg shadow-xl">
          <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 sm:mb-6">Industry Experience</h2>
        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto font-light">Real-world applications of my academic knowledge, focusing on delivering scalable, intelligent solutions.</p>
      </div>

      <div className="relative max-w-4xl mx-auto rounded-[2.5rem] overflow-hidden bg-[#020513]/50 backdrop-blur-2xl border border-cyan-500/30 p-6 sm:p-10 shadow-2xl group hover:border-cyan-500/50 transition-all">
        <div className="absolute top-0 right-0 -mt-24 -mr-24 w-80 h-80 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-cyan-500/30 transition-colors" />

        <div className="flex flex-col md:flex-row justify-between mb-8 relative z-10 gap-6">
          <div>
            <h3 className="text-3xl font-bold text-white mb-3">Data Engineer Intern</h3>
            <div className="text-cyan-400 font-semibold text-lg flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              PT Kemas Surya Teknovasi (FlexyPack)
            </div>
          </div>
          <div className="text-cyan-300 font-mono text-sm self-start whitespace-nowrap px-5 py-2.5 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 shadow-inner">
            Jul 2025 – Sep 2025
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-slate-300 text-lg leading-relaxed mb-8 font-light">
            During my internship at FlexyPack, I took end-to-end ownership of an AI-driven customer service initiative. Drawing from my academic foundation in deep learning and NLP, I spearheaded the fine-tuning of the <strong className="text-cyan-400 font-semibold">Gemma 3 (7B)</strong> language model to accurately process and respond to specialized customer inquiries. This involved curating industry-specific datasets, optimizing inference pipelines, and ensuring the model maintained high fidelity and contextual relevance when deployed in real-world, client-facing scenarios.
          </p>

          <button
            onClick={() => setShowCert(v => !v)}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-cyan-500/20 text-white font-medium hover:bg-cyan-500/30 hover:-translate-y-1 transition-all border border-cyan-500/40 shadow-xl cursor-pointer"
          >
            <FileText className="w-5 h-5 text-cyan-300" />
            {showCert ? 'Hide Certificate' : 'View Certificate'}
          </button>

          <CertificateReveal
            open={showCert}
            src="/internship-certificate.pdf"
            title="Internship Certificate — FlexyPack"
          />
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <div className="w-[1200px] text-slate-50">
      <div className="mb-16 text-center flex flex-col items-center">
        <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-blue-500/20 text-blue-300 mb-6 border border-blue-500/30 backdrop-blur-lg shadow-xl shadow-blue-500/10">
          <Code2 className="w-10 h-10" />
        </div>
        <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-white">Featured Projects</h2>
        <p className="text-blue-200/70 text-xl max-w-2xl mx-auto leading-relaxed font-light">A selection of my best academic works and personal projects, demonstrating my ability to build comprehensive, data-driven applications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ProjectCard
          title="TMRL: RL² Transformer REDQ"
          description="Enhanced the TrackMania RL baseline with an RL² architecture, integrating Transformer attention blocks and Randomized Ensembled Double Q-Learning (REDQ) for rapid agent adaptation."
          tags={['Reinforcement Learning', 'PyTorch', 'Transformers', 'REDQ']}
          course="MSc Research"
          delay={0}
          githubUrl="https://github.com/Fane-Nathan/tmrl/tree/feature/rl2-transformer-redq"
        />
        <ProjectCard
          title="Trust-Driven Summarization Model (TDSM)"
          description="Developed an NLP pipeline for text summarization with a focus on trust and accuracy. Features multiple execution modes including a web interface and voice assistant."
          tags={['NLP', 'Python', 'Machine Learning']}
          course="NLP-Project"
          delay={0}
          githubUrl="https://github.com/Fane-Nathan/NLP-Project"
        />
        <ProjectCard
          title="AI Research Assistant"
          description="Built an intelligent knowledge retrieval and analysis tool using modern NLP techniques. Features semantic search capabilities with multiple interfaces to streamline academic research."
          tags={['NLP', 'Python', 'Information Retrieval', 'AI']}
          course="Research Assistant"
          delay={0}
          githubUrl="https://github.com/Fane-Nathan/Research-Assistant"
          liveUrl="https://research-assistant-docs.streamlit.app/"
        />
      </div>
    </div>
  );
}

export function Persona() {
  return (
    <div className="w-[calc(100%-3rem)] md:w-11/12 xl:w-full max-w-[1006px] text-slate-50">
      <div className="relative rounded-[3rem] overflow-hidden bg-[#020513]/60 backdrop-blur-3xl border border-indigo-500/30 px-6 sm:px-10 md:px-16 pt-[55px] pb-[55px] shadow-2xl">
        <div className="absolute top-0 right-0 -mt-32 -mr-32 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-32 -ml-32 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-bold mb-6 sm:mb-8 tracking-widest uppercase text-[10px] sm:text-xs shadow-inner">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
            Personal Ethos
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 sm:mb-10 text-white tracking-tight">The Perpetual Learner</h2>
          <p className="text-indigo-100/80 text-lg sm:text-xl md:text-2xl mb-8 sm:mb-16 leading-relaxed font-light">
            I identify as a first-principles thinker who retains an insatiable curiosity for how technology functions beneath the surface. My goal isn't merely to achieve grades, but to deeply master the mathematical frameworks and architectural foundations that power modern Artificial Intelligence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left text-slate-300">
            <div className="p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/30 flex items-center justify-center mb-6 text-indigo-200">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div className="font-bold text-white text-xl mb-4">Driven by Complexity</div>
              <p className="leading-relaxed font-light">Tackling conceptually difficult challenges like RL agents and NLP pipelines demands rigorous understanding of intelligent systems.</p>
            </div>
            <div className="p-8 rounded-3xl bg-blue-500/5 border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/30 flex items-center justify-center mb-6 text-blue-200">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="font-bold text-white text-xl mb-4">Pragmatic Execution</div>
              <p className="leading-relaxed font-light">Balancing research with hands-on infrastructure. Delivering value means building resilient, clean, end-to-end solutions.</p>
            </div>
            <div className="p-8 rounded-3xl bg-teal-500/5 border border-teal-500/20 hover:bg-teal-500/20 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/30 flex items-center justify-center mb-6 text-teal-200">
                <Globe className="w-6 h-6" />
              </div>
              <div className="font-bold text-white text-xl mb-4">Adaptability Over Ego</div>
              <p className="leading-relaxed font-light">Navigating new environments and shifting tech stacks requires agility. Every failure is a stepping stone to mastery.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Drop your real shots into public/photos/ with these filenames (and update
// the captions) — until a file exists, the frame renders as a placeholder.
const SHOTS = [
  { src: '/photos/photo-1.jpg', caption: 'Seaside promenade', tilt: 'md:-rotate-2' },
  { src: '/photos/photo-2.jpg', caption: 'Breakwater at dusk', tilt: 'md:rotate-1' },
  { src: '/photos/photo-3.jpg', caption: 'Pagoda above the treeline', tilt: 'md:-rotate-1' },
];

function PhotoFrame({ src, caption, tilt }: { src: string; caption: string; tilt: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <motion.div
      whileHover={{ rotate: 0, scale: 1.03, y: -8 }}
      className={`${tilt} rounded-2xl bg-slate-900/70 border border-slate-700/60 p-3 pb-4 shadow-2xl backdrop-blur-md transition-shadow hover:shadow-cyan-900/30`}
    >
      <div className="aspect-[4/5] rounded-xl overflow-hidden bg-slate-950/80 relative">
        {failed ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-700/70 rounded-xl text-slate-600">
            <Camera className="w-8 h-8" />
            <span className="text-[10px] font-mono px-4 text-center leading-relaxed">
              add {src.replace('/photos/', 'public/photos/')}
            </span>
          </div>
        ) : (
          <img
            src={src}
            alt={caption}
            loading="lazy"
            onError={() => setFailed(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>
      <div className="mt-3 px-1 text-sm text-slate-400 font-light text-center">{caption}</div>
    </motion.div>
  );
}

export function SurfaceInterval() {
  return (
    <div className="w-[calc(100%-3rem)] md:w-11/12 xl:w-full max-w-5xl text-slate-50">
      <div className="mb-10 sm:mb-14 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 font-bold mb-6 tracking-widest uppercase text-[10px] sm:text-xs">
          <Camera className="w-3.5 h-3.5" />
          Surface Interval
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 sm:mb-6">Between Dives, I Shoot</h2>
        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          Photography is how I practice seeing composition, light, and patience.<br></br>
          Different medium, same obsession with getting the details right.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
        {SHOTS.map((shot) => (
          <PhotoFrame key={shot.src} {...shot} />
        ))}
      </div>

      <div className="mt-10 sm:mt-12 text-center">
        <a
          href="https://www.instagram.com/felio.nathan/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500/15 via-rose-500/10 to-amber-500/15 border border-pink-500/30 text-pink-200 hover:text-white hover:border-pink-400/60 hover:-translate-y-0.5 transition-all font-medium shadow-lg"
        >
          <Instagram className="w-5 h-5" />
          More shots on Instagram
          <span className="font-mono text-xs text-pink-300/80">@felio.nathan</span>
        </a>
      </div>
    </div>
  );
}
