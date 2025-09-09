import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { menuItems } from "../common/MenuItems";
import Common from "../common/Common";

const { Header, Content, Sider } = Layout;

const AdminLayout = () => {
  const { navigate, isLayoutCollapsed, LogoutModal } = Common();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(isLayoutCollapsed || false);
  const [selectedMenu, setSelectedMenu] = useState(location.pathname);

  useEffect(() => {
    setCollapsed(isLayoutCollapsed);
  }, [isLayoutCollapsed]);

  useEffect(() => {
    setSelectedMenu(location.pathname);
  }, [location.pathname]);

  const handleMenuClick = (e) => {
    if (e.key === "/logout") {
      LogoutModal();
    } else {
      setSelectedMenu(e.key);
      navigate(e.key);
    }
  };

  const handleCollapse = (value) => {
    setCollapsed(value);
    // dispatch(layoutCollapsed(value));
  };

  return (
    <Layout className="adminLayout_main">
      <Header className="adminLayout_header">
        <div className="demo-logo">
          <img  alt="Logo" />{" "}
        </div>
      </Header>

      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={handleCollapse}
          className="adminLayout_sider"
        >
          <Menu
            mode="inline"
            className="adminLayout_menu"
            selectedKeys={[selectedMenu]}
            items={menuItems}
            onClick={handleMenuClick}
          />
        </Sider>

        <Content>
          <div
            className="adminLayout_content"
            style={{
              background: "#fff",
              padding: "24px",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
