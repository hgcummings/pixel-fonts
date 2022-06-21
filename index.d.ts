import {PNG} from "pngjs";
export type Pixel = 0 | 1;
export type Color = [number, number, number, number?];

export interface Glyph {
  offset: number;
  pixels: Array<Pixel[]>;
}

export interface Font {
  name: string;
  lineHeight: number;
  description: string;
  isFixedWidth: boolean;
  glyphs: {[key: string]: Glyph};
}

export interface RenderOptions {
  foreground: Color;
  background: Color;
  scale?: number;
}

export const fonts: {
  sevenPlus: Font;
  slumbers: Font;
};

export function renderPixels(text: string, font: Font): Array<Pixel[]>;
export function renderImage(
  text: string,
  font: Font,
  renderOptions: RenderOptions
): ReturnType<PNG['pack']>;
