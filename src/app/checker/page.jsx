import WhyThisTool from "./WhyThisTool";
import SearchMain from "./SearchMain";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "System Requirements Checker",
  description:
    "Search any game or software to instantly check minimum and recommended system requirements.",
};

export default function CheckerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 px-4 py-16 sm:py-20 text-white text-center">
        <div className="max-w-3xl mx-auto animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
            Search a Game or Software to Check System Requirements
          </h1>
          <p className="text-blue-100 text-base sm:text-lg max-w-xl mx-auto">
            Type any game or app name — we&apos;ll show you the minimum and
            recommended specs to run it.
          </p>
        </div>
      </div>

      {/* Search + Results */}
      <ScrollReveal>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-8">
            <SearchMain />
          </div>
      </ScrollReveal>

      {/* Why this tool */}
      <ScrollReveal delay={100}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <WhyThisTool />
        </div>
      </ScrollReveal>
    </div>
  );
}
