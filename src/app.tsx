import logo from "./assets/logo.svg";
import { NoteCard } from "./components/note-card";

export function App() {
  return (
    <div className="mx-auto space-y-6 max-w-6xl my-12">
      <img src={logo} alt="NLW Expert" />
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas. . ."
          className="w-full placeholder:text-slate-500 outline-none font-semibold tracking-tight bg-transparent text-3xl"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 gap-6 auto-rows-[240px]">
        <NoteCard
          isFirt
          title="Adicionar nota"
          content="Grave uma nota em áudio que será convertida para texto
            automaticamente."
        />

        <NoteCard
          title="Há 2 dias"
          content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto
          necessitatibus dolores iusto adipisci labore molestias qui iste nemo
          natus laudantium, laborum enim explicabo esse culpa ut voluptas at
          quos molestiae? Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Architecto voluptate vero asperiores eius, tempora iste nam
          beatae doloribus ex nostrum dignissimos recusandae in dicta totam
          sunt? Magni nesciunt quaerat totam."
        />

        <NoteCard
          title="Há 4 dias"
          content="Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Recusandae, esse. Distinctio error odit dolor hic voluptate porro
          minus unde, iste commodi aperiam exercitationem rem quidem nesciunt
          tempore sequi nobis qui?"
        />

        <NoteCard
          title="Há 4 dias"
          content="Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Recusandae, esse. Distinctio error odit dolor hic voluptate porro
          minus unde, iste commodi aperiam exercitationem rem quidem nesciunt
          tempore sequi nobis qui?"
        />
      </div>
    </div>
  );
}
