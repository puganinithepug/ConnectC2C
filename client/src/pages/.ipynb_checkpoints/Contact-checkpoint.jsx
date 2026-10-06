import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Building2,
  Clock,
  Shield,
  Target,
  Workflow,
  Cpu,
  Sparkles,
  Palette
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const capabilitySignals = [
    { Icon: Target, label: 'Digital Transformation' },
    { Icon: Workflow, label: 'Web & UX Delivery' },
    { Icon: Palette, label: 'Brand Design Systems' },
    { Icon: Sparkles, label: 'Marketing Assets Generation' },
    { Icon: Cpu, label: 'AI Systems Integration' }
  ];

  return (
    <div className="min-h-screen bg-[#F7F7FA] text-[#111827] font-['Times_New_Roman']">
      {/* Hero Section */}
      <div className="relative py-20 md:py-24 bg-gradient-to-br from-[#4E0B13] via-[#6B0F1A] to-[#0B1F3A]">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-flex p-4 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm mb-6"
            >
              <Shield className="w-12 h-12 text-white" />
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Request a Strategy Consultation
            </h1>

            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Share your objectives and current constraints. We will respond with a structured engagement outline covering scope, timeline,
              and governance approach across transformation, web, brand, marketing assets, AI integration, and data-driven automation.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white/90 border border-[#0B1F3A]/15 shadow-sm">
                <CardContent className="p-8 md:p-9 pt-4">
                  <div className="mb-6">
                    <div className="inline-flex p-3 rounded-lg bg-[#6B0F1A]/10 border border-[#6B0F1A]/15 mb-4">
                      <Send className="w-6 h-6 text-[#6B0F1A]" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#111827] mb-2">Message the Consulting Desk</h2>
                    <p className="text-[#111827]/70 leading-relaxed">
                      For the fastest routing, include which service pillars you need and what success looks like for your organization.
                    </p>
                  </div>

                  {submitted && (
                    <div className="mb-6 p-4 bg-[#EEF2FF] border border-[#0B1F3A]/15 rounded-lg text-[#111827]">
                      Thank you. Your request has been submitted. We will respond with next steps and an engagement outline.
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#111827]/80 mb-2">Name *</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#111827]/80 mb-2">Email *</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#111827]/80 mb-2">Phone</label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="514-xxx-xxxx"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#111827]/80 mb-2">Subject *</label>
                      <Input
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        placeholder="e.g., AI integration + automation roadmap"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#111827]/80 mb-2">Scope Overview *</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={6}
                        placeholder="Describe goals, stakeholders involved, target timeline, and what you want to automate or improve."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#6B0F1A] text-white hover:bg-[#4E0B13] transition-colors"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Submit Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {capabilitySignals.map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="p-4 rounded-lg bg-white/90 border border-slate-200 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#0B1F3A]/10 border border-[#0B1F3A]/15">
                        <Icon className="w-5 h-5 text-[#0B1F3A]" />
                      </div>
                      <div>
                        <div className="font-bold text-[#111827] leading-tight">{label}</div>
                        <div className="text-[#111827]/60 text-sm mt-1">Engagement-ready capabilities</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {engagementChannels.map((office, idx) => (
                <Card key={idx} className="bg-white/90 border border-slate-200 shadow-sm">
                  <CardContent className="p-6 pt-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-[#6B0F1A]/10 border border-[#6B0F1A]/15">
                        <Building2 className="w-6 h-6 text-[#6B0F1A]" />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-bold text-[#111827] text-lg mb-3">{office.name}</h3>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-[#111827]/70">
                            <Phone className="w-4 h-4" />
                            <a
                              href={`tel:${office.phone.replace(/-/g, '')}`}
                              className="hover:text-[#6B0F1A] transition-colors"
                            >
                              {office.phone}
                            </a>

                            {office.phoneAlt && (
                              <>
                                <span className="text-[#111827]/40">|</span>
                                <a
                                  href={`tel:${office.phoneAlt.replace(/-/g, '')}`}
                                  className="hover:text-[#6B0F1A] transition-colors"
                                >
                                  {office.phoneAlt}
                                </a>
                              </>
                            )}
                          </div>

                          <div className="flex items-start gap-2 text-[#111827]/70">
                            <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                            <span>{office.address}</span>
                          </div>

                          <div className="flex items-center gap-2 text-[#111827]/70">
                            <Clock className="w-4 h-4" />
                            <span>{office.hours}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-gradient-to-br from-[#6B0F1A]/5 to-[#0B1F3A]/5 border border-[#6B0F1A]/20">
                <CardContent className="p-6 pt-4">
                  <h3 className="font-bold text-[#111827] text-lg mb-4">Additional Engagement Channels</h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-[#6B0F1A]" />
                      <div>
                        <div className="font-semibold text-[#111827]">General Strategy Intake</div>
                        <a href="mailto:x.com" className="text-[#6B0F1A] hover:underline">
                          x.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-[#6B0F1A]" />
                      <div>
                        <div className="font-semibold text-[#111827]">Partnerships & Marketing Assets</div>
                        <a href="mailto:x.com" className="text-[#6B0F1A] hover:underline">
                          x.com
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 border border-slate-200 shadow-sm">
                <CardContent className="p-6 pt-4">
                  <h3 className="font-bold text-[#111827] text-lg mb-2">Looking for business reform?</h3>
                  <p className="text-[#111827]/70 mb-4">
                    Take the next steps
                  </p>

                  <Button
                    className="w-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                    asChild={false}
                    onClick={() => (window.location.href = '/transformation')}
                    type="button"
                  >
                    enagegement
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
