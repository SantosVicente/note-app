import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowLeft, XIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { NoteScheema } from "../app";

interface NoteCardProps {
  isFirt?: boolean;
  id?: string;
  date: Date;
  title?: string;
  content?: string;
  notes: NoteScheema[];
  setNotes: (notes: NoteScheema[]) => void;
}

let speechRecognition: SpeechRecognition | null = null;

export function NoteCard({
  content,
  isFirt,
  id,
  date,
  title,
  notes,
  setNotes,
}: NoteCardProps) {
  const CloseButton = useRef<HTMLButtonElement>(null);
  const [shoudShowOnBording, setShoudShowOnBording] = useState(true);
  const [textContent, setTextContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  function handleDeleteNote(id: string) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);

    toast.success("Nota apagada com sucesso!");

    localStorage.setItem("notes", JSON.stringify(newNotes));
  }

  function handleStartEditor() {
    setShoudShowOnBording(!shoudShowOnBording);
  }

  function handleTextContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setTextContent(e.target.value);
  }

  function handleSaveNote(e: FormEvent) {
    e.preventDefault();

    const newNote: NoteScheema = {
      id: crypto.randomUUID(),
      date: new Date(),
      content: textContent,
    };

    const notesArray = [newNote, ...notes];

    setNotes(notesArray);

    localStorage.setItem("notes", JSON.stringify(notesArray));

    setTextContent("");
    setShoudShowOnBording(true);

    toast.success("Nota salva com sucesso!");
  }

  function handleStartRecording() {
    const isSpeechRecognitionSupported =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionSupported) {
      toast.error("Seu navegador não suporta gravação de áudio :(");
      return;
    }

    setIsRecording(true);
    setShoudShowOnBording(false);

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true; //irá continuar ouvindo até que o usuário pare
    speechRecognition.maxAlternatives = 1; //irá retornar apenas uma alternativa das palavras reconhecidas
    speechRecognition.interimResults = true; //irá retornar resultados conforme o usuário fala, e não apenas no final

    speechRecognition.onresult = (event) => {
      const transcript = Array.from(event.results).reduce((acc, result) => {
        return acc + result[0].transcript;
      }, "");

      setTextContent(transcript.charAt(0).toUpperCase() + transcript.slice(1));
    };

    speechRecognition.onerror = (event) => {
      console.log(event);
    };

    speechRecognition.start();
  }

  function handleStopRecording() {
    setIsRecording(false);

    if (speechRecognition) {
      speechRecognition.stop();
    }
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
          <Dialog.Content className=" fixed overflow-hidden md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full h-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
            <Dialog.Close
              ref={CloseButton}
              className="hover:text-slate-100 transition-all absolute top-0 right-0 text-slate-400 bg-slate-800 p-1.5"
            >
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
              onClick={() => (id ? handleDeleteNote?.(id) : null)}
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
          <Dialog.Content className="fixed overflow-hidden md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full h-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
            <Dialog.Close className="hover:text-slate-100 transition-all absolute top-0 right-0 text-slate-400 bg-slate-800 p-1.5">
              <XIcon className="size-5" />
            </Dialog.Close>

            <form className="flex-1 flex flex-col">
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-sm flex items-center gap-1 font-medium text-slate-300">
                  {!shoudShowOnBording && (
                    <button
                      onClick={() => {
                        handleStartEditor();
                        setTextContent("");
                      }}
                    >
                      <ArrowLeft className="size-5" />
                    </button>
                  )}
                  {title}
                </span>
                {shoudShowOnBording ? (
                  <p className="text-sm leading-6 text-slate-400">
                    Comece{" "}
                    <button
                      type="button"
                      onClick={handleStartRecording}
                      className="font-medium text-lime-400 hover:underline"
                    >
                      gravando uma nota
                    </button>{" "}
                    em áudio ou se preferir{" "}
                    <button
                      type="button"
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
                      value={textContent}
                      onChange={handleTextContentChange}
                    />
                  </>
                )}
              </div>

              {isRecording ? (
                <button
                  type="button"
                  onClick={handleStopRecording}
                  className="disabled:bg-lime-600 disabled:cursor-not-allowed w-full font-medium bg-slate-900 py-4 text-sm text-slate-300 outline-none hover:text-slate-100 transition-all"
                >
                  <div className="flex items-center justify-center gap-1">
                    <div className="size-2 animate-pulse bg-red-600 rounded-full" />
                    Gravando! (Clique para parar)
                  </div>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSaveNote}
                  disabled={!textContent || isRecording}
                  className="disabled:bg-lime-600 disabled:cursor-not-allowed - w-full font-medium bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none hover:bg-lime-500 transition-all"
                >
                  Salvar nota
                </button>
              )}
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
