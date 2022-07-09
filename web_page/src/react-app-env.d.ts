/// <reference types="react-scripts" />
// mp4以外であれば、*.mp4の拡張子の部分を変更ください
declare module '*.mp4' {
    const src: string;
    export default src;
  }