import { useEffect, useState } from 'react';
import { Plus, Trash2, Save, Loader2, Pencil, X, CheckCircle2 } from 'lucide-react';
import { api } from '../../lib/api';
import type { ServiceContent } from '../../types/content';
import { Section, Field, TextInput, TextArea, PrimaryButton, SecondaryButton, DangerButton } from '../../components/admin/FormBits';
import ImageUploader from '../../components/admin/ImageUploader';

const PP = 'Poppins, sans-serif';

const EMPTY: Omit<ServiceContent, '_id'> = {
  slug: '', title: '', img: '', desc: '',
  headline: '', subhead: '', intro: '', body: '', deliverables: [],
};

export default function AdminServices() {
  const [services, setServices] = useState<ServiceContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ServiceContent | (Omit<ServiceContent, '_id'> & { _id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const load = () => api.get<ServiceContent[]>('/services').then(setServices);

  useEffect(() => {
    load().catch((err) => setError(err instanceof Error ? err.message : 'Failed to load')).finally(() => setLoading(false));
  }, []);

  const startCreate = () => { setError(''); setEditing({ ...EMPTY }); };
  const startEdit = (s: ServiceContent) => { setError(''); setEditing({ ...s, deliverables: s.deliverables || [] }); };
  const cancel = () => setEditing(null);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    setError('');
    try {
      if ('_id' in editing && editing._id) {
        await api.put(`/services/${editing._id}`, editing);
      } else {
        await api.post('/services', editing);
      }
      await load();
      setEditing(null);
      setNotice('Saved — changes are live on the site.');
      setTimeout(() => setNotice(''), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this service? This cannot be undone.')) return;
    try {
      await api.del(`/services/${id}`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  if (loading) return <p className="text-gray-400 text-sm">Loading…</p>;

  if (editing) {
    const deliverables = editing.deliverables || [];
    const set = <K extends keyof typeof editing>(key: K, value: (typeof editing)[K]) =>
      setEditing((e) => (e ? { ...e, [key]: value } : e));

    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-bold" style={{ fontFamily: PP, fontSize: '1.5rem', color: '#111' }}>
            {'_id' in editing && editing._id ? 'Edit Service' : 'New Service'}
          </h1>
          <SecondaryButton onClick={cancel}><X size={13} /> Cancel</SecondaryButton>
        </div>
        {error && <div className="mb-5 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">{error}</div>}

        <Section title="Listing Details" description="Shown on the Services grid and homepage preview.">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Title"><TextInput value={editing.title} onChange={(e) => set('title', e.target.value)} /></Field>
            <Field label="Slug (URL)"><TextInput value={editing.slug} onChange={(e) => set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} /></Field>
          </div>
          <Field label="Short description"><TextArea rows={2} value={editing.desc} onChange={(e) => set('desc', e.target.value)} /></Field>
          <ImageUploader label="Card image" value={editing.img} onChange={(v) => set('img', v)} section="services" hint="Landscape 16:9, min 1200 × 500 px — also used as full-width banner on the service detail page" />
        </Section>

        <Section title="Detail Page" description="Shown on this service's dedicated page.">
          <Field label="Headline"><TextInput value={editing.headline} onChange={(e) => set('headline', e.target.value)} /></Field>
          <Field label="Subheading"><TextInput value={editing.subhead} onChange={(e) => set('subhead', e.target.value)} /></Field>
          <Field label="Intro"><TextArea rows={2} value={editing.intro} onChange={(e) => set('intro', e.target.value)} /></Field>
          <Field label="Body (use a blank line for a new paragraph)"><TextArea rows={6} value={editing.body} onChange={(e) => set('body', e.target.value)} /></Field>
          <Field label="Deliverables / What You Get">
            <div className="space-y-3">
              {deliverables.map((d, i) => (
                <div key={i} className="flex gap-2 items-start p-3 rounded-xl border border-gray-100">
                  <div className="flex-1 space-y-2">
                    <TextInput placeholder="Title" value={d.title} onChange={(e) => {
                      const next = [...deliverables]; next[i] = { ...d, title: e.target.value }; set('deliverables', next);
                    }} />
                    <TextArea rows={2} placeholder="Description" value={d.desc} onChange={(e) => {
                      const next = [...deliverables]; next[i] = { ...d, desc: e.target.value }; set('deliverables', next);
                    }} />
                  </div>
                  <DangerButton type="button" onClick={() => set('deliverables', deliverables.filter((_, j) => j !== i))}><Trash2 size={13} /></DangerButton>
                </div>
              ))}
              <SecondaryButton type="button" onClick={() => set('deliverables', [...deliverables, { title: '', desc: '' }])}><Plus size={13} /> Add deliverable</SecondaryButton>
            </div>
          </Field>
        </Section>

        <div className="flex justify-end gap-3">
          <SecondaryButton onClick={cancel}>Cancel</SecondaryButton>
          <PrimaryButton onClick={save} disabled={saving || !editing.title || !editing.slug}>
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            {saving ? 'Saving…' : 'Save Service'}
          </PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-bold" style={{ fontFamily: PP, fontSize: '1.5rem', color: '#111' }}>Services</h1>
          <p className="text-gray-400 text-sm mt-1">Add, edit, or remove the services listed on your site.</p>
        </div>
        <PrimaryButton onClick={startCreate}><Plus size={15} /> New Service</PrimaryButton>
      </div>

      {notice && (
        <div className="mb-5 flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5">
          <CheckCircle2 size={15} /> {notice}
        </div>
      )}
      {error && <div className="mb-5 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">{error}</div>}

      <div className="space-y-3">
        {services.map((s) => (
          <div key={s._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
            <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-50 shrink-0">
              {s.img && <img src={s.img} className="w-full h-full object-cover" alt="" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate" style={{ fontFamily: PP, color: '#111' }}>{s.title}</p>
              <p className="text-gray-400 text-xs truncate">/services/{s.slug}</p>
            </div>
            <SecondaryButton onClick={() => startEdit(s)}><Pencil size={13} /> Edit</SecondaryButton>
            <DangerButton onClick={() => remove(s._id)}><Trash2 size={13} /></DangerButton>
          </div>
        ))}
        {services.length === 0 && <p className="text-gray-400 text-sm">No services yet.</p>}
      </div>
    </div>
  );
}
