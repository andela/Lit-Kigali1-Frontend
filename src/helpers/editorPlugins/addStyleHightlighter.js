import Highlighter from '../../components/Comment/Highlighter';

export const styleHighlighterStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null
            && contentState.getEntity(entityKey).getType() === 'STYLEHIGHLIGHT'
    );
  }, callback);
};

const addStyleHighlighter = {
  decorators: [
    {
      strategy: styleHighlighterStrategy,
      component: Highlighter,
    },
  ],
};

export default addStyleHighlighter;
