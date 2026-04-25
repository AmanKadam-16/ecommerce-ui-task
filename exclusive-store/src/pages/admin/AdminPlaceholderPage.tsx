import { PageTitle, Panel } from '../../components/admin/AdminUI';

export default function AdminPlaceholderPage({ title }: { title: string }) {
  return (
    <>
      <PageTitle title={title} />
      <Panel className="p-8">
        <h2 className="text-xl font-semibold text-[#07383f]">{title}</h2>
        <p className="mt-2 text-slate-500">This admin view is queued for the next mockup batch.</p>
      </Panel>
    </>
  );
}
