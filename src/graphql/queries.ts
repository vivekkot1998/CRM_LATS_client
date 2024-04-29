 import gql from "graphql-tag";

//Query to get Total Company, Contact and Deal Counts
export const DASHBOARD_TOTAL_COUNTS_QUERY = gql`
  query DashboardTotalCounts {
    companies {
      totalCount
    }
    contacts {
      totalCount
    }
    deals {
      totalCount
    }
  }
`;

// Query to get upcoming events
export const DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY = gql`
  query DashboardCalendarUpcomingEvents {
    events {
      totalCount
      nodes {
        id
        title
        color
        startDate
        endDate
      }
    }
  }
`;

// Query to get deals chart
export const DASHBOARD_DEALS_CHART_QUERY = gql`
  query DashboardDealsChart{
    dealStages {
      # Get all deal stages
      nodes {
        id
        title
        # Get the sum of all deals in this stage and group by closeDateMonth and closeDateYear
        dealsAggregate {
          groupBy {
            closeDateMonth
            closeDateYear
          }
          sum {
            value
          }
        }
      }
      # Get the total count of all deals in this stage
      totalCount
    }
  }
`;

export const DASHBOARD_TOTAL_REVENUE_QUERY = gql`
    query DashboardTotalRevenue{
        dealStages {
            nodes {
                title
                # dealsAggregate {
                #     sum {
                #         value
                #     }
                # }
            }
        }
    }
`;

// Query to get latest activities deals
export const DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY = gql`
  query DashboardLatestActivitiesDeals(
    $filter: DealFilter!
    $sorting: [DealSort!]
    $paging: OffsetPaging
  ) {
    deals(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        title
        stage {
          id
          title
        }
        company {
          id
          name
          avatarUrl
        }
        createdAt
      }
    }
  }
`;

// Query to get latest activities audits
export const DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY = gql`
  query DashboardLatestActivitiesAudits(
    $filter: AuditFilter!
    $sorting: [AuditSort!]
    $paging: OffsetPaging
  ) {
    audits(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        action
        targetEntity
        targetId
        changes {
          field
          from
          to
        }
        createdAt
        user {
          id
          name
          avatarUrl
        }
      }
    }
  }
`;

// Query to get companies list
// export const COMPANIES_LIST_QUERY = gql`
//   query CompaniesList(
//     $filter: CompanyFilter!
//     $sorting: [CompanySort!]
//     $paging: OffsetPaging!
//   ) {
//     companies(filter: $filter, sorting: $sorting, paging: $paging) {
//       totalCount
//       nodes {
//         id
//         name
//         avatarUrl
//         # Get the sum of all deals in this company
//         dealsAggregate {
//           sum {
//             value
//           }
//         }
//       }
//     }
//   }
// `;
export const COMPANIES_LIST_QUERY = gql`
  query CompaniesList {
    companies {
      totalCount
      nodes {
        id
        name
        avatarUrl
        salesOwner {
                    id
                    name
                    avatarUrl
                }
        # Get the sum of all deals in this company
        # dealsAggregate {
        #   sum {
        #     value
        #   }
        # }
      }
    }
  }
`;

// Query to get users list
// export const USERS_SELECT_QUERY = gql`
//   query UsersSelect(
//     $filter: UserFilter!
//     $sorting: [UserSort!]
//     $paging: OffsetPaging!
//   ) {
//     # Get all users
//     users(filter: $filter, sorting: $sorting, paging: $paging) {
//       totalCount # Get the total count of users
//       # Get specific fields for each user
//       nodes {
//         id
//         name
//         avatarUrl
//       }
//     }
//   }
// `;
export const USERS_SELECT_QUERY = gql`
  query UsersSelect {
    users {
        totalCount
        nodes {
            id
            name
            avatarUrl
        }
    }
}
`;

//Query to get the company notes
// export const COMPANY_COMPANY_NOTES_QUERY = gql`
//     query CompanyCompanyNotes(
//         $filter: CompanyNoteFilter!
//         $sorting: [CompanyNoteSort!]
//         $paging: OffsetPaging!
//     ) {
//         companyNotes(filter: $filter, sorting: $sorting, paging: $paging) {
//             nodes {
//                 id
//                 note
//                 createdAt
//                 createdBy {
//                     id
//                     name
//                     updatedAt
//                     avatarUrl
//                 }
//             }
//             totalCount
//         }
//     }
// `;
export const COMPANY_COMPANY_NOTES_QUERY = gql`
    query CompanyCompanyNotes($filter: CompanyNoteFilter){
        companyNotes(filter: $filter){
            totalCount
            nodes {
                id
                note
                createdBy{
                    id
                    name
                    avatarUrl
                }
                company{
                    id
                    name
                }
            }        
        }
    }
`;
// export const COMPANY_COMPANY_NOTES_QUERY = gql`
//     query CompanyCompanyNotes{
//         companyNotes{
//             totalCount
//             nodes {
//                 id
//                 note
//                 createdBy{
//                     id
//                     name
//                     avatarUrl
//                 }
//                 company{
//                     id
//                     name
//                 }
//             }        
//         }
//     }
// `;

//Query to get deals stages.
export const SALES_DEAL_STAGES_QUERY = gql`
    query SalesDealStages{
        dealStages{
            nodes {
                id
                title
            }
            totalCount
        }
    }
`;

//Query to get the deals.
export const SALES_DEALS_QUERY = gql`
    query SalesDeals(
        $filter: DealFilter!){
        deals(filter: $filter){
          totalCount
            nodes {
                id
                title
                value
                createdAt
                stageId
                company {
                    id
                    name
                    avatarUrl
                }
                dealOwner {
                    id
                    name
                    avatarUrl
                }
            }
        }
    }
`;

//Query to update one deal
export const SALES_UPDATE_DEAL_MUTATION = gql`
    mutation SalesUpdateDeal($input: UpdateOneDealInput!) {
        updateOneDeal(input: $input) {
            id
            title
            stageId
            value
            dealOwnerId
            company {
                id
                # contacts {
                #     nodes {
                #         id
                #         name
                #         avatarUrl
                #     }
                # }
            }
            # dealContact {
            #     id
            # }
        }
    }
`;

export const COMPANY_DEALS_TABLE_QUERY = gql`
    query CompanyDealsTable(
        $filter: DealFilter!){
        deals(filter: $filter) {
            nodes {
                id
                title
                value
                stage {
                    id
                    title
                }
                dealOwner {
                    id
                    name
                    avatarUrl
                }
                # dealContact {
                #     id
                #     name
                #     avatarUrl
                # }
            }
            totalCount
        }
    }
`;

export const COMPANY_TOTAL_DEALS_AMOUNT_QUERY = gql`
    query CompanyTotalDealsAmount($id: ID!) {
        company(id: $id) {
            id
            name
            # dealsAggregate {
            #     sum {
            #         value
            #     }
            # }
        }
    }
`;

// Query to get contacts associated with a company
export const COMPANY_CONTACTS_TABLE_QUERY = gql`
  query CompanyContactsTable(
    $filter: ContactFilter!
    $sorting: [ContactSort!]
    $paging: OffsetPaging!
  ) {
    contacts(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        name
        avatarUrl
        jobTitle
        email
        phone
        status
      }
    }
  }
`;



// Query to get task stages list
export const TASK_STAGES_QUERY = gql`
  query TaskStages(
    $filter: TaskStageFilter!
    $sorting: [TaskStageSort!]
    $paging: OffsetPaging!
  ) {
    taskStages(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount # Get the total count of task stages
      nodes {
        id
        title
      }
    }
  }
`;

// Query to get tasks list
export const TASKS_QUERY = gql`
  query Tasks(
    $filter: TaskFilter!
    $sorting: [TaskSort!]
    $paging: OffsetPaging!
  ) {
    tasks(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount # Get the total count of tasks
      nodes {
        id
        title
        description
        dueDate
        completed
        stageId
        # Get user details associated with this task
        users {
          id
          name
          avatarUrl
        }
        createdAt
        updatedAt
      }
    }
  }
`;

// Query to get task stages for select
export const TASK_STAGES_SELECT_QUERY = gql`
  query TaskStagesSelect(
    $filter: TaskStageFilter!
    $sorting: [TaskStageSort!]
    $paging: OffsetPaging!
  ) {
    taskStages(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        title
      }
    }
  }
`;

export const SALES_COMPANIES_SELECT_QUERY = gql`
    query SalesCompaniesSelect{
        companies{
            nodes {
                id
                name
                avatarUrl
                # contacts {
                #     nodes {
                #         name
                #         id
                #         avatarUrl
                #     }
                # }
            }
        }
    }
`;