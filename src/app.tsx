import { ChangeEvent, useState } from "react";
import logo from "./assets/logo.svg";
import { NoteCard } from "./components/note-card";

export interface NoteScheema {
  id: string;
  date: Date;
  content: string;
}

export function App() {
  const [search, setSearch] = useState("");

  const [notes, setNotes] = useState<NoteScheema[]>(() => {
    const loadedNotes = localStorage.getItem("notes");

    const translatedNotes: NoteScheema[] = loadedNotes
      ? JSON.parse(loadedNotes)
      : [];

    const convertDateNotes = translatedNotes.map((note) => ({
      ...note,
      date: new Date(note.date),
    }));

    return convertDateNotes;
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setSearch(target.value);
  };

  return (
    <div className="mx-auto px-5 xl:px-0 space-y-6 max-w-6xl my-12">
      <img src={logo} alt="NLW Expert" />
      <form className="w-full">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Busque em suas notas. . ."
          className="w-full placeholder:text-slate-500 outline-none font-semibold tracking-tight bg-transparent text-2xl md:text-3xl"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[240px]">
        <NoteCard
          date={new Date()}
          isFirt
          title="Adicionar nota"
          content="Grave uma nota em áudio que será convertida para texto
          automaticamente."
          notes={notes}
          setNotes={setNotes}
        />

        {notes
          .filter((note) =>
            note.content.toLowerCase().includes(search.toLowerCase())
          )
          .map((note) => (
            <NoteCard
              id={note.id}
              key={note.id}
              date={note.date}
              content={note.content}
              notes={notes}
              setNotes={setNotes}
            />
          ))}
      </div>
    </div>
  );
}
