export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <br />
      <br />

      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade As</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option value="Percentage">Percentage</option>
              <option value="Points">Points</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option value="Online">Online</option>
              <option value="In-Person">In-Person</option>
            </select>

            <h5 id="wd-online-entry-options">Online Entry Options</h5>
            <input type="checkbox" name="entry-option" id="wd-text-entry" />
            <label htmlFor="wd-text-entry">Text Entry</label><br />
            <input type="checkbox" name="entry-option" id="wd-website-url" />
            <label htmlFor="wd-website-url">Website URL</label><br />
            <input type="checkbox" name="entry-option" id="wd-media-recordings" />
            <label htmlFor="wd-media-recordings">Media Recordings</label><br />
            <input type="checkbox" name="entry-option" id="wd-student-annotation" />
            <label htmlFor="wd-student-annotation">Student Annotation</label>
            <br />
            <input type="checkbox" name="entry-option" id="wd-file-upload" />
            <label htmlFor="wd-file-upload">File Uploads</label>

          </td>
        </tr>
        <tr>
          <td >
            <label htmlFor="wd-assign-to">Assign Assign to</label>
          </td>
        </tr>
        <tr>
          <td>
            <select multiple={true} id="wd-assign-to" value="Everyone">
              <option value="Everyone">Everyone</option>
            </select>
          </td>
        </tr>
        <tr>
          <td >
            <label htmlFor="wd-due-date">Due</label>
          </td>
        </tr>
        <tr>
          <td>
            <input type="date"
              value="2024-05-13"
              id="wd-due-date" /><br />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="wd-available-from">Available from</label><br />
            <input type="date" id="wd-available-from" value="2024-05-06" />
          </td>
          <td>
            <label htmlFor="wd-available-until">Until</label><br />
            <input type="date" id="wd-available-until" value="2024-05-20" />
          </td>
        </tr>
        <br />
        <tr>
          <td>
            <button id="wd-cancel-assignment">Cancel</button>
            <button id="wd-save-assignment">Save</button>
          </td>
        </tr>
      </table>
    </div >
  );
}
