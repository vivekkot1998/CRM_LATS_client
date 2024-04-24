//import { AuthPage } from "@refinedev/antd";
 import { authCredentials } from "../../providers";
import { AuthPage } from "../../components/auth";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: authCredentials,
      }}
    />
  );
};


// import { Form, Input, Button, Card, Checkbox } from 'antd'; // Importing components from Ant Design
// import { UserOutlined, LockOutlined } from '@ant-design/icons'; // Importing icons

// export const Login: React.FC = () => {
//   const [form] = Form.useForm();

//   const onFinish = (values: any) => {
//     console.log('Received values:', values);
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
//       <Card style={{ width: 400 }}>
//         <h1 style={{ color: 'rgb(64, 150, 255)', textAlign: 'center' }}>CRM Tool</h1>
//         <Form
//           form={form}
//           onFinish={onFinish}
//           initialValues={{ remember: false }}
//           requiredMark={false}
//           labelAlign="left"
//           layout="vertical"
//           size="large"
//         >
//           <Form.Item
//             name="userId"
//             label="User ID"
//             rules={[{ required: true, message: 'Please enter your user ID!' }]}
//           >
//             <Input prefix={<UserOutlined />} placeholder="User ID" />
//           </Form.Item>
//           <Form.Item
//             name="password"
//             label="Password"
//             rules={[{ required: true, message: 'Please enter your password!' }]}
//           >
//             <Input.Password prefix={<LockOutlined />} placeholder="Password" />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" block>
//               Sign In
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// };
