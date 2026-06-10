/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Canvas } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useTime } from 'motion/react';
import { Github, Linkedin, Mail, Gamepad2, MessageSquareText, BookOpenCheck } from 'lucide-react';
import ThreeDCard from './components/ThreeDCard';
import { Scene } from './components/Scene';
import { ProjectCard } from './components/ProjectCard';
import DepthMeter from './components/DepthMeter';
import BubbleLayer from './components/BubbleLayer';
import SoundToggle from './components/SoundToggle';
import IdleSubmarine from './components/IdleSubmarine';
import InteractiveCanvas from './components/InteractiveCanvas';
import { Hero, Academics, Experience, Persona, SurfaceInterval } from './sections';
import { getWaveTime } from './waveClock';
import Lenis from 'lenis';

function ProjectItem({ proj, currentZ, opacity, idx }: any) {
  const time = useTime();

  // Perfect mathematical wave translation from 3D R3F Canvas to CSS perspective.
  // `time` keeps the transform re-evaluating every frame; the actual phase
  // comes from the shared monotonic wave clock so cards stay in sync with
  // the 3D water and never freeze when scrolling up.
  const yBob = useTransform([time, currentZ], ([, cz]) => {
    const waveTime = getWaveTime();
    // Map visual Z to Scene coordinates
    const scaledZ = (cz as number) / 15;
    // Identical formula used in Scene.tsx (assuming x near center)
    const waveHeight = Math.sin(waveTime) * 0.35 + Math.cos(scaledZ * 0.04 + waveTime) * 0.35;
    // Reverse the wave sign change as requested so it aligns perfectly with the 3D wave bobs (up is up, down is down).
    const rawOffset = -waveHeight * 100;
    return rawOffset;
  });

  const xBob = useTransform([time, currentZ], ([, cz]) => {
    const waveTime = getWaveTime();
    const scaledZ = (cz as number) / 15;
    // Gentle sway linked to wave time and card depth
    const sway = Math.cos(waveTime * 0.8) * 0.2 + Math.sin(scaledZ * 0.03 + waveTime) * 0.15;
    const rawOffset = sway * 40;
    return rawOffset;
  });

  const pointerEvents = useTransform(currentZ, (z) => {
    const numericZ = z as number;
    return (numericZ > -300 && numericZ < 250) ? 'auto' : 'none';
  });

  return (
    <motion.div
      className="absolute w-full max-w-3xl px-6"
      style={{ translateZ: currentZ, opacity, pointerEvents }}
    >
      <motion.div style={{ y: yBob, x: xBob }} className="w-full h-[450px]">
        <ThreeDCard id={`dive-card-${idx}`} maxRotation={6} className="h-full">
          <ProjectCard {...proj} station={idx + 1} delay={0} />
        </ThreeDCard>
      </motion.div>
    </motion.div>
  );
}

function Projects3D({ onReturnToSurface }: { onReturnToSurface: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const zOffset = useTransform(scrollYProgress, [0, 1], [0, 2000]);

  const projects = [
    {
      title: "TMRL: RL² Transformer REDQ",
      description: "Enhanced the TrackMania RL baseline with an RL² architecture for rapid agent adaptation.",
      highlights: [
        'Transformer attention blocks in place of the MLP policy core',
        'REDQ ensemble critics for stable, sample-efficient updates',
        'RL² meta-learning so the agent adapts across unseen tracks',
      ],
      tags: ['Reinforcement Learning', 'PyTorch', 'Transformers', 'REDQ'],
      course: "MSc Research",
      githubUrl: "https://github.com/Fane-Nathan/tmrl/tree/feature/rl2-transformer-redq",
      accent: 'cyan' as const,
      icon: Gamepad2
    },
    {
      title: "Trust-Driven Summarization Model (TDSM)",
      description: "An NLP pipeline for text summarization built around trust and accuracy.",
      highlights: [
        'Trust-focused scoring keeps summaries faithful to the source',
        'Multiple execution modes: web interface and voice assistant',
      ],
      tags: ['NLP', 'Python', 'Machine Learning'],
      course: "NLP-Project",
      githubUrl: "https://github.com/Fane-Nathan/NLP-Project",
      accent: 'violet' as const,
      icon: MessageSquareText
    },
    {
      title: "AI Research Assistant",
      description: "A knowledge retrieval and analysis tool for streamlining academic research.",
      highlights: [
        'Semantic search over academic sources',
        'Multiple interfaces, including a live Streamlit demo',
      ],
      tags: ['NLP', 'Python', 'Information Retrieval', 'AI'],
      course: "Research Assistant",
      githubUrl: "https://github.com/Fane-Nathan/Research-Assistant",
      liveUrl: "https://research-assistant-docs.streamlit.app/",
      accent: 'emerald' as const,
      icon: BookOpenCheck
    }
  ];

  const endZ = useTransform(zOffset, (v) => -400 - (projects.length * 500) + v);
  const endOpacity = useTransform(endZ, [-500, -150, 150, 400], [0, 1, 1, 0]);
  const endPointerEvents = useTransform(endZ, (z) => {
    const numericZ = z as number;
    return (numericZ > -300 && numericZ < 200) ? 'auto' : 'none';
  });

  return (
    <div ref={sectionRef} id="dive-section" className="relative w-full h-[250vh]">
      <div 
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none"
        style={{ perspective: 1200 }}
      >
        <motion.div 
          style={{ 
            translateZ: useTransform(zOffset, (v) => -200 + v),
            opacity: useTransform(zOffset, [0, 250, 500], [1, 1, 0])
          }}
          className="absolute text-center mt-[-300px]"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 mb-6 border border-cyan-500/20 backdrop-blur-sm">
             <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping mr-3" />
             Depth: Shallow Twilight
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white drop-shadow-2xl shadow-black">Deep Dive Projects</h2>
          <p className="text-cyan-200/70 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed drop-shadow-md">Scroll deeper into the abyss to explore my work.</p>
        </motion.div>

        {projects.map((proj, idx) => {
          const initialZ = -400 - (idx * 500);
          const currentZ = useTransform(zOffset, (v) => initialZ + v);
          const opacity = useTransform(currentZ, [-250, -50, 200, 450], [0, 1, 1, 0]);
          return (
             <ProjectItem key={proj.title} proj={proj} currentZ={currentZ} opacity={opacity} idx={idx} />
          );
        })}
        
        <motion.div 
          style={{ 
            translateZ: endZ,
            opacity: endOpacity,
            pointerEvents: endPointerEvents
          }}
          className="absolute text-center mt-[100px]"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-500 drop-shadow-2xl">End of the Ocean</h2>

          {/* Message in a Bottle — contact CTA at max depth */}
          <div className="mx-auto mb-8 max-w-md rounded-3xl bg-slate-900/70 border border-cyan-500/20 backdrop-blur-md p-6 pointer-events-auto shadow-2xl shadow-cyan-950/40">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-500/80 mb-2">
              Message in a Bottle
            </div>
            <p className="text-slate-300 text-base mb-5 font-light">
              Found something interesting down here? Let&apos;s talk.
            </p>
            <div className="flex items-center justify-center gap-3">
              <a
                href="mailto:felnat.surjo@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/30 text-cyan-200 hover:text-white font-medium border border-cyan-500/30 transition-all"
              >
                <Mail className="w-4 h-4" />
                Email me
              </a>
              <a
                href="https://github.com/Fane-Nathan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/50 text-slate-300 hover:text-white transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/felix-nathaniel-s/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/50 text-slate-300 hover:text-white transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <p className="text-slate-600 text-lg mb-8">Ready to surface?</p>
          <button
             onClick={onReturnToSurface}
             className="px-8 py-3 rounded-xl bg-slate-800/80 hover:bg-cyan-900/50 text-cyan-300 font-medium transition-colors border border-slate-700/50 backdrop-blur-sm cursor-pointer pointer-events-auto"
          >
             Return to Surface
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth inertia curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  // Ascend by scrolling back through the page over several seconds, so the
  // camera retraces the dive (cards, twilight, surface) in reverse instead
  // of teleporting to the top.
  const returnToSurface = () => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 7,
        easing: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full text-slate-50 selection:bg-cyan-500/30 bg-[#082f49] relative">
      
      {/* 3D Canvas Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 1.5]}>
          <Scene />
        </Canvas>
      </div>

      {/* Depth telemetry HUD */}
      <DepthMeter />

      {/* Click bubbles */}
      <BubbleLayer />

      {/* Ambient ocean sound (off by default) */}
      <SoundToggle />

      {/* Idle easter egg */}
      <IdleSubmarine />

      {/* Normal Content Flow */}
      <div className="relative z-10 w-full flex flex-col pointer-events-none items-center pt-32">
          <div className="pointer-events-auto w-full flex flex-col items-center gap-24 pb-20">
             <Hero />
             <Academics />
             <Experience />
             <InteractiveCanvas />
             <Persona />
             <SurfaceInterval />
          </div>

          <div className="pointer-events-auto w-full">
             <Projects3D onReturnToSurface={returnToSurface} />
          </div>
      </div>
    </div>
  );
}

