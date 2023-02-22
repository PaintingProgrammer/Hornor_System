<template>
    <el-container class="container_Main">
        <!--左侧导航栏-->
        <el-aside :width="sideWidth + 'px'" style="box-shadow: 2px 0 6px rgba(41,21,21,23);">
            <SideMenu :isCollapse="isCollapse" style="width: 100%;"></SideMenu>
        </el-aside>
        <el-container>
            <!--顶部导航栏-->
            <el-header >
                <div class="header-icon" style="float: left; font-size: 25px">
                    <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
                </div>
                <div class="header-avatar">
                    <el-avatar :src="userInfo.avatar"></el-avatar>
                    <el-dropdown>
                        <span class="el-dropdown-link">{{userInfo.username}}<i class="el-icon-arrow-down" style="margin-left: 5px "></i></span>
                        <el-dropdown-menu slot="dropdown">
                            <router-link to="/sys/UserCenter">
                                <el-dropdown-item>修改密码</el-dropdown-item>
                            </router-link>
                            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <!--底部内容栏-->
            <el-main>
                <Tabs></Tabs>
                <div style="margin: 0 15px">
                    <router-view/>
                </div>

            </el-main>
        </el-container>
    </el-container>


</template>

<script>
    import SideMenu from "./inc/SideMenu"
    import Tabs from "./inc/Tabs"
    export default {
        name: "Home",
        data(){
            return {
                collapseBtnClass : 'el-icon-s-fold',
                isCollapse : false,
                sideWidth : 250,
                userInfo:{
                    id:"",
                    username:"",
                    avatar:""
                },

            }
        },
        created(){
            this.getUserInfo()
        },
        components: {Tabs, SideMenu},
        comments: {
            SideMenu,Tabs
        },
        methods: {
            collapse(){  //点击收缩按钮触发
                this.isCollapse = !this.isCollapse;
                if(this.isCollapse){
                    this.sideWidth = 64;
                    this.collapseBtnClass = 'el-icon-s-unfold';
                } else{
                    this.sideWidth = 250;
                    this.collapseBtnClass = 'el-icon-s-fold';
                }
            },
            getUserInfo(){
                this.$axios.get("/sys/userInfo").then(res => {
                    this.userInfo =res.data.data
                })
            },
            logout() {
                this.$axios.post('/logout').then(res => {
                    localStorage.clear();
                    sessionStorage.clear();

                    this.$store.commit("resetState");

                    this.$router.push('/login')
                })
            }
        }
    }
</script>

<style scoped>
    .header-avatar {
        float: right;
        width: 120px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .el-dropdown-link {
        cursor: pointer;
    }
    .container_Main {
        padding: 0;
        margin: 0;
        height: 100%;
    }
    .el-header {
        background-color: #fff;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
        z-index: 100;
        overflow-x: hidden;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        padding: 0;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    a {
        text-decoration: none;
    }
</style>
