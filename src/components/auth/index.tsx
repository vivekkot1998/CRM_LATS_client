import React from "react";
import { CardProps, FormProps, LayoutProps } from "antd";
import { AuthPageProps } from "@refinedev/core";
import { LoginForm } from "../login/login-form";


export type AuthProps = AuthPageProps<LayoutProps, CardProps, FormProps> & {
  renderContent?: (
    content: React.ReactNode,
    title: React.ReactNode,
  ) => React.ReactNode;
  title?: React.ReactNode;
};

/**
 * **refine** has a default auth page form served on the `/login` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/components/antd-auth-page/} for more details.
 */
export const AuthPage: React.FC<AuthProps> = (props) => {
  const { type } = props;
  const renderView = () => {
    switch (type) {
   
      default:
        return <LoginForm {...props} />;
    }
  };

  return <>{renderView()}</>;
};
