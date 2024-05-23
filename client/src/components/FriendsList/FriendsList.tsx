import { useEffect, useState } from "react";
import "./FriendsList.scss";
import InvitationElement from "../InvitationElement/InvitationElement";
import { useQuery } from "@tanstack/react-query";
import { GlobalFetch } from "../../utils/Fetch/FetchUtils";
import { uniqBy } from "lodash";

const FriendsList = () => {
  
  const { data, refetch } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: () =>
      GlobalFetch({ method: "GET", url: "/user/friendRequestsList" }).then(
        ({ data }) => uniqBy(data, 'fromUserUuid')
      ),
  });

  return (
    <div className="FriendsList">
      <div>
        <h4>Zaproszenia:</h4>
        <div className="Invitations">
          {data?.map((ele:any, idx) => (
            <InvitationElement key={idx} {...ele} refetch={refetch} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
