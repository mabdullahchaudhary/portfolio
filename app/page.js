// Sections ko /components/sections/ se import kar rahe hain
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Activity from "@/components/sections/Activity";
import Media from "@/components/sections/Media";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Hero />
      <Projects />
      <Activity />
      <Media />
      <Skills />
      <Contact />
    </main>
  );
}
