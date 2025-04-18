import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Mail, ExternalLink, Code } from "lucide-react";

import { FaGithub, FaCheckCircle } from "react-icons/fa";
import { IoMailSharp, IoCodeDownloadOutline } from "react-icons/io5";
import { BsLinkedin } from "react-icons/bs";

import Profile from "../assets/profile.png";
import Img1 from "../assets/img_1.jpg";
import Cv from "../assets/Aldrin Caballero.pdf";


const TypedText = ({ texts = [" Developer "], speed = 100, delay = 1000 }) => {
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [textArrayIndex, setTextArrayIndex] = useState(0);
    const currentText = texts[textArrayIndex];
  
    useEffect(() => {
      let timer;
      
    
      if (!isDeleting && currentIndex <= currentText.length) {
        timer = setTimeout(() => {
          setDisplayText(currentText.substring(0, currentIndex));
          setCurrentIndex(currentIndex + 1);
        }, speed);
      } 
      
      else if (isDeleting && currentIndex > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentText.substring(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        }, speed / 2);
      }
  
      
      if (currentIndex > currentText.length && !isDeleting) {
        
        timer = setTimeout(() => {
          setIsDeleting(true);
          setCurrentIndex(currentText.length);
        }, delay);
      } else if (currentIndex === 0 && isDeleting) {
        
        timer = setTimeout(() => {
          setIsDeleting(false);
          setTextArrayIndex((textArrayIndex + 1) % texts.length);
        }, delay);
      }
  
      return () => clearTimeout(timer);
    }, [currentIndex, isDeleting, currentText, textArrayIndex, texts, speed, delay]);
  
    return (
      <span className="inline-block">
        {displayText}
        <span className="animate-pulse">|</span>
      </span>
    );
  };
  

const useFadeIn = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domRef.current);
        }
      },
      { threshold }
    );

    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  return [
    domRef,
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
  ];
};

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [refHero, heroVisibility] = useFadeIn();
  const [refAbout, aboutVisibility] = useFadeIn();
  const [refSkills, skillsVisibility] = useFadeIn();
  const [refProjects, projectsVisibility] = useFadeIn();
  const [refContact, contactVisibility] = useFadeIn();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white w-full overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md z-50 py-4 px-6 md:px-16 w-full lg:px-24">
        <div className="flex justify-between items-center w-full">
          <a
            href="#home"
            onClick={() => handleNavClick("home")}
            className="text-2xl font-bold group"
          >
            <span className="text-teal-400">Aldrin</span> Portfolio
            <span className="block h-1 w-0 group-hover:w-full bg-teal-400 transition-all duration-300"></span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-12">
            <a
              href="#home"
              onClick={() => handleNavClick("home")}
              className={`hover:text-teal-400 transition-colors duration-300 ${
                activePage === "home" ? "text-teal-400" : ""
              }`}
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => handleNavClick("about")}
              className={`hover:text-teal-400 transition-colors duration-300 ${
                activePage === "about" ? "text-teal-400" : ""
              }`}
            >
              About
            </a>
            <a
              href="#skills"
              onClick={() => handleNavClick("skills")}
              className={`hover:text-teal-400 transition-colors duration-300 ${
                activePage === "skills" ? "text-teal-400" : ""
              }`}
            >
              Skills
            </a>
            <a
              href="#projects"
              onClick={() => handleNavClick("projects")}
              className={`hover:text-teal-400 transition-colors duration-300 ${
                activePage === "projects" ? "text-teal-400" : ""
              }`}
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={() => handleNavClick("contact")}
              className={`hover:text-teal-400 transition-colors duration-300 ${
                activePage === "contact" ? "text-teal-400" : ""
              }`}
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-gray-900/95 z-40 transform w-full transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-xl w-full">
          <a
            href="#home"
            className={`hover:text-teal-400 transition-colors duration-300 ${
              activePage === "home" ? "text-teal-400" : ""
            }`}
            onClick={() => handleNavClick("home")}
          >
            Home
          </a>
          <a
            href="#about"
            className={`hover:text-teal-400 transition-colors duration-300 ${
              activePage === "about" ? "text-teal-400" : ""
            }`}
            onClick={() => handleNavClick("about")}
          >
            About
          </a>
          <a
            href="#skills"
            className={`hover:text-teal-400 transition-colors duration-300 ${
              activePage === "skills" ? "text-teal-400" : ""
            }`}
            onClick={() => handleNavClick("skills")}
          >
            Skills
          </a>
          <a
            href="#projects"
            className={`hover:text-teal-400 transition-colors duration-300 ${
              activePage === "projects" ? "text-teal-400" : ""
            }`}
            onClick={() => handleNavClick("projects")}
          >
            Projects
          </a>
          <a
            href="#contact"
            className={`hover:text-teal-400 transition-colors duration-300 ${
              activePage === "contact" ? "text-teal-400" : ""
            }`}
            onClick={() => handleNavClick("contact")}
          >
            Contact
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section
        ref={refHero}
        className={`relative px-6 md:px-16 lg:px-24 py-32 min-h-screen flex items-center overflow-hidden transition-all duration-1000 ease-out ${heroVisibility}`}
        id="home"
      >
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-teal-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute right-10 bottom-10 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>

        <div className="flex flex-col md:flex-row items-center gap-12 z-10 mt-5">
          <div className="max-w-lg">
            <p className="text-lg mb-2">
              Hello, I'm{" "}
              <span className="text-teal-400 font-semibold">
                Aldrin Caballero
              </span>
            </p>
            <div className="mb-8">
              <h1 className="text-5xl font-bold mb-4">
                Web{" "}
                <span className="text-teal-400">
                  <TypedText
                    texts={[" Developer ", " Designer ", " Innovator "]}
                    speed={100}
                    delay={1000}
                  />
                </span>
              </h1>
              <p className="text-gray-400 leading-relaxed">
                A passionate developer focused on building clean, efficient, and
                user-friendly digital experiences. I enjoy turning ideas into
                functional, well-designed solutions through code.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a
                href="#projects"
                className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md transition-all duration-300 transform hover:-translate-y-1 text-center"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-gray-600 hover:border-teal-400 text-white font-medium rounded-md transition-all duration-300 transform hover:-translate-y-1 text-center hover:text-teal-400"
              >
                Contact Me
              </a>
            </div>

            <div className="flex gap-4 mt-8">
              <a
                href="https://github.com/aldrin112602"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-teal-800 transition-colors duration-300"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/aldrin02"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-teal-800 transition-colors duration-300"
              >
                <BsLinkedin size={20} />
              </a>
              <a
                href="mailto:caballeroaldrin02@gmail.com"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-teal-800 transition-colors duration-300"
              >
                <IoMailSharp size={20} />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden border-4 border-teal-300 shadow-xl animate-float">
              <img
                src={Profile}
                alt="Profile"
                className="w-94 h-94 object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-teal-600 filter blur-xl opacity-20 -z-10 scale-125 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={refAbout}
        className={`relative px-6 md:px-16 lg:px-24 py-24 transition-all duration-1000 ease-out ${aboutVisibility}`}
        id="about"
      >
        <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-30"></div>

        <h2 className="text-3xl font-bold mb-2">
          About <span className="text-teal-400">Me</span>
        </h2>
        <div className="w-20 h-1 bg-teal-400 mb-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden border-4 border-gray-800 shadow-xl">
              <img src={Img1} alt="About Me" className="w-full h-auto" />
            </div>
            <div className="absolute top-6 -left-6 w-full h-full border-4 border-teal-400 rounded-2xl -z-10"></div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Full-Stack Developer | Creative Builder
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              I’m Aldrin Caballero, a freelance full-stack web developer with
              experience in Laravel, Node.js, React, Flutter, and Ionic. I build
              scalable apps, design clean UIs, and create custom JavaScript
              frameworks to help devs work smarter.
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
              I was once an intern Flutter developer at SupSoft Tech Company,
              where I gained hands-on experience working in a team and was
              exposed to Agile development and sprint-based workflows. That
              experience sparked my passion for collaborative development and
              continuous learning.
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Now, I’m seeking a more stable environment where I can grow
              alongside a team, contribute to real-world projects, and keep
              leveling up as a developer.
            </p>
            <div className="border-t mb-6"></div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <p>
                  <span className="text-teal-400 font-semibold">Name:</span>{" "}
                  Aldrin Caballero
                </p>
                <p>
                  <span className="text-teal-400 font-semibold">
                    Freelance Experience:
                  </span>{" "}
                  3+ Years
                </p>
                <p>
                  <span className="text-teal-400 font-semibold">Location:</span>{" "}
                  Tanay, Rizal, Philippines
                </p>
              </div>
              <div>
                <p>
                  <span className="text-teal-400 font-semibold">Email:</span>{" "}
                  caballeroaldrin02@gmail.com
                </p>
                <p>
                  <span className="text-teal-400 font-semibold">Degree:</span>{" "}
                  BSIT
                </p>
                <p>
                  <span className="text-teal-400 font-semibold">
                    Freelance:
                  </span>{" "}
                  <FaCheckCircle
                    size={18}
                    className="inline-block text-teal-100"
                  />{" "}
                  Available
                </p>
              </div>
            </div>

            <a
              href={Cv}
              download={true}
              className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md transition-all duration-300 transform hover:-translate-y-1 inline-block text-center"
            >
              Download CV{" "}
              <IoCodeDownloadOutline size={46} className="ml-5 inline-block" />
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        ref={refSkills}
        className={`relative px-6 md:px-16 lg:px-24 py-24 bg-gray-800 transition-all duration-1000 ease-out ${skillsVisibility}`}
        id="skills"
      >
        <h2 className="text-3xl font-bold mb-2">
          My <span className="text-teal-400">Skills</span>
        </h2>
        <div className="w-20 h-1 bg-teal-400 mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "HTML & CSS", percentage: 95 },
            { name: "JavaScript", percentage: 90 },
            { name: "ReactJS", percentage: 85 },
            { name: "NodeJS", percentage: 75 },
            { name: "Laravel 11 - 12", percentage: 85 },
            { name: "Flutter", percentage: 80 },
            { name: "Ionic + React", percentage: 80 },
            { name: "TailwindCSS & Bootstrap 5", percentage: 90 },
            { name: "UI/UX Design", percentage: 80 },
            { name: "MySQL & Database Design", percentage: 85 },
            { name: "RESTful APIs", percentage: 88 },
            { name: "Authentication & Security", percentage: 80 },
            { name: "Hosting & Deployment", percentage: 75 },
            { name: "Face & Object Detection", percentage: 70 },
            { name: "Git & Version Control", percentage: 90 },
          ].map((skill, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{skill.name}</span>
                <span className="text-teal-400">{skill.percentage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-teal-500 h-2.5 rounded-full"
                  style={{
                    width: `${skill.percentage}%`,
                    transitionDelay: `${index * 150}ms`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section
        ref={refProjects}
        className={`relative px-6 md:px-16 lg:px-24 py-24 transition-all duration-1000 ease-out ${projectsVisibility}`}
        id="projects"
      >
        <h2 className="text-3xl font-bold mb-2">
          My <span className="text-teal-400">Projects</span>
        </h2>
        <div className="w-20 h-1 bg-teal-400 mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "E-Commerce Website",
              description:
                "A fully responsive e-commerce platform built with React, Redux, and Node.js.",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCdVZQeAzmD86yyxQ1AtSbbBEt_CNWTrM6Kg&s",
              tags: ["React", "Redux", "Node.js"],
            },
            {
              title: "Portfolio Website",
              description:
                "A modern portfolio website with smooth animations and dark mode support.",
              image: "https://marketplace.canva.com/EAFwckKNjDE/2/0/800w/canva-black-white-grayscale-portfolio-presentation-CFoKUfCMgq0.jpg",
              tags: ["React", "Tailwind CSS", "Framer Motion"],
            },
            {
              title: "Task Management App",
              description:
                "A productivity app for managing tasks and projects with drag-and-drop functionality.",
              image: "https://enlivendc.com/wp-content/uploads/2021/09/task-management-app-to-do-meetings-projects.jpg?v=1.4",
              tags: ["React", "TypeScript", "Firebase"],
            },
            {
              title: "Weather Dashboard",
              description:
                "A weather application with real-time data visualization and forecasting.",
              image: "https://s3-alpha.figma.com/hub/file/6422877612/800966cc-495a-4d7f-8afe-e5f2a3e89456-cover.png",
              tags: ["JavaScript", "API", "Chart.js"],
            },
            {
              title: "Blog Platform",
              description:
                "A full-stack blog platform with user authentication and content management.",
              image: "https://www.stanventures.com/blog/wp-content/uploads/2020/03/squarespace-blogging-platform.png",
              tags: ["MERN Stack", "JWT", "AWS"],
            },
            {
              title: "Fitness Tracker",
              description:
                "A health app for tracking workouts and fitness progress with data visualization.",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJfLxfvGTj0O2BsSF4x87Lhx9Nc-ORICaeIg&s",
              tags: ["React", "GraphQL", "MongoDB"],
            },
          ].map((project, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-teal-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-teal-600 transition-colors duration-300"
                    >
                      <ExternalLink size={18} />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-teal-600 transition-colors duration-300"
                    >
                      <Mail size={18} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-teal-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-700 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={refContact}
        className={`relative px-6 md:px-16 lg:px-24 py-24 bg-gray-800 transition-all duration-1000 ease-out ${contactVisibility}`}
        id="contact"
      >
        <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-30"></div>

        <h2 className="text-3xl font-bold mb-2">
          Contact <span className="text-teal-400">Me</span>
        </h2>
        <div className="w-20 h-1 bg-teal-400 mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold mb-4">Let's Talk</h3>
            <p className="text-gray-400 mb-8">
              Have a project in mind or just want to say hello? Feel free to
              reach out to me. I'm always open to discussing new projects,
              creative ideas, or opportunities to be part of your vision.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-teal-400">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-gray-400">caballeroaldrin02@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-teal-400">
                  <Code size={18} />
                </div>
                <div>
                  <h4 className="font-medium">Social Profiles</h4>
                  <div className="flex gap-3 mt-2">
                    <a
                      href="https://github.com/aldrin112602"
                      className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
                    >
                      <FaGithub size={30} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/aldrin02"
                      className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
                    >
                      <BsLinkedin size={30} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-teal-400 transition-colors duration-300"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-teal-400 transition-colors duration-300"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block mb-2 text-sm">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-teal-400 transition-colors duration-300"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-teal-400 transition-colors duration-300"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md transition-all duration-300 transform hover:-translate-y-1"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 lg:px-24 py-8 text-center border-t border-gray-800">
        <p className="text-gray-400">
          © {new Date().getFullYear()} Aldrin Caballero. All rights reserved.
        </p>
        {/* <div className="flex justify-center gap-4 mt-4">
          <a
            href="#"
            className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
          >
            <Mail size={18} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
          >
            <Mail size={18} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-teal-400 transition-colors duration-300"
          >
            <Mail size={18} />
          </a>
        </div> */}
      </footer>

      {/* Add these animations to CSS */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
