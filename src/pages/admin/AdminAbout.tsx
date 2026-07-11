import { useEffect, useState } from 'react';
import { Plus, Trash2, Save, Loader2, CheckCircle2 } from 'lucide-react';
import { api, deleteCloudinaryAsset } from '../../lib/api';
import type {
  AboutContent, AboutHeroStat, AboutStorySlide,
  AboutCoreValue, AboutMilestone, AboutWhyItem, AboutTeamMember,
} from '../../types/content';
import { Section, Field, TextInput, TextArea, PrimaryButton, SecondaryButton, DangerButton } from '../../components/admin/FormBits';
import ImageUploader from '../../components/admin/ImageUploader';

const PP = 'Poppins, sans-serif';

const EMPTY: AboutContent = {
  heroEyebrow:           'About Maru Consultancy Services',
  heroHeadlineTop:       "India's Most\nTrusted",
  heroHeadlineHighlight: 'Labour Law',
  heroHeadlineBottom:    'Partner.',
  heroSubtext:           'Two decades of expertise in labour law compliance, HR governance, statutory filings, and workforce management across 15+ Indian states.',
  heroVideoUrl:          '',
  videoUrl:              '',
  storyImages: [
    '/assets/hero-office.png',
    '/assets/service-audits.png',
    '/assets/service-legal.png',
  ],
  heroStats: [
    { value: '500+', label: 'Corporate Clients' },
    { value: '21+',  label: 'Years' },
    { value: '15+',  label: 'States' },
  ],
  marqueeServices: [
    'Labour Law Compliance', 'Payroll & Salary Structuring', 'Statutory Compliance & Filings',
    'People Outsourcing & Staffing', 'Audits & Governance', 'Registrations & Licensing',
    'HR Policy & Advisory', 'Legal Representation', 'Training & Workshops',
  ],
  storySlides: [
    { heading: 'Founded on a vision of', headingHighlight: 'simplified compliance.', body: "What started as a boutique advisory in Mumbai has grown into a pan-India powerhouse trusted by some of India's most respected corporations. We manage compliance for 500+ organisations — from dynamic startups to Fortune 500 conglomerates." },
    { heading: 'Built on deep expertise,', headingHighlight: 'not guesswork.', body: "Every engagement is led by consultants who live and breathe labour law — tracking every amendment across 15+ states so our clients never have to. That rigor is what turned a single Mumbai office into a nationwide practice." },
    { heading: 'Powered by technology,', headingHighlight: 'guided by people.', body: "Our proprietary compliance dashboards give clients real-time visibility into every filing and audit — backed by a dedicated consultant who's always a call away. It's how we keep 98% of our clients year after year." },
  ],
  pullQuoteLine1: 'Compliance is not a checkbox',
  pullQuoteLine2: "It's the foundation on which",
  pullQuoteLine3: 'every great business is built',
  pullQuoteAttribution: 'Deepak Maru, Founder & Managing Partner',
  coreValues: [
    { title: 'Absolute Integrity',     img: '/assets/service-legal.png' },
    { title: 'Unmatched Excellence',   img: '/assets/service-labour.png' },
    { title: 'Client Partnership',     img: '/assets/service-staffing.png' },
    { title: 'Continuous Innovation',  img: '/assets/service-audits.png' },
  ],
  journeyMilestones: [
    { year: '2003', event: 'Founded',             img: '/assets/service-statutory.png', description: 'Established as a boutique advisory firm in Mumbai, focused on compliance.' },
    { year: '2009', event: 'Pan-India',           img: '/assets/service-payroll.png',   description: 'Expanded to Delhi NCR and Bangalore, becoming a true pan-India compliance firm.' },
    { year: '2016', event: 'Tech-Enabled',        img: '/assets/service-training.png',  description: 'Launched proprietary compliance software with real-time dashboards.' },
    { year: '2023', event: 'New Codes Authority', img: '/assets/service-hr.png',        description: "Became India's go-to authority on the New Labour Codes nationwide." },
  ],
  whyChooseItems: [
    { point: 'Pan-India presence across 15+ states',   sub: 'State-specific expertise from Kashmir to Kanyakumari, covering all major industrial hubs.' },
    { point: 'Experts in New Labour Codes',            sub: "One of India's earliest and most trusted authorities on the consolidated labour code framework." },
    { point: 'Proactive risk identification',          sub: 'We audit for vulnerabilities before they become penalties — not after. Reactive compliance is a liability.' },
    { point: 'Dedicated consultant per client',        sub: 'Every client gets a named consultant who knows their business, their sector, and their risk profile.' },
    { point: 'Tech-enabled tracking & reporting',      sub: 'Real-time dashboards and automated reminders so nothing ever slips through the cracks.' },
  ],
  teamMembers: [
    { name: 'Deepak Maru',  qualification: 'B.Com (Hons), LL.B',  role: 'Advocate\nFounder & Managing Partner', img: '/assets/service-legal.png' },
    { name: 'Sanjeev Maru', qualification: 'B.Com, LL.B',         role: 'Co-founder & Managing Partner',        img: '/assets/service-staffing.png' },
    { name: 'Pankhil Maru', qualification: 'B.E (I.T), MBA (HR)', role: 'Managing Partner',                     img: '/assets/service-hr.png' },
    { name: 'Nishit Maru',  qualification: 'BLS, LL.B, CS',       role: 'Managing Partner',                     img: '/assets/service-audits.png' },
  ],
};

export default function AdminAbout() {
  const [data, setData] = useState<AboutContent>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [initialEyebrow, setInitialEyebrow] = useState('');
  const [confirmEmptyEyebrow, setConfirmEmptyEyebrow] = useState(false);

  useEffect(() => {
    api.get<AboutContent>('/about')
      .then(res => {
        // Merge: use fetched arrays only if non-empty, else keep EMPTY defaults
        setInitialEyebrow(res.heroEyebrow ?? '');
        setData({
          heroEyebrow:           res.heroEyebrow           ?? EMPTY.heroEyebrow,
          heroHeadlineTop:       res.heroHeadlineTop       ?? EMPTY.heroHeadlineTop,
          heroHeadlineHighlight: res.heroHeadlineHighlight ?? EMPTY.heroHeadlineHighlight,
          heroHeadlineBottom:    res.heroHeadlineBottom    ?? EMPTY.heroHeadlineBottom,
          heroSubtext:           res.heroSubtext           ?? EMPTY.heroSubtext,
          heroVideoUrl:          res.heroVideoUrl          ?? EMPTY.heroVideoUrl,
          videoUrl:              res.videoUrl              ?? EMPTY.videoUrl,
          // Fall back to the same defaults the public page uses when no images
          // have been uploaded — this keeps the admin in sync with what the
          // visitor actually sees.  The admin can still clear all images by
          // saving an empty list; it will simply re-show the defaults on reload.
          storyImages:          res.storyImages?.length ? res.storyImages : EMPTY.storyImages,
          heroStats:            res.heroStats?.length            ? res.heroStats            : EMPTY.heroStats,
          marqueeServices:      res.marqueeServices?.length      ? res.marqueeServices      : EMPTY.marqueeServices,
          storySlides:          res.storySlides?.length          ? res.storySlides          : EMPTY.storySlides,
          pullQuoteLine1:       res.pullQuoteLine1       ?? EMPTY.pullQuoteLine1,
          pullQuoteLine2:       res.pullQuoteLine2       ?? EMPTY.pullQuoteLine2,
          pullQuoteLine3:       res.pullQuoteLine3       ?? EMPTY.pullQuoteLine3,
          pullQuoteAttribution: res.pullQuoteAttribution ?? EMPTY.pullQuoteAttribution,
          coreValues:           res.coreValues?.length           ? res.coreValues           : EMPTY.coreValues,
          journeyMilestones:    res.journeyMilestones?.length    ? res.journeyMilestones    : EMPTY.journeyMilestones,
          whyChooseItems:       res.whyChooseItems?.length       ? res.whyChooseItems       : EMPTY.whyChooseItems,
          teamMembers:          res.teamMembers?.length          ? res.teamMembers          : EMPTY.teamMembers,
        });
      })
      .catch(err => setError(err instanceof Error ? err.message : 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  const doSave = async () => {
    setConfirmEmptyEyebrow(false);
    setFieldErrors({});
    setSaving(true); setError(''); setSaved(false);
    try {
      await api.put<AboutContent>('/about', data);
      setDirty(false); setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const save = async () => {
    if (!data.heroEyebrow.trim()) {
      // Had a value originally but admin cleared it → hard error
      if (initialEyebrow.trim()) {
        setFieldErrors({ heroEyebrow: 'Eyebrow text is required.' });
        return;
      }
      // Was always empty → ask
      setConfirmEmptyEyebrow(true);
      return;
    }
    setConfirmEmptyEyebrow(false);
    await doSave();
  };


  const set = <K extends keyof AboutContent>(key: K, value: AboutContent[K]) => {
    setDirty(true);
    setData(d => ({ ...d, [key]: value }));
  };

  if (loading) return <p className="text-gray-400 text-sm">Loading…</p>;

  // ── helpers for each list type ──────────────────────────────────────

  const listOf = <T,>(
    key: keyof AboutContent,
    items: T[],
    render: (item: T, i: number, onChange: (updated: T) => void, onRemove: () => void) => React.ReactNode,
    empty: T,
    /** Return all Cloudinary image URLs from an item so they're cleaned up when the item is removed. */
    getImages?: (item: T) => string[],
  ) => (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i}>
          {render(
            item,
            i,
            (updated) => { const n = [...items]; n[i] = updated; set(key, n as AboutContent[typeof key]); },
            () => {
              // Delete any Cloudinary assets belonging to this item before removing it
              if (getImages) getImages(item).forEach(url => { if (url) deleteCloudinaryAsset(url).catch(() => {}); });
              set(key, items.filter((_, j) => j !== i) as AboutContent[typeof key]);
            },
          )}
        </div>
      ))}
      <SecondaryButton type="button" onClick={() => set(key, [...items, { ...empty }] as AboutContent[typeof key])}>
        <Plus size={13} /> Add item
      </SecondaryButton>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-bold" style={{ fontFamily: PP, fontSize: '1.5rem', color: '#111' }}>About Page</h1>
          <p className="text-gray-400 text-sm mt-1">Edit the content shown on the About page.</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="flex items-center gap-1.5 text-sm font-semibold text-green-600"><CheckCircle2 size={15} /> Saved</span>}
          <PrimaryButton onClick={save} disabled={saving}>
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            {saving ? 'Saving…' : 'Save Changes'}
          </PrimaryButton>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-600 font-medium">{error}</p>}

      {dirty && !saving && (
        <div className="sticky top-0 z-20 mb-5 flex items-center justify-between gap-3 rounded-xl px-4 py-3 shadow-md"
          style={{ backgroundColor: '#7c2d00', fontFamily: PP }}>
          <span className="text-sm font-semibold text-white">You have unsaved changes.</span>
          <button onClick={save}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#fda102', color: '#111' }}>
            <Save size={13} /> Save now
          </button>
        </div>
      )}

      {/* ── Hero Content ── */}
      <Section title="Hero Content" description="The left-panel headline and subtext shown on the About page hero.">
        <Field label="Eyebrow (small caps above the headline)" error={fieldErrors.heroEyebrow}>
          <TextInput value={data.heroEyebrow}
            onChange={e => {
              set('heroEyebrow', e.target.value);
              setFieldErrors(fe => ({ ...fe, heroEyebrow: '' }));
              setConfirmEmptyEyebrow(false);
            }}
            placeholder="e.g. About Maru Consultancy Services"
            style={{ borderColor: fieldErrors.heroEyebrow ? '#dc2626' : undefined }} />
          {confirmEmptyEyebrow && (
            <div className="mt-2 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <span className="text-sm text-amber-800 font-medium flex-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Eyebrow is empty — the label above the headline won't appear on the page. Save anyway?
              </span>
              <button
                type="button"
                onClick={doSave}
                className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-opacity hover:opacity-80"
                style={{ backgroundColor: '#a83a00', color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
                Keep empty
              </button>
              <button
                type="button"
                onClick={() => setConfirmEmptyEyebrow(false)}
                className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-300 bg-white text-gray-700 transition-opacity hover:opacity-80"
                style={{ fontFamily: 'Poppins, sans-serif' }}>
                Fill in
              </button>
            </div>
          )}
        </Field>
        <Field label="Headline — lines before the amber highlight (use ↵ Enter for a line break)">
          <TextArea rows={2} value={data.heroHeadlineTop}
            onChange={e => set('heroHeadlineTop', e.target.value)}
            placeholder={"India's Most\nTrusted"} />
        </Field>
        <Field label="Headline — amber highlight line">
          <TextInput value={data.heroHeadlineHighlight}
            onChange={e => set('heroHeadlineHighlight', e.target.value)}
            placeholder="Labour Law" />
        </Field>
        <Field label="Headline — final line">
          <TextInput value={data.heroHeadlineBottom}
            onChange={e => set('heroHeadlineBottom', e.target.value)}
            placeholder="Partner." />
        </Field>
        <Field label="Subtext paragraph">
          <TextArea rows={3} value={data.heroSubtext}
            onChange={e => set('heroSubtext', e.target.value)}
            placeholder="Two decades of expertise in labour law compliance..." />
        </Field>
      </Section>

      {/* ── Hero Stats ── */}
      <Section title="Hero Stats" description="Three numbers shown at the bottom of the hero panel (e.g. 500+, Corporate Clients).">
        {listOf<AboutHeroStat>(
          'heroStats', data.heroStats,
          (item, _i, onChange, onRemove) => (
            <div className="flex gap-2 items-center">
              <TextInput placeholder="Value (e.g. 500+)" value={item.value}
                onChange={e => onChange({ ...item, value: e.target.value })} className="w-28" />
              <TextInput placeholder="Label (e.g. Corporate Clients)" value={item.label}
                onChange={e => onChange({ ...item, label: e.target.value })} />
              <DangerButton type="button" onClick={onRemove}><Trash2 size={13} /></DangerButton>
            </div>
          ),
          { value: '', label: '' },
        )}
      </Section>

      {/* ── Hero Video ── */}
      <Section title="Hero Video" description="Right-side video in the hero section. Paste a YouTube/Vimeo embed URL to override the default hero video. Leave blank to keep the default.">
        <Field label="Video embed URL (e.g. https://www.youtube.com/embed/xxxxx)">
          <TextInput value={data.heroVideoUrl} onChange={e => set('heroVideoUrl', e.target.value)}
            placeholder="https://www.youtube.com/embed/..." />
        </Field>
      </Section>

      {/* ── Marquee Strip ── */}
      <Section title="Marquee Strip" description="The scrolling service tags shown on the amber band beneath the hero.">
        <div className="space-y-2">
          {data.marqueeServices.map((svc, i) => (
            <div key={i} className="flex gap-2">
              <TextInput value={svc} onChange={e => {
                const n = [...data.marqueeServices]; n[i] = e.target.value; set('marqueeServices', n);
              }} placeholder="e.g. Labour Law Compliance" />
              <DangerButton type="button" onClick={() => set('marqueeServices', data.marqueeServices.filter((_, j) => j !== i))}>
                <Trash2 size={13} />
              </DangerButton>
            </div>
          ))}
          <SecondaryButton type="button" onClick={() => set('marqueeServices', [...data.marqueeServices, ''])}>
            <Plus size={13} /> Add service
          </SecondaryButton>
        </div>
      </Section>

      {/* ── Story Bento — Side Image Carousel ── */}
      <Section title="Story Bento — Side Images" description="The rotating photos in the large left panel of the bento grid (behind the 'Est. 2003' label). Add 1 or more images — they cross-fade automatically on the site.">
        <div className="space-y-3">
          {data.storyImages.map((img, i) => (
            <div key={i} className="flex gap-2 items-start">
              <div className="flex-1">
                <ImageUploader label={`Image ${i + 1}`} value={img}
                  onChange={url => { const n = [...data.storyImages]; n[i] = url; set('storyImages', n); }}
                  section="about" hint="Portrait or square, min 800 × 580 px — fills the large left panel" />
              </div>
              <DangerButton type="button" className="mt-8"
                onClick={() => {
                  if (img) deleteCloudinaryAsset(img).catch(() => {});
                  set('storyImages', data.storyImages.filter((_, j) => j !== i));
                }}>
                <Trash2 size={13} />
              </DangerButton>
            </div>
          ))}
          <SecondaryButton type="button" onClick={() => set('storyImages', [...data.storyImages, ''])}>
            <Plus size={13} /> Add image
          </SecondaryButton>
        </div>
      </Section>

      {/* ── Story Bento — Video ── */}
      <Section title="Story Bento — Video" description="Paste a YouTube/Vimeo embed URL to show a video in the dark panel of the bento grid (the stats + video card below the 'Est.' photo). Leave blank to show the 'Video coming soon' placeholder.">
        <Field label="Video embed URL (e.g. https://www.youtube.com/embed/xxxxx)">
          <TextInput value={data.videoUrl} onChange={e => set('videoUrl', e.target.value)}
            placeholder="https://www.youtube.com/embed/..." />
        </Field>
      </Section>

      {/* ── Story Slides ── */}
      <Section title="Our Story Carousel" description="The three rotating slides in the bento grid. Heading splits into a normal part and an amber-coloured highlight.">
        {listOf<AboutStorySlide>(
          'storySlides', data.storySlides,
          (item, _i, onChange, onRemove) => (
            <div className="p-4 rounded-xl border border-gray-100 space-y-2">
              <div className="flex gap-2">
                <TextInput placeholder="Heading (normal)" value={item.heading}
                  onChange={e => onChange({ ...item, heading: e.target.value })} />
                <DangerButton type="button" onClick={onRemove}><Trash2 size={13} /></DangerButton>
              </div>
              <TextInput placeholder="Heading highlight (amber colour)" value={item.headingHighlight}
                onChange={e => onChange({ ...item, headingHighlight: e.target.value })} />
              <TextArea rows={3} placeholder="Slide body text" value={item.body}
                onChange={e => onChange({ ...item, body: e.target.value })} />
            </div>
          ),
          { heading: '', headingHighlight: '', body: '' },
        )}
      </Section>

      {/* ── Pull Quote ── */}
      <Section title="Pull Quote" description="The full-width quote section on the brand-colour background.">
        <Field label="Line 1 (normal colour)">
          <TextInput value={data.pullQuoteLine1} onChange={e => set('pullQuoteLine1', e.target.value)} />
        </Field>
        <Field label="Line 2 (normal colour)">
          <TextInput value={data.pullQuoteLine2} onChange={e => set('pullQuoteLine2', e.target.value)} />
        </Field>
        <Field label="Line 3 (amber colour)">
          <TextInput value={data.pullQuoteLine3} onChange={e => set('pullQuoteLine3', e.target.value)} />
        </Field>
        <Field label="Attribution">
          <TextInput value={data.pullQuoteAttribution} onChange={e => set('pullQuoteAttribution', e.target.value)}
            placeholder="e.g. Deepak Maru, Founder & Managing Partner" />
        </Field>
      </Section>

      {/* ── Core Values ── */}
      <Section title="Core Values" description="Four poster-image cards. Numbers are assigned automatically (01–04).">
        {listOf<AboutCoreValue>(
          'coreValues', data.coreValues,
          (item, i, onChange, onRemove) => (
            <div className="p-4 rounded-xl border border-gray-100 space-y-3">
              <div className="flex gap-2 items-center">
                <span className="text-xs font-bold text-gray-400 w-6 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <TextInput placeholder="Value title (e.g. Absolute Integrity)" value={item.title}
                  onChange={e => onChange({ ...item, title: e.target.value })} />
                <DangerButton type="button" onClick={onRemove}><Trash2 size={13} /></DangerButton>
              </div>
              <ImageUploader label="Background image" value={item.img} onChange={url => onChange({ ...item, img: url })} section="about" hint="Portrait, min 600 × 380 px — shown as card background" />
            </div>
          ),
          { title: '', img: '' },
          (item) => [item.img],
        )}
      </Section>

      {/* ── Journey Milestones ── */}
      <Section title="Journey Timeline" description="The four milestone nodes on the horizontal timeline.">
        {listOf<AboutMilestone>(
          'journeyMilestones', data.journeyMilestones,
          (item, _i, onChange, onRemove) => (
            <div className="p-4 rounded-xl border border-gray-100 space-y-2">
              <div className="flex gap-2">
                <TextInput placeholder="Year (e.g. 2003)" value={item.year} className="w-24"
                  onChange={e => onChange({ ...item, year: e.target.value })} />
                <TextInput placeholder="Event label (e.g. Founded)" value={item.event}
                  onChange={e => onChange({ ...item, event: e.target.value })} />
                <DangerButton type="button" onClick={onRemove}><Trash2 size={13} /></DangerButton>
              </div>
              <TextArea rows={2} placeholder="Description paragraph" value={item.description}
                onChange={e => onChange({ ...item, description: e.target.value })} />
              <ImageUploader label="Milestone image" value={item.img} onChange={url => onChange({ ...item, img: url })} section="about" hint="Landscape 16:9, min 800 × 176 px — wide horizontal strip on the timeline" />
            </div>
          ),
          { year: '', event: '', img: '', description: '' },
          (item) => [item.img],
        )}
      </Section>

      {/* ── Why Choose Us ── */}
      <Section title="Why Choose Us — Checklist" description="The five bullet points on the right side of the 'What sets us apart' section.">
        {listOf<AboutWhyItem>(
          'whyChooseItems', data.whyChooseItems,
          (item, _i, onChange, onRemove) => (
            <div className="p-3 rounded-xl border border-gray-100 space-y-2">
              <div className="flex gap-2">
                <TextInput placeholder="Main point (bold)" value={item.point}
                  onChange={e => onChange({ ...item, point: e.target.value })} />
                <DangerButton type="button" onClick={onRemove}><Trash2 size={13} /></DangerButton>
              </div>
              <TextArea rows={2} placeholder="Supporting detail (smaller text)" value={item.sub}
                onChange={e => onChange({ ...item, sub: e.target.value })} />
            </div>
          ),
          { point: '', sub: '' },
        )}
      </Section>

      {/* ── Team Members ── */}
      <Section title="Team Members" description="The four cards in the 'Meet the Experts' section.">
        {listOf<AboutTeamMember>(
          'teamMembers', data.teamMembers,
          (item, _i, onChange, onRemove) => (
            <div className="p-4 rounded-xl border border-gray-100 space-y-2">
              <div className="flex gap-2">
                <TextInput placeholder="Full name" value={item.name}
                  onChange={e => onChange({ ...item, name: e.target.value })} />
                <DangerButton type="button" onClick={onRemove}><Trash2 size={13} /></DangerButton>
              </div>
              <TextInput placeholder="Qualifications (e.g. B.Com (Hons), LL.B)" value={item.qualification}
                onChange={e => onChange({ ...item, qualification: e.target.value })} />
              <TextInput placeholder="Role / title" value={item.role}
                onChange={e => onChange({ ...item, role: e.target.value })} />
              <ImageUploader label="Photo" value={item.img} onChange={url => onChange({ ...item, img: url })} section="team" hint="Portrait 5:4, min 400 × 320 px — face centred, cropped to fill the card" />
            </div>
          ),
          { name: '', qualification: '', role: '', img: '' },
          (item) => [item.img],
        )}
      </Section>
    </div>
  );
}
