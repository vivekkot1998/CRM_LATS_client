import { DashboardOutlined, ProjectOutlined, ShopOutlined } from "@ant-design/icons";
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
            label: 'Clients',
            icon: <ShopOutlined />
        }
        
     },
    {
        name: 'tasks',
        list: '/tasks',
        show: '/tasks/new',
        create: '/tasks/edit/:id',
        edit: '/tasks/edit/:id',
        meta: {
            label: 'Tasks',
            icon: <ProjectOutlined />
        }
        
    }
]
