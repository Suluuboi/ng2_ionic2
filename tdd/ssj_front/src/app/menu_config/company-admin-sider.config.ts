export const CompanyAdminSider = [
    {
        menuTitle: "单位资料",
        subMenu  : [
            { route: './companyHome', subTitle: '管理首页' },
            { route: './companyInfo', subTitle: '单位基本资料' },
            // { route: './companyLogo', subTitle: '单位LOGO' },
            { route: './companyMap', subTitle: '单位地图' },
            { route: './conference', subTitle: '会议室' },
            { route: './companyPwd', subTitle: '密码管理' }
        ]
    },
    {
        menuTitle: "招聘管理",
        subMenu  : [
            { route: './jobadd', subTitle: '发布新职位' },
            { route: './recruit', subTitle: '招聘中的职位' },
            { route: './jobFair', subTitle: '招聘会' },
            { route: './jobFairAdd', subTitle: '创建招聘会' }
        ]
    },
    {
        menuTitle: "人才管理",
        subMenu  : [
            { route: './seekers', subTitle: '人才搜索' },
            { route: './resumeManage', subTitle: '简历管理' }
        ]
    }
];