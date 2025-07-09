<template>
  <ul>
    <li v-for="(value, key) in deviceInfo" :key="key">
      <strong>{{ key }}:</strong> {{ value }}
    </li>
  </ul>
</template>

<script>
import { Device } from "@capacitor/device";

export default {
  data() {
    return {
      deviceInfo: {},
    };
  },
  async mounted() {
    const info = await Device.getInfo();
    const battery = await Device.getBatteryInfo().catch(() => ({}));
    for (const key in info) {
      alert(key + ":" + info[key]);
    }
    console.log(info);
    this.deviceInfo = {
      设备名称: info.name,
      型号: info.model,
      平台: info.platform,
      操作系统版本: info.osVersion,
      制造商: info.manufacturer,
      电池状态: battery.batteryLevel
        ? `${Math.floor(battery.batteryLevel * 100)}%`
        : "未知",
      是否充电: battery.isCharging ? "是" : "否",
    };
  },
};
</script>
