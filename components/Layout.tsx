import { Layout, Typography, Row, Col } from 'antd';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const { Content, Footer } = Layout;

/**
 * Base layout component for centering page content and displaying the site footer.
 */
export default function PageLayout({ children }: Props) {
  return (
    <Layout style={{ backgroundColor: 'white' }}>
      <Content style={{ padding: '32px 0' }}>
        <Row justify="center">
          <Col xs={22} sm={22} md={22} lg={16} xl={12} xxl={12}>
            {children}
          </Col>
        </Row>
      </Content>
      <Footer data-testid="Footer">
        <Row justify="center">
          <Col xs={22} sm={22} md={22} lg={16} xl={12} xxl={12}>
            <Typography.Text>
              © James Taylor (on behalf of Checkout.com).
            </Typography.Text>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
}
