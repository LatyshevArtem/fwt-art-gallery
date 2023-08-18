import { FC } from 'react';
import { Image } from '@schemas/Image';
import { getFullImageSrc } from './utils/getFullImageSrc';

interface PictureProps extends Omit<Image, '_id' | 'original'> {
  className?: string;
}

const Picture: FC<PictureProps> = ({ className, webp, webp2x, src, src2x }) => {
  return (
    <picture>
      <source
        srcSet={`${getFullImageSrc(webp)} 1x, ${getFullImageSrc(webp2x)} 2x`}
        type="image/webp"
      />
      <img
        className={className}
        src={getFullImageSrc(src)}
        srcSet={`${getFullImageSrc(src2x)} 2x`}
        alt=""
      />
    </picture>
  );
};

export default Picture;
