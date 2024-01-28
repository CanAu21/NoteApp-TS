import { useOutletContext } from "react-router-dom";
import NoteForm from "./NoteForm";
import { Note, NoteData, Tag } from "../../types";

type editPropsType = {
  onSubmit: (id: string, data: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
};
const EditNote = ({ onSubmit, createTag, availableTags }: editPropsType) => {
  const props: Note = useOutletContext();

  return (
    <div className="container py-5">
      <h1>Edit Note</h1>
      <NoteForm
        title={props.title}
        markdown={props.markdown}
        createTag={createTag}
        availableTags={availableTags}
        onSubmit={(data) => onSubmit(props.id, data)}
        tags={props.tags}
      />
    </div>
  );
};

export default EditNote;
