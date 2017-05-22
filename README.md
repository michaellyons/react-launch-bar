# React Launch Bar

### Inspired by SpaceX's clean display for live launch telemetry.

[![PeerDependencies](https://img.shields.io/david/peer/michaellyons/react-launch-bar.svg?style=flat-square)](https://david-dm.org/michaellyons/react-launch-bar#info=peerDependencies&view=list)
[![Dependencies](https://img.shields.io/david/michaellyons/react-launch-bar.svg?style=flat-square)](https://david-dm.org/michaellyons/react-launch-bar)
[![DevDependencies](https://img.shields.io/david/dev/michaellyons/react-launch-bar.svg?style=flat-square)](https://david-dm.org/michaellyons/react-launch-bar#info=devDependencies&view=list)

## [Github Page](https://michaellyons.github.io/react-launch-bar)

## Prerequisites

You should be using [NodeJS](https://www.nodejs.org) and [ReactJS](https://facebook.github.io/react/)

## Installation

React Launch Bar is available as an [npm package](https://www.npmjs.org/package/react-launch-bar).
```sh
npm install react-launch-bar [-S]
```
or

```sh
yarn add react-launch-bar
```

## Usage

Using React Launch Bar is very straightforward. Once it is included in your project, you can use the components this way:

```js
import React from 'react';
import { BarChart } from 'react-launch-bar';

let data = [
  { value: 40, max: 50, color: 'red'},
  { value: 20, max: 50, color: 'blue'},
  { value: 30, max: 50, color: 'green'},
  ...
]

const MyAwesomeReactComponent = () => (
  <BarChart title={'Points'} data={data} />
);

export default MyAwesomeReactComponent;
```

## Customization

Key | Required |  Type | Description
----- | ----- |  ----- | -----
height | Y | Integer/String | This will set the total height of the chart.
width | | Integer/String | This will set override the width of the chart.
value | | Number | This will set override the width of the chart.
high | | Number | This value determines the upper-region that fills red.
max | | Number | This sets the ceiling of the chart's scale
title |  | String | Title of the chart.
titleStyle |  | Object | Style for title text (SVG Text).
progressStyle |  | Object | Style for progress bar (SVG rect)
style |  | Object | Style that is passed to SVG.
wrapStyle |  | Object | Style for wrapper div (div).
