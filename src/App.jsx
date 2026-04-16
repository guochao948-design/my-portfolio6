import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Scissors,
  Layers,
  Monitor,
  BookOpen,
  Mail,
  ArrowUpRight,
  Sparkles,
  Command,
  ArrowRight,
  MousePointer2
} from 'lucide-react';

// --- 物理动效参数配置 ---
const springPhysics = { type: "spring", stiffness: 150, damping: 20, mass: 1 };

// --- 基础 UI 组件库 ---

// Linear 风格标题
const SectionHeader = ({ num, title, subtitle }) => (
  <div className="mb-16 md:mb-24 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }} transition={springPhysics}
      className="flex items-center gap-4 mb-4"
    >
      <span className="font-mono text-[10px] md:text-xs text-white/30 tracking-[0.3em] uppercase">{num}</span>
      <motion.div 
        initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="h-[1px] bg-white/20"
      />
      <span className="font-mono text-[10px] md:text-xs text-white/40 tracking-[0.2em] uppercase">{subtitle}</span>
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }} transition={{ ...springPhysics, delay: 0.1 }}
      className="text-3xl md:text-5xl font-sans font-medium tracking-tight text-white/90"
    >
      {title}
    </motion.h2>
  </div>
);

// 聚光灯卡片
const GlassCard = ({ title, desc, icon: Icon, tags = [], className = "" }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }} transition={springPhysics}
      onMouseMove={handleMouseMove} onMouseEnter={() => setOpacity(1)} onMouseLeave={() => setOpacity(0)}
      className={`group relative min-h-[280px] p-8 md:p-10 rounded-3xl overflow-hidden cursor-pointer bg-[#0D0D10] border border-white/5 shadow-2xl transition-all duration-500 hover:border-white/10 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 z-0"
        style={{ opacity, background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)` }}
      />
      <div className="absolute inset-0 rounded-3xl pointer-events-none border-t border-white/10 z-0 opacity-50" />
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-8 p-4 rounded-full bg-white/5 w-fit border border-white/5 group-hover:bg-white/10 transition-colors duration-500">
          <Icon strokeWidth={1.5} className="w-5 h-5 text-white/60 group-hover:text-white" />
        </div>
        <h3 className="text-xl md:text-2xl font-sans font-medium mb-4 text-white/90 tracking-tight">{title}</h3>
        <p className="text-sm md:text-base text-white/40 leading-relaxed font-light mb-8 group-hover:text-white/60 transition-colors duration-500">
          {desc}
        </p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map(tag => (
              <span key={tag} className="font-mono text-[10px] tracking-widest px-3 py-1.5 rounded-full border border-white/5 text-white/40 bg-white/[0.02] group-hover:border-white/10 transition-colors">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// 时间轴
const TimelineItem = ({ year, title, company, items, isLast }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }} transition={springPhysics}
    className="relative pl-6 md:pl-0 group"
  >
    <div className="md:grid md:grid-cols-[180px_1fr] md:gap-12 relative">
      <div className="hidden md:block absolute left-[179px] top-2 bottom-0 w-px bg-white/5 group-hover:bg-white/10 transition-colors" />
      {!isLast && <div className="md:hidden absolute left-[5px] top-6 bottom-[-30px] w-px bg-white/5" />}
      <div className="absolute left-[-3px] md:left-[175px] top-2.5 w-[9px] h-[9px] rounded-full bg-[#060608] border border-white/20 group-hover:border-white/60 group-hover:bg-white/10 transition-all duration-300" />
      <div className="mb-2 md:mb-0 md:text-right pr-12 pt-1">
        <span className="font-mono text-[11px] text-white/40 tracking-[0.1em]">{year}</span>
      </div>
      <div className="pb-16 md:pb-24">
        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-4">
          <h3 className="text-xl md:text-2xl font-sans font-medium text-white/90 tracking-tight">{title}</h3>
          <span className="font-serif italic text-base text-white/40">{company}</span>
        </div>
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex gap-4 group/item items-start">
              <span className="text-white/20 mt-1 flex-shrink-0 text-xs font-mono">0{i+1}</span>
              <p className="text-white/50 font-light leading-relaxed text-sm md:text-base group-hover/item:text-white/70 transition-colors duration-300">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </motion.div>
);

// 修复了第一项图片加载失败的问题，使用了经过验证的稳定图源
const worksData = [
  { id: 1, title: "结构重塑 / Structural Reshape", category: "Apparel Design", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop" },
  { id: 2, title: "极简暗流 / Minimal", category: "Fashion Tech", img: "https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?w=800&q=80" },
  { id: 3, title: "废土回响 / Echo", category: "Concept Art", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80" },
  { id: 4, title: "编织光影 / Woven Light", category: "Material Study", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80" },
  { id: 5, title: "重力剥离 / Anti-Gravity", category: "3D Pattern", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop" },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-100 font-sans selection:bg-white/20 selection:text-white overflow-x-hidden relative">
      <style>{`
        /* 完美的无限滚动跑马灯 CSS */
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
        .animate-scroll-marquee {
          display: flex;
          width: max-content;
          animation: scroll 40s linear infinite;
        }
        .animate-scroll-marquee:hover {
          animation-play-state: paused;
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #060608; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>

      {/* 极简网格与噪点环境层 */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]"
        style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
      />
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Ffilter id='noiseFilter'%3E%3FfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3F/filter%3E%3Frect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3F/svg%3E")` }} />

      {/* 导航栏 */}
      <nav className={`fixed top-0 w-full z-50 px-6 md:px-12 transition-all duration-500 flex justify-between items-center ${scrolled ? 'bg-[#060608]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'py-8'}`}>
        <div className="flex items-center gap-2 text-lg tracking-wider text-white/90 mix-blend-difference">
          <Command className="w-4 h-4 text-white" />
          <span className="font-medium tracking-tight text-sm uppercase">Portfolio.</span>
        </div>
        <div className="hidden md:flex gap-2 bg-white/5 border border-white/5 backdrop-blur-xl p-1.5 rounded-full mix-blend-difference">
          {['Profile', 'Works', 'Skills', 'Experience'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="px-5 py-2 rounded-full font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 hover:text-white hover:bg-white/10 transition-all">
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* 1. HERO 区域 */}
      <section id="profile" className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden pt-20">
        
        {/* 高级抽象背景 */}
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0 z-0 flex items-center justify-center opacity-40 pointer-events-none"
        >
          <div className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] absolute bg-gradient-to-tr from-white/[0.05] to-transparent rounded-full blur-3xl" />
          <motion.svg
            viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.2"
            animate={{ rotateZ: 360, rotateX: 20, rotateY: 30 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="w-[150%] h-[150%] md:w-[100%] md:h-[100%] text-white/20 absolute"
          >
            {[...Array(12)].map((_, i) => (
              <ellipse key={i} cx="100" cy="100" rx="80" ry="20" transform={`rotate(${i * 15} 100 100)`} />
            ))}
            {[...Array(12)].map((_, i) => (
              <ellipse key={i+12} cx="100" cy="100" rx="20" ry="80" transform={`rotate(${i * 15} 100 100)`} />
            ))}
          </motion.svg>
        </motion.div>

        <div className="relative z-10 w-full px-6 md:px-24 max-w-[1600px] mx-auto grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8">
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }} 
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-[14vw] md:text-[8vw] leading-[0.85] tracking-tighter text-white font-medium mb-4 flex flex-col">
                <span>STRUCTURE</span>
                <span className="font-serif italic font-light text-white/40 ml-[10%]">AND FORM.</span>
              </h1>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-[1px] bg-white/30" />
                <p className="font-mono text-xs tracking-[0.3em] text-white/40 uppercase">
                  Creative Portfolio / Fashion
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5 }}
            className="md:col-span-4 md:col-start-9 flex flex-col gap-8 mt-12 md:mt-0 p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] -mr-10 -mt-10 pointer-events-none" />
            <h2 className="text-xl md:text-2xl font-serif text-white/90 leading-relaxed tracking-tight relative z-10">
              服装专业本硕学历，在视觉张力与结构工艺间寻找<span className="italic text-white">绝对平衡。</span>
            </h2>
            <div className="space-y-4 relative z-10">
              <p className="text-white/40 font-light leading-relaxed text-sm">
                专业基础扎实，熟悉服装制版、立体裁剪与工艺落地。拥有高校服装教学经验，擅长沟通协调与教学管理。
              </p>
              <p className="text-white/40 font-light leading-relaxed text-sm">
                做事认真细致、责任心强，致力于将前卫视觉与严谨工艺完美融合。
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white">Scroll</span>
          <MousePointer2 className="w-4 h-4 text-white" />
        </motion.div>
      </section>

      {/* 2. 作品集 (Works) */}
      <section id="works" className="relative z-10 py-32 border-t border-white/5 bg-[#030304]">
        <div className="px-6 md:px-24 max-w-[1600px] mx-auto mb-16">
          <SectionHeader num="01" subtitle="Selected Works" title="精选视觉作品" />
        </div>
        
        <div className="relative w-full overflow-hidden flex">
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#030304] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#030304] to-transparent z-20 pointer-events-none" />
          
          <div className="animate-scroll-marquee gap-4 md:gap-6 px-3">
            {[...worksData, ...worksData, ...worksData].map((work, index) => (
              <motion.div 
                key={`${work.id}-${index}`} 
                whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative w-[280px] md:w-[420px] aspect-[4/5] flex-shrink-0 rounded-[2rem] overflow-hidden cursor-pointer bg-[#0D0D10] border border-white/10 shadow-2xl"
              >
                <div className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 opacity-70 group-hover:opacity-100" style={{ backgroundImage: `url(${work.img})` }} />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col justify-end h-full">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out flex justify-between items-end">
                    
                    {/* 修复点：加入 flex-1 和 pr-4，限制文本区域宽度，防止与右侧箭头图标重叠 */}
                    <div className="flex-1 pr-4">
                      <p className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase mb-3">/ {work.category}</p>
                      <h3 className="text-xl md:text-2xl font-sans text-white/95 font-medium tracking-tight break-words">{work.title}</h3>
                    </div>
                    
                    {/* 修复点：加入 flex-shrink-0 确保图标形状不被长文字挤压压缩 */}
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 border border-white/20 transform scale-90 group-hover:scale-100">
                      <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 技能 (Skills) */}
      <section id="skills" className="relative z-10 py-32 px-6 md:px-24 max-w-[1600px] mx-auto border-t border-white/5">
        <SectionHeader num="02" subtitle="Expertise" title="核心技能维度" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <GlassCard className="md:col-span-8" icon={Scissors} title="结构打版与工艺实现" desc="精通服装制版、立体裁剪，拥有深厚的空间与结构拆解能力。将概念化的设计草图转化为严谨可落地的物理版型。" tags={['服装制版', '立体裁剪', '结构设计']} />
          <GlassCard className="md:col-span-4" icon={Layers} title="商业精修视觉" desc="熟练掌握 Photoshop 商业修图标准，深谙光影、材质质感与人体结构的后期重塑。" tags={['PS 精修', '电商标准']} />
          <GlassCard className="md:col-span-4" icon={BookOpen} title="教学与教务管理" desc="沉淀多年的高校及院校管理经验，擅长统筹协调、课程体系搭建与学业规划指导。" tags={['高校教学', '统筹协调']} />
          <GlassCard className="md:col-span-8" icon={Monitor} title="数字工具链" desc="熟练使用各类专业服装 CAD 设计软件，配合 Office 办公套件实现高效流程管理与数据沉淀。" tags={['服装 CAD', 'Photoshop', 'Office Suite']} />
        </div>
      </section>

      {/* 4. 工作经历 (Experience) */}
      <section id="experience" className="relative z-10 py-32 px-6 md:px-24 max-w-[1600px] mx-auto border-t border-white/5">
        <SectionHeader num="03" subtitle="Career" title="职业轨迹" />
        <div className="mt-16 max-w-4xl">
          <TimelineItem year="2023.10 — 至今" title="办公室综合岗位" company="南方学院" items={["负责学生管理、学业辅导及大型会务执行", "展现高效沟通与组织协调能力，优化教务管理流程"]} />
          <TimelineItem year="2020.08 — 2022.07" title="服装专业教师" company="燕京理工学院" items={["主讲服装工业制版、立体裁剪等核心课程", "指导学生毕业设计从构思、打版、面料改造到成品走秀的全过程"]} />
          <TimelineItem year="2019.09 — 2020.01" title="服装及花型设计师" company="世界袜业中心" items={["参与款式设计与花型开发，独立完成系列产品的企划方案", "全程跟进供应链及生产质量把控，对接工厂确保大货工艺标准"]} isLast={true} />
        </div>
      </section>

      {/* 5. 教育背景 (Education) */}
      <section id="education" className="relative z-10 py-32 px-6 md:px-24 max-w-[1600px] mx-auto border-t border-white/5">
        <SectionHeader num="04" subtitle="Academic" title="学术背景" />
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {[
            { degree: "艺术设计 (硕士)", school: "西安工程大学", level: "Postgraduate", time: "2017.09 — 2020.06" },
            { degree: "服装设计 (本科)", school: "辽宁工业大学", level: "Undergraduate", time: "2013.09 — 2017.06" }
          ].map((edu, i) => (
            <motion.div 
              key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-10 md:p-12 rounded-[2rem] bg-[#0D0D10] border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-bl-[4rem] -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150" />
              <h3 className="text-2xl md:text-3xl font-sans font-medium text-white/90 mb-3 tracking-tight relative z-10">{edu.degree}</h3>
              <p className="font-serif italic text-white/40 text-lg md:text-xl relative z-10">{edu.school}</p>
              <div className="mt-16 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                <span className="font-mono text-[10px] md:text-xs text-white/30 tracking-[0.2em] uppercase">{edu.level}</span>
                <span className="font-mono text-[10px] md:text-xs text-white/40 tracking-widest border border-white/10 px-4 py-2 rounded-full">{edu.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. 合作契机 / Contact CTA */}
      <section className="relative z-10 py-40 px-6 border-t border-white/5 bg-gradient-to-b from-[#060608] to-black text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <Sparkles className="w-6 h-6 text-white/60" />
            </div>
            <h2 className="text-4xl md:text-6xl font-sans font-medium text-white/90 tracking-tighter mb-6">
              Ready to create <br className="md:hidden"/> something unique?
            </h2>
            <p className="text-white/40 font-light mb-12 text-sm md:text-base max-w-lg mx-auto">
              期待将独特的设计视角与严谨的工艺标准，带入您的下一个项目。随时欢迎交流与合作。
            </p>
            {/* 修复点：更新邮箱为 571982349@qq.com */}
            <a
              href="mailto:571982349@qq.com"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium tracking-wide hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <Mail className="w-4 h-4" />
              <span className="relative z-10">Get in touch</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* 7. 页脚 */}
      <footer className="relative z-10 py-12 px-6 md:px-24 border-t border-white/5 bg-black">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-[1600px] mx-auto gap-6">
          <div className="flex items-center gap-2">
            <Command className="w-4 h-4 text-white/30" />
            <span className="font-mono text-[10px] text-white/30 tracking-widest">DESIGN METHOD.</span>
          </div>
          <div className="font-mono text-[10px] tracking-[0.2em] text-white/20 uppercase text-center">
            © 2026. CRAFTED WITH PRECISION.
          </div>
          {/* 修复点：更新邮箱为 571982349@qq.com */}
          <div className="text-white/30 font-mono text-[10px] tracking-widest hover:text-white/80 transition-colors cursor-pointer">
            571982349@qq.com
          </div>
        </div>
      </footer>
    </div>
  );
}
