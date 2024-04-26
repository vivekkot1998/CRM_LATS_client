import CustomAvatar from '@/components/custom-avatar';
import SelectOptionWithAvatar from '@/components/select-option-with-avatar';
import { UPDATE_COMPANY_MUTATION } from '@/graphql/mutation';
import { USERS_SELECT_QUERY } from '@/graphql/queries';
import { UsersSelectQuery } from '@/graphql/types';
import { getNameInitials } from '@/utilities';
import { Edit, useForm, useSelect } from '@refinedev/antd'
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { Col, Form, Input, Row, Select } from 'antd'
import React from 'react'
import { CompanyNotes } from './components';

const EditPage = () => {

    const { saveButtonProps, formProps, formLoading, queryResult } = useForm({
        redirect: false,
        meta: {
            gqlMutation: UPDATE_COMPANY_MUTATION
        }
    });

    //console.log(queryResult);

    const { avatarUrl, name } = queryResult?.data?.data || {}

    //console.log(name);
    
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

    //console.log(queryResultUsers.data);
    //console.log(selectProps);
    
  return (
    <div>
        <Row gutter={[32, 32]}>
            <Col xs={24} xl={14}>
                <Edit 
                isLoading={formLoading}
                saveButtonProps={saveButtonProps}
                breadcrumb={false}
                >

                    <Form
                        {...formProps} layout='vertical'
                    >
                        <CustomAvatar shape='square' src={avatarUrl} name={getNameInitials(name || '')} style={{width: 96, height: 96, marginBottom: '24px' }}/>
                        <Form.Item label="Client" name="name">
                                <Input placeholder='name'  />       
                                </Form.Item>
                        <Form.Item
                            label="Agent Name"
                            name="salesOwnerId"
                            initialValue={formProps?.initialValues?.salesOwner?.id}
                        >
                        <Select 
                            placeholder="Please select a sales owner"
                            {...selectProps}
                            options={
                                queryResultUsers.data?.data.map((user) => ({
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
                        </Form.Item>
                        <Row>
                            <Col>
                                <Form.Item label="Address" name="address">
                                <Input placeholder='Address'  />       
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item label="Address1" name="address1">
                                <Input placeholder='Address'  />       
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item label="Address2" name="address2">
                                <Input placeholder='Address'  />       
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row> 
                            <Col>
                                <Form.Item label="City" name="city">
                                <Input placeholder='City'  />       
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item label="Country" name="country">
                                <Input placeholder='Country'  />       
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item label="Postcode" name="postcode">
                                <Input placeholder='Postcode'  />       
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="Phone Number" name="phoneNumber">
                            <Input placeholder='Phone Number'  />       
                        </Form.Item>
                    </Form>
                </Edit>

            </Col>
            <Col xs={24} xl={10}>
                <CompanyNotes
                    style={{
                    marginTop: 32,
                    }}
                />
            </Col>
        </Row>
    </div>
    
  )
}

export default EditPage