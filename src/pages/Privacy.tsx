import LegalLayout from "@/components/estroc/LegalLayout";

export default function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" updated="September 2026">
      <section>
        <p>
          ESTROC ("we", "us", "our") builds digital products, software and AI
          solutions. This policy explains what information we collect through{" "}
          <span className="text-zinc-200">estroc-one.vercel.app</span>, why we
          collect it, and how it's handled. If anything here is unclear, email{" "}
          <a href="mailto:hello@estroc.com">hello@estroc.com</a>.
        </p>
      </section>

      <section>
        <h2>Information we collect</h2>
        <ul>
          <li>
            <span className="text-zinc-200">Project enquiries.</span> When you fill
            in the "Start a project" form, we collect your name, email, phone
            number, company name, and the project details you provide.
          </li>
          <li>
            <span className="text-zinc-200">Chat conversations.</span> If you use
            the ESTROC AI chat widget, the messages you send are processed to
            answer your questions and, if you share enough detail, to capture a
            project brief the same way the form does.
          </li>
          <li>
            <span className="text-zinc-200">Basic usage data.</span> We may use
            privacy-conscious analytics to understand how visitors use the site
            (for example, which pages are viewed or which buttons are clicked).
            No such tool is used to identify you personally.
          </li>
          <li>
            <span className="text-zinc-200">Theme preference.</span> Your
            light/dark mode choice is stored in your browser's local storage. It
            never leaves your device.
          </li>
        </ul>
      </section>

      <section>
        <h2>How we use it</h2>
        <p>
          We use the information you submit to understand your project and get
          back to you — nothing more. We do not sell, rent or trade your data to
          third parties, and we do not use it for advertising.
        </p>
      </section>

      <section>
        <h2>Third-party services</h2>
        <ul>
          <li>Enquiry and chat submissions are emailed to our team via our mail provider.</li>
          <li>The ESTROC AI chat widget is powered by OpenAI's API — messages you send it are processed by OpenAI to generate a reply.</li>
          <li>The site is hosted on Vercel, which may log standard request data (IP address, browser type) for security and performance.</li>
        </ul>
      </section>

      <section>
        <h2>Data retention</h2>
        <p>
          We keep enquiry and chat-lead data for as long as needed to respond to
          you and, if we start working together, for the duration of that
          relationship plus a reasonable period afterward for our records.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          You can ask us what information we hold about you, ask us to correct
          it, or ask us to delete it, at any time — email{" "}
          <a href="mailto:hello@estroc.com">hello@estroc.com</a> and we'll act on
          it promptly.
        </p>
      </section>

      <section>
        <h2>Security</h2>
        <p>
          Submissions are sent over HTTPS. We take reasonable technical measures
          to protect the information you share with us, but no method of
          transmission or storage is 100% secure.
        </p>
      </section>

      <section>
        <h2>Changes to this policy</h2>
        <p>
          We may update this policy as the site or our practices evolve. The
          "last updated" date above reflects the most recent revision.
        </p>
      </section>
    </LegalLayout>
  );
}
