import './index.css'
import ForegroundColors from './ForegroundColors';
import BackgroundColors from './BackgroundColors';
import Borders from './Borders';
import Padding from './Padding';
import Margins from './Margins';
import Dimensions from './Dimensions';
import Corners from './Corners';
import Positions from './Positions';
import Zindex from './Zindex';
import Float from './Float';
import GridLayout from './GridLayout';
import Flex from './Flex';
import ReactIcons from './ReactIcons';
import { Container } from 'react-bootstrap';
import BootstrapGrids from './BootstrapGrids';
import ScreenSizeLabel from './ScreenSizeLabel';
import BootstrapTables from './BootstrapTables';
import BootstrapLists from './BootstrapLists';
import BootstrapForms from './BootstrapForms';
import BootstrapNavigation from './BootstrapNavigation';
export default function Lab2() {
  return (
    <Container>
      <h2>Lab 2 - Cascading Style Sheets - Anton Menchaca - Summer 2 2025</h2>
      <h3>Styling with the STYLE attribute</h3>
      <p >
        Style attribute allows configuring look and feel
        right on the element. Although it's very convenient
        it is considered bad practice and you should avoid
        using the style attribute
      </p>
      <div id="wd-css-id-selectors">
        <h3>ID selectors</h3>
        <p id="wd-id-selector-1">
          Instead of changing the look and feel of all the
          elements of the same name, e.g., P, we can refer to a specific element by its ID
        </p>
        <p id="wd-id-selector-2">
          Here's another paragraph using a different ID and a different look and
          feel
        </p>
      </div>
      <div id="wd-css-class-selectors">
        <h3>Class selectors</h3>

        <p className="wd-class-selector">
          Instead of using IDs to refer to elements, you can use an element's CLASS attribute
        </p>

        <h4 className="wd-class-selector">
          This heading has same style as paragraph above
        </h4>

      </div>
      <div id="wd-css-document-structure">
        <div className="wd-selector-1">
          <h3>Document structure selectors</h3>
          <div className="wd-selector-2">
            Selectors can be combined to refer elements in particular
            places in the document
            <p className="wd-selector-3">
              This paragraph's red background is referenced as
              <br />
              .selector-2 .selector3<br />
              meaning the descendant of some ancestor.<br />
              <span className="wd-selector-4">
                Whereas this span is a direct child of its parent
              </span><br />
              You can combine these relationships to create specific
              styles depending on the document structure
            </p>
          </div>
        </div>
      </div>
      <ForegroundColors />
      <br />
      <BackgroundColors />
      <br />
      <Borders />
      <br />
      <Padding />
      <br />
      <Margins />
      <br />
      <Corners />
      <br />
      <Dimensions />
      <br />
      <Positions />
      <br />
      <Zindex />
      <br />
      <Float />
      <br />
      <GridLayout />
      <br />
      <Flex />
      <br />
      <ReactIcons />
      <br />
      <BootstrapGrids />
      <br />
      <ScreenSizeLabel />
      <br />
      <BootstrapTables />
      <br />
      <BootstrapLists />
      <br />
      <BootstrapForms />
      <br />
      <BootstrapNavigation />
    </Container>);
}