import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Compass, RotateCcw, Box } from 'lucide-react';

interface Node3D {
  id: string;
  name: string;
  category: 'course' | 'skill' | 'milestone';
  x: number;
  y: number;
  z: number;
  details: string;
  color: string;
  tag: string;
}

interface Connection {
  from: string;
  to: string;
}

const NODES_DATA: Node3D[] = [
  // Core Courses (BINUS CS)
  { id: 'ds', name: 'Data Structures', category: 'course', x: -80, y: -70, z: -40, details: 'Core coursework — trees, heaps, hashing, and the cost models behind them.', color: '#f97316', tag: 'Core' },
  { id: 'algo', name: 'Algorithms & Complexity', category: 'course', x: 80, y: -60, z: 40, details: 'Dynamic programming, greedy strategies, and complexity analysis.', color: '#f97316', tag: 'Core' },
  { id: 'ai', name: 'Artificial Intelligence', category: 'course', x: -40, y: 80, z: -90, details: 'Search, neural networks, and the foundations behind modern machine learning.', color: '#3b82f6', tag: 'Core' },
  { id: 'db', name: 'Database Systems', category: 'course', x: 90, y: 60, z: -30, details: 'Relational modeling, SQL, indexing, and transactions.', color: '#3b82f6', tag: 'Core' },
  { id: 'se', name: 'Software Engineering', category: 'course', x: 0, y: -100, z: 20, details: 'Design patterns, testing, version control, and team workflows.', color: '#10b981', tag: 'Core' },

  // Tech Skills
  { id: 'python', name: 'Python / PyTorch', category: 'skill', x: -60, y: -40, z: 120, details: 'Main stack for machine learning coursework and research projects.', color: '#ec4899', tag: 'Primary' },
  { id: 'ml', name: 'ML Tooling', category: 'skill', x: 60, y: 90, z: 80, details: 'TensorFlow, Scikit-Learn, and Pandas for training and analysis pipelines.', color: '#ec4899', tag: 'Daily' },
  { id: 'ts', name: 'TypeScript / React', category: 'skill', x: -120, y: 10, z: 60, details: 'Frontend engineering — this site is built with React 19 and Three.js.', color: '#a855f7', tag: 'Working' },
  { id: 'cloud', name: 'Cloud & DevOps', category: 'skill', x: 120, y: -10, z: -60, details: 'AWS, Docker, and CI/CD pipelines from coursework and project deployments.', color: '#a855f7', tag: 'Working' },
  { id: 'data', name: 'SQL / NoSQL', category: 'skill', x: -130, y: -30, z: -80, details: 'PostgreSQL and MongoDB for relational and document workloads.', color: '#a855f7', tag: 'Working' },

  // Milestones
  { id: 'intern', name: 'FlexyPack Internship', category: 'milestone', x: 0, y: 0, z: 0, details: 'Data Engineer Intern — fine-tuned Gemma 3 (7B) for specialized customer-service NLP, from dataset curation to inference optimization.', color: '#f43f5e', tag: '2025' },
  { id: 'tmrl', name: 'TMRL RL² Research', category: 'milestone', x: -100, y: -110, z: -100, details: 'Extended the TrackMania RL baseline with RL², Transformer attention, and REDQ.', color: '#f43f5e', tag: 'R&D' },
  { id: 'rag', name: 'AI Research Assistant', category: 'milestone', x: 100, y: 110, z: 60, details: 'Semantic search and retrieval tool for streamlining academic research.', color: '#f43f5e', tag: 'Proj' },
];

const CONNECTIONS: Connection[] = [
  { from: 'intern', to: 'python' },
  { from: 'intern', to: 'ml' },
  { from: 'intern', to: 'data' },
  { from: 'ds', to: 'algo' },
  { from: 'algo', to: 'ai' },
  { from: 'ai', to: 'python' },
  { from: 'ai', to: 'ml' },
  { from: 'db', to: 'data' },
  { from: 'db', to: 'se' },
  { from: 'se', to: 'ts' },
  { from: 'se', to: 'cloud' },
  { from: 'tmrl', to: 'ai' },
  { from: 'tmrl', to: 'python' },
  { from: 'rag', to: 'ai' },
  { from: 'rag', to: 'python' }
];

export default function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node3D>(NODES_DATA.find(n => n.id === 'intern')!);
  const [hoveredNode, setHoveredNode] = useState<Node3D | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ alpha: 0.005, beta: 0.008 }); // Auto rotational velocity
  const [angles, setAngles] = useState({ x: 0.2, y: 0.5 }); // Absolute angles of grid
  const [zoom, setZoom] = useState(1.1);
  const dragStart = useRef({ x: 0, y: 0 });
  const mousePos = useRef({ x: 0, y: 0 });

  // Handle Rotation auto deceleration
  useEffect(() => {
    let timer: any;
    if (!isDragging) {
      const slowDown = () => {
        setAngles(prev => ({
          x: prev.x + rotation.alpha,
          y: prev.y + rotation.beta
        }));
        // Apply ambient tiny torque
        timer = requestAnimationFrame(slowDown);
      };
      timer = requestAnimationFrame(slowDown);
    }
    return () => cancelAnimationFrame(timer);
  }, [isDragging, rotation]);

  const projectNode = (node: Node3D, cx: number, cy: number, d: number) => {
    // Rotation calculations
    // Around Y-axis
    const cosY = Math.cos(angles.y);
    const sinY = Math.sin(angles.y);
    let x1 = node.x * cosY - node.z * sinY;
    let z1 = node.x * sinY + node.z * cosY;

    // Around X-axis
    const cosX = Math.cos(angles.x);
    const sinX = Math.sin(angles.x);
    let y2 = node.y * cosX - z1 * sinX;
    let z2 = node.y * sinX + z1 * cosX;

    // Perspective conversion
    const scale = d / (d + z2);
    const finalZoom = zoom * scale;
    const px = cx + x1 * finalZoom;
    const py = cy + y2 * finalZoom;

    return {
      px,
      py,
      z: z2,
      visible: z2 > -d,
      opacity: Math.max(0.15, Math.min(1, (d - z2) / (d * 1.5))),
      size: Math.max(6, Math.min(24, 14 * scale))
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      // Clear canvas with deep technical background match
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;
      const d = 260; // Perspective base depth
      
      // Guide rings in 3D (Simulating orbits)
      ctx.strokeStyle = '#ffffff08';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, 100 * i * zoom, 50 * i * zoom, angles.x, 0, 2 * Math.PI);
        ctx.stroke();
      }

      // 1. Draw connections
      ctx.lineWidth = 1.5;
      CONNECTIONS.forEach(conn => {
        const fromNode = NODES_DATA.find(n => n.id === conn.from);
        const toNode = NODES_DATA.find(n => n.id === conn.to);
        if (fromNode && toNode) {
          const p1 = projectNode(fromNode, cx, cy, d);
          const p2 = projectNode(toNode, cx, cy, d);

          if (p1.visible && p2.visible) {
            const grad = ctx.createLinearGradient(p1.px, p1.py, p2.px, p2.py);
            // Dynamic neon glow lines
            grad.addColorStop(0, `${fromNode.color}${Math.floor(p1.opacity * 255).toString(16).padStart(2, '0')}`);
            grad.addColorStop(1, `${toNode.color}${Math.floor(p2.opacity * 255).toString(16).padStart(2, '0')}`);
            
            ctx.strokeStyle = grad;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      });

      // 2. Draw nodes sorted by Z depth so closer nodes overlap further ones
      const projectedList = NODES_DATA.map(node => {
        const proj = projectNode(node, cx, cy, d);
        return { node, proj };
      }).sort((a, b) => b.proj.z - a.proj.z); // High Z is deeper, draw far nodes first

      // Setup Mouse Detection for hover
      let foundHover: Node3D | null = null;
      let minHoverDist = 18;

      projectedList.forEach(({ node, proj }) => {
        if (!proj.visible) return;

        // Interactive hover boundary match
        const dx = mousePos.current.x - proj.px;
        const dy = mousePos.current.y - proj.py;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < proj.size + 8 && dist < minHoverDist) {
          foundHover = node;
          minHoverDist = dist;
        }

        const isCurrentSelected = selectedNode?.id === node.id;
        const isCurrentHovered = hoveredNode?.id === node.id;

        // Render Outer Glowing aura helper
        if (isCurrentSelected || isCurrentHovered) {
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, proj.size + (isCurrentSelected ? 12 : 6), 0, 2 * Math.PI);
          ctx.fillStyle = `${node.color}${isCurrentSelected ? '18' : '0f'}`;
          ctx.fill();
          ctx.strokeStyle = `${node.color}${isCurrentSelected ? '88' : '44'}`;
          ctx.lineWidth = isCurrentSelected ? 2 : 1;
          ctx.setLineDash(isCurrentSelected ? [4, 4] : []);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Core Point
        ctx.beginPath();
        ctx.arc(proj.px, proj.py, proj.size, 0, 2 * Math.PI);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = proj.opacity;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Inner core light center
        ctx.beginPath();
        ctx.arc(proj.px, proj.py, proj.size * 0.4, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Node Label
        ctx.fillStyle = isCurrentSelected ? '#ffffff' : '#94a3b8';
        ctx.font = isCurrentSelected ? 'bold 12px monospace' : '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, proj.px, proj.py - proj.size - 6);
      });

      // Update state outside loop securely on frame mismatch
      if (foundHover !== hoveredNode) {
        setHoveredNode(foundHover);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [angles, zoom, selectedNode, hoveredNode]);

  // Canvas Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    dragStart.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mousePos.current = { x, y };

    if (!isDragging) return;

    const dx = x - dragStart.current.x;
    const dy = y - dragStart.current.y;

    setAngles(prev => ({
      x: prev.x + dy * 0.007,
      y: prev.y + dx * 0.007
    }));

    setRotation({
      alpha: dy * 0.001,
      beta: dx * 0.001
    });

    dragStart.current = { x, y };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCanvasClick = () => {
    if (hoveredNode) {
      setSelectedNode(hoveredNode);
    }
  };

  return (
    <div id="interactive-grid-matrix" className="w-full flex flex-col xl:flex-row gap-6 max-w-7xl mx-auto p-4 select-none">
      
      {/* 3D Scene Viewport */}
      <div className="flex-1 relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden aspect-video xl:aspect-auto xl:h-[460px] flex flex-col justify-between">
        
        {/* Top telemetry bar */}
        <div className="p-4 flex items-center justify-between border-b border-rose-500/10 bg-slate-950/40 z-10">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">
              KNOWLEDGE VECTOR SPACE [3D]
            </span>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
            <span className="hidden sm:inline bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              ROT_X: {angles.x.toFixed(2)}rad
            </span>
            <span className="hidden sm:inline bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              ROT_Y: {angles.y.toFixed(2)}rad
            </span>
          </div>
        </div>

        {/* The Live Canvas */}
        <canvas
          ref={canvasRef}
          width={650}
          height={320}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleCanvasClick}
          className="w-full h-full cursor-grab active:cursor-grabbing hover:opacity-100 transition-opacity"
        />

        {/* Floating Instruction overlay */}
        <div className="absolute bottom-4 left-4 z-10 pointer-events-none flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[10px] font-mono text-amber-500 bg-amber-950/40 border border-amber-500/20 px-2.5 py-1 rounded-full w-max">
            <Box className="w-3.5 h-3.5" />
            <span>Interactive Node Mesh. Drag to rotate in 3D.</span>
          </div>
        </div>

        {/* Orbit Control Widgets */}
        <div className="absolute right-4 bottom-4 flex flex-col gap-2 z-10">
          <button
            onClick={() => setAngles({ x: 0.2, y: 0.5 })}
            id="reset-matrix-camera"
            className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-amber-500 text-slate-400 hover:text-amber-500 transition-colors"
            title="Reset spatial camera perspective"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <div className="flex bg-slate-950/60 border border-slate-800 rounded-lg p-1 gap-1">
            <button
              onClick={() => setZoom(prev => Math.max(0.6, prev - 0.1))}
              className="px-2 py-0.5 text-xs font-mono font-bold hover:text-white text-slate-400"
              title="Zoom Out"
            >
              -
            </button>
            <span className="text-[10px] font-mono text-slate-500 self-center">ZOOM</span>
            <button
              onClick={() => setZoom(prev => Math.min(1.8, prev + 0.1))}
              className="px-2 py-0.5 text-xs font-mono font-bold hover:text-white text-slate-400"
              title="Zoom In"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Cybernetic Telemetry Display Card */}
      <div className="w-full xl:w-[380px] bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
        
        {/* Abstract vector tech frame */}
        <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-amber-500/5 blur-xl group-hover:bg-amber-500/10 transition-colors" />
        
        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className={`text-[10px] font-mono px-2 py-1 rounded-sm uppercase tracking-wider font-extrabold border ${
                selectedNode.category === 'course' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                selectedNode.category === 'skill' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                'bg-rose-500/10 text-rose-400 border-rose-500/20'
              }`}>
                {selectedNode.category}
              </span>
              <h3 id="telemetry-node-title" className="text-xl font-bold text-white mt-2 leading-tight tracking-wide font-sans">
                {selectedNode.name}
              </h3>
            </div>
            <span className="text-2xl font-mono font-black text-amber-500 bg-slate-900/80 px-3 py-1 rounded-xl border border-slate-800">
              {selectedNode.tag}
            </span>
          </div>

          <div className="border-t border-b border-slate-800/80 py-4 my-4 font-mono text-xs text-slate-300 leading-relaxed space-y-3">
            <p className="italic text-slate-400">
              &quot;{selectedNode.details}&quot;
            </p>
            <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800 flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <div className="text-[10px]">
                <div className="text-slate-400">Vector Coordinates</div>
                <div className="text-slate-500">X: {selectedNode.x} | Y: {selectedNode.y} | Z: {selectedNode.z}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick related links */}
        <div className="space-y-3 mt-4">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
            Connected Topology
          </div>
          <div className="flex flex-wrap gap-2">
            {CONNECTIONS.filter(c => c.from === selectedNode.id || c.to === selectedNode.id).map(c => {
              const relatedId = c.from === selectedNode.id ? c.to : c.from;
              const relatedNode = NODES_DATA.find(n => n.id === relatedId);
              if (!relatedNode) return null;
              return (
                <button
                  key={relatedId}
                  onClick={() => setSelectedNode(relatedNode)}
                  id={`link-node-${relatedId}`}
                  className="px-2.5 py-1 text-[10px] font-mono bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 rounded text-slate-300 transition-all flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: relatedNode.color }} />
                  {relatedNode.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
