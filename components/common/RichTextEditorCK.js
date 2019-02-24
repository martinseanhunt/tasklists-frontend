// TODO PRIORITY remove packages for whatever option I don't use CK or slate

import React, { Component } from 'react'
import CKEditor from 'ckeditor4-react'
import { Query } from 'react-apollo'

import { ALL_USERS_QUERY } from '../settings/Users'

class RichTextEditor extends Component {
  
    render() {
        return (       
          <Query query={ALL_USERS_QUERY} >
            {({data, error, loading}) => data ? (
              <CKEditor
                type="classic"
                data="<p>Task Description</p>"
                onInit={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor )
                } }
                onChange={ ( event, editor ) => {
                  console.log( { event, editor } )
                } }
                onBlur={ editor => {
                  // console.log( 'Blur.', editor )
                } }
                onFocus={ editor => {
                  // console.log( 'Focus.', editor )
                } }
                config={{
                  mentions: [ { feed: ['Anna', 'Thomas', 'John'], minChars: 0 } ],
                  
                  toolbarGroups: [
                      { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                      { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
                      { name: 'links', groups: [ 'links' ] },
                      { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
                      { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
                      { name: 'insert', groups: [ 'insert' ] },
                      { name: 'forms', groups: [ 'forms' ] },
                      { name: 'tools', groups: [ 'tools' ] },
                      { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
                      { name: 'others', groups: [ 'others' ] },
                      { name: 'colors', groups: [ 'colors' ] },
                      { name: 'about', groups: [ 'about' ] }
                    ],                  
                    removeButtons: 'Underline,Subscript,Superscript,Cut,Copy,Paste,PasteFromWord,Undo,Redo,Scayt,Anchor,Image,Table,HorizontalRule,SpecialChar,Maximize,Source,Styles,About'
                }}
            />

            ) : <p>Loading...</p>}
          
          </Query>         
          
        )
    }
}

export default RichTextEditor