import { Box } from "~/components";
import { Icon } from "@iconify-icon/react";
import useAuth from "~/hooks/useAuth";
import { toast } from "react-toastify";
import { useState } from "react";
import Modal from "react-responsive-modal";
import { graphql } from "~/gql";
import { useMutation, useQuery } from "@apollo/client";
import { News, NewsTopic } from "~/gql/graphql";

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

const GET_USER_NEWS = graphql(`
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
  } = useQuery<{ News: Array<News> }, Record<string, never>>(GET_USER_NEWS);

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
      <div className="w-full">
        <h1 className="font-serif text-5xl">Market</h1>
      </div>
      <Box className="min-h-4/5 flex h-fit w-full flex-col items-start justify-center gap-y-4 p-3">
        <div className="flex w-full items-center justify-between">
          <h3 className="text-xl font-semibold tracking-tight">
            Recommended for you
          </h3>
          <button
            className="btn btn-ghost text-sm font-semibold"
            onClick={() => {
              setSelectedTopics(data?.user.news_topics_followed ?? []);
              setIsEditTopicsModalOpen(true);
            }}
          >
            Edit
          </button>
        </div>
        <div className="grid w-full grid-cols-1 gap-4">
          {newsData?.News.map((news, i) => (
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
            />
          ))}
        </div>
      </Box>
    </main>
  );
}

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
}: {
  news: {
    title: string;
    description: string;
    url: string;
    image: string;
  };
}) => {
  return (
    <Box className="flex w-full flex-col items-start justify-start p-3">
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
