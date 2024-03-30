import { Box } from "~/components";
import { Icon } from "@iconify-icon/react";
import useAuth from "~/hooks/useAuth";
import { toast } from "react-toastify";
import { useState } from "react";
import Modal from "react-responsive-modal";
import { graphql } from "~/gql";
import { useMutation, useQuery } from "@apollo/client";
import { News, NewsTopic, TaskType } from "~/gql/graphql";
import TopBar from "~/components/TopBar";

const GET_USER_NEWS_TOPIC_FOLLOWED = graphql(`
  query UserNewsTopicFollowed($userId: String!) {
    user(id: $userId) {
      news_topics_followed
    }
  }
`);

const UPDATE_USER_NEWS_TOPIC_FOLLOWED = graphql(`
  mutation UpdateUserNewsTopicFollowed($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      news_topics_followed
    }
  }
`);

export const GET_USER_NEWS = graphql(`
  query UserNews {
    News {
      source {
        id
        name
      }
      author
      title
      description
      url
      urlToImage
      publishedAt
      content
    }
  }
`);

export const REPORT_NEWS_CLICKED = graphql(`
  mutation ReportNewsClicked($reportActionInput: ReportActionInput!) {
    reportAction(reportActionInput: $reportActionInput) {
      success
    }
  }
`);

export default function Market() {
  const { userId } = useAuth();
  const [selectedTopics, setSelectedTopics] = useState<NewsTopic[]>([]);
  const [isEditTopicsModalOpen, setIsEditTopicsModalOpen] = useState(false);
  const { data, loading, error, refetch } = useQuery<
    { user: { news_topics_followed: NewsTopic[] } },
    { userId: string }
  >(GET_USER_NEWS_TOPIC_FOLLOWED, {
    variables: { userId: userId ?? "" },
  });
  const [updateUserNewsTopicFollowed] = useMutation(
    UPDATE_USER_NEWS_TOPIC_FOLLOWED,
  );
  const {
    data: newsData,
    loading: newsLoading,
    error: newsError,
    refetch: refetchNews,
  } = useQuery<{ News: Array<News> }, Record<string, never>>(GET_USER_NEWS, {
    notifyOnNetworkStatusChange: true,
  });
  const [reportNewsClicked] = useMutation(REPORT_NEWS_CLICKED);

  return (
    <main className="flex h-screen flex-col justify-start gap-y-4 overflow-y-scroll bg-background p-4 first-letter:items-center">
      <Modal
        open={isEditTopicsModalOpen}
        onClose={() => setIsEditTopicsModalOpen(false)}
        classNames={{
          modalContainer: "flex items-center justify-center",
          modal: "rounded-lg w-10/12",
        }}
      >
        <h2 className="text-xl font-semibold tracking-tight">
          Pick some topics you like
        </h2>
        <p className="w-3/4 text-xs leading-4 text-secondary-text">
          These topics will be recommended to you more in the future
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {Object.values(NewsTopic).map((topic) => (
            <MarketTopicCard
              key={topic}
              topic={Object.keys(NewsTopic)
                [Object.values(NewsTopic).indexOf(topic)]!.replace(
                  /([A-Z])/g,
                  " $1",
                )
                .trim()}
              image={`https://loremflickr.com/400/500/finance,${topic.replace(
                /_/g,
                ",",
              )}?lock=${topic}`}
              onClick={() => {
                setSelectedTopics((prev) =>
                  prev.includes(topic)
                    ? prev.filter((t) => t !== topic)
                    : [...prev, topic],
                );
              }}
              selected={selectedTopics.includes(topic)}
            />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-end">
          <button
            className="btn btn-ghost mr-4"
            onClick={() => {
              setIsEditTopicsModalOpen(false);
            }}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={async () => {
              await updateUserNewsTopicFollowed({
                variables: {
                  updateUserInput: {
                    id: userId ?? "",
                    news_topics_followed: selectedTopics,
                  },
                },
              });
              toast.success("Topics updated successfully");
              setIsEditTopicsModalOpen(false);
              await refetch();
              await refetchNews();
            }}
          >
            Save
          </button>
        </div>
      </Modal>
      <TopBar title="Market" />
      <NewsBox
        onClickEditNews={() => {
          setSelectedTopics(data?.user.news_topics_followed ?? []);
          setIsEditTopicsModalOpen(true);
        }}
        onClickNews={async () => {
          await reportNewsClicked({
            variables: {
              reportActionInput: {
                taskType: TaskType.ReadingArticles,
              },
            },
          });
        }}
        loading={newsLoading}
        error={newsError !== undefined}
        news_topics_followed={data?.user.news_topics_followed ?? []}
        newsData={newsData}
      />
    </main>
  );
}

export const NewsBox = ({
  onClickEditNews,
  onClickNews,
  loading,
  error,
  news_topics_followed,
  newsData,
  isMiniView,
  limit,
}: {
  onClickEditNews?: () => void;
  onClickNews: () => void;
  loading: boolean;
  error: boolean;
  news_topics_followed: NewsTopic[];
  newsData: { News: Array<News> } | undefined;
  isMiniView?: boolean;
  limit?: number;
}) => {
  return (
    <Box className="min-h-4/5 flex h-fit w-full flex-col items-start justify-center gap-y-4 p-3 pt-0">
      <div className="flex w-full items-center justify-between">
        <h3 className="mt-2 text-xl font-semibold tracking-tight">
          Recommended for you
        </h3>
        <button
          className={
            "btn btn-ghost text-sm font-semibold" +
            (isMiniView ? " hidden" : "")
          }
          onClick={onClickEditNews}
        >
          Edit
        </button>
      </div>
      <div
        className={
          "grid w-full grid-cols-1 gap-4" + (isMiniView ? "" : " min-h-96")
        }
      >
        {loading ? (
          <h3 className="mb-auto mt-auto text-center text-xl text-secondary-text">
            Loading...
          </h3>
        ) : error ? (
          <h3 className="mb-auto mt-auto text-center text-xl text-secondary-text">
            Error fetching data
          </h3>
        ) : news_topics_followed.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <h3 className="mt-auto px-4 text-center text-xl text-secondary-text">
              No topics selected.
              <br />
              Select some topics to get started
            </h3>
            <button
              className="btn btn-primary mb-auto mt-2 max-w-48"
              onClick={onClickEditNews}
            >
              Select Topics
            </button>
          </div>
        ) : (
          newsData?.News.slice(0, limit ?? newsData.News.length).map(
            (news, i) => {
              if (!isMiniView)
                return (
                  <NewsCard
                    key={news.title}
                    news={{
                      image:
                        news.urlToImage ??
                        `https://loremflickr.com/200/300/finance,${
                          news.title.split(" ")[0]
                        }?random=${i}`,
                      ...news,
                    }}
                    onClick={onClickNews}
                  />
                );
              return (
                <a
                  key={news.title}
                  href={news.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={onClickNews}
                >
                  <Box className="grid h-24 w-full grid-cols-3 gap-2 overflow-hidden hover:cursor-pointer">
                    <img
                      src={
                        news.urlToImage ??
                        "https://loremflickr.com/200/300/finance"
                      }
                      alt={news.title}
                      className="col-span-1 h-full w-full object-cover"
                    />
                    <div className="col-span-2 flex items-center justify-start">
                      <p className="line-clamp-3 w-full text-pretty">
                        {news.title}
                      </p>
                    </div>
                  </Box>
                </a>
              );
            },
          )
        )}
      </div>
    </Box>
  );
};

const MarketTopicCard = ({
  topic,
  image,
  onClick,
  selected,
}: {
  topic: string;
  image: string;
  onClick: () => void;
  selected?: boolean;
}) => {
  return (
    <Box
      className="flex h-36 w-full cursor-pointer flex-col items-center justify-start transition-all hover:scale-95 active:scale-90"
      onClick={onClick}
    >
      <div className="relative h-44 w-full overflow-hidden rounded-t-lg">
        {selected && (
          <div className="absolute right-0 top-0 h-full w-full bg-black bg-opacity-70">
            <Icon
              icon="bi:check"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-4xl text-white"
            />
          </div>
        )}
        <img src={image} alt={topic} className="h-full w-full object-cover" />
      </div>
      <div className="flex h-10 items-center justify-center">
        <h3 className="text-xs">{topic}</h3>
      </div>
    </Box>
  );
};

const NewsCard = ({
  news,
  onClick,
}: {
  news: {
    title: string;
    description: string;
    url: string;
    image: string;
  };
  onClick?: () => void;
}) => {
  return (
    <Box
      className="flex w-full flex-col items-start justify-start p-3"
      onClick={() => {
        onClick?.();
      }}
    >
      <a href={news.url} target="_blank" rel="noreferrer">
        <img
          src={news.image}
          alt={news.title}
          className="h-52 w-full rounded-lg object-cover"
        />
        <h3 className="mt-4 text-xl font-semibold">{news.title}</h3>
        <p className="mt-2 text-tertiary-text">{news.description}</p>
      </a>
    </Box>
  );
};
