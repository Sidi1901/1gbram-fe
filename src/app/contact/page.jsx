import ContactForm from './ContactForm'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with the 1GbRam team.',
}

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Contact Us</h1>
      <p className="text-gray-500 text-lg mb-10">
        Have a question, suggestion, or want to contribute? Drop us a message.
      </p>
      <ContactForm />
    </div>
  )
}
