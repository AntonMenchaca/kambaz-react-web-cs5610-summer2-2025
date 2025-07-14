import { FormGroup, FormLabel, FormControl, FormSelect, Form } from "react-bootstrap";
import FormRange from "react-bootstrap/esm/FormRange";
export default function BootstrapForms() {
  return (
    <div>
      <div id="wd-css-styling-forms">
        <h2>Forms</h2>
        <FormGroup className="mb-3" controlId="wd-email">
          <FormLabel>Email address</FormLabel>
          <FormControl type="email" placeholder="name@example.com" />
        </FormGroup>
        <FormGroup className="mb-3" controlId="wd-textarea">
          <FormLabel>Example textarea</FormLabel>
          <FormControl as="textarea" rows={3} />
        </FormGroup>
      </div>
      <br />
      <div id="wd-css-styling-dropdowns">
        <h3>Dropdowns</h3>
        <FormSelect>
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </FormSelect>
      </div>
      <br />
      <div id="wd-css-styling-switches">
        <h3>Switches</h3>
        <Form.Check type="switch" checked={false} id="wd-switch-1"
          label="Unchecked switch checkbox input" />
        <Form.Check type="switch" checked={true} id="wd-switch-2"
          label="Checked switch checkbox input" />
        <Form.Check type="switch" checked={false} disabled
          id="custom-switch"
          label="Unchecked disabled switch checkbox input" />
        <Form.Check type="switch" checked={true} disabled
          id="custom-switch"
          label="Checked disabled switch checkbox input" />
      </div>
      <br />
      <div id="wd-css-styling-range-and-sliders">
        <h3>Range</h3>
        <FormGroup controlId="wd-range1">
          <FormLabel>Example range</FormLabel>
          <FormRange min="0" max="5" step="0.5" />
        </FormGroup>
      </div>

    </div>
  )
}