import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import restInPolishImg from "@/assets/restinpolish.png";
import quickMobileMechanicImg from "@/assets/quickmobilemechanic.jpg";
import flyWithDavidAsset from "@/assets/flywithdavid.png.asset.json";
const flyWithDavidImg = flyWithDavidAsset.url;

const projects = [
  {
    title: "Rest In Polish",
    category: "Nail Salon",
    image: restInPolishImg,
    url: "https://restinpolish.site/",
  },
  {
    title: "Fly With David",
    category: "Flight School",
    image: flyWithDavidImg,
    url: "https://flywithdavid.org",
  },
  {
    title: "Quick Mobile Mechanic",
    category: "Auto Repair",
    image: quickMobileMechanicImg,
    url: "https://quickmobilemechanic.com",
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-widest">Our Work</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mt-3 mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A look at some of the work we've done for our clients
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="glass-card-glow overflow-hidden group cursor-pointer"
                onClick={() => project.url && window.open(project.url, "_blank")}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} — ${project.category} website by JunoDev`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs text-primary font-medium uppercase tracking-wider">{project.category}</span>
                  <h3 className="font-heading text-lg font-semibold mt-1">{project.title}</h3>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
