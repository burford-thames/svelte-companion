import { QuickPickItem, QuickPickItemKind as K } from "vscode";

export const globalAttributes: QuickPickItem[] = [
  { label: "Global attributes", kind: K.Separator },
  { label: "id", description: "Unique identifier" },
  { label: "class", description: "One or more class names" },
  { label: "contenteditable", description: "Whether the content of an element is editable or not" },
  { label: "style", description: "Inline CSS styles" },
  { label: "title", description: "Tooltip text" },
  { label: "dir", description: "Text direction" },
  { label: "hidden", description: "Hidden element" },
  { label: "tabindex", description: "the tab order of an element" },
  { label: "accesskey", description: "a shortcut key to activate/focus an element" },
  { label: "draggable", description: "whether an element is draggable or not" },
  { label: "translate", description: "whether the content of an element should be translated or not" },
];

export const specificAttributes = new Map<string, QuickPickItem[]>([
  [
    "a",
    [
      { label: "href", description: "the URL of the page the link goes to" },
      { label: "target", description: "where to open the linked document" },
      { label: "download", description: "that the target will be downloaded when a user clicks on the hyperlink" },
      { label: "hreflang", description: "the language of the linked document" },
      { label: "type", description: "the media type of the linked document" },
    ],
  ],
  [
    "audio",
    [
      { label: "autoplay", description: "that the audio will start playing as soon as it is ready" },
      { label: "controls", description: "that video controls should be displayed (such as a play/pause button etc)" },
      { label: "loop", description: "that the audio will start over again, every time it is finished" },
      { label: "muted", description: "that the audio output of the video should be muted" },
      { label: "preload", description: "if and how the author thinks the audio should be loaded when the page loads" },
      { label: "src", description: "the URL of the audio file" },
    ],
  ],
  [
    "button",
    [
      { label: "type", description: "the type of button" },
      { label: "value", description: "an initial value for the button" },
      { label: "disabled", description: "that a button should be disabled" },
      { label: "autofocus", description: "that a button should automatically get focus when the page loads" },
      { label: "form", description: "one or more forms the button belongs to" },
      { label: "formaction", description: "where to send the form-data when a form is submitted" },
    ],
  ],
  [
    "canvas",
    [
      { label: "width", description: "the width of a canvas" },
      { label: "height", description: "the height of a canvas" },
    ],
  ],
  [
    "col",
    [
      { label: "span", description: "the number of columns a col element should span" },
      { label: "width", description: "the width of the columns, in pixels" },
    ],
  ],
  [
    "colgroup",
    [
      { label: "span", description: "the number of columns a col element should span" },
      { label: "width", description: "the width of the columns, in pixels" },
    ],
  ],
  [
    "embed",
    [
      { label: "src", description: "the URL of the media file" },
      { label: "type", description: "the media type of the media file" },
      { label: "width", description: "the width of the media file" },
      { label: "height", description: "the height of the media file" },
    ],
  ],
  [
    "fieldset",
    [
      { label: "disabled", description: "that a fieldset should be disabled" },
      { label: "form", description: "one or more forms the fieldset belongs to" },
    ],
  ],
  [
    "form",
    [
      { label: "action", description: "where to send the form-data when a form is submitted" },
      { label: "method", description: "how to send the form-data (which HTTP method to use)" },
      { label: "target", description: "where to display the response that is received after submitting the form" },
      { label: "autocomplete", description: "whether a form should have autocomplete on or off" },
      { label: "novalidate", description: "that the form should not be validated when submitted" },
      { label: "accept-charset", description: "the character encodings that are to be used for the form submission" },
      { label: "enctype", description: "how the form-data should be encoded when submitting it to the server" },
    ],
  ],
  [
    "iframe",
    [
      { label: "src", description: "the URL of the page to embed" },
      { label: "srcdoc", description: "the HTML content of the page to embed" },
      { label: "name", description: "a name for the iframe" },
      { label: "sandbox", description: "Enables an extra set of restrictions for the content in an iframe" },
      { label: "allow", description: "feature policy for the iframe" },
      { label: "allowfullscreen", description: "that the iframe should be displayed in full-screen mode" },
      { label: "width", description: "the width of the iframe" },
      { label: "height", description: "the height of the iframe" },
      { label: "referrerpolicy", description: "which referrer to send when fetching the iframe" },
      { label: "loading", description: "how the element handles loading of the iframe" },
    ],
  ],
  [
    "img",
    [
      { label: "alt", description: "an alternate text for an image" },
      { label: "src", description: "the URL of the image" },
      { label: "height", description: "the height of the image" },
      { label: "width", description: "the width of the image" },
      { label: "srcset", description: "the URL of the image to use in different situations" },
    ],
  ],
  [
    "input",
    [
      { label: "accept", description: "the types of files to upload" },
      { label: "alt", description: "an alternate text for the image" },
      { label: "autocomplete", description: "whether an input field should have autocomplete on or off" },
      { label: "autofocus", description: "that an input field should automatically get focus when the page loads" },
      { label: "checked", description: "that an input field should be pre-selected when the page loads" },
      { label: "dirname", description: "that the text direction will be submitted" },
      { label: "disabled", description: "that a button should be disabled" },
      { label: "form", description: "one or more forms the input element belongs to" },
      { label: "formaction", description: "where to send the form-data when a form is submitted" },
      { label: "height", description: "the height of the image" },
      { label: "max", description: "the maximum value for an input field" },
      { label: "maxlength", description: "the maximum number of characters allowed in an input field" },
      { label: "min", description: "the minimum value for an input field" },
      { label: "multiple", description: "that a user can enter more than one value" },
      { label: "name", description: "a name for the input field" },
      { label: "pattern", description: "a regular expression that an input element's value is checked against" },
      { label: "placeholder", description: "a short hint that describes the expected value of an input field" },
      { label: "readonly", description: "that an input field is read-only" },
      { label: "required", description: "that an input field must be filled out before submitting the form" },
      { label: "size", description: 'the width, in characters (for <input type="text"> or <textarea>) or the number of visible options (for <select>)' },
      { label: "src", description: "the URL of the image" },
      { label: "step", description: "the legal number intervals for an input field" },
      { label: "type", description: "the type <input> element to display" },
      { label: "value", description: "the value of an <input> element" },
      { label: "width", description: "the width of the image" },
    ],
  ],
  [
    "label",
    [
      { label: "for", description: "which form element a label is bound to" },
      { label: "form", description: "one or more forms the label belongs to" },
    ],
  ],
  [
    "li",
    [
      { label: "value", description: "the value of a list item" },
    ],
  ],
  [
    "ol",
    [
      { label: "reversed", description: "that the list order should be descending (9,8,7...)" },
      { label: "start", description: "the start value of an ordered list" },
      { label: "type", description: "the type of marker for ordered lists" },
    ],
  ],
  [
    "optgroup",
    [
      { label: "disabled", description: "that a button should be disabled" },
      { label: "label", description: "a label for an option-group" },
    ],
  ],
  [
    "option",
    [
      { label: "disabled", description: "that a button should be disabled" },
      { label: "label", description: "a shorter label for an option" },
      { label: "selected", description: "that an option should be pre-selected when the page loads" },
      { label: "value", description: "the value to be sent to a server" },
    ],
  ],
  [
    "progress",
    [
      { label: "value", description: "the current value of a progress element" },
      { label: "max", description: "the maximum value of a progress element" },
    ],
  ],
  [
    "select",
    [
      { label: "autofocus", description: "that a select list should automatically get focus when the page loads" },
      { label: "disabled", description: "that a button should be disabled" },
      { label: "form", description: "one or more forms the select list belongs to" },
      { label: "multiple", description: "that a user can enter more than one value" },
      { label: "name", description: "a name for the select list" },
      { label: "required", description: "that a select list must be filled out before submitting the form" },
      { label: "size", description: "the number of visible options in a drop-down list" },
    ],
  ],
  [
    "source",
    [
      { label: "src", description: "the URL of the media file" },
      { label: "type", description: "the media type of the media source" },
      { label: "media", description: "what media/device the media resource is optimized for" },
      { label: "sizes", description: "the size of the media resource" },
      { label: "srcset", description: "the URL of the image to use in different situations" },
    ],
  ],
  [
    "td",
    [
      { label: "colspan", description: "the number of columns a table cell should span" },
      { label: "rowspan", description: "the number of rows a table cell should span" },
    ],
  ],
  [
    "textarea",
    [
      { label: "autofocus", description: "that a textarea should automatically get focus when the page loads" },
      { label: "cols", description: "the visible width of a text area" },
      { label: "dirname", description: "that the text direction will be submitted" },
      { label: "disabled", description: "that a button should be disabled" },
      { label: "form", description: "one or more forms the textarea belongs to" },
      { label: "maxlength", description: "the maximum number of characters allowed in an input field" },
      { label: "name", description: "a name for the textarea" },
      { label: "placeholder", description: "a short hint that describes the expected value of an input field" },
      { label: "readonly", description: "that an input field is read-only" },
      { label: "required", description: "that a textarea must be filled out before submitting the form" },
      { label: "rows", description: "the visible number of lines in a text area" },
      { label: "wrap", description: "how the text in a text area is to be wrapped when submitted in a form" },
    ],
  ],
  [
    "th",
    [
      { label: "colspan", description: "the number of columns a table header cell should span" },
      { label: "rowspan", description: "the number of rows a table header cell should span" },
    ],
  ],
  [
    "video",
    [
      { label: "autoplay", description: "that the video will start playing as soon as it is ready" },
      { label: "controls", description: "that video controls should be displayed (such as a play/pause button etc)" },
      { label: "height", description: "the height of the video" },
      { label: "loop", description: "that the video will start over again, every time it is finished" },
      { label: "muted", description: "that the audio output of the video should be muted" },
      { label: "poster", description: "an image to be shown while the video is downloading, or until the user hits the play button" },
      { label: "preload", description: "if and how the author thinks the video should be loaded when the page loads" },
      { label: "src", description: "the URL of the video file" },
      { label: "width", description: "the width of the video" },
    ],
  ],
]);
