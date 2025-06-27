<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="名称" width="120" align="center" />
    <el-table-column prop="desc" label="描述" width="600" />
    <el-table-column fixed="right" label="Operations" min-width="120" align="center">
      <template #default="{ row }">
        <el-button @click="toPath(row)" link type="primary" size="small">
          详情
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
const router = useRouter();
const tableData: any = ref([
  {
    id: 1,
    name: "Box",
    desc: "第一个3D应用",
    path: "/box",
  },
  {
    id: 2,
    name: "OrbitControls",
    desc: "坐标辅助器与轨道控制器",
    path: "/orbit-controls",
  },
  {
    id: 3,
    name: "Position",
    desc: "物体的位移与父子元素",
    path: "/position",
  },
   {
    id: 4,
    name: "Scale",
    desc: "物体的缩放与旋转",
    path: "/scale",
  },
]);
const toPath = (item: any) => {
  console.log("click", item);
  if (item.path) {
    router.push({
      path: item.path,
    });
  }
};
</script>

<style scoped></style>
