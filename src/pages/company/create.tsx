// import { ClientList } from './list'
import { CompanyList } from './list'
import { Form, Input, Modal, Select } from 'antd'
import { useModalForm, useSelect, useTable } from '@refinedev/antd'
import { HttpError, useGo } from '@refinedev/core'
import { CREATE_COMPANY_MUTATION } from '@/graphql/mutation'
import { COMPANIES_LIST_QUERY, USERS_SELECT_QUERY } from '@/graphql/queries'
import SelectOptionWithAvatar from '@/components/select-option-with-avatar'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { CompaniesListQuery, UsersSelectQuery } from '@/graphql/types'


const Create = () => {

    const go = useGo(); //refine uses for navigation

    const goToListPage = () => {
        go({
            // to: { resource: 'clients', action: 'list' },
            to: { resource: 'companies', action: 'list' },
            options: {keepQuery: true},
            type: 'replace', 
        })
    }

    
    const goToEditPage = () => {
        go({
            to: { resource: 'companies',id: tableProps.dataSource.length+1, action: 'edit' },
            options: {keepQuery: true},
            type: 'replace', 
        })
    }

    const { tableProps, filters } = useTable<
    GetFieldsFromList<CompaniesListQuery>,
    HttpError,
    GetFieldsFromList<CompaniesListQuery>
  >({
      resource: 'companies',
      meta: {
        gqlQuery: COMPANIES_LIST_QUERY
      }
    });
    console.log(tableProps.dataSource);

    const { formProps, modalProps } = useModalForm({
        action: 'create',
        defaultVisible: true, //show
        resource: 'companies',
        redirect: false, //alredy there
        mutationMode: 'pessimistic', //redirection and the ui update are executed only after mutation is success
        // onMutationSuccess: goToListPage,
        onMutationSuccess: goToEditPage,
        meta: {
            gqlMutation: CREATE_COMPANY_MUTATION
        }
    })
    

    


    // const { selectProps, queryResult } = useSelect<GetFieldsFromList<UsersSelectQuery>>({
    //     resource: 'users',
    //     optionLabel: 'name',
    //     meta: {
    //         gqlQuery: USERS_SELECT_QUERY
    //     }
    // })
    // console.log(selectProps);
    // console.log("1",formProps);
    // console.log("2",modalProps);

    
  return (
    // <ClientList>
    <CompanyList>
        <Modal
            {...modalProps}
            mask={true} //semi-green background
            onCancel={goToListPage}
            title="Create Customer"
            width={512}
        >
            <Form
                {...formProps} layout='vertical'
            >
                <Form.Item
                    label="Customer name"
                    name="name"
                    rules={[{required: true}]}
                ><Input placeholder="Please enter the customer name" /></Form.Item>
                {/* <Form.Item
                    label="Agent"
                    name="salesOwnerId"
                    rules={[{required: true}]}
                >
                    <Select 
                        placeholder="Please select an Agent"
                        {...selectProps}
                        options={
                            queryResult.data?.data.map((user) => ({
                                value: user.id,
                                label: (
                                    <SelectOptionWithAvatar
                                        name={user.name}
                                        avatarUrl={user.avatarUrl ?? undefined}
                                    />
                                )
                            })) ?? []
                        }
                    />
                </Form.Item> */}
            </Form>
        </Modal>
    {/* </ClientList> */}
    </CompanyList>
  )
}

export default Create