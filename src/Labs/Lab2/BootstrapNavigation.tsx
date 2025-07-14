import Nav from 'react-bootstrap/Nav';
export default function BootstrapNavigation() {
  return (
    <div id="wd-css-navigating-with-tabs">
      <h2>Tabs</h2>
      <Nav defaultActiveKey="#/Labs/Lab2/Active" variant="tabs">
        <Nav.Item>
          <Nav.Link href="#/Labs/Lab2/Active">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#/Labs/Lab2/Link1">Link 1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#/Labs/Lab2/Link2">Link 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#/Labs/Lab2/Disabled" disabled>Disabled</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  )
}