export const PersonAdminSider = [
    {
        menuTitle: "个人中心",
        subMenu  : [
            { route: './userHome', subTitle: '个人首页' },
            { route: './userInfo', subTitle: '个人基本资料' },
            // { route: './userLogo', subTitle: '头像上传' },
            { route: './userPwd', subTitle: '密码管理' }
        ]
    },
    {
        menuTitle: "简历管理",
        subMenu  : [
            { route: './userResume', subTitle: '我的简历' },
            { route: './resume', subTitle: '创建简历' }
        ]
    },
    {
        menuTitle: "求职管理",
        subMenu  : [
            { route: './appliedJobs', subTitle: '已申请的职位' },
            { route: './collect', subTitle: '已收藏的职位' },
            { route: './viewed', subTitle: '谁看了我的简历' }
        ]
    }
];