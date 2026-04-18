'use client'

import { useState } from 'react'
import { Form, Input, Button, Alert } from 'antd'
import { SendOutlined } from '@ant-design/icons'

const { TextArea } = Input

export default function ContactForm() {
  const [form] = Form.useForm()
  const [status, setStatus] = useState(null) // 'success' | 'error' | null
  const [loading, setLoading] = useState(false)

  async function handleSubmit(values) {
    setLoading(true)
    setStatus(null)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/contact-submissions`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: values }),
        }
      )
      if (!res.ok) throw new Error('Submission failed')
      setStatus('success')
      form.resetFields()
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      {status === 'success' && (
        <Alert
          type="success"
          message="Message sent!"
          description="Thanks for reaching out. We'll get back to you soon."
          className="mb-6"
          showIcon
        />
      )}
      {status === 'error' && (
        <Alert
          type="error"
          message="Something went wrong"
          description="Please try again or email us directly."
          className="mb-6"
          showIcon
        />
      )}

      <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark={false}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="Jane Smith" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Enter a valid email' },
            ]}
          >
            <Input placeholder="jane@example.com" size="large" />
          </Form.Item>
        </div>

        <Form.Item
          name="subject"
          label="Subject"
          rules={[{ required: true, message: 'Please enter a subject' }]}
        >
          <Input placeholder="What's this about?" size="large" />
        </Form.Item>

        <Form.Item
          name="message"
          label="Message"
          rules={[{ required: true, message: 'Please enter a message' }]}
        >
          <TextArea rows={6} placeholder="Your message..." size="large" />
        </Form.Item>

        <Form.Item className="mb-0">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            icon={<SendOutlined />}
            className="w-full sm:w-auto"
          >
            Send Message
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
