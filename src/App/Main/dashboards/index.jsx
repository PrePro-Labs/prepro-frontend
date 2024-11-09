import Tab from "../components/Tab";
import Weight from "./tabs/Weight";
import Diet from "./tabs/Diet";

const Dashboards = () => {
  const mainPanes = [
    {
      menuItem: "Diet",
      render: () => {
        return <Diet />;
      },
    },
    {
      menuItem: "Weight",
      render: () => {
        return <Weight />;
      },
    },
  ];
  return <Tab panes={mainPanes} />;
};

export default Dashboards;
