<template>
  <div ref="container"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const container: any = ref(null);

onMounted(() => {
  // 创建场景
  const scene = new THREE.Scene();

  // 创建相机
  const camera = new THREE.PerspectiveCamera(
    75, // 视角
    window.innerWidth / window.innerHeight, // 宽高比
    0.1, // 近平面
    1000 // 远平面
  );
  camera.position.z = 5;
  camera.position.y = 2;
  camera.position.x = 2;
  camera.lookAt(0, 0, 0);

  // 创建渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.value.appendChild(renderer.domElement);

  // 创建几何体和材质
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  // 创建材质
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });

  // 创建网格
  let  parentCube = new THREE.Mesh(geometry, material1);
  const cube = new THREE.Mesh(geometry, material);
  parentCube.add(cube);
  parentCube.position.set(-3, 0, 0);
  parentCube.scale.set(2, 2, 2);
  // parentCube.rotation.set(Math.PI / -4, Math.PI / -4, Math.PI / -4);
  parentCube.rotation.x = Math.PI / 4;
  cube.position.set(3, 0, 0);
  // 缩放
  cube.scale.set(2, 2, 2);
  // 旋转
  // cube.rotation.set(Math.PI / 4, Math.PI / 4, Math.PI / 4);
  cube.rotation.x = Math.PI / 4; // 会叠加父元素的旋转

  // 将网格添加到场景中 
  scene.add(parentCube);

  // 添加世界坐标辅助器
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper); // 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
  // 添加轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);

  // 设置带阻尼的惯性
  controls.enableDamping = true;
  // 设置阻尼系数
  controls.dampingFactor = 0.05;
  // 设置旋转速度
  controls.autoRotate = false;
  // 渲染循环
  const animate = () => {
    controls.update();
    requestAnimationFrame(animate);

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  animate();
});
</script>

<style scoped>
div {
  width: 100%;
  height: 100vh;
}
</style>
