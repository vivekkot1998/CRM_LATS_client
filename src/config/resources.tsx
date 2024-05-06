import { ContainerOutlined, DashboardOutlined, ProjectOutlined, ShopOutlined } from "@ant-design/icons";
import { IResourceItem } from "@refinedev/core";

export const resources: IResourceItem[] = [
    {
        name: 'dashboard',
        list: '/',
        meta: {
            label: 'Dashboard',
            icon: <DashboardOutlined />
        }
    },
    {
        // name: 'clients',
        // list: '/clients',
        // show: '/clients/:id',
        // create: '/clients/new',
        // edit: '/clients/edit/:id',
        name: 'companies',
        list: '/companies',
        show: '/companies/:id',
        create: '/companies/new',
        edit: '/companies/edit/:id',
        meta: {
            label: 'Customers',
            icon: <ShopOutlined />
        }
        
     },
     {
        name: "scrumboard",
        meta: {
          label: "Scrumboard",
          icon: <ProjectOutlined />,
        },
      },
      {
        name: "deals",
        list: "/scrumboard/sales",
        create: "/scrumboard/sales/create",
        edit: "/scrumboard/sales/edit/:id",
        meta: {
          label: "Sales Pipeline",
          parent: "scrumboard",
        },
      },
      {
        name: "deals",
        identifier: "finalize-deals",
        edit: "/scrumboard/sales/:id/finalize",
        meta: {
          hide: true,
        },
      },
      {
        name: "dealStages",
        create: "/scrumboard/sales/stages/create",
        edit: "/scrumboard/sales/stages/edit/:id",
        list: "/scrumboard/sales",
        meta: {
          hide: true,
        },
      },
]
