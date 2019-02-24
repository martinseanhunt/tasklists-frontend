import React from 'react'
import { EditorState, RichUtils, convertToRaw } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createMentionPlugin, {
  defaultSuggestionsFilter
} from 'draft-js-mention-plugin'

import 'draft-js-mention-plugin/lib/plugin.css'

class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.mentionPlugin = createMentionPlugin()
  }

  state = {
    editorState: EditorState.createEmpty(),
    suggestions: mentions
  }

  onChange = (editorState) => {
    this.setState({ editorState })
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
        this.onChange(newState);
        return 'handled';
    }
    return 'not-handled';
  }

  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions),
    });
  };

  onAddMention = () => {
    // get the mention object selected
  }

  onUnderlineClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
  }

  onItalicClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
  }

  focus = () => {
    this.editor.focus();
  }
 
  render() {
    const { MentionSuggestions } = this.mentionPlugin
    const plugins = [this.mentionPlugin]

    return (
      <div onClick={this.focus}>
        <div>
          <button onClick={this.onUnderlineClick}>U</button>
          <button onClick={this.onBoldClick}><b>B</b></button>
          <button onClick={this.onItalicClick}><em>I</em></button>
        </div>
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          plugins={plugins}
          ref={element => {
            this.editor = element;
          }}
        />
        <MentionSuggestions
          onSearchChange={this.onSearchChange}
          suggestions={this.state.suggestions}
          onAddMention={this.onAddMention}
        />
        <button onClick={() => {
          // const data = convertToRaw(this.state.editorState)
          console.log(JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())))
        }}>Test RTE</button>
      </div>
    )
  }

}

export default RichTextEditor

const mentions = [
  {
    name: 'Matthew Russell',
    link: 'https://twitter.com/mrussell247',
    avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
  },
  {
    name: 'Julian Krispel-Samsel',
    link: 'https://twitter.com/juliandoesstuff',
    avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
  },
  {
    name: 'Jyoti Puri',
    link: 'https://twitter.com/jyopur',
    avatar: 'https://avatars0.githubusercontent.com/u/2182307?v=3&s=400',
  },
  {
    name: 'Max Stoiber',
    link: 'https://twitter.com/mxstbr',
    avatar: 'https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg',
  },
  {
    name: 'Nik Graf',
    link: 'https://twitter.com/nikgraf',
    avatar: 'https://avatars0.githubusercontent.com/u/223045?v=3&s=400',
  },
  {
    name: 'Pascal Brandt',
    link: 'https://twitter.com/psbrandt',
    avatar: 'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png',
  },
]