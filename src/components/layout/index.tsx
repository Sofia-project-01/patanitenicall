import { Layout } from "antd"
import SiderLayout from "./sider"
import ContentLayout from "./content"
import HeaderLayout from "./header"

function LayoutApp() {
  return (
    <Layout>
        <SiderLayout />
        <Layout className="w-[100vw] h-[100vh] overflow-x-hidden">
            <HeaderLayout />
            <ContentLayout />
        </Layout>
    </Layout>
  )
}

export default LayoutApp
