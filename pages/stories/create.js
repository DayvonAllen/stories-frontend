import TextEditor from "@/components/TextEditor";
import React, { Component } from "react";
import router, { withRouter } from "next/router";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";
import { APP_URL } from "../../config";
import Menu from "@/components/Menu";

class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      category: "",
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
    this.setState({
      body: content,
      articleUpdated: true,
    });
  };

  handleCategory = (category) => {
    this.setState({
      category,
    });
  };

  submitForm = async (event) => {
    event.preventDefault();
    let body = draftToHtml(this.state.body);
    let title = DOMPurify.sanitize(this.state.title);
    body = DOMPurify.sanitize(body);

    try {
      const res = await fetch(`${APP_URL}/api/createStory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content: body,
          category: this.state.category.name.toLowerCase(),
        }),
      });

      await res.json();

      if (res.status === 400 || res.status === 500) {
        console.log("Error");
      } else {
        router.push("/home");
      }
    } catch (e) {
      console.log("Error");
    }
  };

  render() {
    return this.props.user ? (
      <div className="w-full text-center z-1 md:pt-6">
        <div className="lg:w-1/2 mx-auto  w-full bg-white shadow">
          <div className="mb-4 pt-6 w-1/2 mx-auto">
            <input
              name="title"
              className="w-full border border-green-600 rounded-lg"
              onChange={this.handleInputs}
              placeholder="Title..."
              type="text"
            />
          </div>
          <Menu handleCategory={this.handleCategory} />
          <div className="mt-4 sm:mt-0 sm:col-span-2 bg-white">
            <TextEditor handleContent={this.handleEditorContent} />
          </div>
        </div>
        <div className="md:w-1/2 mx-auto w-full pb-4">
          <button
            type="button"
            onClick={this.submitForm}
            className="w-1/2 text-center mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <p className="text-center w-full">Post Story</p>
          </button>
        </div>
      </div>
    ) : null;
  }
}
export default withRouter(Write);
