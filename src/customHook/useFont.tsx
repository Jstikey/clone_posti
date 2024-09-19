import { IconContext } from "react-icons";

export const useFont = () => {
  function BlueLargeIcon({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) {
    return (
      <IconContext.Provider value={{ className }}>
        {children}
      </IconContext.Provider>
    );
  }

  return { BlueLargeIcon };
};
