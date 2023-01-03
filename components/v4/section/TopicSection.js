import Container from "@/components/container";
import LargePostGrid from "@/components/v4/layout/LargePostGrid";
import HeroGrid from "@/components/v4/hero/hero";
import SidebarTopic from "@/components/v4/layout/SidebarTopic";
import { useIntl } from "react-intl";

const TopicSection = ({
  HeroPostRandomSection,
  OtherPostsRandomSection,
  heroJob,
  sponsors,
  toolsList,
  title,
}) => {
  const intl = useIntl();

  const heading = intl.formatMessage({ id: title });

  return (
    <Container maxWidth="max-w-[1320px]">
      {/* <Intro /> */}
      <div className="w-full h-full grid pb-20 grid-cols-12 flex justify-center">
        <div className="w-full max-w-full flex flex-col gap-2 col-span-12 lg:col-span-9">
          {/* <HomePageNewNavBar /> */}
          {/* <TabSwitcher selectedTab={currentTab} onTabChange={onTabChange} /> */}
          <div className="flex">
            <h2 className="text-2xl my-4 font-medium text-gray-900">
              {heading}
              {/* Discover <span className="text-gray-400">the latest</span> */}
            </h2>
            <a target="_blank" className="inline-flex" href="/feed.xml">
              <svg
                className="my-auto ml-3 w-5 h-5 text-gray-400 hover:text-orange-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M3 3c9.941 0 18 8.059 18 18h-3c0-8.284-6.716-15-15-15V3zm0 7c6.075 0 11 4.925 11 11h-3a8 8 0 0 0-8-8v-3zm0 7a4 4 0 0 1 4 4H3v-4z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
          <LargePostGrid
            largePost={HeroPostRandomSection}
            smallPosts={OtherPostsRandomSection}
          />
        </div>

        <SidebarTopic
          paddingTop="hidden ml-4 pl-6 md:block pt-12"
          content={toolsList}
        />
      </div>
    </Container>
  );
};

export default TopicSection;
