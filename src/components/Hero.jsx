"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MathUtils } from "three";
import GooeyTextReveal from "./GooeyTextReveal";

function Sphere() {
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const { pointer } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: [0, 0] },
    }),
    []
  );

  const vertexShader = `
    uniform float uTime;

    varying vec2 vUv;
    varying float vDisplacement;

    vec3 mod289(vec3 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 mod289(vec4 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 permute(vec4 x) {
      return mod289(((x * 34.0) + 1.0) * x);
    }

    vec4 taylorInvSqrt(vec4 r) {
      return 1.79284291400159 - 0.85373472095314 * r;
    }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;

      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);

      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;

      i = mod289(i);

      vec4 p = permute(
        permute(
          permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0)
          )
          + i.y + vec4(0.0, i1.y, i2.y, 1.0)
        )
        + i.x + vec4(0.0, i1.x, i2.x, 1.0)
      );

      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);

      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;

      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);

      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;

      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);

      vec4 norm = taylorInvSqrt(
        vec4(
          dot(p0, p0),
          dot(p1, p1),
          dot(p2, p2),
          dot(p3, p3)
        )
      );

      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(
        0.6 - vec4(
          dot(x0, x0),
          dot(x1, x1),
          dot(x2, x2),
          dot(x3, x3)
        ),
        0.0
      );

      m = m * m;

      return 42.0 * dot(
        m * m,
        vec4(
          dot(p0, x0),
          dot(p1, x1),
          dot(p2, x2),
          dot(p3, x3)
        )
      );
    }

    void main() {
      vUv = uv;

      float noise = snoise(
        position * 1.5 + uTime * 0.15
      );

      float displacement = noise * 0.15;

      vDisplacement = displacement;

      vec3 newPosition =
        position + normal * displacement;

      gl_Position =
        projectionMatrix *
        modelViewMatrix *
        vec4(newPosition, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    varying float vDisplacement;

    void main() {
      float intensity =
        0.3 + vDisplacement * 2.0;

      vec3 color =
        vec3(intensity);

      float line =
        smoothstep(
          0.0,
          0.02,
          abs(fract(vUv.x * 20.0) - 0.5)
        );

      line *=
        smoothstep(
          0.0,
          0.02,
          abs(fract(vUv.y * 20.0) - 0.5)
        );

      gl_FragColor =
        vec4(
          color * (1.0 - line * 0.5),
          0.6
        );
    }
  `;

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;

      materialRef.current.uniforms.uMouse.value = [
        pointer.x,
        pointer.y,
      ];
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;

      meshRef.current.rotation.x = MathUtils.lerp(
        meshRef.current.rotation.x,
        pointer.y * 0.2,
        0.05
      );

      meshRef.current.rotation.z = MathUtils.lerp(
        meshRef.current.rotation.z,
        pointer.x * 0.2,
        0.05
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[0.65, 0.45, 0]}
    >
      <icosahedronGeometry args={[2.35, 32]} />

      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        wireframe
      />
    </mesh>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          minHeight: "680px",
          background: "#050505",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "16rem",
            height: "16rem",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        />
      </div>
    );
  }

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "680px",
        overflow: "hidden",
        background: "#050505",
      }}
    >
      {/* TOP LEFT META */}

      <div
        style={{
          position: "absolute",
          left: "7%",
          top: "8%",
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontFamily: "monospace",
          fontSize: "9px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.32)",
        }}
      >
        <span
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 0 12px rgba(255,255,255,0.5)",
          }}
        />

        AVAILABLE FOR INTERESTING WORK
      </div>

      {/* =====================================================
          NAME
      ===================================================== */}

      <div
        style={{
          position: "absolute",
          left: "7%",
          top: "25%",
          zIndex: 25,
          pointerEvents: "none",
        }}
      >
        <GooeyTextReveal
          mode="scroll"
          start="top 85%"
          duration={1.4}
          blurAmount={0.4}
        >
          <div
            style={{
              position: "relative",
            }}
          >
            {/* identifier */}

            <div
              style={{
                marginBottom: "12px",
                paddingLeft: "3px",
                fontFamily: "monospace",
                fontSize: "8px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              PNKJ / 001
            </div>

            {/* PANKAJ */}

            <h1
              style={{
                margin: 0,
                fontFamily: "'Manrope', sans-serif",
                fontSize: "clamp(3.5rem, 6vw, 4.5rem)",
                fontWeight: 800,
                lineHeight: 0.82,
                letterSpacing: "-0.08em",
                color: "#ffffff",
                whiteSpace: "nowrap",
              }}
            >
              PANKAJ
            </h1>

            {/* YADAV */}

            <div
              style={{
                marginTop: "8px",
                marginLeft: "clamp(1rem, 3vw, 3rem)",
              }}
            >
              <div
                style={{
                  fontFamily:
                    "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(3rem, 5vw, 5.5rem)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  lineHeight: 0.85,
                  letterSpacing: "-0.065em",
                  color: "transparent",
                  WebkitTextStroke:
                    "1px rgba(255,255,255,0.7)",
                  whiteSpace: "nowrap",
                }}
              >
                Yadav
              </div>
            </div>

            {/* underline */}

            <div
              style={{
                marginTop: "16px",
                marginLeft: "clamp(1rem, 3vw, 3rem)",
                width: "120px",
                height: "1px",
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.6), transparent)",
              }}
            />

            {/* descriptor */}

            <div
              style={{
                marginTop: "20px",
                marginLeft: "3px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontFamily: "monospace",
                fontSize: "8px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
              }}
            >
              <span
                style={{
                  width: "22px",
                  height: "1px",
                  background:
                    "rgba(255,255,255,0.25)",
                }}
              />

              Developer / Builder
            </div>
          </div>
        </GooeyTextReveal>
      </div>

      {/* =====================================================
          SPHERE
      ===================================================== */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <Canvas
          camera={{
            position: [3, 3, 7],
            fov: 60,
          }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
          }}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        >
          <ambientLight intensity={0.5} />
          <Sphere />
        </Canvas>
      </div>

      {/* SPHERE LABEL LEFT */}

      <div
        style={{
          position: "absolute",
          left: "43%",
          top: "34%",
          zIndex: 22,
          pointerEvents: "none",
          fontFamily: "monospace",
          fontSize: "8px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.22)",
          transform: "rotate(-90deg)",
          transformOrigin: "left center",
        }}
      >
        interactive object / 001
      </div>

      {/* SPHERE LABEL RIGHT */}

      <div
        style={{
          position: "absolute",
          right: "8%",
          top: "27%",
          zIndex: 22,
          pointerEvents: "none",
          fontFamily: "monospace",
          fontSize: "9px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.25)",
        }}
      >
        <div>ROTATION // 0.05</div>

        <div
          style={{
            width: "70px",
            height: "1px",
            marginTop: "9px",
            background: "rgba(255,255,255,0.2)",
          }}
        />
      </div>

      {/* INTRO */}

      <div
        style={{
          position: "absolute",
          right: "8%",
          bottom: "17%",
          width: "min(390px, 30vw)",
          zIndex: 25,
          pointerEvents: "none",
        }}
      >
        <GooeyTextReveal
          mode="scroll"
          start="top 85%"
          duration={1.2}
          delay={0.15}
          blurAmount={0.25}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "18px",
                fontFamily: "monospace",
                fontSize: "10px",
                letterSpacing: "0.25em",
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: "24px",
                  height: "1px",
                  background:
                    "rgba(255,255,255,0.4)",
                }}
              />

              Frontend / Backend / DSA
            </div>

            <p
              style={{
                margin: 0,
                fontFamily: "'Manrope', sans-serif",
                fontSize:
                  "clamp(1rem, 1.4vw, 1.25rem)",
                lineHeight: 1.5,
                fontWeight: 300,
                letterSpacing: "-0.02em",
                color: "rgba(255,255,255,0.68)",
              }}
            >
              I like turning strange ideas, difficult
              problems and too much curiosity into things
              that actually work.
            </p>

            <div
              style={{
                marginTop: "20px",
                fontFamily: "monospace",
                fontSize: "8px",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.22)",
                textTransform: "uppercase",
              }}
            >
              currently: building / breaking / learning
            </div>
          </div>
        </GooeyTextReveal>
      </div>

      {/* TOP RIGHT INDEX */}

      <div
        style={{
          position: "absolute",
          right: "8%",
          top: "11%",
          zIndex: 25,
          fontFamily: "monospace",
          fontSize: "9px",
          letterSpacing: "0.25em",
          color: "rgba(255,255,255,0.28)",
        }}
      >
        01 — INTRODUCTION
      </div>

      {/* SIDE COORDINATES */}

      <div
        style={{
          position: "absolute",
          left: "3%",
          bottom: "20%",
          zIndex: 20,
          writingMode: "vertical-rl",
          fontFamily: "monospace",
          fontSize: "8px",
          letterSpacing: "0.25em",
          color: "rgba(255,255,255,0.18)",
          textTransform: "uppercase",
        }}
      >
        31.1048° N / 77.1734° E
      </div>

      {/* SCROLL */}

      <div
        style={{
          position: "absolute",
          left: "7%",
          bottom: "7%",
          zIndex: 25,
          display: "flex",
          alignItems: "center",
          gap: "12px",
          color: "rgba(255,255,255,0.35)",
          fontFamily: "monospace",
          fontSize: "9px",
          letterSpacing: "0.2em",
        }}
      >
        <span
          style={{
            display: "block",
            width: "42px",
            height: "1px",
            background:
              "rgba(255,255,255,0.3)",
          }}
        />

        SCROLL TO EXPLORE
      </div>

      {/* STATUS */}

      <div
        style={{
          position: "absolute",
          right: "8%",
          bottom: "7%",
          zIndex: 25,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "monospace",
          fontSize: "8px",
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.2)",
          textTransform: "uppercase",
        }}
      >
        <span
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background:
              "rgba(255,255,255,0.5)",
          }}
        />

        SYSTEM / ONLINE
      </div>
    </section>
  );
}