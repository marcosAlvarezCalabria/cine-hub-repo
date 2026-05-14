import "./page-layout.css";

function PageLayout({ children, background, className }) {
  return (
    <div
      className={`page-layout ${className || ""}`.trim()}
      style={background ? { backgroundImage: `url(${background})` } : undefined}
    >
      <div className="page-layout__content">{children}</div>
    </div>
  );
}

export default PageLayout;
