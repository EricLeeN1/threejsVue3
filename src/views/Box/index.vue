<template>
    <div ref="container"></div>
  </template>
  
  <script setup>
  import { onMounted, ref } from "vue";
  import * as THREE from "three";
  
  const container = ref(null);
  
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
  
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.value.appendChild(renderer.domElement);
  
    // 创建几何体和材质
    const geometry = new THREE.BoxGeometry(1, 1, 1);
  
    // 创建材质
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  
    // 创建网格
    const cube = new THREE.Mesh(geometry, material);
  
    // 将网格添加到场景中
    scene.add(cube);
  
    // 渲染循环
    const animate = () => {
      requestAnimationFrame(animate);
  
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
  
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
  