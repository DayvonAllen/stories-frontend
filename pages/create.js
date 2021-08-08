import TextEditor from "@/components/TextEditor";
import React, { Component } from "react";
import { withRouter } from "next/router";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";

class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
    };

    this.handleInputs = this.handleInputs.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleInputs = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleEditorContent = (content) => {
    console.log(content);
    this.setState({
      body: content,
      articleUpdated: true,
    });
  };

  submitForm = async (event) => {
    event.preventDefault();
    // let article = await apiClient.saveArticle({
    //   title: this.state.title,
    //   body: JSON.stringify(this.state.body)
    // })
    let body = draftToHtml(this.state.body);
    let title = DOMPurify.sanitize(this.state.title);
    body = DOMPurify.sanitize(body);

    console.log(title);
    console.log(body);

    // this.props.router.push(`/articles/${article.slug}`);
  };

  render() {
    return (
      <div className="w-full text-center ">
        <div className="lg:w-1/2 mx-auto  w-full">
          <div className="mb-4 pt-6">
            <input
              name="title"
              className="w-full border-none rounded-lg"
              onChange={this.handleInputs}
              placeholder="Title..."
              type="text"
            />
          </div>

          <div className="mt-4 sm:mt-0 sm:col-span-2 bg-white">
            <TextEditor handleContent={this.handleEditorContent} />
          </div>
          <button
            type="button"
            className="w-1/2 text-center mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <p className="text-center w-full">Post Story</p>
          </button>
        </div>

        {/* <div className="bg-white ">
          <TextEditor handleContent={this.handleEditorContent} />
        </div> */}
      </div>
    );
  }
}
export default withRouter(Write);
