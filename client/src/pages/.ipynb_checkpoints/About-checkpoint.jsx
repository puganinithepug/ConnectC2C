import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { motion } from 'framer-motion';
import {
  Shield,
  Target,
  Workflow,
  Palette,
  PencilRuler,
  Database,
  Cpu,
  Sparkles,
  Users,
  Quote,
  CheckCircle2,
  Building2
} from 'lucide-react';

export default function About() {
  const services = [
    {
      icon: Target,
      title: 'Digital Transformation',
      description:
        'Executive-grade roadmaps that align stakeholders, modernize customer journeys, and improve operational throughput through measurable KPIs.'
    },
    {
      icon: PencilRuler,
      title: 'Web Design',
      description:
        'Conversion-focused web experiences built with scalable UX patterns, accessible UI systems, and performance-minded implementation.'
    },
    {
      icon: Palette,
      title: 'Brand Design',
      description:
        'Identity systems, guidelines, and visual language that bring clarity and consistency across touchpoints—online, offline, and in-product.'
    },
    {
      icon: Sparkles,
      title: 'Marketing Assets Generation',
      description:
        'Production-ready marketing deliverables: campaign-ready creative, structured content templates, and brand-compliant asset pipelines.'
    },
    {
      icon: Cpu,
      title: 'AI Systems Integration',
      description:
        'AI-enabled workflows and automation layers—designed for governance, quality controls, and business-aligned deployment.'
    },
    {
      icon: Database,
      title: 'Data Pipelines & Automation Leveraging',
      description:
        'Leverage data pipelines to operationalize insights: automate reporting, reduce manual effort, and standardize data quality.'
    }
  ];

  const engagementModels = [
    {
      icon: Workflow,
      title: 'Strategy Sprint',
      description:
        'A structured discovery-to-roadmap engagement to define outcomes, scope, milestones, and governance.',
      bullets: ['Stakeholder alignment', 'KPI-defined success metrics', 'Delivery plan & risks']
    },
    {
      icon: Users,
      title: 'Design-to-Delivery Partnership',
      description:
        'End-to-end collaboration from UX and brand systems through implementation-ready assets.',
      bullets: ['Design system governance', 'Reusable components', 'Handoff + enablement']
    },
    {
      icon: Cpu,
      title: 'AI Integration & Controls',
      description:
        'Integrate AI responsibly with quality checks, monitoring, and process controls.',
      bullets: ['Workflow mapping', 'Evaluation & QA gates', 'Operational playbooks']
    }
  ];

  // Replace these with real partner testimonials when you have them
  const testimonials = [
    {
      quote:
        'Their team translated our objectives into a clear transformation roadmap, then delivered a governance-ready plan that stakeholders could trust.',
      name: 'Partner Testimonial',
      role: 'Digital Operations Lead',
      org: 'Industry Partner'
    },
    {
      quote:
        'The web and brand system were implemented with discipline—consistent, conversion-driven, and easy for our team to extend.',
      name: 'Partner Testimonial',
      role: 'Head of Growth',
      org: 'Strategic Partner'
    },
    {
      quote:
        'AI and automation were integrated with practical controls. The result wasn’t just experimentation—it was operational adoption.',
      name: 'Partner Testimonial',
      role: 'Program Director',
      org: 'Technology Partner'
    }
  ];

  const proofPoints = [
    {
      icon: CheckCircle2,
      title: 'Outcome-Driven Delivery',
      description: 'Every engagement is anchored to KPIs, measurable milestones, and executive reporting rhythms.'
    },
    {
      icon: Quote,
      title: 'Partner-Grade Governance',
      description: 'Clear scope control, approval flows, and quality checks designed for multi-stakeholder environments.'
    },
    {
      icon: Building2,
      title: 'Reusable Patterns',
      description: 'Design systems, asset templates, and integration blueprints that reduce cost and increase speed.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F7FA] text-[#111827] font-['Times_New_Roman']">
      {/* Hero */}
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
              Strategy Consulting for Digital, Brand, and AI Delivery
            </h1>

            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              We help organizations modernize web and brand experiences, operationalize AI systems, and leverage
              data pipelines for automation—delivered with partner-grade governance and measurable outcomes.
            </p>
          </div>
        </div>
      </div>

      {/* Client Outcomes */}
      <div className="py-16">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <Card className="w-full max-w-5xl bg-white/90 border border-[#0B1F3A]/15 shadow-sm">
              <CardContent className="p-8 md:p-10">
                <div className="text-center mb-2">
                  <div className="inline-flex p-4 rounded-full bg-[#6B0F1A]/10 border border-[#6B0F1A]/20 mb-5">
                    <Target className="w-10 h-10 text-[#6B0F1A]" />
                  </div>
                  <h2 className="text-4xl font-bold text-[#111827] mb-4">Engagement Outcomes</h2>
                  <p className="text-lg text-[#111827]/70 max-w-3xl mx-auto leading-relaxed">
                    A disciplined strategy-to-delivery model designed to reduce friction, strengthen brand consistency,
                    and scale operational execution.
                  </p>
                </div>

                <div className="mt-8 grid md:grid-cols-3 gap-6">
                  {[
                    'Operationalize transformation roadmaps into execution-ready plans',
                    'Elevate web + brand systems for clarity, trust, and conversion',
                    'Deploy AI + automation using data pipelines with governance and quality controls'
                  ].map((t, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="mt-1 w-9 h-9 rounded-full bg-[#6B0F1A]/10 border border-[#6B0F1A]/20 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-[#6B0F1A]" />
                      </div>
                      <p className="text-[#111827]/80 leading-relaxed">{t}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="py-16 bg-gradient-to-br from-[#F7F7FA] to-[#EEF2FF]">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#111827] mb-4">Consulting Services</h2>
            <p className="text-lg text-[#111827]/70">
              Six service pillars designed for enterprise-readiness and partner collaboration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, idx) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                >
                  <Card className="h-full bg-white/90 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-7">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-[#6B0F1A]/10 border border-[#6B0F1A]/15">
                          <Icon className="w-7 h-7 text-[#6B0F1A]" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-[#111827] mb-2">{s.title}</h3>
                          <p className="text-[#111827]/70 leading-relaxed">{s.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Engagement Framework */}
      <div className="py-16">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#111827] mb-4">Collaboration Framework</h2>
            <p className="text-lg text-[#111827]/70">
              How we partner with stakeholders to deliver strategy with disciplined execution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {engagementModels.map((m, idx) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.07 }}
                >
                  <Card className="h-full bg-white/90 border border-slate-200 shadow-sm">
                    <CardContent className="p-7">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-[#0B1F3A]/10 border border-[#0B1F3A]/15">
                          <Icon className="w-7 h-7 text-[#0B1F3A]" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-[#111827]">{m.title}</h3>
                          <p className="text-[#111827]/70 mt-2 leading-relaxed">{m.description}</p>
                        </div>
                      </div>

                      <ul className="space-y-2">
                        {m.bullets.map((b, i) => (
                          <li key={i} className="flex gap-2 items-start text-[#111827]/80 leading-relaxed">
                            <span className="mt-1 w-2.5 h-2.5 rounded-full bg-[#6B0F1A]" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gradient-to-br from-[#EEF2FF] to-[#F7F7FA]">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#111827] mb-4">Partner Testimonials</h2>
            <p className="text-lg text-[#111827]/70">
              Collaboration outcomes from industry partners (replace placeholders with your real quotes).
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <motion.div
                key={`${t.name}-${idx}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
              >
                <Card className="h-full bg-white/90 border border-slate-200 shadow-sm">
                  <CardContent className="p-7">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2.5 rounded-lg bg-[#6B0F1A]/10 border border-[#6B0F1A]/15">
                        <Quote className="w-6 h-6 text-[#6B0F1A]" />
                      </div>
                      <div className="text-[#111827]/70 text-sm">Verified collaboration</div>
                    </div>

                    <p className="text-[#111827]/85 leading-relaxed text-lg italic">
                      “{t.quote}”
                    </p>

                    <div className="mt-6">
                      <div className="font-bold text-[#111827]">{t.name}</div>
                      <div className="text-[#111827]/70">{t.role}</div>
                      <div className="text-[#0B1F3A] font-semibold">{t.org}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Proof Points */}
      <div className="py-16">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#111827] mb-4">Proof Points</h2>
            <p className="text-lg text-[#111827]/70">
              What partners recognize in our delivery approach: governance, outcomes, and reusable systems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {proofPoints.map((p, idx) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                >
                  <Card className="h-full bg-white/90 border border-slate-200 shadow-sm">
                    <CardContent className="p-7">
                      <div className="p-3 rounded-lg bg-[#0B1F3A]/10 border border-[#0B1F3A]/15 inline-flex mb-4">
                        <Icon className="w-7 h-7 text-[#0B1F3A]" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#111827] mb-2">{p.title}</h3>
                      <p className="text-[#111827]/70 leading-relaxed">{p.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

