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

interface ContactNotificationProps {
  name?: string
  email?: string
  message?: string
  submittedAt?: string
}

const ContactNotificationEmail = ({
  name,
  email,
  message,
  submittedAt,
}: ContactNotificationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New contact form submission from {name || 'a visitor'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New contact form submission</Heading>
        <Text style={text}>
          Someone just reached out through the {SITE_NAME} website.
        </Text>

        <Section style={card}>
          <Text style={label}>Name</Text>
          <Text style={value}>{name || '—'}</Text>

          <Hr style={hr} />

          <Text style={label}>Email</Text>
          <Text style={value}>{email || '—'}</Text>

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
          You can reply directly to {email || 'them'} to follow up.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactNotificationEmail,
  subject: (data: Record<string, any>) =>
    `New contact form submission${data?.name ? ` from ${data.name}` : ''}`,
  displayName: 'Contact form notification',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    message: 'Hey! I\'d love to chat about building a new website for my business.',
    submittedAt: 'April 17, 2026 at 2:30 PM',
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
  maxWidth: '560px',
}

const h1 = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#0a0612',
  margin: '0 0 12px',
  fontFamily:
    "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
}

const text = {
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

const value = {
  fontSize: '15px',
  color: '#0a0612',
  margin: '0 0 4px',
  lineHeight: '1.5',
}

const messageText = {
  fontSize: '15px',
  color: '#0a0612',
  margin: '0 0 4px',
  lineHeight: '1.6',
  whiteSpace: 'pre-wrap' as const,
}

const hr = {
  borderColor: '#ece8f4',
  margin: '16px 0',
}

const footer = {
  fontSize: '13px',
  color: '#999999',
  margin: '24px 0 0',
  lineHeight: '1.5',
}
