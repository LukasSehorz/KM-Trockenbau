"use client";

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#C9A84C" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const testimonials = [
  {
    quote: "10 Sterne wenn möglich! Fachlich und menschlich großartig! Die Arbeiten werden fachgerecht und auf höchstem Niveau durchgeführt. Absolut empfehlenswert!",
    name: "Angelika S.",
    role: "Google Rezension · 5/5 Sterne",
    initials: "AS",
  },
  {
    quote: "Die Rezension wird auf zwei Teile aufgeteilt, da sie sonst zu lange ist. Absolut professionelle Arbeit – wir sind rundum begeistert und können das Unternehmen jedem empfehlen, der Qualität und Verlässlichkeit schätzt.",
    name: "Christian Wendelborn",
    role: "Google Rezension · 5/5 Sterne",
    initials: "CW",
  },
  {
    quote: "Teil 2 der Rezension: Auch nach der Fertigstellung stand das Team jederzeit für Rückfragen zur Verfügung. Selten so einen guten Service erlebt – WM Bau GmbH ist erste Wahl!",
    name: "Manuela Hiermer",
    role: "Google Rezension · 5/5 Sterne",
    initials: "MH",
  },
];

export function Testimonial3() {
  return (
    <section className="bg-background-alternative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-xl text-center md:mb-18 lg:mb-20">
          <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.2em] text-hoser-gold">
            Referenzen
          </p>
          <h2 className="mb-4 font-heading text-5xl font-bold leading-tight tracking-tight text-text-alternative md:text-7xl lg:text-8xl">
            Echte Kunden
          </h2>
          <p className="mb-5 font-body text-base text-text-alternative/70 md:text-lg">
            Sie haben uns vertraut. Hier ist, was sie sagen.
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
            </div>
            <span className="font-body text-sm font-semibold text-text-alternative">5,0</span>
            <span className="font-body text-sm text-text-alternative/50">· 5 Google-Rezensionen</span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col border border-border-alternative p-8 transition-colors duration-300 hover:border-hoser-gold"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                </div>
                <GoogleIcon />
              </div>
              <blockquote className="mb-8 flex-1 font-body text-base font-medium leading-relaxed text-text-alternative/90 md:text-lg">
                „{t.quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center bg-hoser-gold font-heading text-sm font-bold tracking-wide text-text-primary">
                  {t.initials}
                </div>
                <div>
                  <p className="font-heading text-sm font-bold tracking-wide text-text-alternative">
                    {t.name}
                  </p>
                  <p className="font-body text-xs text-text-alternative/60">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
