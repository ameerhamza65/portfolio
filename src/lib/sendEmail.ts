import emailjs from '@emailjs/browser';

export interface SendEmailParams {
  name: string;
  email: string;
  title: string;
  message: string;
  time?: string;
}

export function getEmailJsConfig() {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() || '';
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() || '';
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() || '';

  const missing: string[] = [];
  if (!serviceId) missing.push('VITE_EMAILJS_SERVICE_ID');
  if (!templateId) missing.push('VITE_EMAILJS_TEMPLATE_ID');
  if (!publicKey) missing.push('VITE_EMAILJS_PUBLIC_KEY');

  const isConfigured = missing.length === 0;

  return {
    serviceId,
    templateId,
    publicKey,
    isConfigured,
    missing,
  };
}

export async function sendEmail(params: SendEmailParams) {
  const config = getEmailJsConfig();

  if (!config.isConfigured) {
    const warnMsg = `[EmailJS] Missing required environment variables: ${config.missing.join(', ')}. Please check your .env file.`;
    console.warn(warnMsg);
    throw new Error('EmailJS service is not configured. Please add the missing environment variables.');
  }

  // Exact template variable names expected by the EmailJS "Contact Us" template:
  // {{name}}, {{email}}, {{title}}, {{message}}, {{time}}
  const templateParams = {
    name: params.name.trim(),
    email: params.email.trim(),
    title: params.title.trim(),
    message: params.message.trim(),
    time: params.time || new Date().toLocaleString(),
  };

  return emailjs.send(
    config.serviceId,
    config.templateId,
    templateParams,
    config.publicKey
  );
}

