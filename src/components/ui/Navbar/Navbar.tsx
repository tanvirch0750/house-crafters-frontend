/* eslint-disable @next/next/no-img-element */

'use client';
import { authKey } from '@/constants/global';
import { useNotificationsQuery } from '@/redux/api/notificationApi';
import { useProfileQuery } from '@/redux/api/profileApi';
import { useAppDispatch } from '@/redux/hooks';
import { showSidebarDrawer } from '@/redux/slices/sidebarSlice';
import {
  getUserInfo,
  isLoggedIn,
  removeUserInfo,
} from '@/services/auth.service';
import {
  MenuOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Badge,
  Button,
  Drawer,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Space,
  Typography,
} from 'antd';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const { Header, Content } = Layout;
const { Title } = Typography;

const Navbar = ({
  items: navItems,
  hasSider,
}: {
  items: { key: string; label: string; href: string }[];
  hasSider?: boolean;
  session?: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { role } = getUserInfo() as any;
  // @ts-ignore
  const { data } = useProfileQuery();
  const profileData = data?.profileData;

  const { data: notificationsData, isLoading } = useNotificationsQuery({});
  const notifications = notificationsData?.notifications;
  const notificatiosLength = notifications?.filter(
    // @ts-ignore
    (noti) => noti?.readStatus === false
  )?.length;

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isUserLoggedIn = isLoggedIn();

  const logOut = () => {
    removeUserInfo(authKey);
    router.push('/signin');
  };

  const items: MenuProps['items'] = [
    {
      key: '0',
      label: (
        <Button
          type="primary"
          size="large"
          onClick={() => {
            router.push('/dashboard');
          }}
          className=" bg-teal-700 px-6 w-ful"
        >
          Dashboard
        </Button>
      ),
    },
    {
      key: '1',
      label: (
        <Button
          type="primary"
          size="large"
          onClick={() => {
            router.push('/my-profile');
          }}
          className=" bg-teal-700 px-6 w-full"
        >
          My Profile
        </Button>
      ),
    },
    {
      key: '2',
      label: (
        <Button
          size="large"
          type="primary"
          className=" bg-hcOrange-base w-full px-6"
          onClick={logOut}
        >
          Sign Out
        </Button>
      ),
    },
  ];

  return (
    <Layout className="layout">
      <Header className="flex items-center px-3 lg:px-12 bg-teal-50 lg:h-20">
        {/* Sider nav button for mobile device start */}
        {hasSider && (
          <Button
            type="primary"
            className="lg:hidden bg-hcOrange-base"
            onClick={() => {
              dispatch(showSidebarDrawer());
            }}
          >
            Dashboard
          </Button>
        )}
        {/* Sider nav button for mobile device end */}

        {/* Logo or site header start */}
        <Content>
          <Link href="/">
            <Title
              className={`m-0 text-teal-700 text-lg lg:text-2xl font-bold ${
                hasSider &&
                'text-center text-hcGreen-base text-lg lg:text-2xl lg:text-left'
              }`}
            >
              House<span className=" text-hcOrange-base">Crafters</span>
            </Title>
          </Link>
        </Content>
        {/* Logo or site header start */}

        {/* Desktop menubar start */}
        <Menu
          className="lg:flex lg:items-center hidden bg-teal-50 text-teal-700 font-bold text-base"
          disabledOverflow
          theme="dark"
          mode="horizontal"
          selectedKeys={[pathname]}
        >
          {navItems?.map((item) => (
            <Menu.Item key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </Menu.Item>
          ))}
          {isUserLoggedIn ? (
            <>
              {role === 'customer' && (
                <>
                  <Menu.Item key="/feedback">
                    <Link href="/feedback">Feedback & Faq</Link>
                  </Menu.Item>
                  <Link href="/my-messages">
                    <Badge count={notificatiosLength}>
                      <Avatar
                        size="large"
                        className=" bg-teal-700"
                        icon={
                          <NotificationOutlined style={{ color: 'white' }} />
                        }
                      />
                    </Badge>
                  </Link>

                  <Dropdown menu={{ items }} className="ml-6">
                    <a>
                      <Space wrap size={20} className="">
                        {profileData ? (
                          <img
                            src={profileData?.profileImageUrl}
                            alt="avatar image"
                            width={50}
                            height={50}
                            className=" rounded-full border-2 border-teal-700"
                          />
                        ) : (
                          <Avatar
                            size="large"
                            className=" bg-teal-700 w-[50px] h-[50px]"
                            icon={<UserOutlined style={{ color: 'white' }} />}
                          />
                        )}
                      </Space>
                    </a>
                  </Dropdown>
                </>
              )}
              {role === 'admin' && (
                <>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => {
                      router.push('/admin/dashboard');
                    }}
                    className="ml-6 bg-teal-700 px-6"
                  >
                    Dashboard
                  </Button>
                  <Button
                    size="large"
                    type="primary"
                    className=" bg-hcOrange-base px-6 ml-6"
                    onClick={logOut}
                  >
                    Sign Out
                  </Button>
                </>
              )}
              {role === 'super_admin' && (
                <>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => {
                      router.push('/super-admin/dashboard');
                    }}
                    className="ml-6 bg-teal-700 px-6"
                  >
                    Dashboard
                  </Button>
                  <Button
                    size="large"
                    type="primary"
                    className=" bg-hcOrange-base px-6 ml-6"
                    onClick={logOut}
                  >
                    Sign Out
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  router.push('/signin');
                }}
                className="ml-6 bg-hcOrange-base px-6"
              >
                Sign In
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  router.push('/register');
                }}
                className=" ml-2 bg-hcOrange-base px-6"
              >
                Register
              </Button>
            </>
          )}
        </Menu>
        {/* Desktop menubar end */}

        {/* Menubar for mobile start */}
        <Button
          type="primary"
          className="lg:hidden bg-hcOrange-base"
          onClick={showDrawer}
        >
          <MenuOutlined style={{ verticalAlign: '0rem' }} />
        </Button>
        <Drawer title="Menu" placement="right" onClose={onClose} open={open}>
          <Menu
            theme="light"
            mode="vertical"
            selectedKeys={[pathname]}
            style={{ borderRight: 0 }}
          >
            {navItems?.map((item) => (
              <Menu.Item key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </Menu.Item>
            ))}
            {isUserLoggedIn ? (
              <Button
                type="primary"
                className=" bg-hcOrange-base px-6"
                onClick={logOut}
              >
                Sign Out
              </Button>
            ) : (
              <div className="mt-6">
                <Button
                  className="bg-hcOrange-base px-6"
                  type="primary"
                  onClick={() => {
                    router.push('/signin');
                  }}
                >
                  Sign In
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    router.push('/register');
                  }}
                  className="ml-2 bg-hcOrange-base px-6"
                >
                  Register
                </Button>
              </div>
            )}
          </Menu>
        </Drawer>
        {/* Menubar for mobile end */}
      </Header>
    </Layout>
  );
};

export default Navbar;
