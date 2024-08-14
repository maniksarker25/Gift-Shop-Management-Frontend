import { Button, Layout, Menu, MenuProps } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  TUser,
  logout,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const { Header, Content, Sider } = Layout;

const sellerItems: MenuProps["items"] = [
  {
    key: "1",
    label: <NavLink to={"/"}>Overview</NavLink>,
  },
  {
    key: "2",
    label: <NavLink to={"/gift-inventory"}>Gift Inventory</NavLink>,
  },
  {
    key: "3",
    label: <NavLink to={"sale-history"}>Sale History</NavLink>,
  },
];
const managerItems: MenuProps["items"] = [
  {
    key: "1",
    label: <NavLink to={"/"}>Overview</NavLink>,
  },
  {
    key: "2",
    label: <NavLink to={"/gift-inventory"}>Gift Inventory</NavLink>,
  },
  {
    key: "3",
    label: <NavLink to={"add-gift"}>Add Gift</NavLink>,
  },
  {
    key: "4",
    label: <NavLink to={"sale-history"}>Sale History</NavLink>,
  },
  {
    key: "5",
    label: <NavLink to={"coupon"}>Coupon</NavLink>,
  },
];
const MainLayout = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }
  return (
    <Layout style={{ height: "100%", minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ zIndex: "5" }}
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div
          style={{
            color: "white",
            textAlign: "center",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>
            <h1> Gift Management</h1>
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={
            (user as TUser)?.role === "seller" ? sellerItems : managerItems
          }
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              justifyItems: "center",
              marginTop: "15px",
              marginRight: "5px",
            }}
          >
            <Button
              style={{ backgroundColor: "red", color: "white" }}
              onClick={() => dispatch(logout())}
            >
              Logout
            </Button>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
