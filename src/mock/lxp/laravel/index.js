import init from "./1_init.md";
import wechat from "./2_wechat.md";
import sms from "./3_sms.md";
import jwt from "./4_jwt.md";
import cors from "./5_cors.md";
import district from "./6_district.md";
import qiniu from "./7_qiniu.md";
import standard from "./8_standard.md";

export default {
  uuid: "0LARAVEL-AAAA-BBBB-CCCC-000000000000",
  name: "Laravel",
  url:
    "https://assets.jiker.com/_for_plus_sub_project/2020/0918/admin/M9Dgz7kBVlbJLkezRMeNl2qr4h4QbiloJpkYexkv.png",
  contents: [
    {
      uuid: "0LARAVEL-AAAA-BBBB-CCCC-000000000001",
      name: "Laravel 项目初始化",
      content: init
    },
    {
      uuid: "0LARAVEL-AAAA-BBBB-CCCC-000000000002",
      name: "微信网页登录",
      content: wechat
    },
    {
      uuid: "0LARAVEL-AAAA-BBBB-CCCC-000000000003",
      name: "手机短信验证",
      content: sms
    },
    {
      uuid: "0LARAVEL-AAAA-BBBB-CCCC-000000000004",
      name: "JWT 配置",
      content: jwt
    },
    {
      uuid: "0LARAVEL-AAAA-BBBB-CCCC-000000000005",
      name: "跨域 CORS",
      content: cors
    },
    {
      uuid: "0LARAVEL-AAAA-BBBB-CCCC-000000000006",
      name: "省市选择",
      content: district
    },
    {
      uuid: "0LARAVEL-AAAA-BBBB-CCCC-000000000007",
      name: "七牛存储",
      content: qiniu
    },
    {
      uuid: "0LARAVEL-AAAA-BBBB-CCCC-000000000008",
      name: "Laravel 使用规范",
      content: standard
    }
  ]
};
