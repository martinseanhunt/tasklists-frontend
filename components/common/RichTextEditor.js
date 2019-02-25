import React from 'react'
import { RichUtils } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createMentionPlugin, {
  defaultSuggestionsFilter
} from 'draft-js-mention-plugin'
import createToolbarPlugin from 'draft-js-static-toolbar-plugin'
import styled from 'styled-components'

// TODO add acnchors and auto linkify
// https://www.draft-js-plugins.com/plugin/anchor
// https://www.draft-js-plugins.com/plugin/linkify

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

const toolbarPlugin = createToolbarPlugin()
const { Toolbar } = toolbarPlugin

class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.mentionPlugin = createMentionPlugin()
  }
  
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

  focus = () => {
    this.editor.focus()
  }
 
  render() {
    const { MentionSuggestions } = this.mentionPlugin
    const plugins = [this.mentionPlugin, toolbarPlugin]

    return (
      <EditorContainer>
        <div onClick={this.focus}>
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
          <Editor
            editorState={this.props.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.props.onChange}
            plugins={plugins}
            ref={element => {
              this.editor = element;
            }}
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
  border: 1px solid #e2e5ed;
  padding: 16px;
  border-radius: 4px;
  background: #fff;
  box-shadow: inset 0 1px 2px 0 rgba(102,113,123,0.1);
  margin-top: 10px;

  .draftJsToolbar__toolbar__dNtBH {
    background: #fbfbfb;
    padding: 1px 0;
  }

  .DraftEditor-root {
    margin-top: 16px;
    cursor: text;
    margin-bottom: 2em;
    max-width: 100%;
  }

  .public-DraftEditor-content {
    min-height: 140px;
  }

  .draftJsToolbar__buttonWrapper__1Dmqh:nth-of-type(3) svg{
    position: relative;
    top: 1px;
  }
`

export default RichTextEditor