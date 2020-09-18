import guidance from "./1_guidance.md";
import analysis from "./2_analysis.md";
import task_1 from "./3_task_1.md";
import task_2 from "./4_task_2.md";
import task_3 from "./5_task_3.md";
import task_4 from "./6_task_4.md";
import summary from "./7_summary.md";

export default {
  uuid: "0210E512-A8A7-4B53-B584-B04EEE582AF5",
  name: "生产环境中 docker root 迁移",
  url:
    "https://assets.jiker.com/_for_plus_sub_project/2020/0918/admin/SJ9P9lZJFKDAQbDXfgvhrhDUSmrXGMmkDN3TSc0D.png",
  contents: [
    {
      uuid: "417D4290-40C2-430D-9AA6-261E694F05F0",
      name: "1 - 项目导学",
      content: guidance
    },
    {
      uuid: "C6416EB7-1DA2-4175-92F6-D17FB93EE850",
      name: "2 - 项目剖析",
      content: analysis
    },
    {
      uuid: "5B6B0BBD-5E39-44C1-A835-B3204391843B",
      name: "任务1：准备k8s集群，如有可复用",
      content: task_1
    },
    {
      uuid: "47D24499-A029-4206-8166-A2C964A2BFEF",
      name: "任务2：了解docker root工作机制",
      content: task_2
    },
    {
      uuid: "CF5E120C-5913-426F-AF83-C8BCAE177B20",
      name: "任务3：掌握dockerd、containerd与containerd-shim之间的通信机制",
      content: task_3
    },
    {
      uuid: "ADFEECA9-1775-48EB-917C-2DCE60986B7D",
      name: "任务4：实现docker root迁移脚本",
      content: task_4
    },
    {
      uuid: "8D47D8E0-47E9-4F41-B611-09E326E597E3",
      name: "3 - 总结页",
      content: summary
    }
  ]
};
