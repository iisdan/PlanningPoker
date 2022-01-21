import React from 'react';

interface Props {
  className: string;
  perspective?: string;
  rotateForce?: number;
  children: React.ReactElement;
}

export const MouseRotate = (props: Props) => {

  const rotateForce = props.rotateForce ?? 20;

  const [rotateXDeg, setRotateXDeg] = React.useState(0);
  const [rotateYDeg, setRotateYDeg] = React.useState(0);

  let pageWidth = window.innerWidth;
  let pageHeight = window.innerHeight;

    React.useEffect(() => {
      document.body.addEventListener('mousemove', _moveBox);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function _moveBox(event: any) {
      setRotateXDeg(-((event.pageY / pageHeight * 2 - 1) * rotateForce));
      setRotateYDeg((event.pageX / pageWidth * 2 - 1) * rotateForce);
    }

    return (
      <div className={`motion-box ${props.className || ''}`} style={
          {
              perspective: props.perspective ?? '800px',
          }
      }>
          <div
              style={{ transformStyle: 'preserve-3d', transform: `rotateX(${rotateXDeg}deg) rotateY(${rotateYDeg}deg)` }}>
              {props.children}
          </div>
      </div>
    );
}

export default MouseRotate;