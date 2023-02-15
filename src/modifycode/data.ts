import { QuickPickItem, QuickPickItemKind as K } from "vscode";

export const globalTags: QuickPickItem[] = [
  { label: "Common", kind: K.Separator },
  { label: "div", description: "Section" },
  { label: "span", description: "Section" },
  { label: "p", description: "Paragraph" },
  { label: "a", description: "Hyperlink" },
  { label: "button", description: "Button" },
  { label: "br", description: "Single line break" },
  { label: "hr", description: "Horizontal rule" },
  { label: "i", description: "Icon" },
  { label: "table", description: "Table" },

  { label: "Media / Graphics", kind: K.Separator },
  { label: "img", description: "Image" },
  { label: "picture", description: "Container for multiple images" },
  { label: "audio", description: "Sound" },
  { label: "video", description: "Video" },
  { label: "canvas", description: "Raster graphics" },
  { label: "svg", description: "SVG graphics" },
  { label: "figure", description: "Specifies self-contained content" },

  { label: "Formatting", kind: K.Separator },
  { label: "h1", description: "Headings 1" },
  { label: "h2", description: "Headings 2" },
  { label: "h3", description: "Headings 3" },
  { label: "h4", description: "Headings 4" },
  { label: "h5", description: "Headings 5" },
  { label: "h6", description: "Headings 6" },
  { label: "sub", description: "Subscripted text" },
  { label: "sup", description: "Superscripted text" },

  { label: "List", kind: K.Separator },
  { label: "ol", description: "Ordered list" },
  { label: "ul", description: "Unordered list" },
  { label: "dl", description: "Description list" },

  { label: "Form", kind: K.Separator },
  { label: "form", description: "HTML form for user input" },
  { label: "input", description: "Various input controls" },
  { label: "label", description: "Label for an input control" },
  { label: "textarea", description: "Multiline input control" },
  { label: "select", description: "Drop-down list" },
  { label: "fieldset", description: "Groups related elements in a form" },

  { label: "Semantics", kind: K.Separator },
  { label: "nav", description: "Navigation links" },
  { label: "header", description: "Header for a document or section" },
  { label: "main", description: "The main content of a document" },
  { label: "article", description: "An article" },
  { label: "section", description: "A section in a document" },
  { label: "aside", description: "Content aside from the page content" },
  { label: "address", description: "Contact information for the author/owner of a document" },
  { label: "footer", description: "Footer for a document or section" },

  { label: "Misc.", kind: K.Separator },
  { label: "iframe", description: "An inline frame" },
  { label: "embed", description: "A container for an external (non-HTML) application" },
  { label: "progress", description: "Represents the progress of a task" },
  { label: "pre", description: "Preformatted text" },
];

export const specificTags = new Map<string, QuickPickItem[]>([
  [
    "table",
    [
      { label: "tr", description: "Row in a table" },
      { label: "thead", description: "Groups the header content in a table" },
      { label: "tbody", description: "Groups the body content in a table" },
      { label: "tfoot", description: "Groups the footer content in a table" },
      { label: "colgroup", description: "A group of one or more columns in a table for formatting" },
      { label: "caption", description: "Table caption" },
    ],
  ],
  [
    "tr",
    [
      { label: "th", description: "Header cell in a table" },
      { label: "td", description: "Cell in a table" },
    ],
  ],
  ["thead", [{ label: "tr", description: "Row in a table" }]],
  ["tbody", [{ label: "tr", description: "Row in a table" }]],
  ["tfoot", [{ label: "tr", description: "Row in a table" }]],
  ["colgroup", [{ label: "col", description: "Column properties for each column within a colgroup element" }]],
  [
    "select",
    [
      { label: "optgroup", description: "Group of related options in a drop-down list" },
      { label: "option", description: "Option in a drop-down list" },
    ],
  ],
  ["optgroup", [{ label: "option", description: "Option in a drop-down list" }]],
  ["fieldset", [{ label: "legend", description: "Caption for a fieldset element" }]],
  ["ol", [{ label: "li", description: "List item" }]],
  ["ul", [{ label: "li", description: "List item" }]],
  [
    "dl",
    [
      { label: "dt", description: "Term/name in description list" },
      { label: "dd", description: "Description/value in description list" },
    ],
  ],
  [
    "picture",
    [
      { label: "source", description: "Defines multiple media resources" },
      { label: "img", description: "Image" },
    ],
  ],
  ["figure", [{ label: "figcaption", description: "A caption for a figure element" }]],
  ["video", [{ label: "source", description: "Defines multiple media resources" }]],
  ["audio", [{ label: "source", description: "Defines multiple media resources" }]],
]);
