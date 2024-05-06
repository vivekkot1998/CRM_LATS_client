import CustomAvatar from '@/components/custom-avatar';
import SelectOptionWithAvatar from '@/components/select-option-with-avatar';
import { UPDATE_COMPANY_MUTATION } from '@/graphql/mutation';
import { USERS_SELECT_QUERY } from '@/graphql/queries';
import { UsersSelectQuery } from '@/graphql/types';
import { getNameInitials } from '@/utilities';
import { Edit, SaveButton, Title, useForm, useSelect } from '@refinedev/antd'
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { Button, Checkbox, Col, DatePicker, Form, Input, Modal, Radio, Row, Select, TimePicker } from 'antd'
import React, { useState } from 'react'
import { CompanyDealsTable, CompanyNotes } from './components';
import Icon from '@ant-design/icons/lib/components/Icon';
import { ArrowLeftOutlined, ArrowRightOutlined, ContainerOutlined } from '@ant-design/icons';
import { useGo } from '@refinedev/core';
import InvoiceModal from './invoice';

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
    const [showFirstForm, setShowFirstForm] = useState(true);
    
    const handleContinue = () => {
        setShowFirstForm(false);
      };
    
      const handlePrevious = () => {
        setShowFirstForm(true);
      };

      const [selectedDisposition, setSelectedDisposition] = useState(null);

    const handleDispositionChange = (e) => {
        setSelectedDisposition(e.target.value);
    };

    const go = useGo();

    const [isInvoiceModalVisible, setIsInvoiceModalVisible] = useState(false);

  const showInvoiceModal = () => {
    setIsInvoiceModalVisible(true);
  };

  const handleInvoiceModalClose = () => {
    setIsInvoiceModalVisible(false);
  };
      

    
  return (
    <div>
        <Row gutter={[32, 32]}>
            <Col xs={24} xl={14}>
                <Edit 
                isLoading={formLoading}
                saveButtonProps={saveButtonProps}
                breadcrumb={false}
                footerButtons={
                    <>
                    {showFirstForm && (
                        <Button type="default" onClick={handleContinue}>
                        Continue<ArrowRightOutlined />
                    </Button>
                    )}
                    {!showFirstForm && (
                        <Button type="default" onClick={handlePrevious}>
                        <ArrowLeftOutlined />Previous
                    </Button>
                    )}
                    <SaveButton/>
                    </>
                }
                >
                    {showFirstForm && (
                        <Form
                        {...formProps} layout='vertical'
                    >
                        <CustomAvatar shape='square' src={avatarUrl} name={getNameInitials(name || '')} style={{width: 96, height: 96, marginBottom: '24px' }}/>
                        <Form.Item label="Customer" name="name" rules={[{required: true}]}>
                                <Input placeholder='name' />       
                                </Form.Item>
                        
                        <Row>
                            <Col xl={12}>
                                <Form.Item label="Agent" name="salesOwnerId" initialValue={formProps?.initialValues?.salesOwner?.name} rules={[{required: true}]}>
                                <Input placeholder='name'  readOnly/>
                                </Form.Item>    
                            </Col>
                            <Col xl={12}>
                                <Form.Item label="Pseudo Name" rules={[{required: true}]} >
                                <Input placeholder='pseudo name' /> 
                                </Form.Item>        
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={8}>
                                <Form.Item label="Address" name="address" rules={[{required: true}]}>
                                <Input placeholder='Address'  />       
                                </Form.Item>
                            </Col>
                            <Col xl={8}>
                                <Form.Item label="Address1" name="address1" rules={[{required: true}]}>
                                <Input placeholder='Address'  />       
                                </Form.Item>
                            </Col>
                            <Col xl={8}>
                                <Form.Item label="Address2" name="address2" rules={[{required: true}]}>
                                <Input placeholder='Address'  />       
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row> 
                            <Col xl={8}>
                                <Form.Item label="City" name="city" rules={[{required: true}]}>
                                <Input placeholder='City'  />       
                                </Form.Item>
                            </Col>
                            <Col xl={8}>
                                <Form.Item label="Country" name="country" rules={[{required: true}]}>
                                <Input placeholder='Country'  />       
                                </Form.Item>
                            </Col>
                            <Col xl={8}>
                                <Form.Item label="Postcode" name="postcode" rules={[{required: true}]}>
                                <Input placeholder='Postcode'  />       
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={12}>
                                <Form.Item label="Phone Number" name="phoneNumber" rules={[{required: true}]}>
                                <Input placeholder='Phone Number'  />       
                                </Form.Item>
                            </Col>
                            <Col xl={12}>
                                <Form.Item label="Email">
                                <Input placeholder='Email'  />       
                                </Form.Item>
                            </Col>
                        </Row>
                        {/* <Row justify="end">
                            <Button type="default" onClick={handleContinue}>
                                Continue<ArrowRightOutlined />  
                            </Button>
                        </Row> */}
                    </Form>
                    )}

                    {!showFirstForm && (
                        <><Form
                              {...formProps} layout='vertical'
                          >
                              <CustomAvatar shape='square' src={avatarUrl} name={getNameInitials(name || '')} style={{ width: 96, height: 96, marginBottom: '24px' }} />
                              <Form.Item label="Customer" name="name" rules={[{ required: true }]}>
                                  <Input placeholder='name' readOnly />
                              </Form.Item>

                              <Row>
                                  <Col xl={24}>
                                      <Form.Item label="Select Disposition " required>
                                          <Radio.Group
                                              style={{ display: 'flex', justifyContent: 'space-between' }}
                                              onChange={handleDispositionChange}
                                              value={selectedDisposition}>
                                              <Radio value="sale">Sale</Radio>
                                              <Radio value="followUp">Follow-up</Radio>
                                              <Radio value="callBack">Call-back</Radio>
                                              <Radio value="notInterested">Not Interested</Radio>
                                          </Radio.Group>
                                      </Form.Item>
                                  </Col>
                              </Row>
                              {selectedDisposition === "sale" && (
                                <>
                                <Row>
                                    <Col xl={24}>
                                    <h3>Payment Details</h3><hr/>
                                    </Col>
                                </Row>
                                <Row>
                                      <Col xl={12}>
                                          <Form.Item label="Card Number" required>
                                              <Input placeholder='XXXX-XXXX-XXXX-XXXX' />
                                          </Form.Item>
                                          <Form.Item label="Name On The Card" required>
                                              <Input placeholder='Name' />
                                          </Form.Item>
                                      </Col>
                                      <Col xl={3}>
                                          <Form.Item label="CVV" required>
                                              <Input placeholder='123' />
                                          </Form.Item>
                                          <Form.Item label="Expiry" required>
                                              <Input placeholder='MM/YYYY' />
                                          </Form.Item>
                                      </Col>
                                      <Col xl={9}>
                                          <Form.Item label="Select Company" required>
                                              <Select>
                                                  <Option value="CompanyA">Company A</Option>
                                                  <Option value="CompanyB">Company B</Option>
                                                  <Option value="CompanyC">Company C</Option>
                                              </Select>
                                          </Form.Item>
                                          <Form.Item label="  " style={{display:'flex', justifyContent:'center' }}>
                                            <Button onClick={showInvoiceModal}>
                                                <ContainerOutlined/>Generate Invoice
                                            </Button>
                                            <InvoiceModal isVisible={isInvoiceModalVisible} onClose={handleInvoiceModalClose} />
                                          </Form.Item>
                                      </Col>
                                  </Row></>

                              )}
                              {selectedDisposition === "followUp" && (
                                <><Row>
                                      <Col xl={24}>
                                          <h3>Follow up</h3><hr />
                                      </Col>
                                  </Row>
                                  <Col xl={24}>
                                          <Form.Item
                                              label="Date & Time"
                                              //name="closeDate"
                                              rules={[{ required: true }]}
                                          >
                                              <DatePicker />
                                              <TimePicker />
                                          </Form.Item>
                                      </Col></>
                              )}
                              {selectedDisposition === "callBack" && (
                                <><Row>
                                      <Col xl={24}>
                                          <h3>Call-back</h3><hr />
                                      </Col>
                                  </Row>
                                  <Col xl={24}>
                                          <Form.Item
                                              label="Date & Time"
                                              //name="closeDate"
                                              rules={[{ required: true }]}
                                          >
                                              <DatePicker />
                                              <TimePicker />
                                          </Form.Item>
                                      </Col></>
                              )}
                              {selectedDisposition === "notInterested" && (
                                  <Col xl={24}>
                                       <Form.Item label="Reason:" rules={[{ required: true }]}>
                                            <Input.TextArea rows={6} />
                                        </Form.Item>
                                  </Col>
                              )}
                                {/* <Row justify="end">
                                  <Button type="default" onClick={handlePrevious}>
                                      <ArrowLeftOutlined />Previous
                                  </Button></Row> */}
                              </Form></>
                    )}
                </Edit>
                <CompanyDealsTable
            style={{
              marginTop: 32,
            }}
          />
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