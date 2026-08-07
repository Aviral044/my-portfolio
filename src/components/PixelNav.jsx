// PixelNav — chunky 8-bit navigation bar
import { useState } from "react";

const PixelNav = ({ items }) => {
  const [active, setActive] = useState(items?.[0]?.href ?? "#");

  return (
    <nav
      className="pixel-panel-sm flex items-stretch bg-[#0c0d16] p-1 gap-1"
      style={{ borderColor: "#333c57" }}
    >
      {items.map((item) => {
        const isActive = active === item.href;
        return (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setActive(item.href)}
            className="font-pixel text-[8px] md:text-[10px] px-2.5 md:px-4 py-2.5 whitespace-nowrap no-underline transition-colors duration-100"
            style={{
              backgroundColor: isActive ? "#ffcd75" : "transparent",
              color: isActive ? "#1a1c2c" : "#94b0c2",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = "#29366f";
                e.currentTarget.style.color = "#f4f4f4";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#94b0c2";
              }
            }}
          >
            {item.label.toUpperCase()}
          </a>
        );
      })}
    </nav>
  );
};

export default PixelNav;
