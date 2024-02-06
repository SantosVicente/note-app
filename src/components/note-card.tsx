import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowLeft, XIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface NoteCardProps {
  isFirt?: boolean;
  date: Date;
  title?: string;
  content?: string;
}

export function NoteCard({ content, isFirt, date, title }: NoteCardProps) {
  const [shoudShowOnBording, setShoudShowOnBording] = useState(true);
  const [textContent, setTextContent] = useState("");

  function handleStartEditor() {
    setShoudShowOnBording(!shoudShowOnBording);
  }

  function handleTextContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setTextContent(e.target.value);
  }

  function handleSaveNote(e: FormEvent) {
    e.preventDefault();
    toast.success("Nota salva com sucesso!");
    console.log("Salvando nota", textContent);
  }

  return !isFirt ? (
    <Dialog.Root>
      <Dialog.Trigger className="text-left flex flex-col focus-visible:ring-2 focus-visible:ring-lime-400 outline-none rounded-md overflow-hidden bg-slate-800 p-5 gap-3 relative hover:ring-2 hover:ring-slate-600 transition-all">
        <span className="text-sm font-medium text-slate-300">
          {formatDistanceToNow(date?.toISOString(), {
            locale: ptBR,
            addSuffix: true,
          })
            .charAt(0)
            .toUpperCase() +
            formatDistanceToNow(date?.toISOString(), {
              locale: ptBR,
              addSuffix: true,
            }).slice(1)}
        </span>
        <p className="text-sm leading-6 text-slate-400">{content}</p>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/60">
          <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
            <Dialog.Close className="hover:text-slate-100 transition-all absolute top-0 right-0 text-slate-400 bg-slate-800 p-1.5">
              <XIcon className="size-5" />
            </Dialog.Close>

            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                {formatDistanceToNow(date?.toISOString(), {
                  locale: ptBR,
                  addSuffix: true,
                })
                  .charAt(0)
                  .toUpperCase() +
                  formatDistanceToNow(date?.toISOString(), {
                    locale: ptBR,
                    addSuffix: true,
                  }).slice(1)}
              </span>
              <p className="text-sm leading-6 text-slate-400">{content}</p>
            </div>

            <button
              type="button"
              className="w-full font-medium bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none group"
            >
              Deseja{" "}
              <span className="text-red-400 group-hover:underline">
                apagar essa nota
              </span>
              ?
            </button>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  ) : (
    <Dialog.Root>
      <Dialog.Trigger className="text-left hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none flex flex-col rounded-md bg-slate-700 p-5 gap-3">
        <span className="text-sm font-medium text-slate-200">{title}</span>
        <p className="text-sm leading-6 text-slate-400">{content}</p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/60">
          <Dialog.Content className="fixed overflow-hidden left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
            <Dialog.Close className="hover:text-slate-100 transition-all absolute top-0 right-0 text-slate-400 bg-slate-800 p-1.5">
              <XIcon className="size-5" />
            </Dialog.Close>

            <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-sm flex items-center gap-1 font-medium text-slate-300">
                  {!shoudShowOnBording && (
                    <button onClick={handleStartEditor}>
                      <ArrowLeft className="size-5" />
                    </button>
                  )}
                  {title}
                </span>
                {shoudShowOnBording ? (
                  <p className="text-sm leading-6 text-slate-400">
                    Comece{" "}
                    <button className="font-medium text-lime-400 hover:underline">
                      gravando uma nota
                    </button>{" "}
                    em áudio ou se preferir{" "}
                    <button
                      className="font-medium text-lime-400 hover:underline"
                      onClick={handleStartEditor}
                    >
                      utilize apenas texto.
                    </button>
                  </p>
                ) : (
                  <>
                    <textarea
                      autoFocus
                      className="w-full text-sm leading-6 resize-none bg-transparent flex-1 text-slate-400 outline-none"
                      placeholder="Digite sua nota aqui. . ."
                      onChange={handleTextContentChange}
                    />
                  </>
                )}
              </div>

              <button
                type="submit"
                className="w-full font-medium bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none hover:bg-lime-500 transition-all"
              >
                Salvar nota
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
