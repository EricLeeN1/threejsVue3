<template>
  <div ref="container"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// 导入GUI
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { FullScreenQuad } from "three/examples/jsm/Addons.js";

const container: any = ref(null);
let scene: any = null; // 创建场景
let camera: any = null; // 创建相机
let renderer: any = null; // 创建渲染器
let geometry: any = null; // 创建几何体和材质
let material: any = null; // 创建材质
let material1: any = null; // 创建材质
let parentCube: any = null; // 创建父元素
let cube: any = null; // 创建网格
let axesHelper: any = null; // 创建坐标轴
let controls: any = null; // 创建控制器

const initThree = () => {
  // 创建场景
  scene = new THREE.Scene();

  // 创建相机
  camera = new THREE.PerspectiveCamera(
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
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.value.appendChild(renderer.domElement);

  // 创建几何体和材质
  geometry = new THREE.BoxGeometry(1, 1, 1);

  // 创建材质
  material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });

  // 创建网格
  parentCube = new THREE.Mesh(geometry, material1);
  cube = new THREE.Mesh(geometry, material);
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
  axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper); // 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
  // 添加轨道控制器
  controls = new OrbitControls(camera, renderer.domElement);

  // 设置带阻尼的惯性
  controls.enableDamping = true;
  // 设置阻尼系数
  controls.dampingFactor = 0.05;
  // 设置旋转速度
  controls.autoRotate = false;
};

// 渲染循环
const animate = () => {
  controls.update();
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

onMounted(() => {
  initThree();
  animate();

  window.addEventListener("resize", () => {
    // 重置渲染器宽高比
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 重置相机宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新相机投影矩阵
    camera.updateProjectionMatrix();
  });
});

let eventObj = {
  FullScreen: () => {
    document.body.requestFullscreen();
  },
  exitFullscreen: () => {
    document.exitFullscreen();
  },
};
// 添加按钮
let gui = new GUI();
gui.add(eventObj, "FullScreen");
gui.add(eventObj, "exitFullscreen");
</script>

<style scoped>
div {
  width: 100%;
  height: 100vh;
}
</style>
