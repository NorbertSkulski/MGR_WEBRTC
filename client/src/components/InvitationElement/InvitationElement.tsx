import { Icon, IconButton, Tooltip } from "@mui/material";
import "./InvitationElement.scss";
import { GlobalFetch } from "../../utils/Fetch/FetchUtils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
// @ts-ignore: Unreachable code error
import { NotificationManager } from "react-notifications";

type InvitationElementType = {
  uuid: string;
  fromUserUuid: string;
  toUserUuid: string;
  createdAt: Date;
  updatedAt: Date;
  toUser: InvitationFromUserType;
  fromUser: InvitationFromUserType;
  refetch: Function;
};

type InvitationFromUserType = {
  uuid: string;
  name: string;
  lastName: string;
  id: string;
};

const InvitationElement = (props: InvitationElementType) => {
  const { mutate: addMutate, isSuccess: isSuccessAdd } = useMutation({
    mutationFn: (data: InvitationElementType) =>
      GlobalFetch({ method: "PATCH", url: "/user/acceptFriendRequest", data }),
  });
  const { mutate: deleteMutate, isSuccess: isSuccessDelete } = useMutation({
    mutationFn: (data: InvitationElementType) =>
      GlobalFetch({
        method: "DELETE",
        url: `/user/deleteFriendRequest/${props?.fromUserUuid}/${props?.toUserUuid}`,
        data,
      }),
  });

  const { refetch: refetchContact } = useQuery({queryKey: ['contactListRequest']});


  const { refetch } = props;

  useEffect(() => {
    if (isSuccessAdd) {
      NotificationManager.success("Zaakceptowano!");
      refetch();
      refetchContact();
    }
  }, [isSuccessAdd]);

  useEffect(() => {
    if (isSuccessDelete) {
      NotificationManager.success("Anulowano!");
      refetch();
      refetchContact();
    }
  }, [isSuccessDelete]);


  return (
    <div className="InvitationElement">
      <b>
        {props?.fromUser?.name || "-"} {props?.fromUser?.lastName || "-"}
      </b>
      <div className="IdArea">
        <span>{props?.fromUser?.id || "-"}</span>
        <div>
          <Tooltip arrow placement="top" title="Akceptuj">
            <IconButton
              style={{ color: "var(--global-success)" }}
              size="small"
              onClick={() => {
                addMutate(props);
              }}
            >
              <Icon>done_outline</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement="top" title="Odrzuć">
            <IconButton
              style={{ color: "red" }}
              size="small"
              onClick={() => {
                deleteMutate(props);
              }}
            >
              <Icon>remove_circle_outline</Icon>
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default InvitationElement;
