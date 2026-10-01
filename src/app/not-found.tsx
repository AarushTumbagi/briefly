import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="section-container py-16 text-center">
      <h1 className="page-title">Page not found</h1>
      <p className="page-subtitle">That briefing doesn&apos;t exist — yet.</p>
      <Link href="/" className="btn-primary mt-6 inline-flex">Back to briefing</Link>
    </div>
  );
}
