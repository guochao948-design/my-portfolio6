import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Scissors,
  Layers,
  Monitor,
  BookOpen,
  ChevronRight,
  Mail,
  ArrowUpRight
} from 'lucide-react';

// --- 物理动效参数配置 ---
const springPhysics = { type: "spring", stiffness: 300, damping: 25, mass: 0.5 };

// --- 基础 UI 组件库 ---
const SectionHeader = ({ num, title, subtitle }) => (
  <div className="mb-16 md:mb-24">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={springPhysics}
      className="flex items-center gap-4 mb-4"
    >
      <span className="font-mono text-[10px] md:text-xs text-white/40 tracking-[0.3em] uppercase">{num}</span>
      <div className="h-px w-12 bg-white/20"></div>
      <span className="font-mono text-[10px] md:text-xs text-white/40 tracking-[0.3em] uppercase">{subtitle}</span>
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...springPhysics, delay: 0.1 }}
      className="text-3xl md:text-5xl font-sans font-light tracking-tight text-white"
    >
      {title}
    </motion.h2>
  </div>
);

const GlassCard = ({ title, desc, icon: Icon, tags = [], className = "" }) => (
  <motion.div
    whileHover={{ y: -8 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={springPhysics}
    className={`group relative h-full p-8 md:p-10 rounded-[32px] overflow-hidden cursor-pointer
      bg-white/[0.02] backdrop-blur-2xl border border-white/5 border-t-white/20
      hover:shadow-[inset_0_0_30px_rgba(255,255,255,0.03)] transition-all duration-500 ${className}`}
  >
    <div className="mb-8 p-4 rounded-full bg-white/5 w-fit border border-white/5 group-hover:bg-white/10 transition-colors duration-500">
      <Icon strokeWidth={1} className="w-6 h-6 text-white/70 group-hover:text-white" />
    </div>
    
    <h3 className="text-xl md:text-2xl font-sans font-medium mb-4 text-white/90">{title}</h3>
    <p className="text-sm md:text-base text-white/50 leading-loose font-light mb-8">
      {desc}
    </p>

    {tags.length > 0 && (
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map(tag => (
          <span key={tag} className="font-mono text-[10px] tracking-widest px-3 py-1.5 rounded-full border border-white/10 text-white/40 bg-white/[0.01]">
            {tag}
          </span>
        ))}
      </div>
    )}
  </motion.div>
);

const TimelineItem = ({ year, title, company, items, isLast }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={springPhysics}
    className="relative pl-8 md:pl-0"
  >
    <div className="md:grid md:grid-cols-[200px_1fr] md:gap-12 relative">
      <div className="hidden md:block absolute left-[199px] top-2 bottom-0 w-px bg-white/10" />
      {!isLast && <div className="md:hidden absolute left-[7px] top-6 bottom-[-30px] w-px bg-white/10" />}
      <div className="absolute left-[-2px] md:left-[195px] top-2.5 w-[9px] h-[9px] rounded-full bg-[#060608] border-2 border-white/30" />

      <div className="mb-2 md:mb-0 md:text-right pr-12">
        <span className="font-mono text-[11px] text-white/40 tracking-widest">{year}</span>
      </div>

      <div className="pb-16 md:pb-24">
        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-6">
          <h3 className="text-xl md:text-2xl font-sans font-medium text-white">{title}</h3>
          <span className="font-serif italic text-lg text-white/50">{company}</span>
        </div>
        <ul className="space-y-4">
          {items.map((item, i) => (
            <li key={i} className="flex gap-4 group">
              <ChevronRight className="w-4 h-4 text-white/20 flex-shrink-0 mt-1 group-hover:text-white/60 transition-colors" />
              <p className="text-white/50 font-light leading-relaxed text-sm md:text-base">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </motion.div>
);

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  
  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      animate={{ x: pos.x - 8, y: pos.y - 8 }}
      transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
    />
  );
};

const worksData = [
  { id: 1, title: "结构重塑 / Structural Reshape", category: "Apparel Design", img: "https://images.unsplash.com/photo-1550614000-4b95d41582a1?w=800&q=80" },
  { id: 2, title: "极简暗流 / Minimal Undercurrent", category: "Fashion Tech", img: "https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?w=800&q=80" },
  { id: 3, title: "废土回响 / Wasteland Echo", category: "Concept Art", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80" },
  { id: 4, title: "编织光影 / Woven Light", category: "Material Study", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80" },
  { id: 5, title: "重力剥离 / Anti-Gravity", category: "3D Pattern", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80" },
  { id: 6, title: "无性轮廓 / Unisex Silhouette", category: "Commercial", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80" },
];

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      className="min-h-screen bg-[#060608] text-white font-sans selection:bg-white/20 selection:text-white overflow-x-hidden relative"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <CustomCursor />

      {/* 噪点与环境光 */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Ffilter id='noiseFilter'%3E%3FfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3F/filter%3E%3Frect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3F/svg%3E")` }}
      />
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.08]"
        style={{
          background: `radial-gradient(circle 800px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.5) 0%, transparent 100%)`
        }}
      />

      {/* 导航栏 */}
      <nav className={`fixed top-0 w-full z-50 px-6 py-6 transition-all duration-700 flex justify-between items-center ${scrolled ? 'bg-[#060608]/70 backdrop-blur-2xl border-b border-white/5 py-4' : ''}`}>
        <div className="font-serif italic text-xl tracking-wider text-white">Design & Craft.</div>
        <div className="hidden md:flex gap-6 px-6 py-2 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-xl items-center">
          {['Profile', 'Works', 'Skills', 'Experience', 'Education'].map(item => (
            <motion.a
              key={item}
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              href={`#${item.toLowerCase()}`}
              className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors inline-block"
            >
              {item}
            </motion.a>
          ))}
        </div>
      </nav>

      {/* 1. HERO & 自我评价 (Profile) */}
      <section id="profile" className="relative z-10 pt-[25vh] pb-32 px-6 md:px-24 max-w-7xl mx-auto min-h-[90vh] flex flex-col justify-center">
        <div className="absolute right-0 top-20 w-[600px] h-[600px] opacity-10 pointer-events-none hidden lg:block overflow-hidden mix-blend-screen">
          <motion.svg
            viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.1"
            animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="w-full h-full text-white"
          >
            <circle cx="50" cy="50" r="40" strokeDasharray="1 3" />
            <ellipse cx="50" cy="50" rx="40" ry="12" transform="rotate(45 50 50)" />
            <ellipse cx="50" cy="50" rx="40" ry="12" transform="rotate(135 50 50)" />
            <ellipse cx="50" cy="50" rx="40" ry="12" transform="rotate(90 50 50)" />
            <line x1="10" y1="50" x2="90" y2="50" strokeDasharray="0.5 2"/>
            <line x1="50" y1="10" x2="50" y2="90" strokeDasharray="0.5 2"/>
          </motion.svg>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="mb-20 relative z-10"
        >
          <h1 className="text-5xl md:text-[8rem] font-serif font-light leading-[0.85] tracking-tight mb-8 text-white/90 drop-shadow-2xl">
            STRUCTURE<br/><span className="italic text-white">& FORM.</span>
          </h1>
          <p className="font-mono text-xs md:text-sm tracking-[0.4em] text-white/40 uppercase">
            Creative Portfolio / Fashion & Design
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 1 }}
          className="grid md:grid-cols-2 gap-12 border-t border-white/10 pt-16 relative z-10"
        >
          <div>
            <h3 className="font-mono text-[10px] tracking-widest text-white/40 uppercase mb-4">Self Evaluation</h3>
            <h2 className="text-3xl font-serif text-white/90 leading-snug">
              服装专业本硕学历，<br/>在视觉张力与结构工艺间寻找绝对平衡。
            </h2>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-white/50 font-light leading-loose text-sm md:text-base mb-6">
              专业基础扎实，熟悉服装制版、立体裁剪与工艺落地，具备良好的审美与实操能力。拥有高校服装教学经验，擅长沟通协调与教学管理。
            </p>
            <p className="text-white/50 font-light leading-loose text-sm md:text-base">
              做事认真细致、责任心强，学习能力突出，可快速上手相关工作。致力于将前卫视觉与严谨工艺完美融合。
            </p>
          </div>
        </motion.div>
      </section>

      {/* 2. 作品集 (Works) */}
      <section id="works" className="relative z-10 py-32 border-t border-white/5 overflow-hidden">
        <div className="px-6 md:px-24 max-w-7xl mx-auto">
          <SectionHeader num="01" subtitle="Selected Works" title="精选作品视觉" />
        </div>
        <div className="mt-8 flex w-full">
          <div className="flex gap-6 px-3 w-max animate-marquee">
            {[...worksData, ...worksData].map((work, index) => (
              <div key={`${work.id}-${index}`} className="group relative w-[280px] md:w-[400px] aspect-[4/5] rounded-[24px] overflow-hidden cursor-pointer bg-white/5 flex-shrink-0">
                <motion.div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110" style={{ backgroundImage: `url(${work.img})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060608]/90 via-[#060608]/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono text-[10px] tracking-widest text-white/60 uppercase mb-2">{work.category}</p>
                      <h3 className="text-xl md:text-2xl font-serif text-white font-medium">{work.title}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 技能 (Skills) */}
      <section id="skills" className="relative z-10 py-32 px-6 md:px-24 max-w-7xl mx-auto border-t border-white/5">
        <SectionHeader num="02" subtitle="Professional Expertise" title="核心技能维度" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px]">
          <GlassCard className="md:col-span-8" icon={Scissors} title="结构打版与工艺实现" desc="精通服装制版、立体裁剪，拥有深厚的空间与结构拆解能力。" tags={['服装制版', '立体裁剪', '结构设计']} />
          <GlassCard className="md:col-span-4" icon={Layers} title="商业精修视觉" desc="熟练掌握 Photoshop 商业修图标准，深谙光影与材质的后期重塑。" tags={['PS 精修', '电商标准']} />
          <GlassCard className="md:col-span-5" icon={BookOpen} title="教学与教务管理" desc="沉淀多年的高校及院校管理经验，擅长统筹协调。" tags={['高校教学', '统筹协调']} />
          <GlassCard className="md:col-span-7" icon={Monitor} title="数字工具链" desc="熟练使用各类专业设计软件及 Office 办公套件。" tags={['服装 CAD', 'PS', 'Office']} />
        </div>
      </section>

      {/* 4. 工作经历 (Experience) */}
      <section id="experience" className="relative z-10 py-32 px-6 md:px-24 max-w-7xl mx-auto border-t border-white/5">
        <SectionHeader num="03" subtitle="Career Milestones" title="职业轨迹" />
        <div className="mt-16">
          <TimelineItem year="2023.10 — 至今" title="办公室综合岗位" company="南方学院" items={["负责学生管理、学业辅导及大型会务执行", "展现高效沟通与组织协调能力"]} />
          <TimelineItem year="2020.08 — 2022.07" title="服装专业教师" company="燕京理工学院" items={["主讲服装工业制版、立体裁剪等核心课程", "指导学生毕业设计从构思到成品的全过程"]} />
          <TimelineItem year="2019.09 — 2020.01" title="服装及花型设计师" company="世界袜业中心" items={["参与款式设计与花型开发", "全程跟进供应链及生产质量把控"]} isLast={true} />
        </div>
      </section>

      {/* 5. 教育背景 (Education) */}
      <section id="education" className="relative z-10 py-32 px-6 md:px-24 max-w-7xl mx-auto border-t border-white/5">
        <SectionHeader num="04" subtitle="Academic Background" title="学术背景" />
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="p-10 rounded-[32px] bg-white/[0.01] border border-white/5">
            <h3 className="text-2xl font-sans font-medium text-white mb-2">艺术设计 (硕士)</h3>
            <p className="font-serif italic text-white/50 text-lg">西安工程大学</p>
            <span className="font-mono text-xs text-white/30 block mt-4 tracking-widest">2017.09 — 2020.06</span>
          </div>
          <div className="p-10 rounded-[32px] bg-white/[0.01] border border-white/5">
            <h3 className="text-2xl font-sans font-medium text-white mb-2">服装设计 (本科)</h3>
            <p className="font-serif italic text-white/50 text-lg">辽宁工业大学</p>
            <span className="font-mono text-xs text-white/30 block mt-4 tracking-widest">2013.09 — 2017.06</span>
          </div>
        </div>
      </section>

      {/* 6. 页脚 (Footer) - 居中样式 */}
      <footer className="relative z-10 py-24 px-6 border-t border-white/10 bg-[#060608]/80 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center gap-8 max-w-7xl mx-auto">
          
          <motion.a
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            href="mailto:571982349@qq.com"
            className="group flex items-center gap-4 px-8 py-4 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300 backdrop-blur-md"
          >
            <Mail className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
            <span className="font-sans text-base text-white/80 group-hover:text-white transition-colors tracking-wide">
              571982349@qq.com
            </span>
          </motion.a>
          
          <div className="flex flex-col items-center gap-2">
            <div className="font-mono text-[10px] tracking-[0.4em] text-white/30 uppercase">
              © 2026. CRAFTED WITH PRECISION.
            </div>
            <div className="h-px w-8 bg-white/10 mt-2"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
