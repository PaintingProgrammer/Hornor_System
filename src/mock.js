const Mock = require('mockjs')

const Random = Mock.Random

let Result = {
    code : 200,
    msg : '操作成功',
    data: null
}

Mock.mock('/captcha','get', ()=> {
    Result.data = {
        token: Random.string(32),
        captchaImg: Random.dataImage('100x40', 'p7n5w')
    }

    return Result
})

Mock.mock('/login','post', ()=> {

    //无法再header中传入数据

    // Result.code = 400
    // Result.msg = "验证码错误"

    return Result
})


Mock.mock('/sys/userInfo','get', ()=> {
    Result.data = {
        id:"1",
        username:"test",
        avatar:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    }

    return Result
})

Mock.mock('/logout','post', ()=> {


    return Result
})

Mock.mock('/sys/menu/nav','get', ()=> {
    let nav = [
        {
            name:'SysHonorManager',
            title:'荣誉管理',
            icon:'el-icon-collection',
            path:'',
            component:'',
            children:[
            {
                name:'SysList',
                title:'荣誉列表',
                icon:'el-icon-copy-document',
                path:'/sys/list',
                component:'sys/Hornor_list',
                children:[]
            },
            {
                name:'SysExame',
                title:'荣誉审批',
                icon:'el-icon-document-checked',
                path:'/sys/exame',
                component:'sys/Hornor_exame',
                children:[]
            },
            {
                name:'SysStore',
                title:'荣誉库',
                icon:'el-icon-coin',
                path:'/sys/store',
                component:'sys/Hornor_store',
                children:[]
            }]
        },
        {
            name: 'SysManga',
            title: '系统管理',
            icon: 'el-icon-s-operation',
            path: '',
            component: '',
            children: [
                {
                    name: 'SysUser',
                    title: '用户管理',
                    icon: 'el-icon-s-custom',
                    path: '/sys/users',
                    component: 'sys/User',
                    children: []
                },
                {
                    name: 'SysRoles',
                    title: '角色管理',
                    icon: 'el-icon-rank',
                    path: '/sys/roles',
                    component: 'sys/Roles',
                    children: []
                },
                {
                    name: 'SysMenu',
                    title: '菜单管理',
                    icon: 'el-icon-menu',
                    path: '/sys/menu',
                    component: 'sys/Menu',
                    children: []
                }]
        },
    ]
    let authorization = []

    Result.data = {
        nav:nav,
        authorization: authorization
    }

    return Result
})

Mock.mock('/sys/menu/list','get', ()=> {

    let menus = [
        {
            "id": 1,
            "created": "2023-02-16T23:45:55",
            "updated": "2023-02-16T23:45:55",
            "statue": 1,
            "parentId": 0,
            "name": "系统管理",
            "path": "",
            "perms":"sys:manage",
            "component":"",
            "type":0,
            "icon":"el-icon-s-operation",
            "ordernum":1,
            "children" : [
                {
                    "id": 2,
                    "created": "2023-02-16T23:45:55",
                    "updated": "2023-02-16T23:45:55",
                    "statue": 1,
                    "parentId": 1,
                    "name": "用户管理",
                    "path": "/sys/user",
                    "perms":"sys:user",
                    "component":"sys/User",
                    "type":1,
                    "icon":"el-icon-s-custom",
                    "ordernum":1,
                    "children":[]
                },
                {
                    "id": 3,
                    "created": "2023-02-16T23:45:55",
                    "updated": "2023-02-16T23:45:55",
                    "statue": 1,
                    "parentId": 1,
                    "name": "角色管理",
                    "path": "/sys/roles",
                    "perms":"sys:roles",
                    "component":"sys/Roles",
                    "type":1,
                    "icon":"el-icon-s-operation",
                    "ordernum":1,
                    "children":[]
                },
                {
                    "id": 4,
                    "created": "2023-02-16T23:45:55",
                    "updated": "2023-02-16T23:45:55",
                    "statue": 1,
                    "parentId": 1,
                    "name": "菜单管理",
                    "path": "/sys/menu",
                    "perms":"sys:menu",
                    "component":"sys/Menu",
                    "type":1,
                    "icon":"el-icon-s-operation",
                    "ordernum":1,
                    "children":[]
                }]
        },
        {
            "id": 5,
            "created": "2023-02-16T23:45:55",
            "updated": "2023-02-16T23:45:55",
            "statue": 1,
            "parentId": 0,
            "name": "荣誉管理",
            "path": "",
            "perms":"sys:manage",
            "component":"",
            "type":0,
            "icon":"el-icon-collection",
            "ordernum":1,
            "children" : [
                {
                    "id": 6,
                    "created": "2023-02-16T23:45:55",
                    "updated": "2023-02-16T23:45:55",
                    "statue": 1,
                    "parentId": 1,
                    "name": "荣誉列表",
                    "path": "/sys/list",
                    "perms":"sys:list",
                    "component":"sys/List",
                    "type":1,
                    "icon":"el-icon-copy-document",
                    "ordernum":1,
                    "children":[]
                },
                {
                    "id": 7,
                    "created": "2023-02-16T23:45:55",
                    "updated": "2023-02-16T23:45:55",
                    "statue": 1,
                    "parentId": 1,
                    "name": "荣誉审批",
                    "path": "/sys/exame",
                    "perms":"sys:exame",
                    "component":"sys/Exame",
                    "type":1,
                    "icon":"el-icon-document-checked",
                    "ordernum":1,
                    "children":[]
                },
                {
                    "id": 8,
                    "created": "2023-02-16T23:45:55",
                    "updated": "2023-02-16T23:45:55",
                    "statue": 1,
                    "parentId": 1,
                    "name": "荣誉库",
                    "path": "/sys/store",
                    "perms":"sys:store",
                    "component":"sys/Store",
                    "type":1,
                    "icon":"el-icon-coin",
                    "ordernum":1,
                    "children":[]
                }]
        }
    ]
    Result.data = menus
    return Result
})

Mock.mock(RegExp('/sys/menu/info/*'), 'get', () => {

    Result.data = {
        "id": 3,
        "statu": 1,
        "parentId": 1,
        "name": "角色管理",
        "path": "/sys/roles",
        "perms": "sys:role:list",
        "component": "sys/Role",
        "type": 1,
        "icon": "el-icon-rank",
        "orderNum": 2,
        "children": []
    }

    return Result
})

Mock.mock(RegExp('/sys/menu/*'), 'post', () => {

    return Result
})

Mock.mock(RegExp('/sys/role/list'), 'get', () => {

    Result.data = [{
        name: 'cxz',
        role_name: 0,
        email: '1329326116@qq.com',
        phone: '18248635130',
        status: 1,
        date: '2016-05-03',
    },{
        name: 'cza',
        role_name: 1,
        email: '2311931765@qq.com',
        phone: '',
        status: 0,
        date: '2016-05-03',
    },{
        name: 'root',
        role_name: 0,
        email: 'root@qq.com',
        phone: 'root',
        status: 1,
        date: '2016-05-03',
    }]
    return Result
})

Mock.mock(RegExp('/sys/role/info/*'), 'get', () => {

    Result.data = {
        "name": "角色管理",
        "role_name": 1,
        "email": "1329326116@qq.com",
        "phone": '18248635130',
        "status": 1,
        "date": '2016-05-03',

    }

    return Result
})

Mock.mock(RegExp('/sys/role/*'), 'post', () => {

    return Result
})