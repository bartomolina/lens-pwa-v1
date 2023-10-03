import { useQuery } from "@apollo/client";
import { useState } from "react";

import {
  Profile,
  ProfileFeedDocument,
  Query,
} from "@/graphql/generated/graphql";
import { CreatePost } from "@/ui/create-post";
import { ErrorMessage } from "@/ui/error-message";
import { Loading } from "@/ui/loading";
import { Publications } from "@/ui/publications";

interface FeedProps {
  profile: Profile;
}

export function Feed({ profile }: FeedProps) {
  const { data, refetch, loading, error } = useQuery<Query>(
    ProfileFeedDocument,
    {
      variables: {
        request: {
          profileId: profile.id,
        },
      },
    }
  );
  const [popupOpened, setPopupOpened] = useState(false);

  const publications = data?.feed.items.map((item) => item.root);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;

  if (!publications) {
    // eslint-disable-next-line unicorn/no-null
    return null;
  }

  return (
    <Publications
      publications={publications}
      setPopupOpened={setPopupOpened}
      popupOpened={popupOpened}
    >
      <CreatePost setPopupOpened={setPopupOpened} refetch={refetch} />
    </Publications>
  );
}
