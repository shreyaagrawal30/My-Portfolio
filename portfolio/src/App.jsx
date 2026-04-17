/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import './App.css';
import profilePic from './assets/profile.jpeg';
import React from 'react';
import vendorImg from './assets/VendorPerformance.png';

/* ─── React Bits: SpotlightCard ────────────────────────────────────────────── */
function SpotlightCard({ children, className = '' }) {
  const ref = React.useRef(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      ref={ref}
      className={`spotlight-card ${className}`}
      onMouseMove={e => {
        const r = ref.current.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="spotlight-glow"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, rgba(192,132,252,0.18), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}

/* ─── React Bits: ShinyText ─────────────────────────────────────────────────── */
function ShinyText({ children, className = '' }) {
  return <span className={`shiny-text ${className}`}>{children}</span>;
}

function App() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const [showScroll, setShowScroll] = React.useState(false);
  const [formStatus, setFormStatus] = React.useState('');

  React.useEffect(() => {
    const check = () => setShowScroll(window.pageYOffset > 400);
    window.addEventListener('scroll', check);
    return () => window.removeEventListener('scroll', check);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSubmit = async e => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xzdkepek', {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) { setFormStatus('success'); e.target.reset(); }
      else setFormStatus('error');
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div className="portfolio-container">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">shreya<span className="dot">.</span>dev</div>
          <ul className="nav-links">
            <li><a href="#about-me">About</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <motion.header
        id="about"
        className="hero"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Hi, I&apos;m <span className="gradient-text">Shreya</span></h1>
            <p className="role">Data Analyst · Machine Learning Researcher · Software Developer</p>
            <p className="hero-bio">
              I build data-driven systems that turn large, complex datasets into actionable insights.
              My work spans machine learning, ETL pipelines, and full-stack development.
            </p>
            <div className="hero-buttons">
              <a href="#contact" className="cta-button primary">Contact Me</a>
              <a href="#projects" className="cta-button secondary">View Work</a>
            </div>
          </motion.div>

          <motion.div
            className="hero-image-container"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img src={profilePic} alt="Shreya Agrawal" className="profile-img" />
          </motion.div>
        </div>
      </motion.header>

      {/* ABOUT ME */}
      <motion.section
        id="about-me"
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="section-title"><ShinyText>About Me</ShinyText></h2>
        <div className="about-content">
          <p>
            I&apos;m a fourth-year <strong>Computer Science student (Economics minor)</strong> at <strong>University of Alberta</strong> focused on building data-driven systems that create real impact. My core interest is in data—designing pipelines, uncovering patterns, and developing intelligent models—combined with frontend development to deliver clear, intuitive user experiences.
          </p>
          <p>
            I bring a strong work ethic, attention to detail, and a commitment to building high-quality, scalable solutions. I&apos;m constantly pushing myself to learn and improve, whether working with machine learning models or full-stack applications.
          </p>
          <p>
            As a member of <strong>ConnectAB (WTC) and RTC</strong>, I actively collaborate with peers and engage with the broader tech community to stay at the forefront of emerging technologies.
          </p>
        </div>
      </motion.section>

      {/* VOLUNTEER */}
      <motion.section
        id="volunteer"
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="section-title"><ShinyText>Volunteer</ShinyText></h2>
        <div className="timeline">

          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-left">
              <div className="timeline-date">July 2024 – Sep 2024</div>
            </div>
            <SpotlightCard className="timeline-card">
              <h3>Front-end Developer Intern</h3>
              <h4>Credwise · Edmonton, AB</h4>
              <ul>
                <li>Engineered a responsive web interface for a <strong>neo-banking platform</strong> using <strong>Angular</strong> and Git, ensuring a timely product launch.</li>
                <li>Translated complex <strong>Figma wireframes</strong> into clean, accessible, and high-performance UI components.</li>
                <li>Developed a custom <strong>image-processing tool</strong> for secure bank card uploads, enhancing data accuracy and user onboarding.</li>
                <li>Collaborated with backend teams to integrate <strong>RESTful APIs</strong> while maintaining strict banking security standards.</li>
              </ul>
            </SpotlightCard>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-left">
              <div className="timeline-date">Aug 2023 – Mar 2024</div>
            </div>
            <SpotlightCard className="timeline-card">
              <h3>Resident Assistant</h3>
              <h4>University of Alberta</h4>
              <ul>
                <li>Led community-building initiatives for student residents, fostering an inclusive and supportive living environment.</li>
                <li>Managed conflict resolution and provided <strong>peer support and crisis intervention</strong> for a diverse student population.</li>
                <li>Coordinated with housing administration to enforce safety protocols and organize large-scale educational events.</li>
              </ul>
            </SpotlightCard>
          </div>

        </div>
      </motion.section>

      {/* EXPERIENCE */}
      <motion.section
        id="experience"
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="section-title"><ShinyText>Experience</ShinyText></h2>
        <div className="timeline">

          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-left">
              <div className="timeline-date">May 2025 – Aug 2025</div>
            </div>
            <SpotlightCard className="timeline-card">
              <h3>Software Developer Intern</h3>
              <h4>CircuitWare</h4>
              <ul>
                <li>Engineered a high-performance <strong>Python and SQLite</strong> tool for SKU validation, streamlining inventory management workflows.</li>
                <li>Built a secure, full-stack <strong>React and Node.js</strong> application featuring robust user authentication and a responsive UI.</li>
                <li>Designed automated <strong>ETL pipelines</strong> that reduced manual data entry and validation effort by <strong>30%</strong>.</li>
                <li>Implemented a versioned database schema to enable audit tracking and historical data visualization.</li>
              </ul>
            </SpotlightCard>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-left">
              <div className="timeline-date">Sep 2024 – Sep 2025</div>
            </div>
            <SpotlightCard className="timeline-card">
              <h3>Machine Learning Undergraduate Researcher</h3>
              <h4>Computing Research Association & University of Alberta</h4>
              <ul>
                <li>Developed and optimized a multimodal <strong>VQ-VAE using PyTorch</strong> to encode a dataset of 9,000+ images and associated metadata.</li>
                <li>Architected end-to-end data preprocessing and GPU-accelerated training pipelines, reducing model convergence time.</li>
                <li>Achieved a high-fidelity reconstruction error of <strong>~0.066</strong>, ensuring minimal information loss during compression.</li>
                <li>Leveraged clustering algorithms on learned embeddings to discover latent patterns and structural relationships within the data.</li>
              </ul>
            </SpotlightCard>
          </div>

        </div>
      </motion.section>

      {/* PROJECTS */}
      <motion.section
        id="projects"
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="section-title"><ShinyText>Projects</ShinyText></h2>
        <div className="projects-grid">

          <SpotlightCard className="project-card">
            <div className="project-image-wrapper">
              <img src={vendorImg} alt="Vendor Analytics" className="project-img" />
              <div className="project-github-link">
                <a href="https://github.com/shreyaagrawal30/Vendor-Performance-Analysis" target="_blank" rel="noreferrer">
                  <i className="devicon-github-original" />
                </a>
              </div>
            </div>
            <div className="project-info">
              <h3>Vendor Performance Analytics</h3>
              <p>An ETL pipeline and dashboard system processing 1M+ records to uncover vendor dependencies.</p>
              <div className="tags">
                <span><i className="devicon-python-plain colored" /> Python</span>
                <span><i className="devicon-sqlite-plain colored" /> SQLite</span>
                <span><i className="devicon-powerbi-plain colored" /> Power BI</span>
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard className="project-card">
            <div className="project-image-wrapper">
              <img src="/social-platform.jpg" alt="Social Distribution" className="project-img" />
              <div className="project-github-link">
                <a href="https://github.com/shreyaagrawal30/SocialDistribution" target="_blank" rel="noreferrer">
                  <i className="devicon-github-original" />
                </a>
              </div>
            </div>
            <div className="project-info">
              <h3>Social Distribution Platform</h3>
              <p>A distributed social network with 40+ REST APIs and PostgreSQL data modeling.</p>
              <div className="tags">
                <span><i className="devicon-django-plain colored" /> Django</span>
                <span><i className="devicon-postgresql-plain colored" /> PostgreSQL</span>
                <span><i className="devicon-react-original colored" /> React</span>
              </div>
            </div>
          </SpotlightCard>

        </div>
      </motion.section>

      {/* CONTACT */}
      <motion.section
        id="contact"
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="section-title"><ShinyText>Contact Me</ShinyText></h2>
        <div className="contact-container">

          <div className="contact-info">
            <p>
              I&apos;m currently looking for new opportunities! Whether you have a question or just want to say hi, my inbox is always open.
            </p>
            <div className="social-links">
              <a href="mailto:shreyaagr05@gmail.com" className="social-item">
                <i className="devicon-google-plain colored" /> Email
              </a>
              <a href="https://www.linkedin.com/in/shreya-agrawal30/" target="_blank" rel="noreferrer" className="social-item">
                <i className="devicon-linkedin-plain colored" /> LinkedIn
              </a>
              <a href="https://github.com/shreyaagrawal30" target="_blank" rel="noreferrer" className="social-item">
                <i className="devicon-github-original" /> GitHub
              </a>
              <a href="/Shreya_Agrawal_Resume.pdf" download className="social-item resume-link-contact">
                <i className="devicon-file-pdf-plain colored" /> Download Resume
              </a>
            </div>
          </div>

          <div className="contact-form-wrapper">
            {formStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="success-message"
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                <h3>Message Sent!</h3>
                <p style={{ color: 'var(--text-soft)', marginTop: '0.5rem' }}>
                  Thanks for reaching out! I will get back to you soon.
                </p>
                <button className="cta-button secondary" style={{ marginTop: '1.5rem' }} onClick={() => setFormStatus('')}>
                  Send another?
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group"><input type="text" name="name" placeholder="Your Name" required /></div>
                <div className="form-group"><input type="email" name="email" placeholder="Your Email" required /></div>
                <div className="form-group"><textarea name="message" rows="5" placeholder="Anything you want to say..." required /></div>
                <button type="submit" className="cta-button primary" disabled={formStatus === 'sending'}>
                  {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
                {formStatus === 'error' && (
                  <p style={{ color: '#ff4d4d', marginTop: '10px' }}>Oops! Something went wrong.</p>
                )}
              </form>
            )}
          </div>

        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="footer">
        <p className="copyright">© 2025 Shreya Agrawal</p>
      </footer>

      {/* SCROLL TO TOP */}
      {showScroll && (
        <button className="scroll-top" onClick={scrollTop}>
          <span style={{ fontSize: '1.5rem' }}>↑</span>
        </button>
      )}

    </div>
  );
}

export default App;
