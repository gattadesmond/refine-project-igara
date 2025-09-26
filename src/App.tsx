import {
  Refine,
  GitHubBanner,
  Authenticated,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  useNotificationProvider,
  ThemedLayout,
  ThemedSider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { dataProvider, liveProvider } from "@refinedev/supabase";
import { App as AntdApp } from "antd";
import { BrowserRouter, Route, Routes, Outlet } from "react-router";
import routerProvider, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import {
  BlogPostList,
  BlogPostCreate,
  BlogPostEdit,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryList,
  CategoryCreate,
  CategoryEdit,
  CategoryShow,
} from "./pages/categories";
import {
  GarageMainServicesEdit,
  GarageMainServicesCreate,
  GarageMainServicesList,
  GarageMainServicesShow,
} from "./pages/garage_main_services";
import {
  GaragesList,
  GaragesCreate,
  GaragesEdit,
  GaragesShow,
} from "./pages/garages";
import {
  GarageAmenitiesList,
  GarageAmenitiesCreate,
  GarageAmenitiesEdit,
  GarageAmenitiesShow,
} from "./pages/garage_amenities";
import { AppIcon } from "./components/app-icon";
import { supabaseClient } from "./utility";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Header } from "./components/header";
import authProvider from "./authProvider";
import { TestTailwind } from "./pages/test-tailwind";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider(supabaseClient)}
                liveProvider={liveProvider(supabaseClient)}
                authProvider={authProvider}
                routerProvider={routerProvider}
                notificationProvider={useNotificationProvider}
                resources={[ {
                  name: "garage_main_services",
                  list: "/garage_main_services",
                  create: "/garage_main_services/create",
                  edit: "/garage_main_services/edit/:id",
                  show: "/garage_main_services/show/:id",
                  meta: {
                    canDelete: true,
                  },
                }, {
                  name: "garages",
                  list: "/garages",
                  create: "/garages/create",
                  edit: "/garages/edit/:id",
                  show: "/garages/show/:id"
                }, {
                  name: "garage_amenities",
                  list: "/garage_amenities",
                  create: "/garage_amenities/create",
                  edit: "/garage_amenities/edit/:id",
                  show: "/garage_amenities/show/:id"
                }]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: "74xzPC-NH2uih-JzeDqs",
                  title: { text: "iGara Project", icon: <AppIcon /> },
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayout
                          Header={Header}
                          Sider={(props) => <ThemedSider {...props} fixed />}
                        >
                          <Outlet />
                        </ThemedLayout>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="blog_posts" />}
                    />
                  
                    <Route path="/garage_main_services">
                      <Route index element={<GarageMainServicesList />} />
                      <Route path="create" element={<GarageMainServicesCreate />} />
                      <Route path="edit/:id" element={<GarageMainServicesEdit />} />
                      <Route path="show/:id" element={<GarageMainServicesShow />} />
                    </Route>
                    <Route path="/garage_amenities">
                      <Route index element={<GarageAmenitiesList />} />
                      <Route path="create" element={<GarageAmenitiesCreate />} />
                      <Route path="edit/:id" element={<GarageAmenitiesEdit />} />
                      <Route path="show/:id" element={<GarageAmenitiesShow />} />
                    </Route>
                    <Route path="/garages">
                      <Route index element={<GaragesList />} />
                      <Route path="create" element={<GaragesCreate />} />
                      <Route path="edit/:id" element={<GaragesEdit />} />
                      <Route path="show/:id" element={<GaragesShow />} />
                    </Route>
                    <Route path="/test-tailwind" element={<TestTailwind />} />
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route
                      path="/login"
                      element={
                        <AuthPage
                          type="login"
                          formProps={{
                            initialValues: {
                              email: "webplatform085@gmail.com",
                              password: "webplatform085@gmail.com",
                            },
                          }}
                        />
                      }
                    />
                    <Route
                      path="/register"
                      element={<AuthPage type="register" />}
                    />
                    <Route
                      path="/forgot-password"
                      element={<AuthPage type="forgotPassword" />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
