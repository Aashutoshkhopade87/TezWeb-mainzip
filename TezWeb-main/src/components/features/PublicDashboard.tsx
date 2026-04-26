import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock3, MessageCircle, Sparkles, Wand2 } from 'lucide-react';

interface PublicDashboardProps {
  onBrowseTemplates: () => void;
  onBuildWebsite: () => void;
}

const samplePrompts = [
  'Ria Boutique in Phaltan selling sarees',
  'Sharma Sweets, Jalebi and Namkeen in Kanpur',
  'Noor Salon for bridal makeup in Bhopal',
];

const liveTemplates = [
  { name: 'Fashion Dukaan', category: 'Boutique', eta: '28s' },
  { name: 'Food Express', category: 'Restaurant', eta: '24s' },
  { name: 'Salon Shine', category: 'Beauty', eta: '27s' },
];

export default function PublicDashboard({ onBrowseTemplates, onBuildWebsite }: PublicDashboardProps) {
  const [activePrompt, setActivePrompt] = useState(samplePrompts[0]);

  const generationSteps = useMemo(
    () => [
      { title: 'Describe your business', detail: 'Type in Hinglish or English' },
      { title: 'AI builds 3-page site', detail: 'Home, Catalog, Contact auto-created' },
      { title: 'Go live instantly', detail: 'Share subdomain + WhatsApp orders' },
    ],
    [],
  );

  return (
    <main className="px-4 pb-10 pt-6 sm:px-6">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm sm:p-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            <Clock3 className="h-3.5 w-3.5" />
            30-second AI website generation
          </div>

          <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            Sabse simple website builder for Bharat ke SMBs
          </h1>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Prompt likho, website pao. No coding, no complexity — sirf business growth.
          </p>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Try a prompt</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {samplePrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => setActivePrompt(prompt)}
                  className={`rounded-full px-3 py-1.5 text-xs transition sm:text-sm ${
                    activePrompt === prompt
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {prompt}
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-start gap-2 rounded-lg bg-white p-3 ring-1 ring-slate-200">
              <Wand2 className="mt-0.5 h-4 w-4 text-blue-600" />
              <p className="text-sm text-slate-700">{activePrompt}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Button
              onClick={onBuildWebsite}
              className="h-11 w-full gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-base font-semibold"
            >
              Build Website
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button onClick={onBrowseTemplates} variant="outline" className="h-11 w-full text-base">
              Browse Templates
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 grid max-w-5xl gap-3 sm:grid-cols-3">
        {generationSteps.map((step, index) => (
          <article key={step.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold text-blue-600">Step {index + 1}</p>
            <h2 className="mt-1 text-base font-semibold text-slate-900">{step.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{step.detail}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-6 max-w-5xl rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 sm:p-5">
        <div className="flex items-center gap-2 text-emerald-700">
          <Sparkles className="h-4 w-4" />
          <p className="text-sm font-semibold">Live template generation queue</p>
        </div>
        <div className="mt-3 space-y-2">
          {liveTemplates.map((template) => (
            <div key={template.name} className="flex items-center justify-between rounded-lg bg-white px-3 py-2">
              <div>
                <p className="text-sm font-medium text-slate-900">{template.name}</p>
                <p className="text-xs text-slate-500">{template.category}</p>
              </div>
              <p className="text-xs font-semibold text-emerald-700">ETA {template.eta}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-1 text-xs text-slate-600">
          <MessageCircle className="h-3.5 w-3.5" />
          Every product page includes direct “Order on WhatsApp” flow.
        </p>
      </section>
    </main>
  );
}
