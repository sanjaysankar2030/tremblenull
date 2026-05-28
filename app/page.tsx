"use client";

import Image from "next/image";
import { Github, Linkedin, Youtube, Calendar, Bot, User, QrCode, X, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { ExperienceItem } from "./components/ExperienceItem";
import { GithubGraph } from "./components/GithubGraph";
import { TechStack } from "./components/TechStack";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { QRCodeSVG } from "qrcode.react";
import { ThemeToggle } from "./components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

import { getMarkdownContent } from "./data/content";

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1971.3728.2914a.077.077 0 01-.0066.1277 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
  </svg>
);


export default function Home() {
  const [time, setTime] = useState<string>("");
  const [showQR, setShowQR] = useState(false);
  const [mode, setMode] = useState<"human" | "agent">("human");
  // FIX: removed unused libraryExpanded state

  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const markdownContent = getMarkdownContent(time);
  const [command, setCommand] = useState("javac");

  useEffect(() => {
    const commands = ["javac", "tcc", "python3", "go run", "mvn spring-boot:run", 'mysql -u root -p', "make run"];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % commands.length;
      setCommand(commands[currentIndex]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Smooth scroll helper
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-background text-foreground px-4 pt-16 selection:bg-foreground dark:selection:bg-background selection:text-background dark:selection:text-foreground pb-32 sm:px-6 sm:pt-24 sm:pb-40 overflow-x-hidden transition-colors duration-300">

      {/* Desktop Floating Navbar — hidden on mobile */}
      {mode === "human" && (
        <div className="fixed top-6 left-1/2 z-50 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-foreground/20 bg-background/90 px-3 py-2 backdrop-blur-md sm:flex shadow-sm">
          {[
            { label: "Intro", id: "intro" },
            { label: "About", id: "about" },
            { label: "Experience", id: "experience" },
            { label: "Contact", id: "contact" }
          ].map((nav) => (
            <a
              key={nav.id}
              href={`#${nav.id}`}
              onClick={(e) => handleScroll(e, nav.id)}
              className="rounded-full px-3 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-black dark:text-gray-400 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              {nav.label}
            </a>
          ))}
        </div>
      )}

      {/* FIX: Top-right controls — mode toggle + theme toggle (theme toggle visible on mobile here) */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3 sm:top-6 sm:right-6">
        {/* Theme toggle visible on mobile since sidebar is hidden */}
        <div className="sm:hidden">
          <ThemeToggle />
        </div>

        <button
          onClick={() => setMode(mode === "human" ? "agent" : "human")}
          className="group relative flex h-7 w-12 cursor-pointer rounded-full bg-gray-200 dark:bg-zinc-700 p-1 transition-colors duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-zinc-600 focus:outline-none"
          role="switch"
          aria-checked={mode === "agent"}
          title={`Switch to ${mode === "human" ? "agent" : "human"} mode`}
        >
          <div
            className={`flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow-sm transition duration-200 ease-in-out ${mode === "agent" ? "translate-x-5" : "translate-x-0"}`}
          >
            {mode === "human" ? (
              <User className="h-3 w-3 text-black" />
            ) : (
              <Bot className="h-3 w-3 text-black" />
            )}
          </div>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {mode === "agent" ? (
          /* Agent Mode - Markdown View */
          <motion.main
            key="agent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex w-full max-w-2xl flex-col items-start text-left px-0"
          >
            <pre
              className="w-full whitespace-pre-wrap font-mono text-sm leading-relaxed text-black dark:text-gray-300 selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black antialiased"
              style={{ fontFamily: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Console", monospace' }}
            >
              {markdownContent}
            </pre>
          </motion.main>
        ) : (
          /* Human Mode - Original View */
          <motion.main
            key="human"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex w-full max-w-2xl flex-col items-center text-center pt-8 sm:pt-4"
          >
            {/* FIX: Profile image + intro — stacks vertically on mobile, side-by-side on md+ */}
            <div id="intro" className="w-full flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-12 mb-16 scroll-mt-28">

              <div className="relative h-40 w-40 sm:h-52 sm:w-52 md:h-64 md:w-64 overflow-hidden flex-shrink-0 rounded-4xl">
                <Image
                  src="/178389178.jfif"
                  alt="Profile"
                  fill
                  className="object-contain "
                  priority
                />
              </div>

              {/* Typography Content */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left w-full min-w-0">
                {/* FIX: removed whitespace-nowrap which caused overflow on mobile */}
                <div className="mb- flex flex-col items-center md:items-start gap-1 w-full">
                  <span className="font-mono text-lg sm:text-2xl md:text-33xl text-foreground/50 tracking-tight">
                    <span className="text-foreground/30 select-none">❯ </span>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={command}
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        transition={{ duration: 0.30, ease: "easeOut" }}
                        className="inline-block align-baseline"
                      >
                        {command}
                      </motion.span>
                    </AnimatePresence>
                  </span>

                  <h1 className="text-3xl font-bold tracking-normal sm:text-4xl md:text-5xl font-mono text-foreground leading-tight text-center md:text-left w-full">
                    Sanjay Sankar
                  </h1>
                </div>

                {/* Phonetic & Time — FIX: wraps gracefully on mobile */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 text-sm sm:text-base font-semibold text-foreground/80 sm:text-lg">
                  <div className="flex items-center gap-1.5">
                    <span className="text-foreground/40">•</span>
                    <span>Based In TamilNadu , India</span>
                    <span className="text-foreground/40">•</span>
                    <span className="tabular-nums">{time || "00:00:00"}</span>
                    <span className="text-xs uppercase tracking-widest">IST</span>
                  </div>
                  <span>/சஞ்சய் சங்கர்/</span>
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Education
              </h2>
              <div className="space-y-12">
                <ExperienceItem
                  title="Velalar College of Engineering and Technology , Erode "
                  role="AI & Data Science Engineering"
                >
                  <p>2022 - Present</p>
                </ExperienceItem>
              </div>
            </div>

            {/* Contributions Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                GitHub Contributions
              </h2>
              <GithubGraph />
            </div>

            {/* About Section */}
            <div id="about" className="w-full space-y-4 text-left text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg md:text-xl scroll-mt-28">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                About me
              </h2>
              <p>
                a backend & ML engineer who builds{" "}
                <a href="https://en.wikipedia.org/wiki/Scalability" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors">
                  scalable systems
                </a>{" "}
                and trains models that actually ship — not just notebooks that sit on a drive.
              </p>
              <p>
                currently crafting a{" "}
                <a href="https://go.dev" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors">
                  lightweight ML library in Go
                </a>
                , because understanding something deeply means building it from scratch.
              </p>
              <p>
                open to{" "}
                <a href="#contact" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors">
                  internships and campus placements
                </a>
                . if you're building something ambitious, let's talk.
              </p>
            </div>
            <hr className="w-full border-t border-gray-200 dark:border-gray-800 my-8" />
            {/* Tech Stack Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Tech Stack
              </h2>
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
                i&apos;m a generalist at heart who can build with anything, but here&apos;s the core stack i&apos;ve spent the most time with:
              </p>
              <TechStack />
            </div>

            {/* Projects Spotlight Section */}
            <div id="experience" className="mt-16 mb-16 w-full text-left scroll-mt-28">
            <hr className="w-full border-t border-gray-200 dark:border-gray-800 my-8" />

              <div className="mb-16 w-full text-left">
                <ExperienceItem

                  title="Projects Spotlight"
                  role="Software Development"
                  collapsible={true}
                  collapsedHeight="max-h-80" // Increased height so the first few are visible
                >
                  <div className="space-y-8 mt-4">

                    <div className="space-y-1">
                      <h3 className="text-gray-900 dark:text-gray-100 font-medium">Java BPE LLM Tokenization Engine</h3>
                      <p className="text-sm text-gray-400 dark:text-gray-500">Core Java</p>
                      <p className="text-gray-600 dark:text-gray-400">Dependency-free Java library implementing Byte Pair Encoding and WordPiece tokenization algorithms used in modern LLMs.</p>
                      <a href="https://sanjaysankar.framer.website/product/java-bpe" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-medium text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300">View Details</a>
                    </div>

                    <hr />
                    <div className="space-y-1">
                      <h3 className="text-gray-900 dark:text-gray-100 font-medium">Go-ML Framework</h3>
                      <p className="text-sm text-gray-400 dark:text-gray-500">Golang</p>
                      <p className="text-gray-600 dark:text-gray-400">Systems-level ML framework ported from C-based nn.h architecture to Go — built to understand model internals from the ground up.</p>
                      <a href="https://sanjaysankar.framer.website/product/go-ml" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-medium text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300">View Details</a>
                    </div>
                    <hr />

                    <div className="space-y-1">
                      <h3 className="text-gray-900 dark:text-gray-100 font-medium">Smart Clinic Management System</h3>
                      <p className="text-sm text-gray-400 dark:text-gray-500">Spring (Java)</p>
                      <p className="text-gray-600 dark:text-gray-400">Full-stack web app handling medical appointments, patient records, and staff scheduling for clinic operations.</p>
                      <a href="https://sanjaysankar.framer.website/product/healthcare" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-medium text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300">View Details</a>
                    </div>
                    <hr />

                    <div className="space-y-1">
                      <h3 className="text-gray-900 dark:text-gray-100 font-medium">Retail-Core: Microservices API Suite</h3>
                      <p className="text-sm text-gray-400 dark:text-gray-500">Spring (Java)</p>
                      <p className="text-gray-600 dark:text-gray-400">RESTful backend suite covering inventory tracking, order processing, and transactional data management at scale.</p>
                      <a href="https://sanjaysankar.framer.website/product/retail-api" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-medium text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300">View Details</a>
                    </div>
                    <hr />

                    <div className="space-y-1">
                      <h3 className="text-gray-900 dark:text-gray-100 font-medium">Pet Care Scheduler</h3>
                      <p className="text-sm text-gray-400 dark:text-gray-500">Core Java</p>
                      <p className="text-gray-600 dark:text-gray-400">Modular console app for managing pet services, built as a deep-dive into advanced Core Java design patterns.</p>
                      <a href="https://sanjaysankar.framer.website/product/hugo-vicario" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-medium text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300">View Details</a>
                    </div>
                    <hr />

                  </div>
                </ExperienceItem>
              </div>
              {/* </div> */}
              {/* Experience Section */}
              {/* <div id="experience" className="mt-16 mb-16 w-full text-left scroll-mt-28"> */}
                          <hr className="w-full border-t border-gray-200 dark:border-gray-800 my-8" />

              <h2 className="text-gray-900 dark:text-gray-100 font-medium text-lg">
                Experience
              </h2>
              <div className="mt-8 space-y-12">
                {/* Internship 1: Infotact */}
                <div className="group relative">
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-baseline">
                    <h3 className="text-gray-900 dark:text-gray-100 font-medium text-lg">
                      Infotact Software Solutions
                    </h3>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Full Stack Java Intern
                    </p>
                  </div>
                  <div className="mt-4 space-y-3 text-gray-600 dark:text-gray-400">
                    <p>
                      Architected and maintained enterprise-level applications using the Spring Boot ecosystem,
                      focusing on scalable backend logic and seamless frontend integration.
                    </p>
                    <ul className="list-disc list-inside space-y-1.5 pl-2 text-sm leading-relaxed">
                      <li>Designed and documented RESTful APIs using Swagger/OpenAPI, ensuring high discoverability and clear documentation.</li>
                      <li>Streamlined development by implementing Lombok for boilerplate reduction and utilized Postman for automated API testing.</li>
                      <li>Optimized data persistence layers and managed relational schemas to support high-concurrency operations.</li>
                    </ul>
                  </div>
                </div>
                <hr />                {/* Internship 2: Cognifiz */}
                <div className="group relative">
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-baseline">
                    <h3 className="text-gray-900 dark:text-gray-100 font-medium text-lg">
                      Cognifiz Solutions
                    </h3>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Machine Learning Intern
                    </p>
                  </div>
                  <div className="mt-4 space-y-3 text-gray-600 dark:text-gray-400">
                    <p>
                      Developed and deployed predictive models, focusing on the end-to-end machine learning lifecycle
                      from data preprocessing to model evaluation.
                    </p>
                    <ul className="list-disc list-inside space-y-1.5 pl-2 text-sm leading-relaxed">
                      <li>Conducted exploratory data analysis (EDA) on large datasets to extract actionable insights and key features.</li>
                      <li>Implemented and fine-tuned supervised and unsupervised learning algorithms to solve specific business challenges.</li>
                      <li>Collaborated on integrating ML models into existing software architectures for efficient real-time inference.</li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

           
            {/* Projects Spotlight Section */}

            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Documentation
              </h2>
              <div className="space-y-3 text-lg text-gray-600 dark:text-gray-400">
                <p>
                  {/* Added mr-3 for a clean gap */}
                  <span className="text-foreground/40 mr-3">•</span>
                  View my professional experience and technical background in my{" "}
                  <a
                    href="https://drive.google.com/file/d/1oqjKdbVtGpeqLFkaaNdL05044bJcgRJ5/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    updated resume
                  </a>
                </p>
                <p>
                  {/* Added mr-3 for a clean gap */}
                  <span className="text-foreground/40 mr-3">•</span>
                  Interested in my architectural approach? check out my{" "}
                  <a
                    href="https://drive.google.com/file/d/1oqjKdbVtGpeqLFkaaNdL05044bJcgRJ5/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    system design breakdowns
                  </a>
                </p>
              </div>
            </div>
            {/* Writings & Blogs Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Writings & Blogs
              </h2>
              <p className="w-full text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                i host my thoughts on{" "}
                <a
                  href="https://medium.com/@adityapatil24680"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black dark:text-white underline underline-offset-4 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                >
                  medium
                </a>{" "}
                rather than building a custom site. instead of overengineering and reinventing the wheel, i prefer leveraging a mature platform that lets me focus on what matters: sharing insights on ai systems, product strategy, and technical architecture.
              </p>
            </div>

            <div className="mb-12 w-full text-left">
              <div id="contact" className="mb-16 w-full text-left scroll-mt-28">

                <h2 className="mb-5 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Things about me
                </h2>
                <div className="space-y-5">
                  <p className="w-full text-base leading-relaxed text-gray-600 dark:text-gray-400">
                    I focus on the intersection of technical rigor and thoughtful architecture. My work is driven by a need to understand systems at a fundamental level—a philosophy shaped by the creators who set the industry’s technical standards.
                  </p>

                  <div className="space-y-3 w-full text-base leading-relaxed text-gray-600 dark:text-gray-400">
                    <p>
                      I value the low-level exploration and "build-from-scratch" mindset of {' '}
                      <a href="https://www.twitch.tv/tsoding" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white underline underline-offset-4 hover:opacity-70">Tsoding</a>.
                    </p>

                    <p>
                      I strive for the utility and minimalism found in {' '}
                      <a href="https://nothings.org/" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white underline underline-offset-4 hover:opacity-70">Sean Barrett&apos;s</a> work—solving complex problems with elegant, single-header simplicity.
                    </p>

                    <p>
                      I’m inspired by the sheer technical range of {' '}
                      <a href="https://www.bellard.org/" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white underline underline-offset-4 hover:opacity-70">Fabrice Bellard</a>, whose innovations across compilers and emulators remain my benchmark for growth.
                    </p>
                  </div>

                  <p className="w-full text-base leading-relaxed text-gray-600 dark:text-gray-400 italic">
                    I believe the best tools are built by those who bridge technical depth with human perspective.
                  </p>
                </div>
              </div>

            
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">
                Get in Touch
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  connect with me on{" "}
                  <a
                    href="https://www.linkedin.com/in/aditya-patil-260a631b2/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    linkedin
                  </a>{" "}
                  or shoot an email to{" "}
                  <a
                    href="mailto:aditya@example.com"
                    className="text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    aditya@example.com
                  </a>
                </p>

                {/* FIX: Desktop-only left sidebar — hidden on mobile */}
                <nav className="fixed left-6 top-1/2 z-50 hidden lg:flex -translate-y-1/2 flex-col items-center gap-7 rounded-3xl border border-gray-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/80 px-4 py-5 shadow-sm backdrop-blur-md transition-all hover:bg-white/90 dark:hover:bg-zinc-900 text-gray-400 dark:text-zinc-500">
                  <div className="flex items-center gap-6">
                    <ThemeToggle />
                  </div>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black dark:hover:text-white transition-colors hover:scale-110"
                    title="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black dark:hover:text-white transition-colors hover:scale-110"
                    title="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black dark:hover:text-white transition-colors hover:scale-110"
                    title="Twitter/X"
                  >
                    <FaXTwitter className="h-5 w-5" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black dark:hover:text-white transition-colors hover:scale-110"
                    title="YouTube"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                  <button
                    onClick={() => setShowQR(true)}
                    className="hover:text-black dark:hover:text-white transition-colors hover:scale-110"
                    title="Show QR Code"
                  >
                    <QrCode className="h-5 w-5" />
                  </button>
                </nav>

                {/* FIX: Mobile social row — horizontal bar at bottom, only shown on mobile */}
                <div className="flex lg:hidden items-center justify-center gap-6 pt-4 text-gray-400 dark:text-zinc-500">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors" title="GitHub">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors" title="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors" title="Twitter/X">
                    <FaXTwitter className="h-5 w-5" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors" title="YouTube">
                    <Youtube className="h-5 w-5" />
                  </a>
                  <button
                    onClick={() => setShowQR(true)}
                    className="hover:text-black dark:hover:text-white transition-colors"
                    title="Show QR Code"
                  >
                    <QrCode className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* QR Code Modal Overlay */}
      {/* FIX: guard window.location.href access behind typeof window check */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQR(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 dark:bg-black/60"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-col items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 w-[calc(100%-2rem)] max-w-xs"
            >
              <button
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="rounded-lg bg-white p-3">
                {typeof window !== "undefined" && (
                  <QRCodeSVG value={window.location.href} size={160} />
                )}
              </div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Scan to share portfolio</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}