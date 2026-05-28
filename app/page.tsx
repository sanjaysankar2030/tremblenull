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
    const commands = ["javac", "tcc", "python3", "go run"];
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

              {/* Profile Image — FIX: removed non-standard w-120, use proper responsive sizing */}
              <div className="relative h-40 w-40 sm:h-52 sm:w-52 md:h-64 md:w-64 overflow-hidden flex-shrink-0 rounded-4xl">
                <Image
                  src="/178389178.jfif"
                  alt="Profile"
                  fill
                  className="object-contain "
                  priority
                />
                {/* <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background via-background/60 to-transparent backdrop-blur-[1px]" /> */}
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
                  {/* <span className="text-foreground/40">•</span> */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-foreground/40">•</span>
                    <span>Based In TamilNadu , India</span>
                    <span className="text-foreground/40">•</span>
                    <span className="tabular-nums">{time || "00:00:00"}</span>
                    <span className="text-xs uppercase tracking-widest">IST</span>
                  </div>
                  <span className="text-foreground/40">•</span>
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
                  title="National Institute of Technology Hamirpur"
                  role="Electrical Engineering"
                >
                  <p>2022 - Surviving</p>
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
              <p>
                a full-stack developer and <a href="https://en.wikipedia.org/wiki/Product_design" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors">product builder</a> with deep experience across engineering, product strategy, and user-centric design.
              </p>
              <p>
                a <a href="https://en.wikipedia.org/wiki/Polymath" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors">polymath</a> who bridges technical architecture with business outcomes to create impactful, scalable solutions.
              </p>
            </div>



            {/* Experience Section */}
            <div id="experience" className="mt-16 mb-16 w-full text-left scroll-mt-28">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Experience
              </h2>
              <div className="space-y-12">
                <ExperienceItem
                  title="Resonate (YC W26)"
                  role="Software Engineer, San Francisco, CA"
                  collapsible={true}
                  link="https://www.ycombinator.com/companies/resonate"
                >
                  <div className="space-y-2">
                    <p>As an early software engineer bridging product strategy and technical execution, I am driving the development of an AI-native messaging platform from zero to one.</p>
                    <p>Key focus areas include:</p>
                    <ul className="list-disc list-inside space-y-1 pl-2">
                      <li>Architecting and building core product features for an AI-focused messaging ecosystem.</li>
                      <li>Developing real-time systems and innovating ways to transform and present information dynamically within messaging interfaces.</li>
                      <li>Collaborating within a lean team to build robust tools for AI-driven communication.</li>
                      <li>Operating top-to-bottom, from product conception to complete software development.</li>
                    </ul>
                    <p>Transitioning into this founding-level role has been an incredibly rewarding next step following my previous startup ventures.</p>
                  </div>
                </ExperienceItem>

                <ExperienceItem
                  title="Entrepreneur First"
                  role="Founder in Residence, Bengaluru"
                  collapsible={true}
                  link="https://www.joinef.com/"
                >
                  <div className="space-y-2">
                    <p>As a Founder in Residence at Entrepreneurs First (EF), a premier global talent investor and startup accelerator, I was immersed in designing and developing cutting-edge Agentic AI systems.</p>
                    <p>Built autonomous, goal-driven AI agents that shifted from suggestion-based tools to proactive execution, enabling seamless human-AI collaboration and redefining task automation and decision-making.</p>
                    <p>Drove a bold vision for the future of computing: making traditional web browsing obsolete, turning personal data into the primary interface, and empowering agentic systems to independently handle complex responsibilities.</p>
                    <p>Operated in a high-intensity environment surrounded by world-class cofounders, mentors, and resources, using EF's structured support to explore, validate, and iterate on ideas at pace.</p>
                    <p>Positioned at the forefront of a paradigm shift in AI, tackling hard technical and conceptual challenges to create meaningful, scalable impact in the emerging agentic era.</p>
                  </div>
                </ExperienceItem>

                <ExperienceItem
                  title="Google Summer of Code 2025"
                  role="Emory University School of Medicine, Atlanta, USA"
                  collapsible={true}
                  link="https://minimalistbook.com/gsoc-final-report-2025/"
                >
                  <div className="space-y-2">
                    <p>Designed and developed a comprehensive system for managing Access Control List (ACL) permissions across multiple Linux file system servers, including NFS and BeeGFS, demonstrating expertise in large-scale distributed systems and secure file management.</p>
                    <p>Built a robust backend capable of processing millions of permission change requests, showcasing proficiency in high-performance computing and scalability.</p>
                    <p>Implemented two Linux systemd daemons communicating via Unix sockets: one for gRPC-based backend interactions and another for executing ACL changes, highlighting skills in daemon development, inter-process communication, and system-level programming.</p>
                    <p>Created a user-friendly Next.js frontend enabling secure login, backend communication, and scheduling of permission requests, illustrating full-stack development capabilities and focus on intuitive user experiences.</p>
                  </div>
                </ExperienceItem>

                <ExperienceItem
                  title="Professional Freelancer (Technical GTM)"
                  role="Technical Writer, Tel Aviv, Israel"
                  collapsible={true}
                  link="https://www.upwork.com/freelancers/~0172a072394ece49bb?viewMode=1"
                >
                  <div className="space-y-2">
                    <p>Authored comprehensive, highly technical documentation (50+ pages) for a Software Composition Analysis (SCA) tool, including detailed guides on advanced features such as reachability analysis - focusing on identifying truly exploitable vulnerabilities in open-source dependencies to reduce noise and prioritize remediation in secure software development lifecycles.</p>
                    <p>Ghostwrote in-depth content on Reachability Analysis for the CTO of a security company, explaining how it enhances SCA by determining whether detected vulnerabilities are actually reachable and exploitable in the application's codebase - delivering clear, authoritative thought leadership material suitable for blogs, whitepapers, or technical marketing.</p>
                    <p>Deployed and configured Flipt (an open-source, Git-native feature flagging platform) on cloud infrastructure to support video production workflows for a feature flagging provider; troubleshot and resolved operational issues to ensure reliable, production-ready performance in a dynamic environment.</p>
                    <p>Developed custom scraping tools for a proxy provider targeting real estate platforms, enabling efficient data extraction while adhering to technical and ethical constraints; rapidly produced high-quality articles and technical write-ups on the tools, scraping methodologies, and platform integrations to support knowledge sharing and client deliverables.</p>
                  </div>
                </ExperienceItem>

                <ExperienceItem
                  title="Engineering Intern"
                  role="Athena Consulting Ltd. Dubai"
                  collapsible={true}
                >
                  <div className="space-y-2">
                    <p>Led the complete system design and deployment architecture for Eumlet, a UAE-based B2B Web3 payments and financial platform (built on Next.js), on AWS infrastructure. Configured Debian EC2 instances, Application Load Balancer (ALB), and NGINX reverse proxy under senior guidance - ensuring high availability, scalability, and secure handling of financial transactions in a regulated environment.</p>
                    <p>Engineered automated CI/CD pipelines using GitHub Actions for seamless build, test, and deployment workflows, with direct integration and manual orchestration to EC2 targets - demonstrating strong expertise in modern DevOps practices, infrastructure as code principles, and zero-downtime deployments for production fintech applications.</p>
                    <p>Managed a team of 4 developers while simultaneously supporting two high-value clients: Lunarspace and Concordium (a privacy-focused Layer-1 blockchain platform) - balancing tight deadlines, client expectations, and resource constraints in a fast-paced environment. Authored comprehensive legal and technical developer handbooks to standardize onboarding, compliance, and best practices for new recruits.</p>
                    <p>Collaborated remotely with BGTrade (China-based financial platform team) on global security audits and production deployments of sensitive financial systems - coordinating across time zones and cultures to identify vulnerabilities, implement hardening measures, and ensure secure, compliant rollouts in cross-border fintech ecosystems.</p>
                  </div>
                </ExperienceItem>
              </div>
            </div>

            {/* In Between These Experiences Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                In Between These Experiences
              </h2>
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 md:p-8">
                <ExperienceItem
                  title="The Product Building Journey"
                  role=""
                  collapsible={true}
                >
                  <div className="space-y-4">
                    <p>I've been building and experimenting on the product side for a long time. Each previous product always feels naive in hindsight, but looking back, I can see they were incrementally better, each iteration teaching me something new about users, infrastructure, and what it takes to build something people actually want.</p>
                    <p>It started with <span className="font-medium">MetaWiper</span> during my sophomore year, a tool that cleaned image metadata. No one would use it, but I was proud. It was my first real attempt at shipping something complete.</p>
                    <p>Next came <span className="font-medium">Stockic</span>, a news app where I spent months doing serious infrastructure work. This was where I learned to build systems that could scale, not just features that looked good.</p>
                    <p>Then I worked on <span className="font-medium">Gloss Card</span>, and for the first time, a customer actually wanted to buy it for their product. That validation, knowing someone saw enough value to pay, was a turning point.</p>
                    <p>After that, I built <span className="font-medium">NeuraLeap</span>, where I had the most meaningful user interactions yet, HRs from established firms. I worked on data pipelines capable of handling 50 million LinkedIn profiles and processing them with AI. The scale was different, the stakes were higher, and the technical challenges forced me to level up.</p>
                    <p>Most recently, I worked on <span className="font-medium">Meteor</span>, an AI SEO toolkit at Entrepreneurs First. This time, my product was being used by 6 YC-backed companies. Real users. Real traction. Real feedback loops.</p>
                    <p className="font-medium text-black dark:text-white">So yes, hard work and consistency pay off. Each product was a step forward, even when it didn't feel like it at the time.</p>
                  </div>
                </ExperienceItem>
              </div>
            </div>

            {/* Education Section
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Education
              </h2>
              <div className="space-y-12">
                <ExperienceItem
                  title="National Institute of Technology Hamirpur"
                  role="Electrical Engineering"
                >
                  <p>2022 - Surviving</p>
                </ExperienceItem>
              </div>
            </div> */}

            {/* Contributions Section
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                GitHub Contributions
              </h2>
              <GithubGraph />
            </div> */}

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

            {/* Research Publications Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Research Publications
              </h2>
              <div className="space-y-12">
                <ExperienceItem
                  title="Cross-Compatible Encryption Adapter for Securing Legacy Modbus Devices"
                  role=""
                  collapsible={true}
                  collapsedHeight="max-h-40"
                >
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">
                        2025 17th International Conference on COMmunication Systems and NETworks (COMSNETS)
                      </p>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                        <p className="text-gray-600 dark:text-gray-400">Authors: Aditya Patil; T. S. Sreeram</p>
                        <a
                          href="https://doi.org/10.1109/COMSNETS63942.2025.10885597"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs font-medium text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          View Publication
                        </a>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 font-bold">Abstract</p>
                      <p className="text-gray-600 dark:text-gray-400">Supervisory Control and Data Acquisition systems are the backbone of managing critical infrastructure in modern industrial control systems, spanning sectors from power generation to logistics. However, these systems face significant challenges due to threats from malicious actors. The Modbus protocol, despite its known lack of security features, is still used in many industries managing critical infrastructure due to the high cost of replacing existing systems. As a result, these legacy systems remain vulnerable to potentially damaging threats. This paper proposes an adapter device for enhancing the security of the Modbus protocol without replacing devices in legacy systems. The proposed adapter is cost-efficient, provides cross-platform support, and is easy to install, update, and maintain.</p>
                    </div>
                  </div>
                </ExperienceItem>
              </div>
            </div>

            {/* Videos Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Explainer Videos
              </h2>
              <div className="space-y-3 text-lg text-gray-600 dark:text-gray-400">
                <p>
                  here is how i explain complex systems on my{" "}
                  <a
                    href="https://www.youtube.com/@theracecondition"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    youtube channel
                  </a>
                </p>
                <p>
                  watch me build{" "}
                  <a
                    href="https://www.youtube.com/watch?v=m84tBP_4DWE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    spotify system design
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

            {/* Thing about me Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Thing about me
              </h2>
              <div className="space-y-6">
                <p className="w-full text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                  beyond engineering and build systems, i find balance in the tactile and the thoughtful. whether it&apos;s exploring the nuances of complex architectures or spending time in the real world, my approach to life is driven by curiosity and a desire to understand how things work at their core.
                </p>
                <p className="w-full text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                  i believe that the best products are built by people who have a diverse range of interests. it&apos;s the unique combination of technical depth and human perspective that allows us to create technology that actually resonates.
                </p>
              </div>
            </div>

            {/* Get in Touch Section */}
            <div id="contact" className="mb-16 w-full text-left scroll-mt-28">
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