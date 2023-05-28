"use client";
import Link from "next/link";
const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Prompt</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world. And let your
        imagination run wild.
      </p>
      <form
        className="flex flex-col mt-10 w-full  gap-7 glassmorphism max-w-2xl"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="font-satoshi font-semibold text-gray-700 text-base">
            {" "}
            Your AI prompt{" "}
          </span>
          <textarea
            value={post.prompt}
            placeholder="Enter your prompt here"
            required
            className="form_textarea"
            onChange={(e) =>
              setPost((prev) => ({ ...prev, prompt: e.target.value }))
            }
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-gray-700 text-base">
            Tag {" "}
            <span className="font-normal">(#product, #webdevelopment, #idea)</span>
          </span>
          <input
            value={post.tag}
            placeholder="#tag"
            required
            className="form_input"
            onChange={(e) =>
              setPost((prev) => ({ ...prev, tag: e.target.value }))
            }
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm" >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ?  type  + "ing..." :  type  + " Prompt"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
