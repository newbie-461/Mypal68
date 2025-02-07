/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// InactivePropertyHelper `gap` test cases.
export default [{
  info: "column-gap is inactive on non-grid and non-flex container",
  property: "column-gap",
  tagName: "div",
  rules: ["div { column-gap: 10px; display: block; }"],
  isActive: false,
}, {
  info: "column-gap is active on grid container",
  property: "column-gap",
  tagName: "div",
  rules: ["div { column-gap: 10px; display: grid; }"],
  isActive: true,
}, {
  info: "column-gap is active on flex container",
  property: "column-gap",
  tagName: "div",
  rules: ["div { column-gap: 10px; display: flex; }"],
  isActive: true,
}, {
  info: "column-gap is inactive on non-multi-col container",
  property: "column-gap",
  tagName: "div",
  rules: ["div { column-gap: 10px; column-count: auto; }"],
  isActive: false,
}, {
  info: "column-gap is active on multi-column container",
  property: "column-gap",
  tagName: "div",
  rules: ["div { column-gap: 10px; column-count: 2; }"],
  isActive: true,
}, {
  info: "row-gap is inactive on non-grid and non-flex container",
  property: "row-gap",
  tagName: "div",
  rules: ["div { row-gap: 10px; display: block; }"],
  isActive: false,
}, {
  info: "row-gap is active on grid container",
  property: "row-gap",
  tagName: "div",
  rules: ["div { row-gap: 10px; display: grid; }"],
  isActive: true,
}, {
  info: "row-gap is active on flex container",
  property: "row-gap",
  tagName: "div",
  rules: ["div { row-gap: 10px; display: flex; }"],
  isActive: true,
}, {
  info: "gap is inactive on non-grid and non-flex container",
  property: "gap",
  tagName: "div",
  rules: ["div { gap: 10px; display: block; }"],
  isActive: false,
}, {
  info: "gap is active on flex container",
  property: "gap",
  tagName: "div",
  rules: ["div { gap: 10px; display: flex; }"],
  isActive: true,
}, {
  info: "gap is active on grid container",
  property: "gap",
  tagName: "div",
  rules: ["div { gap: 10px; display: grid; }"],
  isActive: true,
}, {
  info: "gap is inactive on non-multi-col container",
  property: "gap",
  tagName: "div",
  rules: ["div { gap: 10px; column-count: auto; }"],
  isActive: false,
}, {
  info: "gap is active on multi-col container",
  property: "gap",
  tagName: "div",
  rules: ["div { gap: 10px; column-count: 2; }"],
  isActive: true,
}];
