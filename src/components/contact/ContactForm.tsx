import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, RefreshCw } from 'lucide-react';
import { Button } from '../common/Button';
import { sendEmail, getEmailJsConfig } from '../../lib/sendEmail';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const RATE_LIMIT_MS = 30000; // 30 seconds client-side cooldown

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: 'Project Inquiry / Freelance',
    message: '',
  });

  const [honeypot, setHoneypot] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submittedName, setSubmittedName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Refs for accessibility focus management
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const emailConfig = getEmailJsConfig();

  // Warn in dev console once if environment variables are missing
  useEffect(() => {
    if (!emailConfig.isConfigured) {
      console.warn(
        `[EmailJS] Missing environment configuration: ${emailConfig.missing.join(
          ', '
        )}. Submissions are paused until valid credentials are added to .env.`
      );
    }
  }, [emailConfig.isConfigured, emailConfig.missing]);

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Please provide your full name.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        return undefined;
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return 'Please provide your email address.';
        if (!emailRegex.test(value.trim())) return 'Please provide a valid email address.';
        return undefined;
      }
      case 'message':
        if (!value.trim()) return 'Please provide your project details & timeline.';
        if (value.trim().length < 10) return 'Message must be at least 10 characters.';
        return undefined;
      default:
        return undefined;
    }
  };

  const validateAll = (): { isValid: boolean; newErrors: FormErrors; firstInvalidKey?: keyof FormErrors } => {
    const newErrors: FormErrors = {};
    let firstInvalidKey: keyof FormErrors | undefined;

    const nameErr = validateField('name', formData.name);
    if (nameErr) {
      newErrors.name = nameErr;
      if (!firstInvalidKey) firstInvalidKey = 'name';
    }

    const emailErr = validateField('email', formData.email);
    if (emailErr) {
      newErrors.email = emailErr;
      if (!firstInvalidKey) firstInvalidKey = 'email';
    }

    const msgErr = validateField('message', formData.message);
    if (msgErr) {
      newErrors.message = msgErr;
      if (!firstInvalidKey) firstInvalidKey = 'message';
    }

    setErrors(newErrors);
    return {
      isValid: Object.keys(newErrors).length === 0,
      newErrors,
      firstInvalidKey,
    };
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const err = validateField(name as keyof FormData, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const checkRateLimit = (): boolean => {
    try {
      const lastSend = localStorage.getItem('last_email_send_time');
      if (lastSend) {
        const timeDiff = Date.now() - parseInt(lastSend, 10);
        if (timeDiff < RATE_LIMIT_MS) {
          const remainingSec = Math.ceil((RATE_LIMIT_MS - timeDiff) / 1000);
          setErrorMessage(
            `Please wait ${remainingSec} second${remainingSec > 1 ? 's' : ''} before sending another message.`
          );
          setStatus('error');
          return false;
        }
      }
    } catch {
      // Safe fallback if localStorage is disabled in strict private mode
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched on submit
    setTouched({ name: true, email: true, subject: true, message: true });

    const { isValid, firstInvalidKey } = validateAll();

    if (!isValid) {
      // Accessibility: focus the first invalid field
      if (firstInvalidKey === 'name') nameInputRef.current?.focus();
      else if (firstInvalidKey === 'email') emailInputRef.current?.focus();
      else if (firstInvalidKey === 'message') messageInputRef.current?.focus();
      return;
    }

    // Anti-spam honeypot check: if filled, simulate success silently without hitting EmailJS
    if (honeypot.trim() !== '') {
      console.info('[Anti-Spam] Honeypot triggered. Simulating success.');
      setStatus('submitting');
      setTimeout(() => {
        setSubmittedName(formData.name.trim());
        setStatus('success');
        setFormData({ name: '', email: '', subject: 'Project Inquiry / Freelance', message: '' });
        setTouched({});
      }, 600);
      return;
    }

    // Check anti-spam rate limiting (1 send per 30s)
    if (!checkRateLimit()) {
      return;
    }

    // Check configuration
    if (!emailConfig.isConfigured) {
      setErrorMessage(
        'Email service configuration is pending. Please reach out directly to hamxa9403@gmail.com.'
      );
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      await sendEmail({
        name: formData.name,
        email: formData.email,
        title: formData.subject, // selected inquiry type (shows in the subject line)
        message: formData.message,
        time: new Date().toLocaleString(),
      });

      // Record rate limit timestamp
      try {
        localStorage.setItem('last_email_send_time', Date.now().toString());
      } catch {
        // ignore
      }

      setSubmittedName(formData.name.trim());
      setStatus('success');
      setFormData({ name: '', email: '', subject: 'Project Inquiry / Freelance', message: '' });
      setTouched({});
    } catch (err: unknown) {
      setStatus('error');
      const msg =
        err instanceof Error
          ? err.message
          : 'Failed to deliver message via EmailJS. Please send directly via email.';
      setErrorMessage(msg);
    }
  };

  const mailtoFallback = `mailto:hamxa9403@gmail.com?subject=${encodeURIComponent(
    formData.subject || 'Project Inquiry'
  )}&body=${encodeURIComponent(
    `Hi Ameer,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nProject Details:\n${formData.message}`
  )}`;

  return (
    <div className="relative rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 p-6 sm:p-8 md:p-10 shadow-xl backdrop-blur-sm">
      {/* Accessibility: polite aria-live announcer for status updates */}
      <div className="sr-only" aria-live="polite" role="status">
        {status === 'submitting' && 'Sending your message, please wait.'}
        {status === 'success' && `Thanks ${submittedName}, I'll reply within 24 hours.`}
        {status === 'error' && errorMessage}
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="py-12 flex flex-col items-center text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-display text-zinc-900 dark:text-white">
              Thanks {submittedName || 'there'}, I'll reply within 24 hours!
            </h3>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
              Your inquiry has been delivered directly to Ameer's inbox. Looking forward to discussing your project.
            </p>
            <div className="pt-4 flex flex-wrap gap-3 justify-center">
              <Button
                variant="primary"
                size="md"
                onClick={() => setStatus('idle')}
                icon={<RefreshCw className="w-4 h-4" />}
              >
                Send Another Message
              </Button>
              <Button
                variant="outline"
                size="md"
                asLink
                href="mailto:hamxa9403@gmail.com"
                icon={<Mail className="w-4 h-4" />}
              >
                Direct Email (hamxa9403@gmail.com)
              </Button>
            </div>
          </motion.div>
        ) : (
          <form key="form" onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Friendly banner when EmailJS keys are not yet filled */}
            {!emailConfig.isConfigured && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                <div>
                  <span className="font-semibold block mb-0.5">Setup Pending in .env</span>
                  <span>
                    Template ID and Public Key are not yet set in <code className="font-mono font-bold">.env</code>. Submissions will be disabled until configured. You can also reach Ameer directly at{' '}
                    <a href="mailto:hamxa9403@gmail.com" className="underline font-bold hover:text-amber-400">
                      hamxa9403@gmail.com
                    </a>.
                  </span>
                </div>
              </div>
            )}

            {/* Anti-spam hidden honeypot field */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="_gotcha">Leave this field empty</label>
              <input
                type="text"
                id="_gotcha"
                name="_gotcha"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-mono font-medium uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2"
                >
                  Your Name <span className="text-cyan-500">*</span>
                </label>
                <input
                  ref={nameInputRef}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur('name')}
                  aria-invalid={Boolean(touched.name && errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  placeholder="e.g. Sarah Jenkins"
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors text-sm ${
                    touched.name && errors.name
                      ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                      : 'border-zinc-200 dark:border-zinc-700/80'
                  }`}
                />
                {touched.name && errors.name && (
                  <p id="name-error" className="mt-1.5 text-xs text-rose-500 flex items-center gap-1 font-mono">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-mono font-medium uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2"
                >
                  Your Email <span className="text-cyan-500">*</span>
                </label>
                <input
                  ref={emailInputRef}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  aria-invalid={Boolean(touched.email && errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  placeholder="e.g. sarah@company.com"
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors text-sm ${
                    touched.email && errors.email
                      ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                      : 'border-zinc-200 dark:border-zinc-700/80'
                  }`}
                />
                {touched.email && errors.email && (
                  <p id="email-error" className="mt-1.5 text-xs text-rose-500 flex items-center gap-1 font-mono">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Subject / Inquiry Type Field */}
            <div>
              <label
                htmlFor="subject"
                className="block text-xs font-mono font-medium uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Inquiry Type
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors text-sm"
              >
                <option value="Project Inquiry / Freelance">Freelance / Contract Project</option>
                <option value="Full-Time Frontend Role">Full-Time / Engineering Role</option>
                <option value="Frontend Architecture Audit">Frontend Architecture & Performance Audit</option>
                <option value="Consulting & Mentorship">General Consulting / Other</option>
              </select>
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs font-mono font-medium uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2"
              >
                Project Details & Timeline <span className="text-cyan-500">*</span>
              </label>
              <textarea
                ref={messageInputRef}
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                onBlur={() => handleBlur('message')}
                aria-invalid={Boolean(touched.message && errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                placeholder="Describe your project, timeline, tech stack, and goals (minimum 10 characters)..."
                className={`w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors text-sm ${
                  touched.message && errors.message
                    ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                    : 'border-zinc-200 dark:border-zinc-700/80'
                }`}
              />
              {touched.message && errors.message && (
                <p id="message-error" className="mt-1.5 text-xs text-rose-500 flex items-center gap-1 font-mono">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.message}</span>
                </p>
              )}
            </div>

            {/* Error Message & Fallback Link */}
            {status === 'error' && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{errorMessage || 'Failed to deliver message via EmailJS.'}</span>
                </div>
                <a
                  href={mailtoFallback}
                  className="underline font-bold hover:text-rose-300 shrink-0 text-xs"
                >
                  Email me directly: hamxa9403@gmail.com
                </a>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={status === 'submitting' || !emailConfig.isConfigured}
                className="w-full sm:w-auto"
                icon={
                  status === 'submitting' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )
                }
              >
                {status === 'submitting'
                  ? 'Sending...'
                  : !emailConfig.isConfigured
                  ? 'Setup Pending (Use Direct Email)'
                  : 'Send Message / Hire Me'}
              </Button>

              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Response time: under 24 hours
              </span>
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
};
