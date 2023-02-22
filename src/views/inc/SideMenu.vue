<template>
    <el-menu
            :default-active="activeMenu"
            class="el-menu-vertical-demo"
            background-color="rgb(48,65,86)"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
            :collapse-transition="false"
            style="overflow-x: hidden;">
        <!--<div style="height: 60px; line-height: 60px; font-size: 19px;text-align: center;"-->
             <!--@click="selectMenu({name:'Index',title:'首页'})">-->
            <!--<img src="../../assets/logo.png" style="width: 20px; position: relative; top: 5px; ">-->
            <!--&lt;!&ndash;这里的isCollapse其实是对标题进行隐藏&ndash;&gt;-->
            <!--<b v-show="!isCollapse" style="color: #fff; padding-left: 5px">温二职数字影像系统</b>-->
        <!--</div>-->
        <router-link to="/index">
            <el-menu-item index="Index"
                          style="height: 60px; line-height: 60px; font-size: 19px;text-align: center;"
                          @click="selectMenu({name:'Index',title:'首页'})">
                <template slot="title">
                    <img src="../../assets/logo.png" style="width: 20px; position: relative; ">
                    <b v-show="!isCollapse" style="color: #fff; padding-left: 5px">温二职数字影像系统</b>
                </template>
            </el-menu-item>
        </router-link>
        <!--使用了动态导航与动态路由绑定，使用了v-for 循环提前准备好的menuList进行遍历-->
        <el-submenu :index="menu.name" v-for="menu in menuList" class="el-submenu-main">
            <template slot="title">
                <i :class="menu.icon"></i>
                <span>{{menu.title}}</span>
            </template>
            <router-link :to="item.path" v-for="item in menu.children">
                <el-menu-item :index="item.name" @click="selectMenu(item)">
                    <i :class="item.icon"></i>
                    <template slot="title">{{item.title}}</template>
                </el-menu-item>
            </router-link>

        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: "SideMenu",
        props:['isCollapse'],
        data() {
            return {

            }
        },
        computed:{
            menuList: {
                get(){
                    return this.$store.state.menus.menuList
                }
            },
                // # 选择tab标签时候顺便也要激活当前对应的导航
                activeMenu() {
                    return this.$store.state.menus.editableTabsValue
                }
        },
        methods : {
            selectMenu(item) {
                // console.log(item)
                let obj = {
                    name: item.name,
                    title: item.title
                }
                this.$store.commit("addTab", obj)
            }
        }
    }
</script>

<style scoped>
    .title {
        font-size: 20px;
        text-align: center;
        position: relative;
        overflow: hidden;
        background: transparent;
        height: 60px;
        line-height: 60px;

    }
    .el-menu-vertical-demo {
        height: 100%;
    }
    .el-submenu-main {
        text-align: left;
    }
    a {
        text-decoration: none;
    }
</style>