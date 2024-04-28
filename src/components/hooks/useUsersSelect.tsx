import { useSelect } from "@refinedev/antd";
import { GetFieldsFromList } from "@refinedev/nestjs-query";

import gql from "graphql-tag";

import { UsersSelectQuery } from "@/graphql/types";

const USERS_SELECT_QUERY = gql`
    query UsersSelect{
        users {
            nodes {
                id
                name
                avatarUrl
            }
        }
    }
`;

export const useUsersSelect = () => {
  return useSelect<GetFieldsFromList<UsersSelectQuery>>({
    resource: "users",
    optionLabel: "name",
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
  });
};
