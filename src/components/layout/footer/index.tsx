import { Layout } from 'antd'
import { Footer } from 'antd/es/layout/layout'

function LayoutFooter() {
    return (
        <Layout.Footer>
            <Footer style={{ textAlign: 'center' }}>
                Ligth Cooffee ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout.Footer>
    )
}

export default LayoutFooter
