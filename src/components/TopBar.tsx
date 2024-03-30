import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import useSidebarStore from "~/stores/sidebarStore";

const TopBar = ({ title }: { title: string }) => {
  const toggleSidebar = useSidebarStore((state) => state.toggle);

  return (
    <div className="flex w-full items-baseline justify-between">
      <h1 className="font-serif text-5xl">{title}</h1>
      {/* burger menu */}
      <button className="btn btn-ghost aspect-square" onClick={toggleSidebar}>
        <Icon icon="bx:bx-menu" width="32" height="32" />
      </button>
    </div>
  );
};

export default TopBar;
