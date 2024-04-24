import { ClientList } from './list'
import { Form, Input, Modal, Select } from 'antd'
import { useModalForm, useSelect } from '@refinedev/antd'
import { useGo } from '@refinedev/core'
import { CREATE_COMPANY_MUTATION } from '@/graphql/mutation'
import { USERS_SELECT_QUERY } from '@/graphql/queries'
import SelectOptionWithAvatar from '@/components/select-option-with-avatar'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { UsersSelectQuery } from '@/graphql/types'


const Create = () => {

    const go = useGo(); //refine uses for navigation

    const goToListPage = () => {
        go({
            to: { resource: 'clients', action: 'list' },
            options: {keepQuery: true},
            type: 'replace', 
        })
    }

    const { formProps, modalProps } = useModalForm({
        action: 'create',
        defaultVisible: true, //show
        resource: 'companies',
        redirect: false, //alredy there
        mutationMode: 'pessimistic', //redirection and the ui update are executed only after mutation is success
        onMutationSuccess: goToListPage,
        meta: {
            gqlMutation: CREATE_COMPANY_MUTATION
        }
    })

    const { selectProps, queryResult } = useSelect<GetFieldsFromList<UsersSelectQuery>>({
        resource: 'users',
        optionLabel: 'name',
        meta: {
            gqlQuery: USERS_SELECT_QUERY
        }
    })
    // console.log(selectProps);
    // console.log(formProps);

    
  return (
    <ClientList>
        <Modal
            {...modalProps}
            mask={true} //semi-green background
            onCancel={goToListPage}
            title="Create Client"
            width={512}
        >
            <Form
                {...formProps} layout='vertical'
            >
                <Form.Item
                    label="Client name"
                    name="name"
                    rules={[{required: true}]}
                ><Input placeholder="Please enter the client name" /></Form.Item>
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
    </ClientList>
  )
}

export default Create