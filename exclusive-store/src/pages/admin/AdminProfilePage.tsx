import { Copy, Edit3, Eye, EyeOff, HelpCircle, Link as LinkIcon, Pencil, Share2, Wand2 } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { PageTitle, Panel } from '../../components/admin/AdminUI';

const avatar = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=220&h=220&fit=crop';

function TextField({
  label,
  value,
  onChange,
  type = 'text',
  right,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  right?: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-3 block text-sm text-[#07383f]">{label}</span>
      <div className="flex h-12 items-center rounded-[7px] border border-slate-200 bg-[#fafbfc] px-4">
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent font-semibold text-[#07383f] outline-none"
        />
        {right}
      </div>
    </label>
  );
}

function PasswordField({ label }: { label: string }) {
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);

  return (
    <label className="block">
      <span className="mb-3 block text-sm text-[#07383f]">{label}</span>
      <div className="flex h-12 items-center rounded-[7px] border border-slate-200 bg-[#fafbfc] px-3">
        <input
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Enter password"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
        <button type="button" onClick={() => setVisible((state) => !state)} className="text-slate-500">
          {visible ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>
    </label>
  );
}

function ProfileCard() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    void navigator.clipboard?.writeText('wade.warren@example.com');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <Panel className="p-6">
      <div className="mb-2 flex justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Profile</h2>
        <div className="flex gap-4 text-slate-600">
          <button type="button" className="hover:text-[#4EA674]"><Edit3 size={19} /></button>
          <button type="button" className="hover:text-[#4EA674]"><Share2 size={19} /></button>
        </div>
      </div>
      <div className="text-center">
        <img src={avatar} alt="Wade Warren" className="mx-auto h-24 w-24 rounded-full object-cover" />
        <h3 className="mt-4 text-lg font-bold text-slate-800">Wade Warren</h3>
        <div className="mt-2 flex items-center justify-center gap-2 text-sm text-slate-500">
          wade.warren@example.com
          <button type="button" onClick={copyEmail} className="relative text-[#6c63ff]">
            <Copy size={15} />
            {copied && <span className="absolute left-4 top-4 rounded bg-[#07383f] px-2 py-1 text-xs text-white">Copied</span>}
          </button>
        </div>
        <p className="mt-7 text-sm text-slate-600">Linked with Social media</p>
        <div className="mt-4 flex justify-center gap-6">
          {['G', 'f', 'X'].map((item) => (
            <button type="button" key={item} className="flex items-center gap-1 text-sm">
              <span className="grid h-5 w-5 place-items-center rounded-full font-bold text-[#4EA674]">{item}</span>
              <LinkIcon size={11} className="text-[#6c63ff]" />
              <span className="text-[10px] text-[#6c63ff]">Linked</span>
            </button>
          ))}
        </div>
        <button type="button" className="mt-4 inline-flex h-9 items-center gap-2 rounded-[7px] border border-slate-200 px-4 text-slate-600 hover:bg-slate-50">
          <LinkIcon size={18} /> Social media
        </button>
      </div>
    </Panel>
  );
}

function ChangePasswordCard() {
  const [saved, setSaved] = useState(false);

  return (
    <Panel className="p-6">
      <div className="mb-6 flex justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Change Password</h2>
        <button type="button" className="inline-flex items-center gap-1 text-sm text-[#6c63ff] hover:underline">
          Need help <HelpCircle size={14} />
        </button>
      </div>
      <div className="space-y-5">
        <PasswordField label="Current Password" />
        <button type="button" className="-mt-2 text-sm text-[#6c63ff] hover:underline">Forgot Current Password? Click here</button>
        <PasswordField label="New Password" />
        <PasswordField label="Re-enter Password" />
      </div>
      <button
        type="button"
        onClick={() => {
          setSaved(true);
          window.setTimeout(() => setSaved(false), 1400);
        }}
        className="mt-8 h-11 w-full rounded-[7px] bg-[#4EA674] font-semibold text-white hover:bg-[#3d8f63]"
      >
        {saved ? 'Password Saved' : 'Save Change'}
      </button>
    </Panel>
  );
}

export default function AdminProfilePage() {
  const [firstName, setFirstName] = useState('Wade');
  const [lastName, setLastName] = useState('Warren');
  const [password, setPassword] = useState('**********');
  const [phone, setPhone] = useState('(406) 555-0120');
  const [email, setEmail] = useState('wade.warren@example.com');
  const [birthDate, setBirthDate] = useState('12- January- 1999');
  const [location, setLocation] = useState('2972 Westheimer Rd. Santa Ana, Illinois 85486');
  const [card, setCard] = useState('843-4359-4444');
  const [bio, setBio] = useState('Enter a biography about you');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [saved, setSaved] = useState(false);

  function saveProfile() {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1400);
  }

  return (
    <>
      <PageTitle title="Admin role" />
      <h2 className="-mt-5 mb-8 text-2xl font-bold text-[#07383f]">About section</h2>
      {saved && <div className="fixed right-6 top-24 z-40 rounded bg-[#07383f] px-4 py-2 text-sm text-white shadow-lg">Profile updated</div>}
      <div className="grid gap-5 xl:grid-cols-[370px_1fr]">
        <div className="space-y-5">
          <ProfileCard />
          <ChangePasswordCard />
        </div>
        <Panel className="p-8">
          <div className="mb-7 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">Profile Update</h2>
            <button type="button" onClick={saveProfile} className="inline-flex h-9 items-center gap-2 rounded-[6px] border border-slate-200 px-4 text-slate-600 hover:bg-slate-50">
              <Edit3 size={17} /> Edit
            </button>
          </div>
          <div className="mb-8 flex items-center gap-6">
            <img src={avatar} alt="" className="h-16 w-16 rounded-full object-cover" />
            <button type="button" className="h-11 rounded-[7px] bg-[#4EA674] px-5 font-semibold text-white hover:bg-[#3d8f63]">Upload New</button>
            <button type="button" className="h-11 rounded-[7px] border border-slate-200 px-8 font-semibold text-slate-600 hover:bg-slate-50">Delete</button>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <TextField label="First Name" value={firstName} onChange={setFirstName} />
            <TextField label="Last Name" value={lastName} onChange={setLastName} />
            <TextField
              label="Password"
              value={password}
              onChange={setPassword}
              type={passwordVisible ? 'text' : 'password'}
              right={<button type="button" onClick={() => setPasswordVisible((value) => !value)} className="text-slate-500">{passwordVisible ? <Eye size={18} /> : <EyeOff size={18} />}</button>}
            />
            <TextField label="Phone Number" value={phone} onChange={setPhone} right={<span className="border-l pl-4 text-sm text-slate-600">US</span>} />
            <TextField label="E-mail" value={email} onChange={setEmail} />
            <TextField label="Date of Birth" value={birthDate} onChange={setBirthDate} />
          </div>
          <div className="mt-6">
            <TextField label="Location" value={location} onChange={setLocation} />
          </div>
          <div className="mt-6">
            <TextField label="Credit Card" value={card} onChange={setCard} right={<span className="text-slate-500">v</span>} />
          </div>
          <label className="mt-6 block">
            <span className="mb-3 block text-sm text-[#07383f]">Biography</span>
            <div className="rounded-[7px] border border-slate-200 bg-[#fafbfc] p-4">
              <textarea value={bio} onChange={(event) => setBio(event.target.value)} className="min-h-[90px] w-full resize-none bg-transparent outline-none" />
              <div className="flex justify-end gap-4 text-slate-600">
                <Pencil size={20} />
                <Wand2 size={20} />
              </div>
            </div>
          </label>
        </Panel>
      </div>
    </>
  );
}
