/* eslint-disable @typescript-eslint/ban-types */
import React, { CSSProperties, PropsWithChildren } from "react";
import {
  //LoginPageProps,
  //LoginFormTypes,
  useLink,
  useRouterType,
  useActiveAuthProvider,
} from "@refinedev/core";

import {
  Row,
  Col,
  Layout,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
  CardProps,
  LayoutProps,
  Divider,
  FormProps,
  theme,
  Space,
} from "antd";
import { useLogin, useTranslate, useRouterContext } from "@refinedev/core";

const layoutStyles: CSSProperties = {};

const containerStyles: CSSProperties = {
  maxWidth: "400px",
  margin: "auto",
  padding: "32px",
  boxShadow:
    "0px 2px 4px rgba(0, 0, 0, 0.02), 0px 1px 6px -1px rgba(0, 0, 0, 0.02), 0px 1px 2px rgba(0, 0, 0, 0.03)",
};

const headStyles: CSSProperties = {
  borderBottom: 0,
  padding: 0,
};

const bodyStyles: CSSProperties = { padding: 0, marginTop: "32px" };

const titleStyles: CSSProperties = {
  textAlign: "center",
  marginBottom: 0,
  fontSize: "24px",
  lineHeight: "32px",
  fontWeight: 700,
  overflowWrap: "break-word",
  hyphens: "manual",
  textOverflow: "unset",
  whiteSpace: "pre-wrap",
};

type TitleProps = {
  collapsed: boolean;
};

type RefineLayoutTitleProps = TitleProps;

type RefineLayoutThemedTitleProps = RefineLayoutTitleProps & {
  icon?: React.ReactNode;
  text?: React.ReactNode;
  wrapperStyles?: React.CSSProperties;
};

const defaultText = "CRM Tool";

const defaultIcon = (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    data-testid="refine-logo"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.7889 0.422291C12.6627 -0.140764 11.3373 -0.140764 10.2111 0.422291L2.21115 4.42229C0.85601 5.09986 0 6.48491 0 8V16C0 17.5151 0.85601 18.9001 2.21115 19.5777L10.2111 23.5777C11.3373 24.1408 12.6627 24.1408 13.7889 23.5777L21.7889 19.5777C23.144 18.9001 24 17.5151 24 16V8C24 6.48491 23.144 5.09986 21.7889 4.42229L13.7889 0.422291ZM8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8V16C16 18.2091 14.2091 20 12 20C9.79086 20 8 18.2091 8 16V8Z"
      fill="currentColor"
    />
    <path
      d="M14 8C14 9.10457 13.1046 10 12 10C10.8954 10 10 9.10457 10 8C10 6.89543 10.8954 6 12 6C13.1046 6 14 6.89543 14 8Z"
      fill="currentColor"
    />
  </svg>
);

const ThemedTitleV2: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
  icon = defaultIcon,
  text = defaultText,
  wrapperStyles,
}) => {
  const { token } = theme.useToken();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  return (
    <ActiveLink
      to="/"
      style={{
        display: "inline-block",
        textDecoration: "none",
      }}
    >
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "inherit",
          ...wrapperStyles,
        }}
      >
        <div
          style={{
            height: "24px",
            width: "24px",
            color: token.colorPrimary,
          }}
        >
          {icon}
        </div>

        {!collapsed && (
          <Typography.Title
            style={{
              fontSize: "inherit",
              marginBottom: 0,
              fontWeight: 700,
            }}
          >
            {text}
          </Typography.Title>
        )}
      </Space>
    </ActiveLink>
  );
};

type OAuthProvider = {
  name: string;
  icon?: React.ReactNode;
  label?: string;
};
interface LoginFormTypes {
  email?: string;
  password?: string;
  remember?: boolean;
  providerName?: string;
  redirectPath?: string;
  userId?: string;
}
type AuthPageProps<
  TWrapperProps extends {} = Record<keyof any, unknown>,
  TContentProps extends {} = Record<keyof any, unknown>,
  TFormProps extends {} = Record<keyof any, unknown>,
>  = (
  | PropsWithChildren<{
      /**
       * @description The type of the auth page.
       * @default "login"
       * @optional
       */
      type?: "login";
      /**
       * @description Providers array for login with third party auth services.
       * @type [OAuthProvider](/docs/api-reference/core/components/auth-page/#interface)
       * @optional
       */
      providers?: OAuthProvider[];
      hideForm?: boolean;
    }>
)& {
  /**
   * @description The props that will be passed to the wrapper component.
   * @optional
   */
  wrapperProps?: TWrapperProps;
  /**
   * @description The props that will be passed to the content component.
   * @optional
   */
  contentProps?: TContentProps;
  /**
   * @description This method gives you the ability to render a custom content node.
   * @optional
   */
  renderContent?: (
    content: React.ReactNode,
    title: React.ReactNode,
  ) => React.ReactNode;
  /**
   * @description Can be used to pass additional properties for the `Form`
   * @optional
   */
  formProps?: TFormProps;
  /**
   * @description Can be used to pass `Title`
   * @optional
   *  */
  title?: React.ReactNode;
};

type LoginPageProps<
  TWrapperProps extends {} = Record<keyof any, unknown>,
  TContentProps extends {} = Record<keyof any, unknown>,
  TFormProps extends {} = Record<keyof any, unknown>,
> = PropsWithChildren<{
  providers?: OAuthProvider[];
  registerLink?: React.ReactNode;
  forgotPasswordLink?: React.ReactNode;
  rememberMe?: React.ReactNode;
  wrapperProps?: TWrapperProps;
  renderContent?: (
    content: React.ReactNode,
    title: React.ReactNode,
  ) => React.ReactNode;
  contentProps?: TContentProps;
  formProps?: TFormProps;
  title?: React.ReactNode;
  hideForm?: boolean;
}>;

type LoginProps = LoginPageProps<LayoutProps, CardProps, FormProps>;

export const LoginForm: React.FC<LoginProps> = ({
  providers,
  // registerLink,
  // forgotPasswordLink,
  // rememberMe,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  title,
  hideForm,
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm<LoginFormTypes>();
  const translate = useTranslate();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const authProvider = useActiveAuthProvider();
  const { mutate: login, isLoading } = useLogin<LoginFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const PageTitle =
    title === false ? null : (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "32px",
          fontSize: "20px",
        }}
      >
        {title ?? <ThemedTitleV2 collapsed={false} />}
      </div>
    );

  const CardTitle = (
    <Typography.Title
      level={3}
      style={{
        color: token.colorPrimaryTextHover,
        ...titleStyles,
      }}
    >
      {translate("pages.login.title", "Sign in to your account")}
    </Typography.Title>
  );

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          {providers.map((provider) => {
            return (
              <Button
                key={provider.name}
                type="default"
                block
                icon={provider.icon}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: "8px",
                }}
                onClick={() =>
                  login({
                    providerName: provider.name,
                  })
                }
              >
                {provider.label}
              </Button>
            );
          })}
          {!hideForm && (
            <Divider>
              <Typography.Text
                style={{
                  color: token.colorTextLabel,
                }}
              >
                {translate("pages.login.divider", "or")}
              </Typography.Text>
            </Divider>
          )}
        </>
      );
    }
    return null;
  };

  const CardContent = (
    <Card
      title={CardTitle}
      headStyle={headStyles}
      bodyStyle={bodyStyles}
      style={{
        ...containerStyles,
        backgroundColor: token.colorBgElevated,
      }}
      {...(contentProps ?? {})}
    >
      {renderProviders()}
      {!hideForm && (
        <Form<LoginFormTypes>
          layout="vertical"
          form={form}
          onFinish={(values) => login(values)}
          requiredMark={false}
          initialValues={{
            remember: false,
          }}
          {...formProps}
        >
          <Form.Item
            name="id"
            //label={translate("pages.login.fields.userId", "User ID")}
            label="User ID"
            rules={[
              { required: true },
              {
                //type: "email",
                type:"string",
                
              },
            ]}
          >
            <Input
              size="large"
              //placeholder={translate("pages.login.fields.email", "UserId")}
              placeholder="user ID"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={translate("pages.login.fields.password", "Password")}
            rules={[{ required: true }]}
          >
            <Input
              type="password"
              autoComplete="current-password"
              placeholder="●●●●●●●●"
              size="large"
            />
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
           >
          </div>
          {!hideForm && (
            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={isLoading}
                block
              >
                {translate("pages.login.signin", "Sign in")}
              </Button>
            </Form.Item>
          )}
        </Form>
      )}
    </Card>
  );

  return (
    <Layout style={layoutStyles} {...(wrapperProps ?? {})}>
      <Row
        justify="center"
        align={hideForm ? "top" : "middle"}
        style={{
          padding: "16px 0",
          minHeight: "100dvh",
          paddingTop: hideForm ? "15dvh" : "16px",
        }}
      >
        <Col xs={22}>
          {renderContent ? (
            renderContent(CardContent, PageTitle)
          ) : (
            <>
              {PageTitle}
              {CardContent}
            </>
          )}
        </Col>
      </Row>
    </Layout>
  );
};