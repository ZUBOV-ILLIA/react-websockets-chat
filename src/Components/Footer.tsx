export default function Footer() {
  return (
    <footer className="flex h-6 items-center justify-center bg-black text-xs text-slate-100">
      All rights reserved © {new Date().getFullYear()}
    </footer>
  );
}
