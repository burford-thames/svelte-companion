import { QuickPickItem, QuickPickItemKind as K } from "vscode";
import { AttributeValues } from "../types/AttributeValueTypes";

export const globalAttributes: QuickPickItem[] = [
  { label: "Global attributes", kind: K.Separator },
  { label: "id", description: "Unique identifier" },
  { label: "class", description: "One or more class names" },
  { label: "contenteditable", description: "Whether the content of an element is editable or not" },
  { label: "style", description: "Inline CSS styles" },
  { label: "title", description: "Tooltip text" },
  { label: "dir", description: "Text direction" },
  { label: "hidden", description: "Hidden element" },
  { label: "tabindex", description: "The tab order of an element" },
  { label: "draggable", description: "Specify whether an element is draggable or not" },

  { label: "Global events", kind: K.Separator },
  { label: "on:click", description: "The element is being clicked event" },
  { label: "on:mouseenter", description: "Mouse enter event" },
  { label: "on:mousedown", description: "Mouse down event" },
  { label: "on:mouseup", description: "Mouse up event" },
  { label: "on:mouseleave", description: "Mouse leave event" },
  { label: "on:mouseover", description: "Mouse over event" },
  { label: "on:mouseout", description: "Mouse out event" },
  { label: "on:mousewheel", description: "Mouse wheel event"},
  { label: "on:mousemove", description: "Mouse move event" },
  { label: "on:keydown", description: "Key down event" },
  { label: "on:keyup", description: "Key up event" },
  { label: "on:keypress", description: "Key press event" },
  { label: "on:blur", description: "Element loses focus event" },
  { label: "on:focus", description: "Focus event" },
  { label: "on:change", description: "The value of the element is changed event" },
  { label: "on:input", description: "Input event" },
  { label: "on:submit", description: "Submit event" },
  { label: "on:contextmenu", description: "Context menu event" },
  { label: "on:dblclick", description: "Double click event" },
  { label: "on:select", description: "Select event" },
  { label: "on:touchstart", description: "Touch start event" },
  { label: "on:touchend", description: "Touch end event" },
  { label: "on:touchmove", description: "Touch move event" },
  { label: "on:touchcancel", description: "Touch cancel event" },
  { label: "on:wheel", description: "Wheel event" },
  { label: "on:scroll", description: "Scroll event" },
  { label: "on:copy", description: "The content of the element is being copied event" },
  { label: "on:cut", description: "The content of the element is being cut event" },
  { label: "on:paste", description: "Paste event" },
  { label: "on:dragstart", description: "Drag start event" },
  { label: "on:drag", description: "Drag event" },
  { label: "on:dragend", description: "Drag end event" },
  { label: "on:dragenter", description: "Drag enter event" },
  { label: "on:dragover", description: "Drag over event" },
  { label: "on:dragleave", description: "Drag leave event" },
  { label: "on:drop", description: "Drop event" },
  { label: "on:error", description: "Error event" }, // TODO: Add to correct place
];

export const specificAttributes = new Map<string, QuickPickItem[]>([
  [
    "a",
    [
      { label: "href", description: "The URL of the page the link goes to" },
      { label: "target", description: "Where to open the linked document" },
      { label: "download", description: "The target will be downloaded when a user clicks on the hyperlink" },
      { label: "hreflang", description: "The language of the linked document" },
      { label: "type", description: "The media type of the linked document" },
    ],
  ],
  [
    "audio",
    [
      { label: "src", description: "The URL of the audio file" },
      { label: "controls", description: "Video controls should be displayed (such as a play/pause button etc)" },
      { label: "autoplay", description: "The audio will start playing as soon as it is ready" },
      { label: "loop", description: "The audio will start over again, every time it is finished" },
      { label: "muted", description: "The audio output of the video should be muted" },
      { label: "preload", description: "The audio will be loaded when the page loads" },
    ],
  ],
  [
    "button",
    [
      { label: "type", description: "The type of button" },
      { label: "value", description: "An initial value for the button" },
      { label: "disabled", description: "Disable the button" },
      { label: "autofocus", description: "Focus the button when the page loads" },
      { label: "form", description: "Specify form(s) the button belongs to" },
      { label: "formaction", description: "Where to send the form-data when a form is submitted" },
    ],
  ],
  [
    "canvas",
    [
      { label: "width", description: "The width of a canvas" },
      { label: "height", description: "The height of a canvas" },
    ],
  ],
  [
    "col",
    [
      { label: "span", description: "The number of columns a col element should span" },
      { label: "width", description: "The width of the columns, in pixels" },
    ],
  ],
  [
    "colgroup",
    [
      { label: "span", description: "The number of columns a col element should span" },
      { label: "width", description: "The width of the columns, in pixels" },
    ],
  ],
  [
    "embed",
    [
      { label: "src", description: "The URL of the file" },
      { label: "type", description: "The media type of the file" },
      { label: "width", description: "The width of the file" },
      { label: "height", description: "The height of the file" },
    ],
  ],
  [
    "fieldset",
    [
      { label: "disabled", description: "Disable the fieldset" },
      { label: "form", description: "Specify form(s) the fieldset belongs to" },
    ],
  ],
  [
    "form",
    [
      { label: "action", description: "Where to send the form-data when a form is submitted" },
      { label: "method", description: "How to send the form-data (which HTTP method to use)" },
      { label: "target", description: "Where to display the response that is received after submitting the form" },
      { label: "autocomplete", description: "Turn autocomplete on or off" },
      { label: "novalidate", description: "Specify that the form should not be validated when submitted" },
      { label: "accept-charset", description: "The character encodings that are to be used for the form submission" },
      { label: "enctype", description: "How the form-data should be encoded when submitting it to the server" },
      { label: "on:submit", description: "Submit event" },
    ],
  ],
  [
    "iframe",
    [
      { label: "src", description: "The URL of the page to embed" },
      { label: "srcdoc", description: "The HTML content of the page to embed" },
      { label: "name", description: "A name for the iframe" },
      { label: "sandbox", description: "Enables an extra set of restrictions for the content in an iframe" },
      { label: "allow", description: "Feature policy for the iframe" },
      { label: "allowfullscreen", description: "Allow the iframe to display in full-screen mode" },
      { label: "referrerpolicy", description: "Specify which referrer to send when fetching the iframe" },
      { label: "crossorigin", description: "How the element handles crossorigin requests" },
      { label: "loading", description: "How the element handles loading of the iframe" },
      { label: "width", description: "The width of the iframe" },
      { label: "height", description: "The height of the iframe" },
    ],
  ],
  [
    "img",
    [
      { label: "alt", description: "An alternate text for an image" },
      { label: "src", description: "The URL of the image" },
      { label: "srcset", description: "The URL of the image to use in different situations" },
      { label: "width", description: "The width of the image" },
      { label: "height", description: "The height of the image" },
    ],
  ],
  [
    "input",
    [
      { label: "type", description: "The type <input> element to display" },
      { label: "value", description: "The value of an <input> element" },
      { label: "name", description: "A name for the input field" },
      { label: "disabled", description: "Disable the input" },
      { label: "readonly", description: "Specify that an input field is read-only" },
      { label: "autofocus", description: "Focus the input when the page loads" },
      { label: "required", description: "Specify that an input field must be filled out before submitting the form" },
      { label: "width", description: "The width of the image" },
      { label: "height", description: "The height of the image" },

      { label: "Text input", kind: K.Separator },
      { label: "placeholder", description: "A short hint that describes the expected value of an input field" },
      { label: "autocomplete", description: "Turn autocomplete on or off" },
      { label: "pattern", description: "A regular expression that an input element's value is checked against" },
      { label: "dirname", description: "The text direction will be submitted" },
      { label: "size", description: "The width, in characters" },
      { label: "maxlength", description: "The maximum number of characters allowed in an input field" },

      { label: "Submit button", kind: K.Separator },
      { label: "src", description: "The URL of an image that represents the submit button" },
      { label: "alt", description: "An alternate text for the image submit button" },

      { label: "File input", kind: K.Separator },
      { label: "accept", description: "The types of files to upload" },

      { label: "Checkbox", kind: K.Separator },
      { label: "checked", description: "Pre-selected an input field when the page loads" },
      { label: "multiple", description: "Specify that an user can enter more than one value" },

      { label: "Step", kind: K.Separator },
      { label: "step", description: "The legal number intervals for an input field" },
      { label: "min", description: "The minimum value for an input field" },
      { label: "max", description: "The maximum value for an input field" },

      { label: "Events", kind: K.Separator },
      { label: "on:search", description: "Script to be run when the user writes something in a search field (for input type search>)" },

      { label: "Misc.", kind: K.Separator },
      { label: "form", description: "One or more forms the input element belongs to" },
      { label: "formaction", description: "Where to send the form-data when a form is submitted" },
    ],
  ],
  [
    "label",
    [
      { label: "for", description: "Which form element a label is bound to" },
      { label: "form", description: "Form(s) the label belongs to" },
    ],
  ],
  ["li", [{ label: "value", description: "The value of a list item" }]],
  [
    "ol",
    [
      { label: "reversed", description: "That the list order should be descending (9,8,7...)" },
      { label: "start", description: "The start value of an ordered list" },
      { label: "type", description: "The type of marker for ordered lists" },
    ],
  ],
  [
    "optgroup",
    [
      { label: "disabled", description: "Disable the optgroup" },
      { label: "label", description: "A label for an option-group" },
    ],
  ],
  [
    "option",
    [
      { label: "disabled", description: "Disable the option" },
      { label: "label", description: "A label for an option" },
      { label: "selected", description: "Pre-selecte when the page loads" },
      { label: "value", description: "The value to be sent to a server" },
    ],
  ],
  [
    "progress",
    [
      { label: "value", description: "The current value of a progress element" },
      { label: "max", description: "The maximum value of a progress element" },
    ],
  ],
  [
    "select",
    [
      { label: "autofocus", description: "Automatically get focus when the page loads" },
      { label: "disabled", description: "Disable the select" },
      { label: "form", description: "Form(s) the select list belongs to" },
      { label: "multiple", description: "User can enter more than one value" },
      { label: "name", description: "A name for the select list" },
      { label: "required", description: "A select list must be filled out before submitting the form" },
      { label: "size", description: "The number of visible options in a drop-down list" },
    ],
  ],
  [
    "source",
    [
      { label: "src", description: "The URL of the media file" },
      { label: "type", description: "The media type of the media source" },
      { label: "media", description: "What media/device the media resource is optimized for" },
      { label: "sizes", description: "The size of the media resource" },
      { label: "srcset", description: "The URL of the image to use in different situations" },
    ],
  ],
  [
    "td",
    [
      { label: "colspan", description: "The number of columns a table cell should span" },
      { label: "rowspan", description: "The number of rows a table cell should span" },
    ],
  ],
  [
    "textarea",
    [
      { label: "autofocus", description: "Focus when the page loads" },
      { label: "cols", description: "The visible width of a text area" },
      { label: "dirname", description: "The text direction will be submitted" },
      { label: "disabled", description: "Disable the textarea" },
      { label: "form", description: "Form(s) the textarea belongs to" },
      { label: "maxlength", description: "The maximum number of characters allowed in an input field" },
      { label: "name", description: "A name for the textarea" },
      { label: "placeholder", description: "A short hint that describes the expected value of an input field" },
      { label: "readonly", description: "Specify that an input field is read-only" },
      { label: "required", description: "The textarea must be filled out before submitting the form" },
      { label: "rows", description: "The visible number of lines in a text area" },
      { label: "wrap", description: "Specify how the text in a text area is to be wrapped when submitted in a form" },
    ],
  ],
  [
    "th",
    [
      { label: "colspan", description: "The number of columns a table header cell should span" },
      { label: "rowspan", description: "The number of rows a table header cell should span" },
    ],
  ],
  [
    "video",
    [
      { label: "src", description: "The URL of the video file" },
      { label: "poster", description: "An image to be shown while the video is downloading, or until the user hits the play button" },
      { label: "autoplay", description: "The video will start playing as soon as it is ready" },
      { label: "controls", description: "Specify that video controls should be displayed (such as a play/pause button etc)" },
      { label: "loop", description: "The video will start over again, every time it is finished" },
      { label: "muted", description: "That the audio output of the video should be muted" },
      { label: "preload", description: "Load when the page loads" },
      { label: "width", description: "The width of the video" },
      { label: "height", description: "The height of the video" },

      { label: "Events", kind: K.Separator },
      { label: "on:canplay", description: "The browser can start playing the video (when it has buffered enough to begin)" },
      { label: "on:canplaythrough", description: "The browser can play through the video without stopping for buffering" },
      { label: "on:durationchange", description: "Script to be run when the length of the media changes" },
      { label: "on:emptied", description: "Script to be run when something bad happens and the file is suddenly unavailable" },
      { label: "on:ended", description: "Script to be run when the media has reach the end (a useful event for messages like \"thanks for listening\")" },
      { label: "on:loadeddata", description: "Script to be run when the browser has loaded the current frame of the video" },
      { label: "on:loadedmetadata", description: "Script to be run when the browser has loaded meta data for the video" },
      { label: "on:loadstart", description: "Script to be run when the browser starts looking for the specified video" },
      { label: "on:pause", description: "Script to be run when the media has been paused" },
      { label: "on:play", description: "Script to be run when the media has been started or is no longer paused" },
      { label: "on:playing", description: "Script to be run when the media has started playing" },
      { label: "on:progress", description: "Script to be run when the browser is in the process of getting the media data" },
      { label: "on:ratechange", description: "Script to be run each time the playback rate changes (like when a user switches to a slow motion or fast forward mode)" },
      { label: "on:seeked", description: "Script to be run when the user is finished moving/skipping to a new position in the video" },
      { label: "on:seeking", description: "Script to be run when the user starts moving/skipping to a new position in the video" },
      { label: "on:stalled", description: "Script to be run when the browser is trying to get media data, but data is not available" },
      { label: "on:suspend", description: "Script to be run when the browser is intentionally not getting media data" },
      { label: "on:timeupdate", description: "Script to be run when the current playback position has changed (like when the user fast forwards to a different point in the media)" },
      { label: "on:volumechange", description: "Script to be run each time the volume is changed which (includes setting the volume to \"mute\")" },
      { label: "on:waiting", description: "Script to be run when the video stops because it needs to buffer the next frame" },
    ],
  ],
]);

export const values = new Map<string, AttributeValues>([
  [
    "id",
    {
      type: "input",
    },
  ],
  [
    "class",
    {
      type: "input",
    },
  ],
  [
    "contenteditable",
    {
      type: "single-select",
      values: [
        { label: "true", description: "The element is editable" },
        { label: "false", description: "The element is not editable" },
      ],
    },
  ],
  [
    "title",
    {
      type: "input",
      values: [],
    },
  ],
  [
    "dir",
    {
      type: "single-select",
      values: [
        { label: "ltr", description: "Left-to-right text direction" },
        { label: "rtl", description: "Right-to-left text direction" },
        { label: "auto", description: "Default direction" },
      ],
    },
  ],
  [
    "hidden",
    {
      type: "empty",
    },
  ],
  [
    "tabindex",
    {
      type: "input",
    },
  ],
  [
    "draggable",
    {
      type: "single-select",
      values: [
        { label: "true", description: "The element is draggable" },
        { label: "false", description: "The element is not draggable" },
      ],
    },
  ],
  [
    "href",
    {
      type: "input",
    },
  ],
  [
    "target",
    {
      type: "single-select",
      values: [
        { label: "_blank", description: "Opens the linked document in a new window or tab" },
        { label: "_self", description: "Opens the linked document in the same frame as it was clicked (this is default)" },
        { label: "_parent", description: "Opens the linked document in the parent frame" },
        { label: "_top", description: "Opens the linked document in the full body of the window" },
        { label: "framename", description: "Opens the linked document in a named frame" },
      ],
    },
  ],
  [
    "download",
    {
      type: "empty",
    },
  ],
  [
    "hreflang",
    {
      type: "input",
    },
  ],
  [
    "type",
    {
      type: "single-select",
      values: [
        { label: "Input", kind: K.Separator },
        { label: "button", description: "Defines a clickable button (mostly used with a JavaScript to activate a script)" },
        { label: "checkbox", description: "Defines a checkbox" },
        { label: "color", description: "Defines a color picker" },
        { label: "date", description: "Defines a date control (year, month and day (no time))" },
        { label: "datetime-local", description: "Defines a date and time control (year, month, day, time (no timezone))" },
        { label: "email", description: "Defines a field for an e-mail address" },
        { label: "file", description: 'Defines a file-select field and a "Browse..." button (for file uploads)' },
        { label: "hidden", description: "Defines a hidden input field" },
        { label: "image", description: "Defines an image as the submit button" },
        { label: "month", description: "Defines a month and year control (no timezone)" },
        { label: "number", description: "Defines a field for entering a number" },
        { label: "password", description: "Defines a password field (characters are masked)" },
        { label: "radio", description: "Defines a radio button" },
        { label: "range", description: "Defines a control for entering a number whose exact value is not important (like a slider control)" },
        { label: "reset", description: "Defines a reset button (resets all form values to default)" },
        { label: "search", description: "Defines a text field for entering a search string" },
        { label: "submit", description: "Defines a submit button" },
        { label: "tel", description: "Defines a field for entering a telephone number" },
        { label: "text", description: "Default. Defines a single-line text field" },
        { label: "time", description: "Defines a control for entering a time (no timezone)" },
        { label: "url", description: "Defines a field for entering a URL" },
        { label: "week", description: "Defines a week and year control (no timezone)" },

        { label: "Button", kind: K.Separator },
        { label: "submit", description: "Defines a button for submitting a form" },
        { label: "reset", description: "Defines a button for resetting a form" },
      ],
    },
  ],
  [
    "src",
    {
      type: "input",
    },
  ],
  [
    "controls",
    {
      type: "empty",
    },
  ],
  [
    "autoplay",
    {
      type: "empty",
    },
  ],
  [
    "loop",
    {
      type: "empty",
    },
  ],
  [
    "muted",
    {
      type: "empty",
    },
  ],
  [
    "preload",
    {
      type: "single-select",
      values: [
        { label: "auto", description: "The browser may preload the audio/video" },
        { label: "metadata", description: "The browser may only preload the audio/video metadata" },
        { label: "none", description: "The browser should not preload the audio/video" },
      ],
    },
  ],
  [
    "value",
    {
      type: "input",
    },
  ],
  [
    "name",
    {
      type: "input",
    },
  ],
  [
    "disabled",
    {
      type: "empty",
    },
  ],
  [
    "autofocus",
    {
      type: "empty",
    },
  ],
  [
    "form",
    {
      type: "input",
    },
  ],
  [
    "formaction",
    {
      type: "input",
    },
  ],
  [
    "width",
    {
      type: "input",
    },
  ],
  [
    "height",
    {
      type: "input",
    },
  ],
  [
    "span",
    {
      type: "input",
    },
  ],
  [
    "action",
    {
      type: "input",
    },
  ],
  [
    "method",
    {
      type: "single-select",
      values: [
        { label: "get", description: "The form-data should be sent by the GET method" },
        { label: "post", description: "The form-data should be sent by the POST method" },
      ],
    },
  ],
  [
    "enctype",
    {
      type: "single-select",
      values: [
        { label: "application/x-www-form-urlencoded", description: "The form-data should be encoded as URL variables" },
        { label: "multipart/form-data", description: "The form-data should be encoded as a multipart form" },
        { label: "text/plain", description: "The form-data should be encoded as plain text" },
      ],
    },
  ],
  [
    "autocomplete",
    {
      type: "single-select",
      values: [
        { label: "on", description: "The form-data should be encoded as URL variables" },
        { label: "off", description: "The form-data should be encoded as a multipart form" },
      ],
    },
  ],
  [
    "novalidate",
    {
      type: "empty",
    },
  ],
  [
    "accept-charset",
    {
      type: "input",
    },
  ],
  [
    "srcdoc",
    {
      type: "input",
    },
  ],
  [
    "sandbox",
    {
      type: "multi-select",
      values: [
        { label: "allow-forms", description: "Allows form submission" },
        { label: "allow-modals", description: "Allows to open modal windows" },
        { label: "allow-orientation-lock", description: "Allows to lock the screen orientation" },
        { label: "allow-pointer-lock", description: "Allows to use the Pointer Lock API" },
        { label: "allow-popups", description: "Allows popups" },
        { label: "allow-popups-to-escape-sandbox", description: "Allows popups to open new windows without inheriting the sandboxing" },
        { label: "allow-presentation", description: "Allows to start a presentation session" },
        { label: "allow-same-origin", description: "Allows the iframe content to be treated as being from the same origin" },
        { label: "allow-scripts", description: "Allows to run scripts" },
        { label: "allow-top-navigation", description: "Allows the iframe content to navigate its top-level browsing context" },
        { label: "allow-top-navigation-by-user-activation", description: "Allows the iframe content to navigate its top-level browsing context, but only if initiated by user" },
      ],
    },
  ],
  [
    "allow",
    {
      type: "multi-select",
      values: [
        { label: "accelerometer", description: "Allows the iframe content to use the accelerometer sensor" },
        { label: "ambient-light-sensor", description: "Allows the iframe content to use the ambient light sensor" },
        { label: "autoplay", description: "Allows the iframe content to autoplay media" },
        { label: "camera", description: "Allows the iframe content to use the camera" },
        { label: "encrypted-media", description: "Allows the iframe content to use the Encrypted Media Extensions API" },
        { label: "fullscreen", description: "Allows the iframe content to use the Fullscreen API" },
        { label: "geolocation", description: "Allows the iframe content to use the Geolocation API" },
        { label: "gyroscope", description: "Allows the iframe content to use the gyroscope sensor" },
        { label: "magnetometer", description: "Allows the iframe content to use the magnetometer sensor" },
        { label: "microphone", description: "Allows the iframe content to use the microphone" },
        { label: "midi", description: "Allows the iframe content to use the MIDI API" },
        { label: "payment", description: "Allows the iframe content to use the Payment Request API" },
        { label: "picture-in-picture", description: "Allows the iframe content to use the Picture-in-Picture API" },
        { label: "speaker", description: "Allows the iframe content to use the speaker" },
        { label: "sync-xhr", description: "Allows the iframe content to send synchronous XHR requests" },
        { label: "usb", description: "Allows the iframe content to use the USB API" },
        { label: "vr", description: "Allows the iframe content to use the VR API" },
      ],
    },
  ],
  [
    "allowfullscreen",
    {
      type: "empty",
    },
  ],
  [
    "referrerpolicy",
    {
      type: "single-select",
      values: [
        { label: "no-referrer", description: "The Referer header will not be sent" },
        { label: "no-referrer-when-downgrade", description: "The Referer header will not be sent when the request is downgraded from HTTPS to HTTP" },
        { label: "origin", description: "The Referer header will contain only the origin of the page" },
        { label: "origin-when-cross-origin", description: "The Referer header will contain only the origin of the page when the request is cross-origin" },
        { label: "same-origin", description: "The Referer header will contain the full URL when the request is same-origin" },
        { label: "strict-origin", description: "The Referer header will contain the origin of the page when the request is same-origin, and only the origin when the request is cross-origin" },
        { label: "strict-origin-when-cross-origin", description: "The Referer header will contain the full URL when the request is same-origin, and only the origin when the request is cross-origin" },
        { label: "unsafe-url", description: "The Referer header will contain the full URL when the request is same-origin, and the full URL when the request is cross-origin" },
      ],
    },
  ],
  [
    "crossorigin",
    {
      type: "single-select",
      values: [
        { label: "anonymous", description: "The resource will be fetched without sending any cookies along with the request" },
        { label: "use-credentials", description: "The resource will be fetched and the cookies in the user's origin will be sent along with the request" },
      ],
    },
  ],
  [
    "integrity",
    {
      type: "input",
    },
  ],
  [
    "loading",
    {
      type: "single-select",
      values: [
        { label: "eager", description: "The resource will be fetched immediately" },
        { label: "lazy", description: "The resource will be fetched when it is needed" },
      ],
    },
  ],
  [
    "alt",
    {
      type: "input",
    },
  ],
  [
    "srcset",
    {
      type: "input",
    },
  ],
  [
    "sizes",
    {
      type: "input",
    },
  ],
  [
    "readonly",
    {
      type: "empty",
    },
  ],
  [
    "required",
    {
      type: "empty",
    },
  ],
  [
    "placeholder",
    {
      type: "input",
    },
  ],
  [
    "pattern",
    {
      type: "input",
    },
  ],
  [
    "dirname",
    {
      type: "input",
    },
  ],
  [
    "size",
    {
      type: "input",
    },
  ],
  [
    "maxlength",
    {
      type: "input",
    },
  ],
  [
    "accept",
    {
      type: "input",
    },
  ],
  [
    "checked",
    {
      type: "empty",
    },
  ],
  [
    "multiple",
    {
      type: "empty",
    },
  ],
  [
    "min",
    {
      type: "input",
    },
  ],
  [
    "max",
    {
      type: "input",
    },
  ],
  [
    "step",
    {
      type: "input",
    },
  ],
  [
    "for",
    {
      type: "input",
    },
  ],
  [
    "reversed",
    {
      type: "empty",
    },
  ],
  [
    "start",
    {
      type: "input",
    },
  ],
  [
    "label",
    {
      type: "input",
    },
  ],
  [
    "selected",
    {
      type: "empty",
    },
  ],
  [
    "media",
    {
      type: "input",
    },
  ],
  [
    "colspan",
    {
      type: "input",
    },
  ],
  [
    "rowspan",
    {
      type: "input",
    },
  ],
  [
    "cols",
    {
      type: "input",
    },
  ],
  [
    "rows",
    {
      type: "input",
    },
  ],
  [
    "wrap",
    {
      type: "single-select",
      values: [
        { label: "soft", description: "The text will wrap when necessary, and on line breaks" },
        { label: "hard", description: "The text will wrap only on line breaks" },
      ],
    },
  ],
  [
    "poster",
    {
      type: "input",
    },
  ],
]);
