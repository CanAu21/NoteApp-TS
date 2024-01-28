import { NoteData, Tag } from "../../types";
import NoteForm from "./NoteForm";

export type CreateNoteProps = {
  onSubmit: (data: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

const CreateNote = ({
  onSubmit,
  createTag,
  availableTags,
}: CreateNoteProps) => {
  return (
    <div className="container py-4">
      <h2>New Note</h2>
      <NoteForm onSubmit={onSubmit} createTag={createTag} availableTags={availableTags} />
    </div>
  );
};

export default CreateNote;
