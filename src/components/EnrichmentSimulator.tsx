import React, { useState } from 'react';
import { Briefcase, FlaskConical, Rocket, Users, Globe, ExternalLink, Zap, ChevronRight, Sparkles } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
  colorClass: string;
  accentColor: string;
  partners: string[];
  skillsGained: string[];
  responsibilities: string[];
  timeline: { semester: string; milestone: string; detail: string }[];
}

const TRACKS_DATA: Track[] = [
  {
    id: 'internship',
    title: 'Industry Internship',
    subtitle: 'Track Professional Standard',
    description: 'Immerse in national and multinational technology companies. Deliver core production software alongside principal engineers.',
    duration: '12 Months (2 Semesters)',
    icon: <Briefcase className="w-5 h-5" />,
    colorClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    accentColor: '#10b981',
    partners: ['GoTo (Gojek Tokopedia)', 'Bank Central Asia (BCA)', 'Traveloka', 'Shopee Jakarta', 'Blibli'],
    skillsGained: ['Production Grade CI/CD', 'Agile Scrum Dynamics', 'Distributed Microservices', 'Enterprise Testing'],
    responsibilities: [
      'Refactored transaction queues reducing thread deadlock overhead by 14%',
      'Integrated payment gateway API endpoints with bulletproof error boundaries',
      'Configured Grafana monitoring dashboards with custom server alerts'
    ],
    timeline: [
      { semester: 'Semester 6', milestone: 'Core Matching Board', detail: 'Pass industrial coding screens with partner firms.' },
      { semester: 'Semester 7', milestone: 'Phase I Dev Intern', detail: 'Deployed to product teams, shipping baseline patches daily.' },
      { semester: 'Semester 8', milestone: 'Phase II Tech Owner', detail: 'Owned feature cycles, transitioning to full structural codebases.' }
    ]
  },
  {
    id: 'research',
    title: 'Academic Research',
    subtitle: 'Track Innovation & Deep Tech',
    description: 'Collaborate with BINUS AI R&D labs. Work on publications targeting IEEE or Scopus-indexed computer science journals.',
    duration: '12 Months (2 Semesters)',
    icon: <FlaskConical className="w-5 h-5" />,
    colorClass: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    accentColor: '#06b6d4',
    partners: ['BINUS AI Research Group', 'BRIN Indonesia', 'Nvidia Academic AI Labs', 'IEEE Indonesia Section'],
    skillsGained: ['Deep Learning PyTorch', 'Statistical R-programming', 'Paper Drafting', 'Model Performance Benchmarking'],
    responsibilities: [
      'Trained deep convolution generative models for regional Batik pixel-reconstruction',
      'Authored academic paper regarding zero-shot CNN performance thresholds',
      'Collaborated on local dataset label cleansing pipelines using cloud VM clusters'
    ],
    timeline: [
      { semester: 'Semester 6', milestone: 'Hypothesis Formulation', detail: 'Present research synopsis to BINUS Computer Science Faculty head.' },
      { semester: 'Semester 7', milestone: 'Dataset & Training', detail: 'Assemble specialized visual tensors, kicking off long training runs.' },
      { semester: 'Semester 8', milestone: 'Paper Draft & Submission', detail: 'Compile LaTeX chapters and submit for rigorous peer reviews.' }
    ]
  },
  {
    id: 'entrepreneur',
    title: 'Tech Entrepreneurship',
    subtitle: 'Track Startup Incubator',
    description: 'Incubate a robust tech business under BINUS Start-up Incubator. Transform software frameworks into viable commercial products.',
    duration: '12 Months (2 Semesters)',
    icon: <Rocket className="w-5 h-5" />,
    colorClass: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    accentColor: '#f59e0b',
    partners: ['BINUS Start-up Incubator', 'East Ventures Network', 'Kemenparekraf Hub', 'Indigo Sandbox'],
    skillsGained: ['Product-Market Validation', 'SaaS Unit Economics', 'MVP Rapid Prototyping', 'Venture Pitch Preparation'],
    responsibilities: [
      'Architected cross-platform React Native MVP for digital asset trading',
      'Drafted microservice scaling cost models for AWS serverless workloads',
      'Presented functional prototypes to angel accelerators in private pitch sessions'
    ],
    timeline: [
      { semester: 'Semester 6', milestone: 'Incubator Pitch', detail: 'Draft pitch deck and secure initial incubator storage allocation.' },
      { semester: 'Semester 7', milestone: 'MVP Alpha Deployment', detail: 'Release working app, onboarding 150+ local alpha-stage testers.' },
      { semester: 'Semester 8', milestone: 'Pitch & Raise Seed', detail: 'Calculate unit-economic models and present to VC panels.' }
    ]
  },
  {
    id: 'commdev',
    title: 'Community Development',
    subtitle: 'Track Social Impact',
    description: 'Code bespoke digital infrastructure for Indonesian clinics, rural cooperatives, and NGOs adhering to UN SDG metrics.',
    duration: '12 Months (2 Semesters)',
    icon: <Users className="w-5 h-5" />,
    colorClass: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    accentColor: '#f43f5e',
    partners: ['Teach For Indonesia (TFI)', 'Indonesian Red Cross', 'KitaBisa Tech Panel', 'Local Co-ops Network'],
    skillsGained: ['Human Centered UX Design', 'Offline-First Storage', 'Localized DB Arch', 'Low-Bandwidth Mobile Networks'],
    responsibilities: [
      'Built progressive cloud-syncing clinic inventory system with SQLite cache',
      'Refactored legacy web forms into offline-first PWA assets',
      'Conducted onsite field training workshops for community operators'
    ],
    timeline: [
      { semester: 'Semester 6', milestone: 'Field Research Tripping', detail: 'Analyze local tech gaps first-hand with community leads.' },
      { semester: 'Semester 7', milestone: 'Platform Architecture', detail: 'Ship fully localizable web portals with low-latency layouts.' },
      { semester: 'Semester 8', milestone: 'Handoff & Transition', detail: 'Open-source the code, training local coordinators for self-hosting.' }
    ]
  },
  {
    id: 'studyabroad',
    title: 'Study Abroad Program',
    subtitle: 'Track Global Exchange',
    description: 'Immerse in partner universities globally. Study specialized systems design, cybersecurity, or advanced cryptography.',
    duration: '12 Months (2 Semesters)',
    icon: <Globe className="w-5 h-5 text-sky-400" />,
    colorClass: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    accentColor: '#0ea5e9',
    partners: ['Australian National University', 'Boston University', 'Coventry University UK', 'UT Dallas', 'Seoul National University'],
    skillsGained: ['Cross-Cultural Engineering', 'Global Tech Standards', 'Advanced Cryptography Studies', 'Operating Systems internals'],
    responsibilities: [
      'Finished exchange courses in distributed database design and kernel modules',
      'Represented BINUS at host university AI Hackathons, winning top code awards',
      'Drafted comparison journals tracking cloud latency differences across nodes'
    ],
    timeline: [
      { semester: 'Semester 6', milestone: 'IELTS & Matching Suite', detail: 'Exceed score benchmarks and match with your chosen Ivy league.' },
      { semester: 'Semester 7', milestone: 'Global Tech Seminar', detail: 'Arrive at destination campus, taking advanced computer architecture.' },
      { semester: 'Semester 8', milestone: 'Integration Thesis', detail: 'Conduct joint research papers supervised by dual international professors.' }
    ]
  }
];

export default function EnrichmentSimulator() {
  const [activeTrackId, setActiveTrackId] = useState<string>('internship');
  const activeTrack = TRACKS_DATA.find(t => t.id === activeTrackId) || TRACKS_DATA[0];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 flex flex-col gap-8">
      
      {/* Title block */}
      <div className="text-center md:text-left">
        <div id="enrichment-badge" className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-mono rounded-full mb-3 uppercase tracking-widest">
          <Zap className="w-3.5 h-3.5 animate-pulse" />
          BINUSIAN 3+1 Enrichment Program
        </div>
        <h2 id="enrichment-title" className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Select Your Interactive Pathway
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
          At BINUS, we bridge theory and reality. Explore the student&apos;s interactive simulation of each enrichment path, detailing real hands-on contributions, timelines, and partnering giants.
        </p>
      </div>

      {/* Grid containing navigation track cards and viewport details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Track Selector Panel (Left: 5 columns) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {TRACKS_DATA.map((track) => {
            const isSelected = track.id === activeTrackId;
            return (
              <button
                key={track.id}
                id={`track-btn-${track.id}`}
                onClick={() => setActiveTrackId(track.id)}
                className={`w-full group text-left p-4 rounded-2xl transition-all duration-300 border flex items-center gap-4 cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-slate-900 border-amber-500/50 shadow-lg shadow-amber-500/5'
                    : 'bg-slate-950/40 border-slate-900 hover:border-slate-800 hover:bg-slate-905/60'
                }`}
              >
                {/* Lateral highlighters */}
                {isSelected && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l"
                    style={{ backgroundColor: track.accentColor }}
                  />
                )}

                <div className={`p-3 rounded-xl shrink-0 transition-all ${
                  isSelected ? track.colorClass : 'bg-slate-900/50 text-slate-500 border border-slate-900'
                }`}>
                  {track.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-500 block">
                      {track.subtitle}
                    </span>
                    {isSelected && <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
                  </div>
                  <h4 className={`font-bold tracking-wide mt-0.5 truncate ${isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                    {track.title}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Holographic Simulator Workspace (Right: 8 columns) */}
        <div id="enrichment-workspace-viewport" className="lg:col-span-8 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          
          {/* Subtle grid mesh overlay in BG */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />

          {/* Core summary telemetry row */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-6">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                  DEPLOYMENT STRATEGY
                </span>
                <h3 id="workspace-track-title" className="text-2xl font-bold text-white mt-1">
                  {activeTrack.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono font-bold text-amber-500 bg-amber-950/20 border border-amber-500/20 px-3 py-1.5 rounded-xl w-max">
                {activeTrack.duration}
              </div>
            </div>

            {/* Description quote and Partner list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              
              <div>
                <h5 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2.5">
                  Scope Concept
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-950/40 border border-slate-900 p-4 rounded-2xl">
                  &quot;{activeTrack.description}&quot;
                </p>
                
                <h5 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-4 mb-2">
                  Acquired Core Specs
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {activeTrack.skillsGained.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 text-[10px] font-mono rounded bg-slate-950 border border-slate-850 text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Partners Hub & Key Contributions */}
              <div className="flex flex-col justify-between">
                <div>
                  <h5 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2.5">
                    Official Sourcing Partners
                  </h5>
                  <div className="space-y-1.5">
                    {activeTrack.partners.map((partner, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-xs text-slate-300 hover:text-white font-mono bg-slate-950/60 hover:bg-slate-950 px-3 py-2 rounded-xl border border-slate-900 transition-colors"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{partner}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* 3D-styled timeline matrix tracker */}
            <div className="mt-4">
              <h5 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-4">
                Interactive Semester Progression Trace
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeTrack.timeline.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-gradient-to-b from-slate-950/80 to-slate-950/40 border border-slate-900 flex flex-col justify-between hover:border-slate-800 transition-all group"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-amber-500 font-extrabold tracking-wide uppercase">
                        {item.semester}
                      </span>
                      <h6 className="text-xs font-bold text-white mt-1 group-hover:text-amber-500 transition-colors">
                        {item.milestone}
                      </h6>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Work achievements block */}
          <div className="border-t border-slate-800/60 pt-6 mt-6">
            <h5 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-4">
              Live contributions on active cycle
            </h5>
            <div className="space-y-3 font-mono">
              {activeTrack.responsibilities.map((resp, index) => (
                <div
                  key={index}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-900 text-xs text-slate-300 flex items-start gap-3 hover:border-slate-800 hover:bg-slate-900 transition-all"
                >
                  <span className="bg-amber-500/10 text-amber-500 p-1 rounded font-bold text-[10px] px-2">
                    0{index + 1}
                  </span>
                  <span className="leading-relaxed">{resp}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
