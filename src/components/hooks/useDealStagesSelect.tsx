import { useSelect } from "@refinedev/antd";
import { GetFieldsFromList } from "@refinedev/nestjs-query";

import gql from "graphql-tag";

import { DealStagesSelectQuery } from "@/graphql/types";

const DEAL_STAGES_SELECT_QUERY = gql`
    query DealStagesSelect{
        dealStages {
            nodes {
                id
                title
            }
        }
    }
`;

export const useDealStagesSelect = () => {
  return useSelect<GetFieldsFromList<DealStagesSelectQuery>>({
    resource: "dealStages",
    meta: { gqlQuery: DEAL_STAGES_SELECT_QUERY },
  });
};
