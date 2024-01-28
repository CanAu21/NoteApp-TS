import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import ReactSelect from "react-select/creatable";
import { Tag } from "../../types";
import { CreateNoteProps } from "./CreateNote";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

const NoteForm = ({
  onSubmit,
  createTag,
  availableTags,
  title = "",
  tags = [],
  markdown = "",
}: CreateNoteProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    navigate(-1);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                defaultValue={title}
                ref={titleRef}
                required
                className="shadow"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                value={selectedTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                onChange={(note_tags) => {
                  setSelectedTags(
                    note_tags.map((tag) => ({
                      label: tag.label,
                      id: tag.value,
                    }))
                  );
                }}
                onCreateOption={(label) => {
                  const newTag: Tag = { id: v4(), label };
                  createTag(newTag);
                  setSelectedTags([...selectedTags, newTag]);
                }}
                options={availableTags?.map((item) => ({
                  label: item.label,
                  value: item.id,
                }))}
                isMulti
                required
                className="shadow"
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown" className="my-4">
          <Form.Label>Body</Form.Label>
          <Form.Control
            defaultValue={markdown}
            ref={markdownRef}
            as={"textarea"}
            className="shadow"
            required
          />
        </Form.Group>
      </Stack>
      <div className="d-flex justify-content-end gap-3">
        <Button type="submit">Save</Button>
        <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default NoteForm;
