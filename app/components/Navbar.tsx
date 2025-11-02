export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <p className="btn btn-ghost text-2xl md:text-3xl font-bold">Doable</p>
      </div>
      <div className="navbar-end">
        <button className="btn btn-primary">Login</button>
      </div>
    </div>
  );
}
