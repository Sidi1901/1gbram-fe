import {
  ThunderboltOutlined,
  SafetyCertificateOutlined,
  TrophyOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

const REASONS = [
  {
    icon: <ThunderboltOutlined />,
    color: "text-amber-500",
    bg: "bg-amber-50",
    title: "Save Time",
    desc: "Instantly check requirements without browsing multiple sites.",
  },
  {
    icon: <SafetyCertificateOutlined />,
    color: "text-green-500",
    bg: "bg-green-50",
    title: "Avoid Issues",
    desc: "Know in advance if your system can handle the software.",
  },
  {
    icon: <TrophyOutlined />,
    color: "text-blue-500",
    bg: "bg-blue-50",
    title: "Perfect for Gaming",
    desc: "Check requirements for games, Blender, Photoshop & more.",
  },
  {
    icon: <BarChartOutlined />,
    color: "text-violet-500",
    bg: "bg-violet-50",
    title: "Quick Comparison",
    desc: "Easily compare minimum vs recommended specs at a glance.",
  },
];

export default function WhyThisTool() {
  return (
    <div>
      <div className="text-center mb-10 animate-fade-in-up">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
          Why use this tool?
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {REASONS.map(({ icon, color, bg, title, desc }, i) => (
          <div
            key={title}
            className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl p-4 flex flex-col transition-shadow duration-300 animate-fade-in-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div
              className={`w-10 h-10 rounded-xl ${bg} ${color} flex items-center justify-center text-xl mb-2`}
            >
              {icon}
            </div>
            <h3 className="font-bold text-gray-900 text-sm mb-1">{title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
