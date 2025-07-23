"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// Dynamically load ForceGraph2D
const ForceGraph2D = dynamic(
  () => import("react-force-graph").then((mod) => mod.ForceGraph2D),
  { ssr: false }
);

export default function TeacherLevelNetwork() {
  const router = useRouter();
  const [hoveredNode, setHoveredNode] = useState<any>(null);

  const teachers = [
    { name: "Alice", fullName: "Alice Johnson", levels: ["JSS"] },
    { name: "Bob", fullName: "Bob Roberts", levels: ["SSS"] },
    { name: "Carol", fullName: "Carol Smith", levels: ["JSS", "SSS"] },
    { name: "David", fullName: "David Doe", levels: ["SSS"] },
    { name: "Eve", fullName: "Eve Kamara", levels: ["JSS"] },
    { name: "Frank", fullName: "Frank Gaye", levels: ["JSS", "SSS"] },
  ];

  const graphData = useMemo(() => {
    const nodes: any[] = [];
    const links: any[] = [];
    const levels = ["JSS", "SSS"];

    // Level nodes
    for (const level of levels) {
      nodes.push({ id: level, group: "level", label: level });
    }

    // Teacher nodes and edges
    for (const teacher of teachers) {
      nodes.push({
        id: teacher.name,
        group: "teacher",
        fullName: teacher.fullName,
        levels: teacher.levels,
      });

      for (const level of teacher.levels) {
        links.push({ source: teacher.name, target: level });
      }
    }

    return { nodes, links };
  }, []);

  return (
    <div className="relative w-full h-[600px] border rounded-md shadow-md">
      {hoveredNode && hoveredNode.group === "teacher" && (
        <div
          className="absolute bg-white text-black text-sm px-3 py-1 border rounded shadow"
          style={{ top: 10, left: 10, zIndex: 1000 }}
        >
          <strong>{hoveredNode.fullName}</strong>
          <br />
          Teaches: {hoveredNode.levels.join(", ")}
        </div>
      )}

      <ForceGraph2D
        graphData={graphData}
        nodeAutoColorBy="group"
        onNodeClick={(node: any) => {
          if (node.group === "teacher") {
            router.push(`/teachers/${node.id.toLowerCase()}`);
          }
        }}
        onNodeHover={(node: any) => {
          setHoveredNode(node || null);
        }}
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = node.group === "level" ? "#FF5733" : "#3366CC";
          ctx.beginPath();
          ctx.arc(node.x!, node.y!, 6, 0, 2 * Math.PI);
          ctx.fill();

          ctx.fillStyle = "black";
          ctx.fillText(label, node.x! + 8, node.y! + 4);
        }}
        nodePointerAreaPaint={(node: any, color, ctx) => {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x!, node.y!, 10, 0, 2 * Math.PI, false);
          ctx.fill();
        }}
      />
    </div>
  );
}
