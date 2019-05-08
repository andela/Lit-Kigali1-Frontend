import { EditorState } from 'draft-js';

const getToolTip = (editorState, toggleMode, highlighted, history, anchorKey) => {
  const selectedText = editorState.getSelection();
  const content = editorState.getCurrentContent();
  const contentWithEntity = content.createEntity('TOOLTIP', 'IMMUTABLE', {
    toggleMode, highlighted, history, article: editorState, anchorKey,
  });
  const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
  const entityKey = contentWithEntity.getLastCreatedEntityKey();
  return {
    newEditorState,
    selectedText,
    entityKey,
  };
};

export default getToolTip;
