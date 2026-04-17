import logo from "@/assets/logo.jpg";

const Footer = () => {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div>
            <div className="flex items-center gap-2">
              <img src={logo} alt="JunoDev logo" className="w-8 h-8 rounded-full object-cover" />
              <span className="font-heading text-xl font-bold">
                <span className="gradient-text">Juno</span>Dev
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Websites That Go Beyond</p>
          </div>

          <div className="flex flex-wrap gap-6 justify-center">
            {["Services", "Portfolio", "About", "Process", "Contact"].map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(`#${link.toLowerCase()}`)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link}
              </button>
            ))}
          </div>

          <div className="flex gap-4 justify-end">
            {[
              { name: "LinkedIn", href: "https://www.linkedin.com/in/kyzerjuno/" },
              { name: "GitHub", href: "https://github.com/kyzerjuno" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} JunoDev. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
