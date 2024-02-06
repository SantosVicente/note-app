interface NoteCardProps {
  isFirt?: boolean;
  title: string;
  content: string;
}

export function NoteCard({ content, title, isFirt }: NoteCardProps) {
  return !isFirt ? (
    <button className="text-left focus-visible:ring-2 focus-visible:ring-lime-400 outline-none rounded-md overflow-hidden bg-slate-800 p-5 space-y-3 relative hover:ring-2 hover:ring-slate-600 transition-all">
      <span className="text-sm font-medium text-slate-300">{title}</span>
      <p className="text-sm leading-6 text-slate-400">{content}</p>

      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
    </button>
  ) : (
    <div className="rounded-md bg-slate-700 p-5 space-y-3">
      <span className="text-sm font-medium text-slate-200">Adicionar nota</span>
      <p className="text-sm leading-6 text-slate-400">
        Grave uma nota em áudio que será convertida para texto automaticamente.
      </p>
    </div>
  );
}
