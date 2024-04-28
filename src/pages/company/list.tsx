import CustomAvatar from "@/components/custom-avatar";
import { Text } from "@/components/text";
import { COMPANIES_LIST_QUERY, USERS_SELECT_QUERY } from "@/graphql/queries";
import { Company } from "@/graphql/schema.types";
import { CompaniesListQuery, UsersSelectQuery } from "@/graphql/types";
import { SearchOutlined } from "@ant-design/icons";
import { CreateButton, DeleteButton, EditButton, FilterDropdown, List, useSelect, useTable } from "@refinedev/antd"
import { HttpError, getDefaultFilter, useGo } from "@refinedev/core";

import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { Input, Select, Space, Table } from "antd";


// export const ClientList = ({ children }: React.PropsWithChildren) => {
  export const CompanyList = ({ children }: React.PropsWithChildren) => {
  const go = useGo();

  const { tableProps, filters } = useTable<
  GetFieldsFromList<CompaniesListQuery>,
  HttpError,
  GetFieldsFromList<CompaniesListQuery>
>({
    resource: 'companies',
    onSearch: (values) => { //setup the sorters,filters,pagination on backend.
      return [
        {
          field: 'name',
          operator: 'contains',
          value: values.name
        }
      ]
    },
    pagination: {
      pageSize: 12,
    },
    sorters:{
      initial: [
        {
          field: 'createdAt',
          order: 'desc'
        }
      ]
    },
    filters: {
      initial: [
        {
          field: 'name',
          operator: 'contains',
          value: undefined
        }
      ]
    },
    meta: {
      gqlQuery: COMPANIES_LIST_QUERY
    }
  });

  //console.log(tableProps);

  const { selectProps, queryResult: queryResultUsers } = useSelect<GetFieldsFromList<UsersSelectQuery>>({
    resource: 'users',
    optionLabel: 'name',
    pagination: {
        mode: 'off'
    },
    meta: {
        gqlQuery: USERS_SELECT_QUERY
    }
})
  
  
  return (
    <div>
   <List
    breadcrumb={false}
    headerButtons={() => (
      <CreateButton
        onClick={() => {
          go({
            to: {
              // resource: 'clients',
              resource: 'companies',
              action:'create'
            },
            options: {
              keepQuery: true
            },
            type: 'replace'
          })
        }}
      />
    )}
   >
    <Table
      {...tableProps}
      pagination={{
        ...tableProps.pagination,
      }}
    >
      <Table.Column<Company>
        dataIndex="name" 
        title="Name"
        defaultFilteredValue={getDefaultFilter('id', filters)}
        filterIcon={<SearchOutlined />}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Input placeholder="Search Client"/>
          </FilterDropdown>
        )}
        render={(value, record) => (
          <Space>
            <CustomAvatar shape="square" name={record.name} src={record.avatarUrl}/>
            <Text style={{ whiteSpace: 'nowrap' }}>
              {record.name}
            </Text>
          </Space>
        )}
        />
        <Table.Column<Company>
        dataIndex={["salesOwner", "id"]}
        title="Sales Owner"
        defaultFilteredValue={getDefaultFilter("salesOwner.id", filters)}
        filterDropdown={(props) => ( //check again 
          <FilterDropdown {...props}>
            <Select
              placeholder="Search Sales owner"
              style={{ width: 220 }}
              {...selectProps}
            />
          </FilterDropdown>
        )}
        render={(_, record) => {
          const salesOwner = record.salesOwner;
         // console.log(salesOwner);
          return (
            <Space>
              <CustomAvatar name={salesOwner.name} src={salesOwner.avatarUrl} />
              <Text
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                {salesOwner.name}
              </Text>
            </Space>
          );
        }}
      />
      <Table.Column<Company>
        dataIndex="id"
        title="Actions"
        fixed="right"
        render={(value) => (
          <Space>
            <EditButton hideText size="small" recordItemId={value}/>
            <DeleteButton hideText size="small" recordItemId={value}/>
          </Space>
        )}
      />
    </Table>
   </List>
   {children}
   </div>
  )
}