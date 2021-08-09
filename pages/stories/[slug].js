import { API_URL } from "@/config/index";
import DOMPurify from "isomorphic-dompurify";
import cookie from "cookie";

export default function Story({ story }) {
  return (
    <div className="md:w-1/2 mx-auto w-screen">
      <div className="relative py-16 bg-white sm:overflow-hidden overflow-auto">
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full"></div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1 className="md:text-lg text-sm">
              <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {story?.title}{" "}
              </span>
            </h1>
          </div>
          <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto md:text-xl text-sm">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(story?.content),
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const { token } = cookie.parse(req?.headers?.cookie || "");
  const res = await fetch(`${API_URL}/stories/${query.slug}`, {
    headers: {
      Authorization: token,
    },
  });

  const data = await res.json();

  return {
    props: {
      story: data?.data || {},
    },
  };
}
