import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "@/components/container";
import Layout from "@/components/new-index/layoutForIndex";
import { ChevronRightIcon } from "@radix-ui/react-icons";

import { getAllPostsWithSlug, getNewsAndMoreNews } from "@/lib/api";
// import markdownToHtml from '@/lib/markdownToHtml'
import Link from "next/link";
// import dynamic from "next/dynamic";
// import Button from "@/components/Primitives/Button";
// import TwoColumnCards from "@/components/v4/layout/TwoColumnCardsB";
// import NewsList from "@/components/News/news-list";
// import SmallPostsGroup2Cards from "@/components/v4/layout/SmallPostsGroup2Cards";
// import BigImageCardWithOverlay from "@/components/v4/card/BigImageCardWithOverlay";
import NewsPageFeatured from "@/components/v4/layout/NewsPageFeatured";
import { groupPostsByDate } from "@/lib/utils/groupPostsByDate";
const Footer = dynamic(() => import("@/components/footer"));

// const RelatedPosts = dynamic(() => import("@/components/related-posts"), {
//   ssr: true,
// });
// const PostTitle = dynamic(() => import("@/components/post-title"), {
//   ssr: true,
// });
// const SponsorCard = dynamic(() => import("@/components/toolbox/SponsorCard"), {
//   ssr: true,
// });
// const AuthorNewsCredit = dynamic(
//   () => import("@/components/AuthorNewsCredit"),
//   { ssr: true }
// );

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + "&hellip;" : str;
}

export default function Post({
  post,
  morePosts,
  preview,
  domain,
  link,
  postDate,
  groupedPosts,
}) {
  const router = useRouter();
  if (!router.isFallback && !post?.attributes.slug) {
    return <ErrorPage statusCode={404} />;
  }
  let content = "";
  if (post?.attributes.content) {
    content = truncate(post?.attributes.content, 400);
  }
  // const tags = post.attributes.tags.data;

  const renderPosts = posts =>
    posts.map((post, index) => {
      const postDomain = getDomain(post?.attributes?.legacyAttributes?.link);

      const ogImage = post?.attributes?.seo?.opengraphImage
        ? post?.attributes?.seo?.opengraphImage
        : post?.attributes?.featuredImage?.data?.attributes?.url
          ? post?.attributes?.featuredImage?.data?.attributes?.url
          : post?.legacyFeaturedImage
            ? post?.legacyFeaturedImage?.mediaItemUrl
            : post?.ogImage
              ? post?.ogImage.opengraphImage
              : post?.attributes?.ogImage?.opengraphImage
                ? post?.attributes?.ogImage.opengraphImage
                : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
      return (
        <article key={index} className="group relative flex">
          <Link
            target="_blank"
            className="flex"
            href={post?.attributes?.legacyAttributes?.link + `?ref=prototypr`}
          >
            <div className="flex flex-col items-start pl-6 pr-3">
              <h3 className="text-lg font-semibold tracking-tight text-gray-800 dark:text-gray-100">
                <div className="absolute -inset-x-4 -inset-y-2 z-0 scale-95 bg-gray-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-gray-800/50" />
                <a href={post.url}>
                  <span className="absolute -inset-x-4 -inset-y-0 z-20 sm:-inset-x-6 sm:rounded-2xl" />
                  <span className="relative z-10">
                    {post.attributes?.title}
                  </span>
                </a>
              </h3>
              <div className="z-10 mb-2 order-first">
                <div className="relative z-10 flex items-center text-base pl-2.5 border-l-2 border-gray-300/80">
                  <div className="text-sm my-auto font-base text-gray-500">
                    {formatDate(post?.attributes?.date)}
                  </div>
                </div>
              </div>
              <p className="relative z-10 text-sm line-clamp-2 overflow-hidden text-gray-600 dark:text-gray-400">
                <div
                  style={{ color: "#4a5568" }}
                  className="max-w-3xl text-base mb-2"
                  dangerouslySetInnerHTML={{ __html: post.attributes?.excerpt }}
                ></div>
              </p>
              <div className="z-10 mt-1 flex w-[fit-content]">
                  <div className="my-auto flex rounded-full flex-col justify-center p-[1px] mr-0.5 bg-black/50">
                    <img
                      className="w-4 h-4 mx-auto my-auto rounded-full"
                      src={`https://www.google.com/s2/favicons?domain=${postDomain}`}
                    />
                  </div>
                  <div className="text-[10px] ml-1 text-gray-600 my-auto leading-none font-medium uppercase">
                    {postDomain}
                  </div>
                </div>
              {/* <div className="flex z-10 relative justify-start w-full mt-4">
                <div
                  aria-hidden="true"
                  className="relative flex items-center text-sm font-medium text-blue-500"
                >
                  Visit source
                  <ChevronRightIcon/>
                </div>
              </div> */}
            </div>
            <div className="relative flex-none group-hover:scale-[1.02] w-[120px] h-[120px] order-first transition transition-all duration-400">
              <img
                className="rounded-lg z-10 h-full w-full object-cover"
                src={ogImage}
              />
              {/* <div className="absolute flex bottom-0 left-0 m-2 w-[fit-content] py-[1px] pl-[1px] pr-2 bg-black/60 rounded-md">
                <div className="my-auto flex flex-col justify-center p-[1px] rounded-md mr-0.5 bg-black/80 border border-1 border-black/50 rounded">
                  <img
                    className="w-4 h-4 mx-auto my-auto"
                    src={`https://www.google.com/s2/favicons?domain=${postDomain}`}
                  />
                </div>
                <div className="text-[10px] ml-1 text-white my-auto leading-none font-medium uppercase">
                  {postDomain}
                </div>
              </div> */}
            </div>
            <div className="flex flex-col justify-center">
              <ChevronRightIcon width={20} height={20} className="text-gray-400 group-hover:text-gray-900 fill-current group-hover:translate-x-2 duration-150 ease-in-out"/>
              {/* <svg
                className="fill-current group-hover:translate-x-2 duration-150 ease-in-out"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="12"
              >
                <path d="M9.586 5 6.293 1.707 7.707.293 13.414 6l-5.707 5.707-1.414-1.414L9.586 7H0V5h9.586Z" />
              </svg> */}
            </div>
          </Link>
        </article>
      );
    });

  const ogImage = post?.attributes?.seo?.opengraphImage
    ? post?.attributes?.seo?.opengraphImage
    : post?.attributes?.featuredImage?.data?.attributes?.url
      ? post?.attributes?.featuredImage?.data?.attributes?.url
      : post?.legacyFeaturedImage
        ? post?.legacyFeaturedImage?.mediaItemUrl
        : post?.ogImage
          ? post?.ogImage.opengraphImage
          : "https://s3-us-west-1.amazonaws.com/tinify-bucket/%2Fprototypr%2Ftemp%2F1595435549331-1595435549330.png";
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}`;

  return (
    <>
      <Layout
        padding={false}
        navOffset={false}
        seo={{
          title: `${post?.attributes?.seo?.opengraphTitle ? post?.attributes?.seo?.opengraphTitle : post?.attributes?.title && post.attributes.title}`,
          description: `${post?.attributes?.seo?.opengraphDescription ? post?.attributes?.seo?.opengraphDescription : post?.attributes?.excerpt && post.attributes.excerpt}`,
          image: `${ogImage}`,
          canonical: `${post?.attributes?.seo?.canonical ? post?.attributes?.seo?.canonical : post?.attributes?.slug && `https://prototypr.io/news/${post?.attributes.slug}`}`,
          url: `${post?.attributes?.seo?.canonical ? post?.attributes?.seo?.canonical : post?.attributes?.slug && `https://prototypr.io/news/${post?.attributes.slug}`}`,
        }}
        // activeNav={"posts"}
        // navType={"full"}
        preview={preview}
      >
        <div className="w-full border-b border-gray-200 shadow-sm pt-[58px] bg-white z-50 w-full ">
          <div className="max-w-[1320px] py-2.5 px-6 mx-auto xl:px-3">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex text-lg text-black/90">
                <Link href="/news">
                  <div className="font-black tracking-tight text-xl text-sky-500 drop-shadow-sm my-auto">
                    News Explorer
                  </div>
                </Link>
                <div className="mx-3 text-gray-400/90 my-auto">|</div>
                <div className="line-clamp-1 font-semibold my-auto tracking-tight">
                  {post?.attributes?.title}
                </div>
                {/* <div className="ml-3 flex font-base text-gray-500/90 my-auto">
                <img className="w-4 h-4 mr-1 my-auto" src={faviconUrl} />
                <div>{domain}</div>
              </div> */}
                <div className="hidden md:flex ml-4 w-[fit-content]">
                  <div className="my-auto flex rounded-full flex-col justify-center p-[1px] mr-0.5 bg-black/50">
                    <img
                      className="w-4 h-4 mx-auto my-auto rounded-full"
                      src={faviconUrl}
                    />
                  </div>
                  <div className="text-xs my-auto leading-none text-gray-500 ml-1 font-medium uppercase">
                    {domain}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Container
          padding={false}
          maxWidth="w-full px-3 xl:px-0 pb-20 mt-3 relative z-0 relative w-full h-full  max-w-[1320px] mx-auto"
        >
          <div className="grid gap-6 grid-cols-12">
            <div className="col-span-9">
              <NewsPageFeatured
                faviconUrl={faviconUrl}
                ogImage={ogImage}
                post={post}
                domain={domain}
                content={content}
              />
            </div>
            <div className="col-span-9 mt-3">
              <h2 className="text-lg font-bold mb-2">Latest</h2>
              <div className="space-y-8">
                {["today", "yesterday", "lastWeek", "lastMonth"].map(
                  group =>
                    groupedPosts?.length &&
                    groupedPosts[group].length > 0 && (
                      <section
                        key={group}
                        aria-labelledby={group}
                        className=" md:border-gray-200 md:pl-6 md:dark:border-gray-700/40"
                      >
                        <div className="grid bg-white p-4 pr-8 rounded-xl grid-cols-1 gap-y-6 md:grid-cols-4">
                          <h2
                            id={group}
                            className="text-sm font-semibold text-gray-800"
                          >
                            {group.charAt(0).toUpperCase() + group.slice(1)}
                          </h2>
                          <div className="md:col-span-4">
                            <div className="space-y-16">
                              {renderPosts(groupedPosts[group])}
                            </div>
                          </div>
                        </div>
                      </section>
                    )
                )}
                {groupedPosts?.months &&
                  Object.entries(groupedPosts?.months).map(([month, posts]) => (
                    <section
                      key={month}
                      aria-labelledby={month}
                      className="md:border-gray-400/60"
                    >
                      <div className="grid md:grid-cols-12 bg-white border border-gray-300/50 shadow-sm p-4 pr-8 pb-8 rounded-xl  grid-cols-1 gap-y-6 ">
                        <h2
                          id={month}
                          className="text-lg col-span-3 font-semibold text-gray-800"
                        >
                          {month}
                        </h2>
                        <div className="col-span-12 md:col-span-9">
                          <div className="space-y-12">{renderPosts(posts)}</div>
                        </div>
                      </div>
                    </section>
                  ))}
              </div>
            </div>
          </div>
        </Container>
        {/* <Container
        padding={false}
        maxWidth="w-full mt-12 relative z-0 relative w-full h-full  max-w-[1320px] mx-auto"
      >
        {morePosts && (
          <>
            <h2 className="text-lg font-bold mb-2">Latest</h2>

            <SmallPostsGroupB
              smallPosts={morePosts.slice(0, 6)}
              type={"news"}
            />

            <SmallPostsGroup2Cards
              smallPosts={morePosts.slice(6, 8)}
              type={"news"}
            />
          </>
        )}
      </Container> */}
        {/* <Container
        padding={false}
        maxWidth="w-full relative z-0 relative w-full h-full  max-w-[1320px] mx-auto"
      >
        <TwoColumnCards />
      </Container> */}
        {/* <div className="w-full bg-blue-900/90 w-full ">
        <div className="max-w-[1320px] py-4 px-6 mx-auto xl:px-3">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex text-white flex-col">
              <div className="text-base font-semibold mb-1">Never miss a curated link.</div>
              <p className="text-base">Every day we hand-pick the best cool links in design and tech and send them out to subscribers.</p>
            </div>
            <div className="my-auto">
              <Button
               className="rounded-full font-semibold leading-none"
               variant={"confirmRoundedGhost"}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div> */}
        {/* <Container
        padding={false}
        maxWidth="max-w-[1320px] px-6 mx-auto xl:px-3 grid grid-cols-12"
      >
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <div className="col-span-full ">
              <div className="mb-8">
                <div className="mb-6 relative bg-white px-6 pt-6 rounded-lg w-full">
                  <a
                    href={link ? link : ""}
                    className="hover:underline"
                    target="_blank"
                  >
                    <h1 className="text-xl  max-w-2xl font-medium">
                      {post?.attributes.title}
                    </h1>
                  </a>
                  {post && post.attributes && post.attributes.author && (
                    <div className="sm:hidden lg:block">
                      <AuthorNewsCredit
                        author={post.attributes.author}
                        postDate={postDate}
                        domain={domain}
                        link={link}
                      />
                    </div>
                  )}
                  <div
                    style={{ color: "#4a5568" }}
                    className="py-3 max-w-3xl text-md mb-2"
                    dangerouslySetInnerHTML={{ __html: content }}
                  ></div>
                  {post?.attributes.legacyAttributes?.imgUrl && (
                    <a href={link ? link : ""} target="_blank">
                      <img
                        className="rounded"
                        src={post?.attributes.legacyAttributes?.imgUrl}
                      />
                    </a>
                  )}
                  {link && (
                    <div className="py-6">
                      <a
                        className="underline text-gray-600 font-semibold"
                        href={post?.attributes.legacyAttributes?.link}
                        target="_blank"
                      >
                        Read more
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-full mb-6 lg:mb-0 lg:col-span-3 order-last lg:order-last lg:block">
              <div className="sm:hidden block lg:block">
                <SponsorCard position="left" />
              </div>
              {morePosts && (
                <RelatedPosts
                  relatedPosts={morePosts}
                  type={"post"}
                  title={"Top Stories"}
                />
              )}
            </div>
          </>
        )}
      </Container> */}
      </Layout>

      <Footer />
    </>
  );
}

export async function getStaticProps({
  params,
  preview = null,
  type = "bite",
}) {
  const data = await getNewsAndMoreNews(params.slug, preview, type);

  // console.log(data.morePosts.data[0]);

  //if no post found, 404
  if (!data?.posts?.data[0]) {
    return {
      props: {
        post: null,
      },
      revalidate: 30,
    };
  }

  let link = data?.posts.data[0].attributes.link;
  if (!link) {
    link = data?.posts.data[0].attributes.legacyAttributes?.link
      ? data?.posts.data[0].attributes.legacyAttributes?.link
      : "#";
  }
  //get url for link
  let domain = "";
  if (link) {
    domain = getDomain(link);
  }

  let postDate = new Date(data?.posts.data[0]?.attributes?.date);

  const relatedArticles = data?.posts.data[0]?.attributes?.relatedArticles
    ? data?.posts.data[0]?.attributes?.relatedArticles
    : [];

  let groupedPosts = groupPostsByDate(data.morePosts?.data);

  // const content = await markdownToHtml(data?.posts[0]?.content || '')
  return {
    props: {
      preview,
      post: {
        ...data?.posts.data[0],
      },
      domain,
      link,
      groupedPosts: groupedPosts,
      postDate: JSON.stringify(postDate),
      morePosts: data.morePosts?.data,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug("bite");

  return {
    paths:
      (allPosts &&
        allPosts.data?.map(post => {
          return `/news/${post.attributes.slug}`;
        })) ||
      [],
    fallback: true,
  };
}

export const getDomain = link => {
  let domain = link;
  if (link) {
    if (typeof link == "string") {
      let matches = link.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i);
      domain = matches && matches[1];
      if (domain) {
        domain = domain.replace("www.", "");
      }
    }
  }
  return domain;
};

export const formatDate = timestamp =>
  new Date(timestamp).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
