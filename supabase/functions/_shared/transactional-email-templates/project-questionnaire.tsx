/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'JunoDev'

interface PhotoAttachment {
  name: string
  url: string
}

interface ProjectQuestionnaireProps {
  name?: string
  email?: string
  phone?: string
  company?: string
  vision?: string
  projectType?: string
  features?: string
  designStyle?: string
  inspiration?: string
  photos?: PhotoAttachment[]
  photoNotes?: string
  budget?: string
  timeline?: string
  submittedAt?: string
}

const Field = ({ label, value, multiline = false }: { label: string; value?: string; multiline?: boolean }) => (
  <>
    <Text style={fieldLabel}>{label}</Text>
    <Text style={multiline ? fieldValueMultiline : fieldValue}>
      {value && value.trim().length > 0 ? value : '—'}
    </Text>
  </>
)

const ProjectQuestionnaireEmail = ({
  name,
  email,
  phone,
  company,
  vision,
  projectType,
  features,
  designStyle,
  inspiration,
  photos,
  photoNotes,
  budget,
  timeline,
  submittedAt,
}: ProjectQuestionnaireProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New project questionnaire from {name || 'a prospective client'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>🚀 New Project Questionnaire</Heading>
        <Text style={intro}>
          A new prospect just completed the {SITE_NAME} project questionnaire. Full details below.
        </Text>

        <Section style={card}>
          <Heading as="h2" style={h2}>Contact</Heading>
          <Field label="Name" value={name} />
          <Hr style={hr} />
          <Field label="Email" value={email} />
          <Hr style={hr} />
          <Field label="Phone" value={phone} />
          <Hr style={hr} />
          <Field label="Company" value={company} />
        </Section>

        <Section style={card}>
          <Heading as="h2" style={h2}>Vision</Heading>
          <Field label="Project vision / description" value={vision} multiline />
        </Section>

        <Section style={card}>
          <Heading as="h2" style={h2}>Project type & features</Heading>
          <Field label="Project type" value={projectType} />
          <Hr style={hr} />
          <Field label="Desired features" value={features} multiline />
        </Section>

        <Section style={card}>
          <Heading as="h2" style={h2}>Design preferences</Heading>
          <Field label="Style direction" value={designStyle} />
          <Hr style={hr} />
          <Field label="Inspiration links" value={inspiration} multiline />
        </Section>

        {(photos && photos.length > 0) || (photoNotes && photoNotes.trim().length > 0) ? (
          <Section style={card}>
            <Heading as="h2" style={h2}>Photos & assets</Heading>
            {photos && photos.length > 0 ? (
              <>
                <Text style={fieldLabel}>Uploaded files ({photos.length})</Text>
                {photos.map((photo, idx) => (
                  <Text key={idx} style={fieldValue}>
                    <Link href={photo.url} style={link}>
                      {photo.name || `File ${idx + 1}`}
                    </Link>
                  </Text>
                ))}
              </>
            ) : null}
            {photoNotes && photoNotes.trim().length > 0 ? (
              <>
                {photos && photos.length > 0 ? <Hr style={hr} /> : null}
                <Field label="Notes about assets" value={photoNotes} multiline />
              </>
            ) : null}
          </Section>
        ) : null}

        <Section style={card}>
          <Heading as="h2" style={h2}>Budget & timeline</Heading>
          <Field label="Budget range" value={budget} />
          <Hr style={hr} />
          <Field label="Timeline" value={timeline} />
        </Section>

        {submittedAt ? (
          <Text style={meta}>Submitted {submittedAt}</Text>
        ) : null}

        <Text style={footer}>
          Reply directly to{' '}
          {email ? <Link href={`mailto:${email}`} style={link}>{email}</Link> : 'them'}{' '}
          to follow up.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ProjectQuestionnaireEmail,
  subject: (data: Record<string, any>) =>
    `New project questionnaire${data?.name ? ` from ${data.name}` : ''}${data?.company ? ` (${data.company})` : ''}`,
  displayName: 'Project questionnaire submission',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@acme.com',
    phone: '+1 555 123 4567',
    company: 'Acme Inc.',
    vision:
      'We want a bold, modern site that positions us as the leading sustainable coffee brand in Europe. Storytelling first, with a shop layered in.',
    projectType: 'E-commerce',
    features: 'Product catalog, Stripe checkout, blog/CMS, newsletter signup, multi-language',
    designStyle: 'Editorial / minimal with warm earth tones',
    inspiration: 'https://example.com/inspo1\nhttps://example.com/inspo2',
    brandAssets: 'Logo + brand guidelines ready. No photography yet.',
    photos: [
      { name: 'logo-draft.png', url: 'https://example.com/uploads/logo-draft.png' },
      { name: 'moodboard.pdf', url: 'https://example.com/uploads/moodboard.pdf' },
    ],
    photoNotes: 'Logo is a working draft — open to refinement. Mood board is just inspiration.',
    budget: '$10k – $25k',
    timeline: '2 – 3 months',
    submittedAt: 'April 27, 2026 at 10:15 AM',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
}

const container = {
  margin: '0 auto',
  padding: '32px 24px',
  maxWidth: '600px',
}

const h1 = {
  fontSize: '26px',
  fontWeight: '700',
  color: '#0a0612',
  margin: '0 0 12px',
  fontFamily:
    "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
}

const h2 = {
  fontSize: '14px',
  fontWeight: '700',
  color: '#7a4dd1',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.06em',
  margin: '0 0 12px',
}

const intro = {
  fontSize: '15px',
  color: '#55575d',
  lineHeight: '1.6',
  margin: '0 0 24px',
}

const card = {
  backgroundColor: '#faf9fc',
  border: '1px solid #ece8f4',
  borderRadius: '12px',
  padding: '20px 24px',
  margin: '0 0 16px',
}

const fieldLabel = {
  fontSize: '11px',
  fontWeight: '600',
  color: '#7a4dd1',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  margin: '0 0 4px',
}

const fieldValue = {
  fontSize: '15px',
  color: '#0a0612',
  margin: '0 0 4px',
  lineHeight: '1.5',
}

const fieldValueMultiline = {
  fontSize: '15px',
  color: '#0a0612',
  margin: '0 0 4px',
  lineHeight: '1.6',
  whiteSpace: 'pre-wrap' as const,
}

const hr = {
  borderColor: '#ece8f4',
  margin: '14px 0',
}

const meta = {
  fontSize: '13px',
  color: '#999999',
  margin: '8px 0 0',
}

const link = {
  color: '#7a4dd1',
  textDecoration: 'underline',
}

const footer = {
  fontSize: '13px',
  color: '#999999',
  margin: '20px 0 0',
  lineHeight: '1.5',
}
