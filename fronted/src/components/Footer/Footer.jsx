import React from 'react';
import Logo from '../Logo';

export default () => {
  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
        lineHeight: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ filter: 'grayscale(100%)', opacity: 0.3 }}>
        {/*<Logo isDark />*/}
        <h1>CodeKun</h1>
      </div>
      <div
        style={{
          color: '#999',
          lineHeight: 1.5,
          fontSize: 12,
          textAlign: 'right',
        }}
      >
        <a href="http://www.zzkun.com" target="_blank">CodeKun</a>
        <br />
        © 2018 版权所有
      </div>
    </div>
  );
};
