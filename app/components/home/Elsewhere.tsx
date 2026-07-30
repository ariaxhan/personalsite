// ============================================================================
// ELSEWHERE
// The email and the profiles, said once, early, and large. This used to live
// only at the very bottom of /contact/, which meant the single most useful
// thing on the site (the address you can actually write to) was four scrolls
// and one navigation away. Also does entity work: these are the sameAs targets
// in the Person schema, so having them as real anchors on the homepage is what
// tells a search engine the profiles and the domain are one identity.
// No em dashes.
// ============================================================================

import Reveal from "../studio/Reveal";
import { getSiteContent } from "../../content/repository";

export default async function Elsewhere() {
  const { content: { PAGE_COPY, contactLinks } } = await getSiteContent();
  const email = contactLinks.find((link) => link.href.startsWith("mailto:"));
  const profiles = contactLinks.filter((link) => !link.href.startsWith("mailto:"));
  return (
    <section id="elsewhere" className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
      <Reveal className="border-t border-[rgba(44,40,35,0.2)] pt-10">
        <div className="kicker mb-6">{PAGE_COPY.contact.elsewhere}</div>

        {email && (
          <a
            href={email.href}
            className="inline-block border-b-2 border-terracotta pb-1 font-serif text-[clamp(30px,6vw,58px)] leading-[1.05] text-ink transition-colors hover:text-terracotta"
          >
            {email.label}
          </a>
        )}

        <div className="mt-8 flex flex-wrap gap-x-9 gap-y-4">
          {profiles.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="me noopener noreferrer"
              className="border-b border-[rgba(44,40,35,0.3)] pb-1 font-serif text-[clamp(18px,2.4vw,25px)] text-ink transition-colors hover:border-terracotta hover:text-terracotta"
            >
              {l.label}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
