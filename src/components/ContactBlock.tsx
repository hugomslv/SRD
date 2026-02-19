'use client'

import { useState } from 'react'
import { Section } from './Section'
import { Icon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import type { Messages } from '@/lib/i18n'

interface ContactBlockProps {
  bg?: 'cream' | 'stone'
  slant?: 'left' | 'right' | false
  slantFill?: string
  t: Messages['contact']['form']
}

type FormState = 'idle' | 'sending' | 'success' | 'error'

interface FormData {
  name: string
  company: string
  email: string
  phone: string
  subject: string
  message: string
}

const initialData: FormData = {
  name: '', company: '', email: '', phone: '', subject: '', message: '',
}

export function ContactBlock({ bg = 'stone', slant = false, slantFill, t }: ContactBlockProps) {
  const [data, setData] = useState<FormData>(initialData)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [formState, setFormState] = useState<FormState>('idle')

  function validate(): boolean {
    const newErrors: Partial<FormData> = {}
    if (!data.name.trim()) newErrors.name = t.errors.name
    if (!data.email.trim()) {
      newErrors.email = t.errors.email
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = t.errors.emailInvalid
    }
    if (!data.subject.trim()) newErrors.subject = t.errors.subject
    if (!data.message.trim()) newErrors.message = t.errors.message
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setFormState('sending')
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('[ContactBlock] Form submitted:', data)
      setFormState('success')
      setData(initialData)
    }, 1200)
  }

  return (
    <Section id="contact" bg={bg} slant={slant} slantFill={slantFill}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label">{t.overline}</span>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-subtitle mx-auto text-center mt-4">{t.subtitle}</p>
        </div>

        {formState === 'success' ? (
          <div className="bg-white rounded-lg border border-black/[0.06] shadow-card p-10 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 text-gold mb-5">
              <Icon name="arrow" size={24} strokeWidth={2} />
            </div>
            <h3 className="font-body text-2xl font-semibold text-navy mb-3">
              {t.successTitle}
            </h3>
            <p className="font-body text-muted text-sm">{t.successMsg}</p>
            <button onClick={() => setFormState('idle')} className="btn-outline mt-8">
              {t.sendAnother}
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            suppressHydrationWarning
            className="bg-white rounded-lg border border-black/[0.06] shadow-card p-8 sm:p-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field
                id="name" label={t.fullName} type="text" name="name"
                autoComplete="name" value={data.name} onChange={handleChange}
                error={errors.name} placeholder={t.placeholders.name}
              />
              <Field
                id="company" label={t.company} type="text" name="company"
                autoComplete="organization" value={data.company} onChange={handleChange}
                error={errors.company} placeholder={t.placeholders.company}
              />
              <Field
                id="email" label={t.email} type="email" name="email"
                autoComplete="email" value={data.email} onChange={handleChange}
                error={errors.email} placeholder={t.placeholders.email}
              />
              <Field
                id="phone" label={t.phone} type="tel" name="phone"
                autoComplete="tel" value={data.phone} onChange={handleChange}
                error={errors.phone} placeholder={t.placeholders.phone}
              />

              <div className="sm:col-span-2">
                <label
                  htmlFor="subject"
                  className="block font-body text-xs text-navy font-medium mb-1.5 tracking-wide"
                >
                  {t.subject}
                </label>
                <select
                  id="subject" name="subject" value={data.subject} onChange={handleChange}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                  className={cn(
                    'w-full font-body text-sm text-ink bg-cream/60 border rounded px-4 py-3',
                    'focus:outline-none focus:border-gold focus:bg-white transition-colors duration-200',
                    errors.subject ? 'border-red-400' : 'border-black/[0.12]'
                  )}
                >
                  <option value="">{t.subjectDefault}</option>
                  <option value="comptabilite">{t.subjects.accounting}</option>
                  <option value="conseil">{t.subjects.consulting}</option>
                  <option value="audit">{t.subjects.audit}</option>
                  <option value="patrimoine">{t.subjects.patrimony}</option>
                  <option value="creation">{t.subjects.creation}</option>
                  <option value="rh">{t.subjects.hr}</option>
                  <option value="autre">{t.subjects.other}</option>
                </select>
                {errors.subject && (
                  <p id="subject-error" className="mt-1.5 text-xs text-red-500 font-body">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block font-body text-xs text-navy font-medium mb-1.5 tracking-wide"
                >
                  {t.message}
                </label>
                <textarea
                  id="message" name="message" rows={5} value={data.message}
                  onChange={handleChange} aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  placeholder={t.placeholders.message}
                  className={cn(
                    'w-full font-body text-sm text-ink bg-cream/60 border rounded px-4 py-3 resize-none',
                    'focus:outline-none focus:border-gold focus:bg-white transition-colors duration-200',
                    errors.message ? 'border-red-400' : 'border-black/[0.12]'
                  )}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-xs text-red-500 font-body">
                    {errors.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mt-8 gap-4 flex-wrap">
              <p className="font-body text-xs text-muted">{t.required}</p>
              <button
                type="submit"
                disabled={formState === 'sending'}
                className={cn('btn-primary', formState === 'sending' && 'opacity-70 cursor-not-allowed')}
              >
                {formState === 'sending' ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    {t.submitting}
                  </>
                ) : (
                  <>
                    {t.submit}
                    <Icon name="arrow" size={16} strokeWidth={2} />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </Section>
  )
}

/* ── Champ réutilisable ── */
interface FieldProps {
  id: string; label: string; type: string; name: string
  autoComplete?: string; value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string; placeholder?: string
}

function Field({ id, label, type, name, autoComplete, value, onChange, error, placeholder }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block font-body text-xs text-navy font-medium mb-1.5 tracking-wide">
        {label}
      </label>
      <input
        id={id} type={type} name={name} autoComplete={autoComplete}
        value={value} onChange={onChange} placeholder={placeholder}
        aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'w-full font-body text-sm text-ink bg-cream/60 border rounded px-4 py-3',
          'focus:outline-none focus:border-gold focus:bg-white transition-colors duration-200',
          error ? 'border-red-400' : 'border-black/[0.12]'
        )}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-500 font-body">{error}</p>
      )}
    </div>
  )
}
