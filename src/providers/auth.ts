//import { AuthProvider } from "@refinedev/core";
import { AuthBindings } from "@refinedev/core";

// import { User } from "@/graphql/schema.types";

import { API_URL, dataProvider } from "./data";
import { User } from "@/graphql/schema.types";
/**
 * For demo purposes and to make it easier to test the app, you can use the following credentials:
 */
// export const authCredentials = {
//   email: "michael.scott@dundermifflin.com",
//   password: "demodemo",
// };
export const authCredentials = { 
  id: "1234",
  password: "1234"
};

export const authProvider: AuthBindings = {

  // need to set variables for userId and password from backend.
  login: async (params) => {
    console.log(JSON.stringify(params.id));
    //const x = JSON.stringify(params.userId);
    try {
      const { data } = await dataProvider.custom({
        url: API_URL,
        method: "post",
        headers: {},
        meta: {
          variables: { id: params.id , password: params.password },
          rawQuery: `
          mutation Login($id: String!, $password: String!) {
            login(loginInput: {
              id: $id
              password: $password
            }){
              accessToken
              user {
                name
                role
              }
            }
          }
                `,
        },
      });
      
      console.log("access_token", data.login.accessToken)
      localStorage.setItem("access_token", data.login.accessToken);
      return {
        success: true,
        redirectTo: "/",
      };
    } catch (e) {
      const error = e as Error;
      return {
        success: false,
        error: {
          message: "message" in error ? error.message : "Login failed",
          name: "name" in error ? error.name : "Invalid email or password",
        },
      };
    }
  },
  // login: async (params) => {
  //   console.log(params);
  //   try {
  //     const { data } = await dataProvider.custom({
  //       url: API_URL,
  //       method: "post",
  //       headers: {},
  //       meta: {
  //         rawQuery: `
  //         query {
  //           login(
  //               userid: "101",
  //               password: "101"
  //           ){
  //               userId
  //               message
  //               statusCode
  //           }
  //       }
  //               `,
  //       },
  //     });

  //     console.log(data.login.statusCode);
  //     //localStorage.setItem("statusCode", data.login.statusCode);
  //     return {
  //       success: true,
  //       redirectTo: "/",
  //     };
  //   } catch (e) {
  //     const error = e as Error;
  //     return {
  //       success: false,
  //       error: {
  //         message: "message" in error ? error.message : "Login failed",
  //         name: "name" in error ? error.name : "Invalid userId or password",
  //       },
  //     };
  //   }
  // },

  // login: function (params: any): Promise<AuthActionResponse> {
  //   console.log(params);
  //   throw new Error("Function not implemented.");
  // },

  logout: async () => {   //logout is fine
    localStorage.removeItem("access_token");

    return {
      success: true,
      redirectTo: "/login",
    };
  },


  onError: async (error) => {   //did not check
    if (error.statusCode === "UNAUTHENTICATED") {
      return {
        logout: true,
      };
    }

    return { error };
  },
  check: async () => { //not set yet
    try {
      await dataProvider.custom({
        url: API_URL,
        method: "post",
        headers: {},
        meta: {
          rawQuery: `
                    query Me {
                        me {
                          name
                        }
                      }
                `,
        },
      });

      return {
        authenticated: true,
        redirectTo: "/",
      };
    } catch (error) {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }
  },
  // getIdentity: async () => {
  //   const accessToken = localStorage.getItem("access_token");

  //   try {
  //     const { data } = await dataProvider.custom<{ AgentIdentity: any; }>({
  //       url: API_URL,
  //       method: "post",
  //       headers: accessToken
  //         ? {
  //           Authorization: `Bearer ${accessToken}`,
  //         }
  //         : {},
  //       meta: {
  //         rawQuery: `
  //         query {
  //           AgentIdentity{
  //             userId
  //             message
  //             statusCode
  //             name
  //             email
  //             phone
  //             jobTitle
  //             avatarUrl
  //           }
  //         }
  //               `,
  //       },
  //     });

  //     return data.AgentIdentity;
  //   } catch (error) {
  //     return undefined;
  //   }
  // },
  getIdentity: async () => {
    const accessToken = localStorage.getItem("access_token");

    try {
      const { data } = await dataProvider.custom<{  me: User }>({
        url: API_URL,
        method: "post",
        headers: accessToken
          ? {
            Authorization: `Bearer ${accessToken}`,
          }
          : {},
        meta: {
          rawQuery: `
          query Me {
            me {
                id,
                name,
                avatarUrl
            }
          }
        `,
        },
      });

      return data.me;
    } catch (error) {
      return undefined;
    }
  },
 
};