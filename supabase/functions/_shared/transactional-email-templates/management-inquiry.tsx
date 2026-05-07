/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'JunoDev'

interface ManagementInquiryProps {
  name?: string
  email?: string
  company?: string
  subject?: string
  message?: string
  submittedAt?: string
}

const ManagementInquiryEmail = ({
  name,
  email,
  company,
  subject,
  message,
  submittedAt,
}: ManagementInquiryProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New management inquiry from {name || 'a visitor'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>📋 New management inquiry</Heading>
        <Text style={text}>
          A new management-level inquiry just came in through {SITE_NAME}.
        </Text>

        <Section style={card}>
          <Text style={label}>Name</Text>
          <Text style={value}>{name || '—'}</Text>
          <Hr style={hr} />
          <Text style={label}>Email</Text>
          <Text style={value}>{email || '—'}</Text>
          <Hr style={hr} />
          <Text style={label}>Company / Organization</Text>
          <Text style={value}>{company || '—'}</Text>
          <Hr style={hr} />
          <Text style={label}>Subject</Text>
          <Text style={value}>{subject || '—'}</Text>
          <Hr style={hr} />
          <Text style={label}>Message</Text>
          <Text style={messageText}>{message || '—'}</Text>
          {submittedAt ? (
            <>
              <Hr style={hr} />
              <Text style={label}>Submitted</Text>
              <Text style={value}>{submittedAt}</Text>
            </>
          ) : null}
        </Section>

        <Text style={footer}>
          Reply directly to {email || 'them'} to follow up.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ManagementInquiryEmail,
  to: 'kyzerborja5@gmail.com',
  subject: (data: Record<string, any>) =>
    `Management inquiry${data?.name ? ` from ${data.name}` : ''}${data?.subject ? ` — ${data.subject}` : ''}`,
  displayName: 'Management inquiry',
  previewData: {
    name: 'Alex Morgan',
    email: 'alex@bigcorp.com',
    company: 'BigCorp Ltd.',
    subject: 'Partnership opportunity',
    message: 'Hi team — we\'d love to discuss a long-term partnership for our portfolio sites.',
    submittedAt: 'May 7, 2026 at 10:00 AM',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
}
const container = { margin: '0 auto', padding: '32px 24px', maxWidth: '560px' }
const h1 = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#0a0612',
  margin: '0 0 12px',
  fontFamily:
    "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
}
const text = { fontSize: '15px', color: '#55575d', lineHeight: '1.6', margin: '0 0 24px' }
const card = {
  backgroundColor: '#faf9fc',
  border: '1px solid #ece8f4',
  borderRadius: '12px',
  padding: '20px 24px',
  margin: '0 0 24px',
}
const label = {
  fontSize: '11px',
  fontWeight: '600',
  color: '#7a4dd1',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  margin: '0 0 4px',
}
const value = { fontSize: '15px', color: '#0a0612', margin: '0 0 4px', lineHeight: '1.5' }
const messageText = {
  fontSize: '15px',
  color: '#0a0612',
  margin: '0 0 4px',
  lineHeight: '1.6',
  whiteSpace: 'pre-wrap' as const,
}
const hr = { borderColor: '#ece8f4', margin: '16px 0' }
const footer = { fontSize: '13px', color: '#999999', margin: '24px 0 0', lineHeight: '1.5' }
