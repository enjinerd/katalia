import axios from 'axios';

const exportCarbonImg = (code) => {
  axios
    .post('https://carbonara.vercel.app/api/cook', {
      code,
      paddingVertical: '56px',
      paddingHorizontal: '56px',
      backgroundImage: null,
      backgroundImageSelection: null,
      backgroundMode: 'color',
      backgroundColor: 'rgba(154,154,154,0.99)',
      dropShadow: true,
      dropShadowOffsetY: '20px',
      dropShadowBlurRadius: '68px',
      theme: 'one-dark',
      windowTheme: 'none',
      language: 'auto',
      fontFamily: 'Space Mono',
      fontSize: '15.5px',
      lineHeight: '137%',
      windowControls: true,
      widthAdjustment: true,
      lineNumbers: false,
      firstLineNumber: 1,
      exportSize: '2x',
      watermark: false,
      squaredImage: false,
      hiddenCharacters: false,
      name: '',
      width: 680,
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'snippet.png');
      document.body.appendChild(link);
      link.click();
    });
};

export default exportCarbonImg;
