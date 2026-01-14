'use client';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Message sent! (Connect form to backend)');
  };

  return (
    <div className="page-transition min-h-screen bg-gradient-to-br from-beige-light via-white to-beige py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left Side - Info */}
          <div className="space-y-8">
            <div>
              <h1 className="font-display text-6xl md:text-7xl font-bold text-navy mb-6 text-reveal">
                Let's <span className="text-cherry">Connect</span>
              </h1>
              <p className="text-lg md:text-xl text-navy/70 leading-relaxed">
                Have a project in mind? Want to collaborate? Need a custom Notion system? 
                Or just want to talk about poetry and code? I'd love to hear from you.
              </p>
            </div>

            <div className="space-y-6 text-reveal" style={{ '--index': 1 }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cherry/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-cherry text-xl">✉️</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-navy mb-1">Email</h3>
                  <p className="text-navy/60">hello@creativelynanda.co.za</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cherry/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-cherry text-xl">📍</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-navy mb-1">Location</h3>
                  <p className="text-navy/60">Port Elizabeth, South Africa</p>
                  <p className="text-navy/60 text-sm">Remote work available worldwide</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cherry/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-cherry text-xl">🔗</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-navy mb-1">Connect</h3>
                  <div className="space-y-1">
                    <p className="text-navy/60 hover:text-cherry transition-colors cursor-pointer">LinkedIn</p>
                    <p className="text-navy/60 hover:text-cherry transition-colors cursor-pointer">GitHub</p>
                    <p className="text-navy/60 hover:text-cherry transition-colors cursor-pointer">Twitter/X</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="p-6 bg-navy rounded-2xl text-beige text-reveal" style={{ '--index': 2 }}>
              <h3 className="font-display text-2xl font-bold mb-3">What I Offer</h3>
              <ul className="space-y-2 text-beige/80 text-sm">
                <li>→ Full-stack web development</li>
                <li>→ Custom Notion systems</li>
                <li>→ AI integration & chatbots</li>
                <li>→ Technical consulting</li>
                <li>→ Poetry workshops & performances</li>
              </ul>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white p-8 rounded-3xl shadow-xl text-reveal" style={{ '--index': 3 }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-navy font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-beige/30 rounded-xl border-2 border-transparent focus:border-cherry focus:outline-none transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-navy font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-beige/30 rounded-xl border-2 border-transparent focus:border-cherry focus:outline-none transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-navy font-medium mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  className="w-full px-4 py-3 bg-beige/30 rounded-xl border-2 border-transparent focus:border-cherry focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-cherry text-white rounded-xl font-medium hover:bg-cherry-dark transition-all hover:scale-105 hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}