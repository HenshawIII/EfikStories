'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useFadeIn } from '@/lib/animations';

function getEmailJsConfig() {
  return {
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim() ?? '',
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim() ?? '',
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim() ?? '',
  };
}

export default function CTA() {
  const ctaRef = useFadeIn();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const emailJsMissing = (() => {
    const c = getEmailJsConfig();
    return !c.publicKey || !c.serviceId || !c.templateId;
  })();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { publicKey, serviceId, templateId } = getEmailJsConfig();

    if (!publicKey || !serviceId || !templateId) {
      setStatus('error');
      return;
    }

    setStatus('submitting');

    const fd = new FormData(form);
    const name = String(fd.get('name') ?? '').trim();
    const email = String(fd.get('email') ?? '').trim();
    const interest = String(fd.get('interest') ?? '').trim();
    const message = String(fd.get('message') ?? '').trim();

    const templateParams = {
      from_name: name,
      from_email: email,
      reply_to: email,
      interest: interest || '—',
      message,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, { publicKey });
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-16! md:py-32! md:px-12!  bg-secondary px-6!">
      <div
        ref={ctaRef}
        className="w-full! flex flex-col lg:flex-row gap-16 lg:gap-24 max-w-[100%] items-stretch lg:justify-between"
      >
        {/* CTA Copy */}
        <div className="lg:w-[42%] lg:shrink-0 gap-8 flex flex-col justify-start items-start">
          <h2 className="text-3xl md:text-6xl font-heading text-primary mt-0! -translate-y-2!">
            Join the Story
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
            EFIK Stories thrives on community. Contribute archives, support the project, or reach out with enquiries—we&apos;d love to hear from you.
          </p>
          <p className="mt-8 text-foreground/60 text-sm md:text-base tracking-wide uppercase">
            Contribute · Support · Enquire
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 min-w-0 max-w-xl"
        >
          <div className="space-y-8!">
            <div>
              <label htmlFor="name" className="block text-xs uppercase tracking-wider text-foreground/50 mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                disabled={status === 'submitting'}
                className="w-full py-3 text-foreground bg-transparent border-b border-foreground/20 focus:border-primary focus:outline-none transition-colors placeholder:text-foreground/40 disabled:opacity-60"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-wider text-foreground/50 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={status === 'submitting'}
                className="w-full py-3 text-foreground bg-transparent border-b border-foreground/20 focus:border-primary focus:outline-none transition-colors placeholder:text-foreground/40 disabled:opacity-60"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="interest" className="block text-xs uppercase tracking-wider text-foreground/50 mb-2">
                I&apos;m interested in
              </label>
              <select
                id="interest"
                name="interest"
                disabled={status === 'submitting'}
                className="w-full py-3 pr-8 text-foreground bg-transparent border-b border-foreground/20 focus:border-primary focus:outline-none transition-colors disabled:opacity-60 appearance-none cursor-pointer bg-no-repeat bg-[length:1rem] bg-[right_0_center]"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23171717\' opacity=\'0.5\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")' }}
              >
                <option value="">—</option>
                <option value="contribute">Contributing stories / archival material</option>
                <option value="support">Supporting the project</option>
                <option value="collaborate">Collaboration / partnership</option>
                <option value="enquiry">General enquiry</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-xs uppercase tracking-wider text-foreground/50 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                disabled={status === 'submitting'}
                className="w-full py-3 text-foreground bg-transparent border-b border-foreground/20 focus:border-primary focus:outline-none transition-colors resize-none placeholder:text-foreground/40 disabled:opacity-60"
                placeholder="Tell us how you&apos;d like to be involved."
              />
            </div>
          </div>
          {status === 'success' && (
            <p className="mt-8 text-primary font-heading">
              Thank you. We&apos;ll be in touch soon.
            </p>
          )}
          {status === 'error' && (
            <p className="mt-8 text-foreground/70">
              {emailJsMissing
                ? 'Contact form is not configured yet. Please set EmailJS environment variables.'
                : 'Something went wrong. Please try again.'}
            </p>
          )}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="mt-10 font-heading text-primary border-b-2 border-primary pb-1 hover:opacity-70 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </section>
  );
}
