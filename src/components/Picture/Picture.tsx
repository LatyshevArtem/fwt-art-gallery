import { FC, ImgHTMLAttributes } from 'react';
import { Image } from '@schemas/Image';

const getFullImageSrc = (relativePath: string) =>
  `${process.env.REACT_APP_BASE_URL}/${relativePath}`;

interface PictureProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  image: Omit<Image, '_id' | 'original'>;
}

const Picture: FC<PictureProps> = ({ className, image, alt, ...props }) => {
  const { src, src2x, webp, webp2x } = image;

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
        alt={alt}
        {...props}
      />
    </picture>
  );
};

export default Picture;
