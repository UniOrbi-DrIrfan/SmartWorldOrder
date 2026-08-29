import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BRAND, MANIFESTO_POINTS } from "@/constants/brand";

const DETAILED_MANIFESTO = [
  {
    number: "01",
    title: "We Are the Global Family",
    urdu: "ہم ایک عالمی خاندان ہیں",
    arabic: "نحن عائلة عالمية",
    body: "SMART WORLD ORDER declares: humanity is not a village, not a community — it is one family. Borders are political constructs. Truth knows no passport. Justice has no nationality. We stand as one family under the sky of unity.",
    color: "sky",
  },
  {
    number: "02",
    title: "Truth Has No Compromise",
    urdu: "سچ کا کوئی سمجھوتہ نہیں",
    arabic: "الحق لا تنازل عنه",
    body: "We will never bow to pressure, power, or politics. What is true will be said. What is hidden will be exposed. Our lens is calibrated to reality — not ratings, not ratings, not revenue.",
    color: "amber",
  },
  {
    number: "03",
    title: "Against All Forms of Oppression",
    urdu: "ہر قسم کے ظلم کے خلاف",
    arabic: "ضد كل أشكال الظلم",
    body: "No more Aggression. No more Oppression. No more Suppression. No more Occupation. No more Cruelty. No more Inequality. No more Political Differentiation. This is not a slogan — this is our covenant.",
    color: "red",
  },
  {
    number: "04",
    title: "Unity, Integrity, Universality",
    urdu: "اتحاد، دیانتداری، آفاقیت",
    arabic: "وحدة ونزاهة وعالمية",
    body: "These three pillars are non-negotiable. We will never compromise on our unity — internal or external. Our integrity is the foundation of every word we publish. Our universality means every human being deserves the truth.",
    color: "emerald",
  },
  {
    number: "05",
    title: "We Bring What They Hide",
    urdu: "ہم وہ لاتے ہیں جو وہ چھپاتے ہیں",
    arabic: "نحضر ما يخفونه",
    body: "Dark realities. Hidden facts. Suppressed voices. Deep analysis. We are the platform for what mainstream media ignores, distorts, or deliberately buries. We serve truth, not power.",
    color: "violet",
  },
];

export default function ManifestoPage() {
  const { ref, visible } = useScrollReveal();

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.1)_0%,transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4">
          <p className="text-sky-400 font-heading font-bold text-xs tracking-[0.3em] uppercase mb-4">
            Our Sacred Promise
          </p>
          <h1 className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
            The <span className="text-gradient-gold">Manifesto</span>
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto leading-relaxed mb-6">
            A declaration of what SMART WORLD ORDER stands for, fights for, and
            will never compromise on.
          </p>
          <div className="font-urdu text-amber-400 text-xl leading-relaxed">
            یہ ہمارا عہد ہے، ہماری آواز ہے، ہمارا مشن ہے
          </div>
          <div className="divider-glow w-40 mx-auto mt-8" />
        </div>
      </section>

      {/* Quick manifesto grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {MANIFESTO_POINTS.map((p) => (
            <div key={p.title} className="glass-card rounded-xl p-4 text-center hover:-translate-y-1 transition-all">
              <div className="text-3xl mb-2">{p.icon}</div>
              <div className="text-white text-xs font-heading font-bold">{p.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed manifesto */}
      <section ref={ref} className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {DETAILED_MANIFESTO.map((item, i) => {
            const colorMap: Record<string, string> = {
              sky: "border-sky-500/40 text-sky-400",
              amber: "border-amber-500/40 text-amber-400",
              red: "border-red-500/40 text-red-400",
              emerald: "border-emerald-500/40 text-emerald-400",
              violet: "border-violet-500/40 text-violet-400",
            };
            const cols = colorMap[item.color];
            const dir = i % 2 === 0
              ? visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
              : visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16";

            return (
              <div
                key={item.number}
                className={`glass-card rounded-3xl p-8 border-l-4 ${cols.split(" ")[0]} transition-all duration-700 ${dir}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="flex items-start gap-6">
                  <div
                    className={`font-heading font-black text-5xl lg:text-6xl opacity-20 shrink-0 ${cols.split(" ")[1]}`}
                  >
                    {item.number}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-heading font-black text-xl lg:text-2xl text-white mb-1`}
                    >
                      {item.title}
                    </h3>
                    <p className={`font-urdu text-base mb-1 ${cols.split(" ")[1]}`}>
                      {item.urdu}
                    </p>
                    <p className={`font-arabic text-base mb-4 ${cols.split(" ")[1]}`}>
                      {item.arabic}
                    </p>
                    <p className="text-slate-300 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final statement */}
        <div
          className={`mt-16 glass-card-gold rounded-3xl p-10 text-center transition-all duration-700 delay-700 ${
            visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <p className="font-heading font-black text-2xl lg:text-3xl text-white mb-4 leading-relaxed">
            This is <span className="text-amber-400">SMART WORLD ORDER</span>.
            <br />
            This is our promise to the Global Family.
          </p>
          <p className="font-urdu text-amber-300 text-xl leading-relaxed mb-4">
            یہ ہمارا وعدہ ہے اپنے عالمی خاندان سے
          </p>
          <p className="text-sky-400 font-heading font-black text-lg tracking-widest">
            In-sha-Allah Azza-wa-Jall
          </p>
          <p className="text-slate-400 text-sm mt-2">
            — {BRAND.founder}
          </p>
        </div>
      </section>
    </main>
  );
}
