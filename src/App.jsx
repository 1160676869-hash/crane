import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import BorderGlow from "./BorderGlow.jsx";
import usePortfolioMotion from "./usePortfolioMotion.js";

const contact = {
  phone: "17353883080",
  email: "1160676869@qq.com"
};

const navItems = [
  { label: "经历", href: "#profile" },
  { label: "项目", href: "#projects" },
  { label: "优势", href: "#strengths" },
  { label: "联系", href: "#contact" }
];

const stats = [
  { value: "12+", label: "项目实践" },
  { value: "6", label: "核心能力" },
  { value: "2024-2027", label: "专业学习周期" },
  { value: "8+", label: "常用创作工具" }
];

const projects = [
  {
    title: "品牌广告与信息流视觉",
    image: "/assets/project-brand.jpg",
    category: "Brand / Commercial",
    summary:
      "围绕广告片、信息流素材与活动传播内容，完成从画面构思、拍摄协助到剪辑包装的视觉输出。",
    meta: "瑞幸广告 / AD 钙奶广告 / 折叠电动车信息流",
    videos: [
      {
        title: "AD 钙奶影视广告",
        src: "/assets/portfolio-previews/brand-ad-milk.webm"
      },
      {
        title: "瑞幸广告 成片V1",
        src: "/assets/portfolio-previews/brand-luckin.webm"
      },
      {
        title: "爱玛电动车广告",
        src: "/assets/portfolio-previews/brand-aima.webm"
      },
      {
        title: "恒德恒家地产年会",
        src: "/assets/portfolio-previews/brand-hengde-event.webm"
      }
    ]
  },
  {
    title: "短片拍摄与后期包装",
    image: "/assets/project-film.jpg",
    category: "Film / Post Production",
    summary:
      "参与创意短片、微电影与校招宣传片项目，关注节奏、镜头衔接、字幕、配乐与画面统一性。",
    meta: "《拯救人质》/ 国家安全大赛微电影 / 校招宣传片",
    videos: [
      {
        title: "拯救人质短片 成片",
        src: "/assets/portfolio-previews/film-hostage.webm"
      },
      {
        title: "国家安全大赛《校园里的暗局》",
        src: "/assets/portfolio-previews/film-security-campus.webm"
      },
      {
        title: "美圣雅恒校招宣传片",
        src: "/assets/portfolio-previews/film-campus-recruit.webm"
      },
      {
        title: "动漫剪辑 rainV1",
        src: "/assets/portfolio-previews/anime-rain.webm"
      },
      {
        title: "动漫剪辑片段",
        src: "/assets/portfolio-previews/anime-cut.webm"
      }
    ]
  },
  {
    title: "AI 辅助视觉探索",
    image: "/assets/project-ai.jpg",
    category: "AI Design",
    summary:
      "使用 ChatGPT、Codex、Gemini、即梦等工具进行提示词整理、概念生成与视觉方案辅助。",
    meta: "AI 创意生成 / 提示词协作 / 概念板搭建",
    videos: []
  },
  {
    title: "动态图形与 Logo 演绎",
    image: "/assets/project-motion.jpg",
    category: "Motion Graphics",
    summary:
      "使用 After Effects 进行文字动画、简单转场、MG 元素和 Logo 结尾动画等基础动态包装。",
    meta: "AE coffee logo / VFX 混剪 / 商业宣传片特效",
    videos: [
      {
        title: "Coffee Logo 结尾动画",
        src: "/assets/portfolio-previews/motion-coffee-logo.webm"
      }
    ]
  }
];

const strengths = [
  {
    title: "影像拍摄",
    text: "熟悉相机基础操作，能够完成活动、人物、产品与短视频素材采集，理解构图、光线与镜头运动。"
  },
  {
    title: "剪辑叙事",
    text: "可完成素材整理、粗剪、精剪、字幕、配乐卡点与转场处理，把信息压缩成清晰的观看节奏。"
  },
  {
    title: "调色后期",
    text: "能够使用 DaVinci Resolve 做基础调色，调整色彩、亮度和对比度，让画面风格更统一。"
  },
  {
    title: "动态包装",
    text: "具备 AE 基础动效制作能力，可处理文字动画、画面特效、MG 元素和短片包装。"
  },
  {
    title: "品牌平面",
    text: "具备 logo、海报、宣传册、短视频封面等平面设计基础，能够围绕主题建立视觉秩序。"
  },
  {
    title: "AI 协作",
    text: "善于用 AI 工具辅助创意发散、提示词生成、概念整理和方案迭代，提高前期探索效率。"
  }
];

const tools = [
  "DaVinci Resolve",
  "After Effects",
  "Premiere",
  "Photoshop",
  "Illustrator",
  "InDesign",
  "剪映",
  "ChatGPT",
  "Codex",
  "Gemini",
  "即梦"
];

function Header({ onContactClick }) {
  return (
    <header className="site-header" aria-label="主导航">
      <p className="header-kicker">
        Visual Design Portfolio
        <span>AI / Brand / Motion</span>
      </p>
      <a className="brand" href="#top" aria-label="回到首页">
        <span>TAN PENGXU</span>
        <small>Portfolio 2026</small>
      </a>
      <button className="contact-button" type="button" onClick={onContactClick}>
        联系我 <span aria-hidden="true">-&gt;</span>
      </button>
    </header>
  );
}

function FloatingNav({ onContactClick }) {
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    const updateVisibility = () => {
      tickingRef.current = false;
      const nextIsVisible = window.scrollY >= window.innerHeight * 0.82;
      if (nextIsVisible === isVisibleRef.current) return;

      isVisibleRef.current = nextIsVisible;
      setIsVisible(nextIsVisible);
    };

    const requestVisibilityUpdate = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", requestVisibilityUpdate, { passive: true });
    window.addEventListener("resize", requestVisibilityUpdate);

    return () => {
      window.removeEventListener("scroll", requestVisibilityUpdate);
      window.removeEventListener("resize", requestVisibilityUpdate);
    };
  }, []);

  return (
    <nav
      className={`floating-nav ${isVisible ? "is-visible" : ""}`}
      aria-label="悬浮导航"
    >
      <a className="floating-brand" href="#top">
        TPX
      </a>
      <div className="floating-links">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </div>
      <button className="floating-contact" type="button" onClick={onContactClick}>
        联系我
      </button>
    </nav>
  );
}

function ContactQrModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="qr-modal" role="dialog" aria-modal="true">
      <button
        className="qr-modal-backdrop"
        type="button"
        onClick={onClose}
        aria-label="关闭微信二维码"
      />
      <BorderGlow
        className="qr-dialog"
        innerClassName="qr-dialog-inner"
        borderRadius={32}
        glowRadius={52}
      >
        <div className="qr-dialog-head">
          <div>
            <p className="eyebrow">Wechat Contact</p>
            <h3>扫码添加微信</h3>
          </div>
          <button className="qr-close" type="button" onClick={onClose}>
            关闭
          </button>
        </div>
        <div className="qr-image-wrap">
          <img src="/assets/wechat-qr.jpg" alt="谭鹏旭微信二维码" />
        </div>
        <p className="qr-hint">微信：Crane / 山东 泰安</p>
      </BorderGlow>
    </div>
  );
}

function Hero({ onContactClick }) {
  const heroVideoRef = useRef(null);
  const [shouldLoadHeroVideo, setShouldLoadHeroVideo] = useState(false);

  useEffect(() => {
    const loadVideo = () => setShouldLoadHeroVideo(true);
    const idleId =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(loadVideo, { timeout: 1200 })
        : window.setTimeout(loadVideo, 900);

    return () => {
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
    };
  }, []);

  useEffect(() => {
    if (!shouldLoadHeroVideo || !heroVideoRef.current) return;

    heroVideoRef.current.load();
    heroVideoRef.current.play().catch(() => {});
  }, [shouldLoadHeroVideo]);

  return (
    <section className="hero section-full" id="top">
      <video
        ref={heroVideoRef}
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/assets/hero-poster.jpg"
        aria-hidden="true"
      >
        {shouldLoadHeroVideo ? (
          <source src="/assets/hero-bg-720.webm" type="video/webm" />
        ) : null}
      </video>
      <div className="hero-motion" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="hero-noise" aria-hidden="true" />
      <Header onContactClick={onContactClick} />
      <div className="hero-inner">
        <p className="eyebrow">Portfolio 2026</p>
        <nav className="hero-nav-pill" aria-label="作品集导航">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <h1 className="hero-title">
          <span className="hero-title-line">
            <span className="hero-title-text">谭鹏旭</span>
          </span>
          <span className="hero-title-line hero-title-line-sub">
            <span className="hero-title-text">个人作品集</span>
          </span>
        </h1>
        <div className="hero-bottom">
          <p>
            影视剪辑/视觉设计 / AI 设计 / 品牌设计，专注影像后期、动态包装、品牌视觉与 AI 辅助创作
          </p>
          <div className="hero-tags" aria-label="设计方向">
            <span>Motion</span>
            <span>Brand</span>
            <span>AI Design</span>
            <span>Post Production</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Profile() {
  return (
    <section
      className="profile section-pad motion-section"
      id="profile"
      data-kicker="PROFILE"
    >
      <div className="container profile-grid">
        <BorderGlow className="identity-glow" innerClassName="identity-visual">
          <img
            src="/assets/identity-mark.jpg"
            alt="抽象设计师身份视觉"
            loading="lazy"
            decoding="async"
          />
          <div className="identity-caption">
            <span>Digital Media Art Design</span>
            <strong>Jining Polytechnic College</strong>
          </div>
        </BorderGlow>
        <div className="profile-copy">
          <p className="eyebrow">Profile</p>
          <h2>从影像现场到品牌画面，把内容做得清晰、有质感。</h2>
          <p className="lead">
            我是谭鹏旭，数字媒体艺术设计专业毕业，具备摄影、摄像和视频后期制作基础。熟悉剪映、DaVinci
            Resolve、After Effects、Adobe Photoshop、Adobe Illustrator 等软件，能够完成拍摄、剪辑、调色、包装和平面视觉的基础制作流程。
          </p>
          <p>
            我关注短视频、广告片和影视画面的表达方式，也在学习 AI 创作与提示词协作。工作中能够接受修改意见，持续提升审美、执行与学习能力。
          </p>
          <div className="profile-meta">
            <a href={`tel:${contact.phone}`}>{contact.phone}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
          <div className="stats-grid">
            {stats.map((item) => (
              <BorderGlow
                className="stat-glow"
                innerClassName="stat-card"
                key={item.label}
                borderRadius={24}
                glowRadius={26}
              >
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </BorderGlow>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const activeVideo = activeProject?.videos?.[activeVideoIndex];

  useEffect(() => {
    if (!activeProject) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveProject(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProject]);

  return (
    <section
      className="projects section-pad motion-section"
      id="projects"
      data-kicker="SELECTED PROJECTS"
    >
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Selected Projects</p>
          <h2>项目展示</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => {
            const hasVideos = project.videos.length > 0;

            return (
              <BorderGlow
                as="button"
                type="button"
                className={`project-glow project-trigger ${
                  hasVideos ? "" : "is-empty"
                }`}
                innerClassName="project-card"
                key={project.title}
                borderRadius={30}
                glowRadius={48}
                disabled={!hasVideos}
                onClick={() => {
                  if (!hasVideos) return;
                  setActiveProject(project);
                  setActiveVideoIndex(0);
                }}
                aria-label={
                  hasVideos ? `预览${project.title}` : `${project.title}暂无视频`
                }
              >
                <img
                  src={project.image}
                  alt={`${project.title}视觉封面`}
                  loading="lazy"
                  decoding="async"
                />
                <div className="project-content">
                  <span>{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <small>{project.meta}</small>
                  {hasVideos ? (
                    <strong className="project-action">
                      预览 {project.videos.length} 个视频
                    </strong>
                  ) : null}
                </div>
              </BorderGlow>
            );
          })}
        </div>
      </div>
      {activeProject && activeVideo ? createPortal((
        <div className="video-modal" role="dialog" aria-modal="true">
          <button
            className="video-modal-backdrop"
            type="button"
            onClick={() => setActiveProject(null)}
            aria-label="关闭视频预览"
          />
          <BorderGlow
            className="video-dialog"
            innerClassName="video-dialog-inner"
            borderRadius={32}
            glowRadius={58}
          >
            <div className="video-dialog-head">
              <div>
                <p className="eyebrow">{activeProject.category}</p>
                <h3>{activeProject.title}</h3>
              </div>
              <button
                className="video-close"
                type="button"
                onClick={() => setActiveProject(null)}
              >
                关闭
              </button>
            </div>
            <video
              key={activeVideo.src}
              className="video-player"
              src={activeVideo.src}
              poster={activeProject.image}
              preload="metadata"
              controls
              autoPlay
              playsInline
            />
            <div className="video-playlist">
              {activeProject.videos.map((video, index) => (
                <button
                  className={index === activeVideoIndex ? "is-active" : ""}
                  key={video.src}
                  type="button"
                  onClick={() => setActiveVideoIndex(index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {video.title}
                </button>
              ))}
            </div>
          </BorderGlow>
        </div>
      ), document.body) : null}
    </section>
  );
}

function Strengths() {
  return (
    <section
      className="strengths section-pad motion-section"
      id="strengths"
      data-kicker="CAPABILITIES"
    >
      <div className="container">
        <div className="section-heading wide">
          <p className="eyebrow">Capabilities</p>
          <h2>个人优势</h2>
          <div className="tool-strip" aria-label="常用工具">
            {tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </div>
        <div className="strength-grid">
          {strengths.map((item, index) => (
            <BorderGlow
              as="article"
              className="strength-glow"
              innerClassName="strength-card"
              key={item.title}
              borderRadius={24}
              glowRadius={30}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactEnd() {
  return (
    <section
      className="contact-end section-full motion-section"
      id="contact"
      data-kicker="CONTACT"
    >
      <div className="container contact-grid">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>让影像、品牌和 AI 创意在同一个画面里工作。</h2>
        </div>
        <BorderGlow
          className="contact-glow"
          innerClassName="contact-panel"
          glowRadius={44}
        >
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={`tel:${contact.phone}`}>{contact.phone}</a>
        </BorderGlow>
      </div>
      <footer className="site-footer">
        <span>Tan Pengxu Portfolio</span>
        <a href="#top">Back to top</a>
      </footer>
    </section>
  );
}

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  usePortfolioMotion();

  return (
    <main>
      <FloatingNav onContactClick={() => setIsContactOpen(true)} />
      <Hero onContactClick={() => setIsContactOpen(true)} />
      <div className="below-hero-bg">
        <Profile />
        <Projects />
        <Strengths />
        <ContactEnd />
      </div>
      <ContactQrModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
}
