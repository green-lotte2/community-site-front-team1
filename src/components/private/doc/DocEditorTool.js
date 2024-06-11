import Header from '@editorjs/header';
import Image from '@editorjs/image';
import Code from '@editorjs/code';
import Paragraph from '@editorjs/paragraph';
import SimpleImage from '@editorjs/simple-image';
import ColorPlugin from 'editorjs-text-color-plugin';

export const EDITOR_JS_TOOLS = {
  header: Header,
  paragraph: Paragraph,
  code: Code,
  image: {
    class: Image,
    config: {
      endpoints: {
        byFile: 'http://localhost:8008/uploadFile', // 파일 업로드 엔드포인트
        byUrl: 'http://localhost:8008/fetchUrl', // URL 업로드 엔드포인트
      },
    },
  },
  simpleImage: SimpleImage,
  textColor: {
    class: ColorPlugin,
    config: {
      colorCollections: ['#FF1300', '#00FF00', '#0000FF', '#000000'], // 원하는 색상 추가
      defaultColor: '#FF1300',
      type: 'text', // 'text' 또는 'background'
    },
  },
};
