import "./Sidebar.css";

export default function Sidebar({
  menuItems,
  active,
  setActive,
  title = "Menu",
  isOpen = true,
}) {
  return (
    <div className={`sidebar ${isOpen ? "" : "closed"}`}>
      <h3 className="sidebar-title">{title}</h3>

      {menuItems.map((item) => (
        <div
          key={item.key}
          className={`menu-item ${active === item.key ? "active" : ""}`}
          onClick={() => setActive(item.key)}
        >
          {item.icon} {item.label}
        </div>
      ))}
    </div>
  );
}