import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    state: {
        // 菜单栏数据
        menuList:  [],
        // 权限数据
        permList:  [],
        hasRoute: false,

        editableTabsValue: 'Index',
        editableTabs: [
            {
                title: '首页',
                name: 'Index'
            }
        ],
    },

    mutations: {
        setMenuList(state, menus) {
            state.menuList = menus
        },
        setPermList(state, perms) {
            state.permList = perms
        },

        changeRouteStatus(state, hasRoutes) {
            state.hasRoutes = hasRoutes

            sessionStorage.setItem("hasRoute",hasRoutes)
        },

        addTab(state, tab) {
            console.log(tab)
            // 判断是否在栈内
            let index = state.editableTabs.findIndex(item => item.name === tab.name)
            if (index === -1) {
                // 添加到tabs中
                state.editableTabs.push(tab)
            }
            // 当前激活的tab
            state.editableTabsValue = tab.name
        },

        resetState: (state => {
            state.menuList = [];
            state.permList = [];
            state.hasRoutes = false;
            state.editableTabsValue = 'Index';
            state.editableTabs = [{
                title: '首页',
                name: 'Index',
            }]
        })
    },
    actions: {
    },

}
