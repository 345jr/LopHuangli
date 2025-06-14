import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

// 定义组件的 Props 类型
interface DanglingIconProps {
  imageUrl: string;
  onStretched?: () => void; // 当绳子被拉伸时触发的回调
  onRelaxed?: () => void;  // 当绳子恢复时触发的回调
}

const DanglingIcon: React.FC<DanglingIconProps> = ({ imageUrl, onStretched, onRelaxed }) => {
  // 使用 useRef 来引用容器 div
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 使用 useRef 来保存 Matter.js 的实例，防止在每次渲染时重新创建
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);

  // 使用 useEffect 来处理副作用，即 Matter.js 的初始化和清理
  useEffect(() => {
    // 如果没有容器，则不执行任何操作
    if (!containerRef.current) return;

    // 从 Matter.js 中解构出所需模块
    const { Engine, Render, Runner, World, Bodies, Constraint, Mouse, MouseConstraint, Events } = Matter;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // --- 1. 初始化物理世界 ---
    const engine = Engine.create({
        // 禁用重力，让图标只受约束和鼠标影响，显得更"漂浮"
        // 如果想要重力效果，可以设置为 { y: 1 }
        gravity: { x: 0, y: 1 } 
    });
    const render = Render.create({
      element: container,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent', // 设置背景透明以融入页面
      },
    });
    const runner = Runner.create();
    
    // 将实例存入 ref
    engineRef.current = engine;
    renderRef.current = render;
    runnerRef.current = runner;
    // render.canvas.style.pointerEvents = 'none';

    // --- 2. 创建图标和绳子 ---
    const iconBody = Bodies.rectangle(width / 2, height / 2, 80, 80, {
      restitution: 0.6,
      friction: 0.3,
      render: {
        sprite: { texture: imageUrl, xScale: 0.5, yScale: 0.5 },
      },
    });

    const rope = Constraint.create({
      pointA: { x: width / 3.2, y: 0 },
      bodyB: iconBody,
      stiffness: 0.01,
      damping: 0.05,
      length: height / 7,
      render: {
          strokeStyle: '#fafaf9',
          lineWidth: 2,
      }
    });

    // --- 3. 添加鼠标交互 ---
    const mouse = Mouse.create(render.canvas);
    // if (mouse.element) {
    //   mouse.element.removeEventListener('wheel', (mouse as any).mousewheel);
    //   mouse.element.removeEventListener('DOMMouseScroll', (mouse as any).mousewheel);
    //   mouse.element.removeEventListener('DOMMouseScroll', mouse.); 
 
    // }
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });

    // --- 4. 添加事件监听 ---
    let isStretched = false;
    const stretchThreshold = 1.2;
    Events.on(engine, 'beforeUpdate', () => {
      const currentLength = Math.hypot(
        iconBody.position.x - rope.pointA.x,
        iconBody.position.y - rope.pointA.y
      );

      if (currentLength > rope.length * stretchThreshold) {
        if (!isStretched) {
          isStretched = true;
          onStretched?.(); // 如果传递了 onStretched prop，则调用它
        }
      } else {
        if (isStretched) {
          isStretched = false;
          onRelaxed?.(); // 如果传递了 onRelaxed prop，则调用它
        }
      }
    });

    // 将所有物体添加到世界中
    World.add(engine.world, [iconBody, rope, mouseConstraint]);

    // 运行引擎和渲染器
    Runner.run(runner, engine);
    Render.run(render);

    // --- 5. 处理窗口大小变化 ---
    const handleResize = () => {
        if (!renderRef.current || !engineRef.current) return;
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        
        // 更新渲染器尺寸
        renderRef.current.bounds.max.x = newWidth;
        renderRef.current.bounds.max.y = newHeight;
        renderRef.current.options.width = newWidth;
        renderRef.current.options.height = newHeight;
        renderRef.current.canvas.width = newWidth;
        renderRef.current.canvas.height = newHeight;

        // 更新绳子的挂点位置
        rope.pointA = { x: newWidth / 3.2, y: 0 };
    };

    window.addEventListener('resize', handleResize);

    // --- 6. 清理函数 ---
    // 这个函数会在组件卸载时执行，非常重要！
    return () => {
      window.removeEventListener('resize', handleResize);

      if (renderRef.current) {
        Render.stop(renderRef.current);
        renderRef.current.canvas.remove();
      }
      if (runnerRef.current) Runner.stop(runnerRef.current);
      if (engineRef.current) {
        World.clear(engineRef.current.world, false);
        Engine.clear(engineRef.current);
      }
    };
  }, [imageUrl, onStretched, onRelaxed]); // 依赖项数组，当这些 props 改变时，useEffect 会重新运行

  return <div ref={containerRef} className='z-10' style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />;
};

export default DanglingIcon;