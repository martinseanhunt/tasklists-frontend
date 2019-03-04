import React from 'react'
import { RichUtils } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createMentionPlugin, {
  defaultSuggestionsFilter
} from 'draft-js-mention-plugin'
import createToolbarPlugin from 'draft-js-static-toolbar-plugin'
import createLinkifyPlugin from 'draft-js-linkify-plugin'
import styled from 'styled-components'

// TODO implement more buttons https://www.draft-js-plugins.com/plugin/static-toolbar

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
} from 'draft-js-buttons';
  
import 'draft-js-mention-plugin/lib/plugin.css'
import 'draft-js-static-toolbar-plugin/lib/plugin.css'
import 'draft-js-linkify-plugin/lib/plugin.css'

const toolbarPlugin = createToolbarPlugin()
const { Toolbar } = toolbarPlugin
const linkifyPlugin = createLinkifyPlugin()

class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.mentionPlugin = createMentionPlugin()
  }

  state = { beenFocused: false }
  
  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.props.editorState, command)
    if (newState) {
        this.props.onChange(newState);
        return 'handled';
    }
    return 'not-handled';
  }

  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, this.props.suggestions),
    })
  }

  onAddMention = () => {
    // get the mention object selected
  }

  /* Don't need any odf this becuse I'm using the static toolbar plugin

  onUnderlineClick = () => {
    this.props.onChange(RichUtils.toggleInlineStyle(this.props.editorState, 'UNDERLINE'))
  }

  onBoldClick = () => {
    this.props.onChange(RichUtils.toggleInlineStyle(this.props.editorState, 'BOLD'))
  }

  onItalicClick = () => {
    this.props.onChange(RichUtils.toggleInlineStyle(this.props.editorState, 'ITALIC'))
  }

  onHeadingClick = () => {
    // TODO get this working right. It's adding the h3 style but how to turn it off on enter? 
    this.props.onChange(RichUtils.toggleBlockType(this.props.editorState, {label: 'H3', style: 'header-three'}))
  }

  */

  focus = (e) => {
    this.setState({ beenFocused: true })
    this.props.beenFocused && this.props.beenFocused()
    this.editor.focus()
  }
 
  render() {
    const { MentionSuggestions } = this.mentionPlugin
    const plugins = [this.mentionPlugin, toolbarPlugin, linkifyPlugin]

    const showToolbar = ((this.props.hideToolbarBeforeFocus && this.state.beenFocused) || !this.props.hideToolbarBeforeFocus)

    return (
      <EditorContainer noPaddNoBorder={this.props.noPaddNoBorder} showToolbar={showToolbar}
      >
        <div onClick={this.focus}>
          <div style={{
            visibility: showToolbar ? 'visible' : 'hidden',
            height: showToolbar ? 'auto' : '0'
          }}>
            <Toolbar>
              {
                (externalProps) => (
                  <div>
                    <BoldButton {...externalProps} />
                    <ItalicButton {...externalProps} />
                    <UnderlineButton {...externalProps} />
                    <UnorderedListButton {...externalProps} />
                    <OrderedListButton {...externalProps} />
                  </div>
                )
              }
            </Toolbar>
          </div>
          
          <Editor
            editorState={this.props.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.props.onChange}
            plugins={plugins}
            ref={element => {
              this.editor = element;
            }}
            placeholder={this.props.placeholder}
          />
          <MentionSuggestions
            onSearchChange={this.onSearchChange}
            suggestions={this.props.suggestions}
            onAddMention={this.onAddMention}
          />
        </div>
      </EditorContainer>
    )
  }

}

const EditorContainer = styled.div`

  ${({ noPaddNoBorder }) => !noPaddNoBorder && `
    border: 1px solid #e2e5ed;
    padding: 16px;
    border-radius: 4px;
    background: #fff;
    box-shadow: inset 0 1px 2px 0 rgba(102,113,123,0.1);
    margin-top: 10px;
  `}

  .draftJsToolbar__toolbar__dNtBH {
    background: #fbfbfb;
    padding: 1px 0;
  }

  .DraftEditor-root {
    margin-top: ${({ showToolbar }) => showToolbar ? '16px' : '10px'};
    cursor: text;
    margin-bottom: ${({ showToolbar }) => showToolbar ? '2em' : '10px'};
    max-width: 100%;
    max-height: 140px;
  }

  .public-DraftEditorPlaceholder-root{ height: 0; overflow: visible; color: #6D6E70 }

  .public-DraftEditorPlaceholder-hasFocus { display: none; }

  .public-DraftEditor-content {
    ${({ showToolbar }) => showToolbar && `
      min-height: 140px;
    `}
  }

  .draftJsToolbar__buttonWrapper__1Dmqh:nth-of-type(3) svg{
    position: relative;
    top: 1px;
  }
`

export default RichTextEditor