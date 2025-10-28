/* eslint-disable react/no-unescaped-entities */
"use client";
import dynamic from 'next/dynamic';

// Dynamically import icons
const FaEnvelope = dynamic(() => import('react-icons/fa').then(mod => mod.FaEnvelope), { ssr: false });
const FaLinkedin = dynamic(() => import('react-icons/fa').then(mod => mod.FaLinkedin), { ssr: false });
const FaTwitter = dynamic(() => import('react-icons/fa').then(mod => mod.FaTwitter), { ssr: false });
const FaInstagram = dynamic(() => import('react-icons/fa').then(mod => mod.FaInstagram), { ssr: false });
const FaGithub = dynamic(() => import('react-icons/fa').then(mod => mod.FaGithub), { ssr: false });
const FaMedium = dynamic(() => import('react-icons/fa').then(mod => mod.FaMedium), { ssr: false });

export default function Contact() {
  const contactMethods = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: "aria@persistos.co",
      link: "mailto:aria@persistos.co",
      description: "Collaborations, partnerships, and general inquiries"
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      value: "@ariahan",
      link: "https://www.linkedin.com/in/ariahan/",
      description: "Professional networking and business opportunities"
    },
    {
      icon: FaTwitter,
      label: "Twitter",
      value: "@aria__han",
      link: "https://twitter.com/aria__han",
      description: "Tech thoughts and daily musings"
    },
    {
      icon: FaGithub,
      label: "GitHub",
      value: "@ariaxhan",
      link: "https://github.com/ariaxhan",
      description: "Open source projects and code collaborations"
    },
    {
      icon: FaMedium,
      label: "Medium",
      value: "@ariahan",
      link: "https://medium.com/@ariaxhan",
      description: "Technical articles and thought leadership"
    },
    {
      icon: FaInstagram,
      label: "Instagram",
      value: "@ariaxhan",
      link: "https://instagram.com/ariaxhan",
      description: "Behind-the-scenes and personal moments"
    }
  ];

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative overflow-hidden contact-bg">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent-purple via-poetry-gold to-transparent"></div>
      
      <div className="max-w-6xl mx-auto text-center animate-fade-in">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight animate-fade-in mb-6 sm:mb-8">
          get in touch
        </h2>
        
        {/* Introduction */}
        <div className="terminal-bg p-4 sm:p-6 lg:p-8 rounded-lg mb-8 sm:mb-12 lg:mb-16">
          <div className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
            <p className="mb-4">
              Interested in collaborating? Want to discuss AI, entrepreneurship, or investment opportunities?
            </p>
            <p>
              I'm always excited to connect with fellow builders and innovators.
            </p>
          </div>
        </div>

        {/* Contact methods grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <a 
                key={index}
                href={method.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group"
              >
                <div className="code-glow bg-gradient-to-r from-dark-gray to-medium-gray p-4 sm:p-6 rounded-lg border border-code-blue hover:border-terminal-green transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-start mb-3 sm:mb-4">
                    <IconComponent size={20} className="text-code-blue group-hover:text-terminal-green transition-colors mr-3 sm:mr-4 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-code-blue text-base sm:text-lg font-semibold group-hover:text-terminal-green transition-colors mb-1">
                        {method.label}
                      </h3>
                      <div className="text-xs sm:text-sm text-gray-400">
                        {method.value}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed flex-1">
                    {method.description}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        {/* Final message */}
        <div className="terminal-bg p-6 sm:p-8 lg:p-12 rounded-lg">
          <h3 className="text-poetry-gold text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-6 lg:mb-8 italic">
            The best collaborations begin with a single message
          </h3>
          <div className="text-terminal-green text-base sm:text-lg">
            Let's build the future together
          </div>
        </div>
      </div>
    </section>
  );
}