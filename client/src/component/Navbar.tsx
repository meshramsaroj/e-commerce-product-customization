import {
  faCartShopping,
  faLocationDot,
  faMagnifyingGlass,
  faStore,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import UserProfile from "./UserProfile";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950 text-white shadow-xl shadow-slate-950/10">
      <div className="mx-auto flex min-h-20 max-w-[1600px] items-center gap-4 px-4 sm:px-6">
        <NavLink to="/" className="flex shrink-0 items-center gap-3" aria-label="ShopEasy home">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/25">
            <FontAwesomeIcon icon={faStore} size="lg" />
          </span>
          <span className="text-xl font-bold tracking-tight">ShopEasy</span>
        </NavLink>

        <nav className="ml-4 hidden items-center gap-1 xl:flex" aria-label="Main navigation">
          <NavLink to="/" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white">
            Home
          </NavLink>
          <NavLink to="/products" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white">
            Products
          </NavLink>
          <NavLink to="/categories" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white">
            Categories
          </NavLink>
        </nav>

        <div className="hidden min-w-0 flex-1 items-center gap-4 lg:flex">
          <div className="flex min-w-0 items-center gap-2 text-slate-400">
            <FontAwesomeIcon icon={faLocationDot} className="shrink-0 text-orange-400" />
            <div className="min-w-0">
              <p className="truncate text-xs text-slate-500">Delivering to</p>
              <button className="truncate text-left text-xs font-medium text-slate-300 transition hover:text-orange-400">
                Current location, pincode
              </button>
            </div>
          </div>

          <div className="join ml-auto w-full max-w-md">
            <label className="input join-item min-w-0 flex-1 border-white/10 bg-white/5 px-3 text-slate-300 focus:border-orange-400">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2 text-slate-500" />
              <input
                type="search"
                placeholder="Search products..."
                className="min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </label>
            <button className="btn btn-orange join-item h-11 rounded-r-lg px-4 text-slate-950 transition hover:bg-orange-400">
              Search
            </button>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3 lg:ml-0">
          <button
            type="button"
            className="relative grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-orange-400/40 hover:bg-orange-400/10 hover:text-orange-400"
            aria-label="View cart"
          >
            <FontAwesomeIcon icon={faCartShopping} size="lg" />
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">0</span>
          </button>

          <div className="hidden sm:block">
            <UserProfile />
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 px-4 py-2 lg:hidden">
        <div className="join mx-auto max-w-2xl">
          <label className="input join-item min-w-0 flex-1 border-white/10 bg-white/5 px-3 text-slate-300 focus:border-orange-400">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2 text-slate-500" />
            <input
              type="search"
              placeholder="Search products..."
              className="min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </label>
          <button className="btn btn-orange join-item h-10 rounded-r-lg px-4 text-slate-950">Search</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;