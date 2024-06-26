import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { authProvider, dataProvider, liveProvider } from "./providers";
import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";


import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { createClient } from "graphql-ws";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
// import { ClientList, Home, Login } from "./pages";
import { CompanyList, Home, Login } from "./pages";
import Layout from "./components/layout";
import { resources } from "./config/resources";
// import Create from "./pages/client/create";
// import EditPage from "./pages/client/edit";
import Create from "./pages/company/create";
import EditPage from "./pages/company/edit";
import { SalesPage } from "./pages/scrumboard";
import { SalesCreatePage } from "./pages/scrumboard/create";
import { SalesEditPage } from "./pages/scrumboard/edit";
import { SalesCreateStage } from "./pages/scrumboard/create-stage";
import { SalesFinalizeDeal } from "./pages/scrumboard/finalize-deal";



function App() {
  return (
    <BrowserRouter>
      
      <RefineKbarProvider>
        
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources} //For CRUD and sidebar items
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "RS1SOn-8lDtZY-AevL9Y",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  {/* <Route index element={<Home />} /> */}
                  <Route path="/login" element={<Login />} />
                  {/* <Route
                    element={
                    <Authenticated 
                      key="authenticated-layout"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>

                    </Authenticated>
                    }
                  >
                    <Route index element={<Home />} />
                  </Route> */}
                  <Route 
                    element={
                      <Layout>
                        <Outlet />
                      </Layout>
                    }  
                  >
                    <Route index element={<Home />} />
                    {/* <Route path="/clients">
                        <Route index element={ <ClientList/> }/>
                        <Route path="new" element={ <Create />}/>
                        <Route path="edit/:id" element={ <EditPage />}/>
                    </Route> */}
                     <Route path="/companies">
                        <Route index element={ <CompanyList/> }/>
                        <Route path="new" element={ <Create />}/>
                        <Route path="edit/:id" element={ <EditPage />}/>
                    </Route>
                    <Route path="/scrumboard" element={<Outlet />}>
                      <Route
                        path="sales"
                        element={
                          <SalesPage>
                            <Outlet />
                          </SalesPage>
                        }
                      >
                        <Route
                          path="create"
                          element={
                            <SalesCreatePage>
                              <Outlet />
                            </SalesCreatePage>
                          }
                        >
                          {/* <Route
                            path="company/create"
                            element={<Create isOverModal />}
                          /> */}
                        </Route>
                        <Route path="edit/:id" element={<SalesEditPage />} />
                          {/* <Route
                            path="company/create"
                            element={<CompanyCreatePage isOverModal />}
                          />
                        </Route> */}
                        {/* <Route path="edit/:id" element={<SalesEditPage />} /> */}
                        <Route
                          path="stages/create"
                          element={<SalesCreateStage />}
                        />
                        {/* <Route
                          path="stages/edit/:id"
                          element={<SalesEditStage />}
                        /> */}
                        <Route
                          path=":id/finalize"
                          element={<SalesFinalizeDeal />}
                        />
                      </Route>
                    </Route>
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
