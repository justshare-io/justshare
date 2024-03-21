import React from 'react';
import { Content } from "@/rpc/content/content_pb";

const BottomNav: React.FC<{
  changeContent: (c: Content) => void,
  addTag: (tag: string) => void,
  onSend: () => void,
  onStop: () => void,
  actionRunning: boolean,
}> = ({changeContent, addTag, onSend, actionRunning, onStop}) => {
  const [newContent, setNewContent] = useState(false);
  const [addingTag, setAddingTag] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const onAddTag = (tag: string) => {
    if (tag) {
      setAddingTag(false);
      addTag(tag);
    }
  };
  const onNewClose = () => {
    setNewContent(false);
  }

  return (
    <div className="btm-nav z-50">
      <Modal open={newContent} onClose={onNewClose}>
        <div className="flex flex-col">
          <div className={"flex flex-row space-y-2"}>
            <button className={"btn"} onClick={() => {
              changeContent(urlContent('https://example.com', []));
              setNewContent(false);
            }}>url</button>
            <button className={"btn"} onClick={() => {
              changeContent(postContent("Don't think, write."));
              setNewContent(false);
            }}>
              post
            </button>
            <button className={"btn"} onClick={() => {
              changeContent(siteContent());
              setNewContent(false);
            }}>
              <a>site</a>
            </button>
            <button className={"btn"} onClick={() => {
              changeContent(fileContent());
              setNewContent(false);
            }}>
              <a>file</a>
            </button>
          </div>
          <button className={"btn"} onClick={onNewClose}>close</button>
        </div>
      </Modal>
      <Modal open={addingTag} onClose={() => setAddingTag(false)}>
        <div className={"space-y-2"}>
          <FilteredTagInput
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            onAddTag={onAddTag}
          />
          <button className={"btn"} onClick={() => setAddingTag(false)}>close</button>
        </div>
      </Modal>
      <button onClick={() => setAddingTag(true)}>
        <TagIcon className="h-6 w-6" />
      </button>
      <button onClick={() => setNewContent(true)}>
        <PlusIcon className="h-6 w-6" />
      </button>
      {actionRunning && (
        <button onClick={onStop}>
          <StopIcon className="h-6 w-6" />
        </button>
      )}
      <button onClick={onSend}>
        <PaperAirplaneIcon className="h-6 w-6" />
      </button>
      <ContentDrawer />
    </div>
  )
}
