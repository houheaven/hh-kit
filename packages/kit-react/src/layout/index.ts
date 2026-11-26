
import Header from "./header.tsx";
import Layout from "./layout.tsx";

type LayoutType = typeof Layout;
type LayoutFinalType = LayoutType & {
  Header: typeof Header;
};
const LayoutFinal = Layout as LayoutFinalType;
LayoutFinal.Header = Header;

export default LayoutFinal;
