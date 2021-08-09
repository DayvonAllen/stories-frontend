import React, { Component } from "react";
import { EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { convertToRaw } from "draft-js";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default class TextEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    this.props.handleContent(convertToRaw(editorState.getCurrentContent()));
  };

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        toolbarClassName="inline"
        wrapperClassName="min-h-screen"
        editorClassName="min-h-screen"
        onEditorStateChange={this.onEditorStateChange}
        // toolbarOnFocus
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            // "textAlign",
            // "colorPicker",
            // "link",
            // "embedded",
            "emoji",
            // "history",
          ],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />
    );
  }
}
