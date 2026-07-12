const PP = 'Poppins, sans-serif';

export function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-6">
      <h3 className="font-bold mb-1" style={{ fontFamily: PP, fontSize: '1.05rem', color: '#111' }}>{title}</h3>
      {description && <p className="text-gray-400 text-xs mb-5" style={{ fontFamily: PP }}>{description}</p>}
      <div className={description ? 'mt-5 space-y-4' : 'mt-4 space-y-4'}>{children}</div>
    </div>
  );
}

export function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2" style={{ fontFamily: PP, color: '#333' }}>{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs font-medium text-red-600" style={{ fontFamily: PP }}>{error}</p>}
    </div>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:border-[var(--primary)] ${props.className || ''}`}
      style={{ fontFamily: PP, borderColor: '#e5e7eb', ...props.style }}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:border-[var(--primary)] resize-none ${props.className || ''}`}
      style={{ fontFamily: PP, borderColor: '#e5e7eb', ...props.style }}
    />
  );
}

export function PrimaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-60 ${props.className || ''}`}
      style={{ fontFamily: PP, backgroundColor: 'var(--primary)', ...props.style }}
    />
  );
}

export function SecondaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-xs border transition-colors hover:bg-gray-50 disabled:opacity-60 ${props.className || ''}`}
      style={{ fontFamily: PP, color: 'var(--primary)', borderColor: 'var(--primary)', ...props.style }}
    />
  );
}

export function DangerButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-xs border transition-colors hover:bg-red-50 disabled:opacity-60 ${props.className || ''}`}
      style={{ fontFamily: PP, color: '#b91c1c', borderColor: '#fca5a5', ...props.style }}
    />
  );
}
